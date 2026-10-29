import { NextResponse } from 'next/server'
import { composeCollectorEnquiry, type CollectorDelivery } from '@/lib/collectorEnquiry'
import { composeEnquiry, EnquiryValidationError, renderEnquiryHtml, renderEnquiryText } from '@/lib/enquiryEmail'
import {
  allowCollectorAcknowledgement,
  allowEnquiry,
  EnquiryStoreError,
  readEnquiryDelivery,
  withEnquiryLock,
  writeEnquiryDelivery,
} from '@/lib/enquiryGuard'

const MAX_BODY_BYTES = 20_000
const MIN_COMPLETION_MS = 3_000
const RESEND_ENDPOINT = 'https://api.resend.com/emails'

type ErrorCode = 'invalid' | 'too_fast' | 'rate_limited' | 'rejected' | 'unavailable' | 'send_failed'

export type EnquiryMail = {
  from: string
  to: string[]
  replyTo: string
  subject: string
  html: string
  text: string
}

type HandleOptions = {
  now?: () => Date
  from?: string
  to?: string
  send?: (mail: EnquiryMail) => Promise<void>
}

function fail(status: number, error: ErrorCode, message: string, field?: string) {
  return NextResponse.json({ ok: false, error, message, ...(field ? { field } : {}) }, { status })
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const raw = (forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip')) ?? 'unknown'
  const ip = raw.trim()
  if (!ip || ip.length > 64 || /[\r\n]/.test(ip)) return 'unknown'
  return ip
}

async function sendWithResend(mail: EnquiryMail): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('send failed')
  let response: Response
  try {
    response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: mail.from,
        to: mail.to,
        reply_to: mail.replyTo,
        subject: mail.subject,
        html: mail.html,
        text: mail.text,
      }),
      signal: AbortSignal.timeout(10_000),
      cache: 'no-store',
    })
  } catch {
    console.error('[enquiry] email provider request failed')
    throw new Error('send failed')
  }
  if (!response.ok) {
    console.error(`[enquiry] email provider rejected the request (status ${response.status})`)
    throw new Error('send failed')
  }
}

export async function handleEnquiry(request: Request, options: HandleOptions = {}): Promise<Response> {
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return fail(415, 'invalid', 'Unsupported request format.')
  }

  const declaredLength = Number(request.headers.get('content-length') ?? 0)
  if (declaredLength > MAX_BODY_BYTES) {
    return fail(413, 'invalid', 'Your message is too long.')
  }

  let data: Record<string, unknown>
  try {
    const body = await request.text()
    if (body.length > MAX_BODY_BYTES) return fail(413, 'invalid', 'Your message is too long.')
    const parsed: unknown = JSON.parse(body)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error()
    data = parsed as Record<string, unknown>
  } catch {
    return fail(400, 'invalid', 'The request could not be read.')
  }

  if (typeof data.website === 'string' && data.website.trim() !== '') {
    return fail(400, 'rejected', 'Your message could not be sent. Please contact us on WhatsApp instead.')
  }

  const elapsed = typeof data.elapsedMs === 'number' ? data.elapsedMs : 0
  if (!Number.isFinite(elapsed) || elapsed < MIN_COMPLETION_MS) {
    return fail(429, 'too_fast', 'That was quicker than expected. Please check your details and press send again.')
  }

  const now = options.now?.() ?? new Date()
  const limited = await rateLimit(allowEnquiry(clientIp(request), now.getTime()))
  if (limited) return limited

  if (data.type !== 'contact' && data.type !== 'artwork' && data.type !== 'collector') {
    return fail(400, 'invalid', 'Unknown enquiry type.')
  }

  const from = options.from ?? process.env.ENQUIRY_FROM_EMAIL
  const to = options.to ?? process.env.ENQUIRY_TO_EMAIL
  const send = options.send ?? sendWithResend

  let delivery: ReturnType<typeof composeCollectorEnquiry> | undefined
  let enquiry: ReturnType<typeof composeEnquiry> | undefined
  try {
    if (data.type === 'collector') delivery = composeCollectorEnquiry(data, now)
    else enquiry = composeEnquiry(data)
  } catch (error) {
    if (error instanceof EnquiryValidationError) return fail(422, 'invalid', error.message, error.field)
    throw error
  }

  if (!from || !to || (!options.send && !process.env.RESEND_API_KEY)) {
    console.error('[enquiry] email service is not configured')
    return fail(503, 'unavailable', 'Our message service is temporarily unavailable. Please contact us on WhatsApp.')
  }

  try {
    if (delivery) {
      const collectorLimited = await rateLimit(allowCollectorAcknowledgement(clientIp(request), now.getTime()))
      if (collectorLimited) return collectorLimited
      const prepared = delivery
      const outcome = await withEnquiryLock(prepared.idempotencyKey, () =>
        sendCollectorDelivery(prepared, send, from, to, now.getTime())
      )
      return NextResponse.json({ ok: true, delivery: outcome })
    }

    if (!enquiry) throw new Error('send failed')
    await send({
      from,
      to: [to],
      replyTo: enquiry.replyTo,
      subject: enquiry.subject,
      html: renderEnquiryHtml(enquiry),
      text: renderEnquiryText(enquiry),
    })
  } catch (error) {
    if (error instanceof EnquiryValidationError) return fail(422, 'invalid', error.message, error.field)
    if (error instanceof EnquiryStoreError) {
      console.error('[enquiry] shared store unavailable')
      return fail(503, 'unavailable', 'Our message service is temporarily unavailable. Please contact us on WhatsApp.')
    }
    console.error('[enquiry] email provider request failed')
    return fail(502, 'send_failed', 'Your message could not be sent. Please try again or contact us on WhatsApp.')
  }

  return NextResponse.json({ ok: true })
}

async function rateLimit(check: Promise<boolean>): Promise<Response | null> {
  try {
    if (await check) return null
  } catch (error) {
    if (error instanceof EnquiryStoreError) {
      console.error('[enquiry] shared store unavailable')
      return fail(503, 'unavailable', 'Our message service is temporarily unavailable. Please contact us on WhatsApp.')
    }
    throw error
  }
  return fail(429, 'rate_limited', 'Too many enquiries were sent from this network. Please wait and try again.')
}

// Studio mail is sent at most once for an enquiry. A later retry sends only the acknowledgement.
async function sendCollectorDelivery(
  prepared: CollectorDelivery,
  send: (mail: EnquiryMail) => Promise<void>,
  from: string,
  to: string,
  now: number
): Promise<'complete' | 'partial'> {
  const key = prepared.idempotencyKey
  const record = await readEnquiryDelivery(key, now)
  if (record?.studio && record.ack) return 'complete'

  if (!record?.studio) {
    await send({
      from,
      to: [to],
      replyTo: prepared.studio.replyTo,
      subject: prepared.studio.subject,
      html: prepared.studio.html,
      text: prepared.studio.text,
    })
    try {
      await writeEnquiryDelivery(key, { studio: true, ack: false }, now)
    } catch (error) {
      if (!(error instanceof EnquiryStoreError)) throw error
      console.error('[enquiry] could not store delivery state')
    }
  }

  const acknowledgement: EnquiryMail = {
    from,
    to: [prepared.acknowledgement.to],
    replyTo: prepared.acknowledgement.replyTo,
    subject: prepared.acknowledgement.subject,
    html: prepared.acknowledgement.html,
    text: prepared.acknowledgement.text,
  }
  try {
    await send(acknowledgement)
  } catch {
    try {
      await send(acknowledgement)
    } catch {
      return 'partial'
    }
  }

  try {
    await writeEnquiryDelivery(key, { studio: true, ack: true }, now)
  } catch (error) {
    if (!(error instanceof EnquiryStoreError)) throw error
    console.error('[enquiry] could not store delivery state')
  }
  return 'complete'
}
