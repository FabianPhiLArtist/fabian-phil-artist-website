import type { EnquiryMessageLines } from '@/lib/artworkEnquiry'
import type { Locale } from '@/i18n/locales'

// One language per page. The apostrophe in "I’m" / "m’indiquer" is U+2019.
export const enquiryMessageLines: Record<Locale, EnquiryMessageLines> = {
  en: {
    artwork:
      'Hello Fabian, I\u2019m interested in "{title}".\nCould you please share the price and availability?\n{url}',
    general: 'Hello Fabian, I\u2019m interested in pricing.\nCould you please share the price and availability?',
    pricing: 'Hello Fabian, I\u2019m interested in pricing.\nCould you please share the price and availability?',
    subject: 'Artwork or question: {subject}',
    name: 'Name: {name}',
    phone: 'WhatsApp: {phone}',
    email: 'Email: {email}',
    location: 'Location: {location}',
  },
  fr: {
    artwork:
      'Bonjour Fabian, je suis int\u00e9ress\u00e9 par \u00ab {title} \u00bb.\nPourriez-vous m\u2019indiquer le prix et la disponibilit\u00e9 ?\n{url}',
    general:
      'Bonjour Fabian, je suis int\u00e9ress\u00e9 par vos tarifs.\nPourriez-vous m\u2019indiquer le prix et la disponibilit\u00e9 ?',
    pricing:
      'Bonjour Fabian, je suis int\u00e9ress\u00e9 par vos tarifs.\nPourriez-vous m\u2019indiquer le prix et la disponibilit\u00e9 ?',
    subject: '\u0152uvre ou question : {subject}',
    name: 'Nom : {name}',
    phone: 'WhatsApp : {phone}',
    email: 'E-mail : {email}',
    location: 'Localisation : {location}',
  },
}
