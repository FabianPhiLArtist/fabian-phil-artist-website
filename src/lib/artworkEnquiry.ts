import type { Locale } from '@/i18n/locales'
import { localizedPath } from '@/i18n/pathnames'
import { SITE_URL } from '@/lib/site'
import { fill } from '@/lib/template'

export const STUDIO_EMAIL = 'fabianphilartist@gmail.com'

export const STUDIO_MAILTO = `mailto:${STUDIO_EMAIL}`

// E.164 shape: a leading + and 8–15 digits. Spaces and light punctuation are allowed in the field.
const INTERNATIONAL_PHONE = /^\+[1-9]\d{7,14}$/
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function isInternationalPhone(value: string): boolean {
  const compact = value.trim().replace(/[\s().-]/g, '')
  return INTERNATIONAL_PHONE.test(compact)
}

export function isPlausibleEmail(value: string): boolean {
  const email = value.trim()
  return email.length <= 254 && EMAIL.test(email)
}

export function artworkCanonicalUrl(locale: Locale, artworkId: number): string {
  return new URL(localizedPath(locale, 'artwork', { id: artworkId }), SITE_URL).toString()
}

export type EnquiryMessageLines = {
  artwork: string
  general: string
  // General price page. Omitted on artwork pages.
  pricing?: string
  // "{subject}" is the visitor's artwork name or question.
  subject?: string
  name: string
  phone: string
  email: string
  // "{location}" is the country label the collector selected.
  location: string
}

function oneLine(value: string): string {
  return value.replace(/[\u0000\r\n\t]+/g, ' ').replace(/ {2,}/g, ' ').trim()
}

// An artwork page includes its title and canonical URL only when both are known.
// A general price enquiry never invents a title or URL. Prices are never accepted here.
export function buildEnquiryMessage(input: {
  lines: EnquiryMessageLines
  artworkTitle?: string
  artworkUrl?: string
  subject?: string
  name: string
  phone: string
  email: string
  location?: string
  message?: string
}): string {
  const intro: string[] = []
  const subject = input.subject ? oneLine(input.subject) : ''

  if (input.artworkTitle && input.artworkUrl) {
    intro.push(
      fill(input.lines.artwork, {
        title: oneLine(input.artworkTitle),
        url: input.artworkUrl,
      })
    )
  } else if (input.lines.pricing) {
    intro.push(input.lines.pricing)
    if (subject && input.lines.subject) intro.push(fill(input.lines.subject, { subject }))
  } else {
    intro.push(input.lines.general)
  }

  const contact = [
    fill(input.lines.name, { name: oneLine(input.name) }),
    fill(input.lines.phone, { phone: oneLine(input.phone) }),
    fill(input.lines.email, { email: oneLine(input.email) }),
  ]
  const location = input.location ? oneLine(input.location) : ''
  if (location) contact.push(fill(input.lines.location, { location }))

  const note = input.message?.replace(/\u0000/g, '').replace(/\r\n/g, '\n').trim()
  const body = `${intro.join('\n')}\n\n${contact.join('\n')}`
  return note ? `${body}\n${note}` : body
}

export function enquiryMailto(address: string, subject: string, body: string): string {
  const params = [
    subject ? `subject=${encodeURIComponent(oneLine(subject))}` : '',
    body ? `body=${encodeURIComponent(body)}` : '',
  ].filter(Boolean)
  return params.length ? `mailto:${address}?${params.join('&')}` : `mailto:${address}`
}
