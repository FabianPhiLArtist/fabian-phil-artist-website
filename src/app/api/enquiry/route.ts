import { NextResponse } from 'next/server'
import { artworks } from '@/data/artworks'
import { localizedPath } from '@/i18n/pathnames'
import { SITE_URL } from '@/lib/site'

export const dynamic = 'force-dynamic'

const MAX_BODY_BYTES = 20_000
const MIN_COMPLETION_MS = 3_000
const RESEND_ENDPOINT = 'https://api.resend.com/emails'

const EMAIL_PATTERN = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:".]{2,}$/

const CONTACT_SUBJECTS: Record<string, string> = {
  inquiry: 'Artwork Inquiry',
  commission: 'Commission Request',
  exhibition: 'Exhibition Opportunity',
  press: 'Press & Media',
  other: 'Other',
}

const TIMELINES: Record<string, string> = {
  immediate: 'Immediate',
  '1-3-months': '1-3 months',
  '3-6-months': '3-6 months',
  '6-12-months': '6-12 months',
  flexible: 'Flexible',
}

type ErrorCode = 'invalid' | 'too_fast' | 'rejected' | 'unavailable' | 'send_failed'

type Row = [label: string, value: string]

type Enquiry = {
  kind: string
  subject: string
  replyTo: string
  rows: Row[]
  message: string
}

class ValidationError extends Error {
  constructor(readonly field: string, message: string) {
    super(message)
  }
}

function fail(status: number, error: ErrorCode, message: string, field?: string) {
  return NextResponse.json({ ok: false, error, message, ...(field ? { field } : {}) }, { status })
}

function text(
  data: Record<string, unknown>,
  field: string,
  label: string,
  { required = false, max, multiline = false }: { required?: boolean; max: number; multiline?: boolean }
): string {
  const raw = data[field]
  if (raw !== undefined && raw !== null && typeof raw !== 'string') {
    throw new ValidationError(field, `${label} is invalid.`)
  }
  let value = (raw ?? '').replace(/\r\n?/g, '\n')
  value = multiline ? value.replace(/[^\S\n]+$/gm, '') : value.replace(/\s+/g, ' ')
  value = value.trim()
  if (required && !value) throw new ValidationError(field, `${label} is required.`)
  if (value.length > max) throw new ValidationError(field, `${label} must be ${max} characters or fewer.`)
  return value
}

function email(data: Record<string, unknown>): string {
  const value = text(data, 'email', 'Email address', { required: true, max: 254 })
  if (!EMAIL_PATTERN.test(value)) throw new ValidationError('email', 'Please enter a valid email address.')
  return value
}

function option(data: Record<string, unknown>, field: string, label: string, options: Record<string, string>): string {
  const value = text(data, field, label, { max: 40 })
  if (!value) return ''
  if (!(value in options)) throw new ValidationError(field, `${label} is invalid.`)
  return options[value]
}

function oneLine(value: string): string {
  return value.replace(/[\r\n\t]+/g, ' ').trim()
}

function parseContact(data: Record<string, unknown>): Enquiry {
  const firstName = text(data, 'firstName', 'First name', { required: true, max: 100 })
  const lastName = text(data, 'lastName', 'Last name', { max: 100 })
  const replyTo = email(data)
  const phone = text(data, 'phone', 'Phone number', { max: 40 })
  const topic = option(data, 'subject', 'Subject', CONTACT_SUBJECTS)
  const message = text(data, 'message', 'Message', { required: true, max: 5000, multiline: true })
  const fullName = [firstName, lastName].filter(Boolean).join(' ')

  return {
    kind: 'General contact enquiry',
    subject: oneLine(`[Website] General contact${topic ? ` (${topic})` : ''} from ${fullName}`),
    replyTo,
    rows: [
      ['Name', fullName],
      ['Email', replyTo],
      ['Phone', phone],
      ['Subject', topic],
    ],
    message,
  }
}

function parseArtwork(data: Record<string, unknown>): Enquiry {
  const name = text(data, 'name', 'Full name', { required: true, max: 150 })
  const replyTo = email(data)
  const phone = text(data, 'phone', 'Phone number', { max: 40 })
  const location = text(data, 'location', 'Location', { max: 150 })
  const artworkOfInterest = text(data, 'artwork', 'Artwork of interest', { max: 300 })
  const timeline = option(data, 'timeline', 'Timeline', TIMELINES)
  const message = text(data, 'message', 'Message', { max: 5000, multiline: true })

  const rawId = data.artworkId
  let catalogue: (typeof artworks)[number] | undefined
  if (rawId !== undefined && rawId !== null && rawId !== '') {
    const id = typeof rawId === 'number' ? rawId : typeof rawId === 'string' && /^\d+$/.test(rawId) ? Number(rawId) : NaN
    catalogue = artworks.find((art) => art.id === id)
    if (!catalogue) throw new ValidationError('artworkId', 'The selected artwork could not be found.')
  }

  if (!catalogue && !artworkOfInterest && !message) {
    throw new ValidationError('message', 'Please tell us which artwork you are interested in.')
  }

  const reference = catalogue ? `${catalogue.title} (ID ${catalogue.id})` : artworkOfInterest

  return {
    kind: 'Artwork enquiry',
    subject: oneLine(`[Website] Artwork enquiry: ${reference || 'unspecified artwork'} from ${name}`),
    replyTo,
    rows: [
      ['Artwork', catalogue ? catalogue.title : ''],
      ['Artwork ID', catalogue ? String(catalogue.id) : ''],
      ['Series', catalogue ? catalogue.series : ''],
      ['Artwork page', catalogue ? new URL(localizedPath('en', 'artwork', { id: catalogue.id }), SITE_URL).toString() : ''],
      ['Artwork of interest (as typed)', artworkOfInterest],
      ['Name', name],
      ['Email', replyTo],
      ['Phone', phone],
      ['Location', location],
      ['Timeline', timeline],
    ],
    message,
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function renderHtml(enquiry: Enquiry): string {
  const rows = enquiry.rows
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#6b7280;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td><td style="padding:6px 0;color:#111827">${escapeHtml(value)}</td></tr>`
    )
    .join('')
  const message = enquiry.message
    ? `<h3 style="margin:24px 0 8px;font-size:15px;color:#111827">Message</h3><div style="white-space:pre-wrap;padding:12px 16px;background:#f9fafb;border-radius:8px;color:#111827">${escapeHtml(enquiry.message)}</div>`
    : ''

  return `<!doctype html><html><body style="margin:0;padding:24px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;background:#ffffff">
<div style="max-width:640px;margin:0 auto">
<p style="margin:0 0 4px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#6b7280">fabianphil.com</p>
<h2 style="margin:0 0 16px;font-size:20px;color:#111827">${escapeHtml(enquiry.kind)}</h2>
<table style="border-collapse:collapse">${rows}</table>
${message}
<p style="margin:24px 0 0;font-size:12px;color:#9ca3af">Reply to this email to answer the visitor directly.</p>
</div></body></html>`
}

function renderText(enquiry: Enquiry): string {
  const rows = enquiry.rows.filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`)
  return [enquiry.kind, '', ...rows, ...(enquiry.message ? ['', 'Message:', enquiry.message] : [])].join('\n')
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

  let enquiry: Enquiry
  try {
    if (data.type === 'contact') enquiry = parseContact(data)
    else if (data.type === 'artwork') enquiry = parseArtwork(data)
    else return fail(400, 'invalid', 'Unknown enquiry type.')
  } catch (error) {
    if (error instanceof ValidationError) return fail(422, 'invalid', error.message, error.field)
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
        html: renderHtml(enquiry),
        text: renderText(enquiry),
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
