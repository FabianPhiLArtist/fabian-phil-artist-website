import { artworks } from '@/data/artworks'
import type { Locale } from '@/i18n/locales'
import { artworkCanonicalUrl, buildEnquiryMessage, isInternationalPhone, STUDIO_EMAIL } from '@/lib/artworkEnquiry'
import { collectorLocationOptions } from '@/lib/collectorLocations'
import { EnquiryValidationError, escapeHtml, readEnquiryEmail, readEnquiryText } from '@/lib/enquiryEmail'
import { enquiryMessageLines } from '@/lib/enquiryWording'
import { STUDIO_WHATSAPP_DISPLAY } from '@/lib/whatsapp'

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export type CollectorLetter = {
  replyTo: string
  subject: string
  text: string
  html: string
}

export type CollectorDelivery = {
  studio: CollectorLetter
  acknowledgement: CollectorLetter & { to: string }
}

function oneLine(value: string): string {
  return value.replace(/[\r\n\t]+/g, ' ').replace(/ {2,}/g, ' ').trim()
}

export function formatEnquiryTimestamp(date: Date): string {
  const hh = String(date.getUTCHours()).padStart(2, '0')
  const mm = String(date.getUTCMinutes()).padStart(2, '0')
  return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}, ${hh}:${mm} UTC`
}

function htmlFor(text: string): string {
  return `<!doctype html><html><body style="margin:0;padding:24px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;background:#ffffff"><div style="max-width:640px;margin:0 auto;white-space:pre-wrap;color:#111827">${escapeHtml(text)}</div></body></html>`
}

function artworkId(data: Record<string, unknown>): number {
  const raw = data.artworkId
  const id = typeof raw === 'number' ? raw : typeof raw === 'string' && /^\d{1,6}$/.test(raw) ? Number(raw) : NaN
  if (!Number.isInteger(id)) throw new EnquiryValidationError('artworkId', 'The selected artwork could not be found.')
  return id
}

export function composeCollectorEnquiry(data: Record<string, unknown>, now: Date): CollectorDelivery {
  if (data.locale !== 'en' && data.locale !== 'fr') {
    throw new EnquiryValidationError('locale', 'The page language is invalid.')
  }
  const locale: Locale = data.locale
  if (data.purpose !== 'artwork' && data.purpose !== 'pricing') {
    throw new EnquiryValidationError('purpose', 'The enquiry could not be read.')
  }
  const purpose = data.purpose

  const name = readEnquiryText(data, 'name', 'Full name', { required: true, max: 150 })
  const email = readEnquiryEmail(data)
  const phone = readEnquiryText(data, 'phone', 'WhatsApp number', { required: true, max: 40 })
  if (!isInternationalPhone(phone)) {
    throw new EnquiryValidationError('phone', 'Enter a WhatsApp number with its country code, starting with +.')
  }
  const location = readEnquiryText(data, 'location', 'Location', { required: true, max: 80 })
  if (!collectorLocationOptions[locale].includes(location)) {
    throw new EnquiryValidationError('location', 'Please select your location.')
  }

  const note =
    purpose === 'artwork' ? readEnquiryText(data, 'message', 'Message', { max: 1000, multiline: true }) : ''
  const subjectLine =
    purpose === 'pricing' ? readEnquiryText(data, 'subject', 'Artwork or question', { max: 200 }) : ''

  let artworkTitle = ''
  let artworkUrl = ''
  if (purpose === 'artwork') {
    const id = artworkId(data)
    const artwork = artworks.find((item) => item.id === id)
    if (!artwork) throw new EnquiryValidationError('artworkId', 'The selected artwork could not be found.')
    artworkTitle = artwork.title
    artworkUrl = artworkCanonicalUrl(locale, artwork.id)
  } else if (data.artworkId !== undefined && data.artworkId !== null && data.artworkId !== '') {
    throw new EnquiryValidationError('artworkId', 'A pricing enquiry cannot include an artwork page.')
  }

  const enquiryText = buildEnquiryMessage({
    lines: enquiryMessageLines[locale],
    ...(artworkTitle && artworkUrl ? { artworkTitle, artworkUrl } : {}),
    ...(purpose === 'pricing' ? { subject: subjectLine } : {}),
    name,
    phone,
    email,
    location,
    ...(note ? { message: note } : {}),
  })

  const submitted = formatEnquiryTimestamp(now)
  const language = locale === 'fr' ? 'French' : 'English'
  const studioRows = [
    `Submitted: ${submitted}`,
    `Page language: ${language}`,
    `Enquiry: ${purpose === 'artwork' ? 'Artwork' : 'Pricing'}`,
    ...(artworkTitle ? [`Artwork: ${artworkTitle}`, `Artwork page: ${artworkUrl}`] : []),
    ...(subjectLine ? [`Artwork or question: ${subjectLine}`] : []),
    `Name: ${name}`,
    `Email: ${email}`,
    `WhatsApp number: ${phone}`,
    `Country: ${location}`,
  ]
  const studioText = [
    'Website-submitted enquiry',
    '',
    'This enquiry was submitted on fabianphil.com. This website did not send a WhatsApp message.',
    '',
    ...studioRows,
    ...(note ? ['', 'Personal message:', note] : []),
  ].join('\n')

  const studioSubject = oneLine(
    purpose === 'artwork'
      ? `[Website] Enquiry: ${artworkTitle} from ${name}`
      : `[Website] Pricing enquiry from ${name}`
  )

  const acknowledgement = acknowledgementLetter({
    locale,
    name,
    artworkTitle,
    enquiryText,
  })
  acknowledgement.to = email

  return {
    studio: {
      replyTo: email,
      subject: studioSubject,
      text: studioText,
      html: htmlFor(studioText),
    },
    acknowledgement,
  }
}

function acknowledgementLetter(input: {
  locale: Locale
  name: string
  artworkTitle: string
  enquiryText: string
}): CollectorLetter & { to: string } {
  const contact =
    input.locale === 'fr'
      ? `WhatsApp de l\u2019atelier : ${STUDIO_WHATSAPP_DISPLAY}\nE-mail de l\u2019atelier : ${STUDIO_EMAIL}`
      : `Studio WhatsApp: ${STUDIO_WHATSAPP_DISPLAY}\nStudio email: ${STUDIO_EMAIL}`

  const intro =
    input.locale === 'fr'
      ? input.artworkTitle
        ? `Bonjour ${input.name},\n\nMerci pour votre demande concernant \u00ab ${input.artworkTitle} \u00bb. L\u2019atelier l\u2019a re\u00e7ue par e-mail depuis fabianphil.com. WhatsApp ne re\u00e7oit votre message que si vous appuyez sur Envoyer dans WhatsApp.\n\n${contact}\n\nCopie de votre demande :\n\n${input.enquiryText}`
        : `Bonjour ${input.name},\n\nMerci pour votre demande de tarif. L\u2019atelier l\u2019a re\u00e7ue par e-mail depuis fabianphil.com. WhatsApp ne re\u00e7oit votre message que si vous appuyez sur Envoyer dans WhatsApp.\n\n${contact}\n\nCopie de votre demande :\n\n${input.enquiryText}`
      : input.artworkTitle
        ? `Hello ${input.name},\n\nThank you for your enquiry about "${input.artworkTitle}". The studio has received it by email from fabianphil.com. WhatsApp receives your message only if you press Send in WhatsApp.\n\n${contact}\n\nA copy of your enquiry:\n\n${input.enquiryText}`
        : `Hello ${input.name},\n\nThank you for your pricing enquiry. The studio has received it by email from fabianphil.com. WhatsApp receives your message only if you press Send in WhatsApp.\n\n${contact}\n\nA copy of your enquiry:\n\n${input.enquiryText}`

  return {
    to: '',
    replyTo: STUDIO_EMAIL,
    subject: input.locale === 'fr' ? 'Votre demande \u00e0 Fabian PhiL' : 'Your enquiry to Fabian PhiL',
    text: intro,
    html: htmlFor(intro),
  }
}
