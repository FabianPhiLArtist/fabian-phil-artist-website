import { NextResponse } from 'next/server'
import { composeEnquiry, EnquiryValidationError, renderEnquiryHtml, renderEnquiryText } from '@/lib/enquiryEmail'

export const dynamic = 'force-dynamic'

const MAX_BODY_BYTES = 20_000
const MIN_COMPLETION_MS = 3_000
const RESEND_ENDPOINT = 'https://api.resend.com/emails'

type ErrorCode = 'invalid' | 'too_fast' | 'rejected' | 'unavailable' | 'send_failed'

function fail(status: number, error: ErrorCode, message: string, field?: string) {
  return NextResponse.json({ ok: false, error, message, ...(field ? { field } : {}) }, { status })
}

export async function POST(request: Request) {
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
    return fail(
      429,
      'too_fast',
      'That was quicker than expected. Please check your details and press send again.'
    )
  }

  if (data.type !== 'contact' && data.type !== 'artwork') {
    return fail(400, 'invalid', 'Unknown enquiry type.')
  }

  let enquiry
  try {
    enquiry = composeEnquiry(data)
  } catch (error) {
    if (error instanceof EnquiryValidationError) return fail(422, 'invalid', error.message, error.field)
    throw error
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.ENQUIRY_TO_EMAIL
  const from = process.env.ENQUIRY_FROM_EMAIL
  if (!apiKey || !to || !from) {
    console.error('[enquiry] email service is not configured')
    return fail(503, 'unavailable', 'Our message service is temporarily unavailable. Please contact us on WhatsApp.')
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: enquiry.replyTo,
        subject: enquiry.subject,
        html: renderEnquiryHtml(enquiry),
        text: renderEnquiryText(enquiry),
      }),
      signal: AbortSignal.timeout(10_000),
      cache: 'no-store',
    })

    if (!response.ok) {
      console.error(`[enquiry] email provider rejected the request (status ${response.status})`)
      return fail(502, 'send_failed', 'Your message could not be sent. Please try again or contact us on WhatsApp.')
    }
  } catch {
    console.error('[enquiry] email provider request failed')
    return fail(502, 'send_failed', 'Your message could not be sent. Please try again or contact us on WhatsApp.')
  }

  return NextResponse.json({ ok: true })
}
