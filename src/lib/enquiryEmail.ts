import { artworks } from '@/data/artworks'
import { localizedPath } from '@/i18n/pathnames'
import { SITE_URL } from '@/lib/site'

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

type Row = [label: string, value: string]

export type Enquiry = {
  kind: string
  subject: string
  replyTo: string
  rows: Row[]
  message: string
}

export class EnquiryValidationError extends Error {
  constructor(readonly field: string, message: string) {
    super(message)
  }
}

function text(
  data: Record<string, unknown>,
  field: string,
  label: string,
  { required = false, max, multiline = false }: { required?: boolean; max: number; multiline?: boolean }
): string {
  const raw = data[field]
  if (raw !== undefined && raw !== null && typeof raw !== 'string') {
    throw new EnquiryValidationError(field, `${label} is invalid.`)
  }
  let value = (raw ?? '').replace(/\r\n?/g, '\n')
  value = multiline ? value.replace(/[^\S\n]+$/gm, '') : value.replace(/\s+/g, ' ')
  value = value.trim()
  if (required && !value) throw new EnquiryValidationError(field, `${label} is required.`)
  if (value.length > max) throw new EnquiryValidationError(field, `${label} must be ${max} characters or fewer.`)
  return value
}

function email(data: Record<string, unknown>): string {
  const value = text(data, 'email', 'Email address', { required: true, max: 254 })
  if (!EMAIL_PATTERN.test(value)) throw new EnquiryValidationError('email', 'Please enter a valid email address.')
  return value
}

function option(data: Record<string, unknown>, field: string, label: string, options: Record<string, string>): string {
  const value = text(data, field, label, { max: 40 })
  if (!value) return ''
  if (!(value in options)) throw new EnquiryValidationError(field, `${label} is invalid.`)
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
  const location = text(data, 'location', 'Location', { max: 150 })
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
      ['Location', location],
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
    if (!catalogue) throw new EnquiryValidationError('artworkId', 'The selected artwork could not be found.')
  }

  if (!catalogue && !artworkOfInterest && !message) {
    throw new EnquiryValidationError('message', 'Please tell us which artwork you are interested in.')
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

export function composeEnquiry(data: Record<string, unknown>): Enquiry {
  if (data.type === 'contact') return parseContact(data)
  if (data.type === 'artwork') return parseArtwork(data)
  throw new Error('Unknown enquiry type.')
}

export function renderEnquiryHtml(enquiry: Enquiry): string {
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

export function renderEnquiryText(enquiry: Enquiry): string {
  const rows = enquiry.rows.filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`)
  return [enquiry.kind, '', ...rows, ...(enquiry.message ? ['', 'Message:', enquiry.message] : [])].join('\n')
}

export { text as readEnquiryText, email as readEnquiryEmail, escapeHtml }
