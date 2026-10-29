import { artworks } from '@/data/artworks'
import { artworkCanonicalUrl, buildEnquiryMessage, enquiryMailto, STUDIO_EMAIL, type EnquiryMessageLines } from '@/lib/artworkEnquiry'
import { collectorLocationLabel, collectorLocationOptions } from '@/lib/collectorLocations'
import { composeEnquiry, renderEnquiryText } from '@/lib/enquiryEmail'
import { whatsappHref } from '@/lib/whatsapp'

const collector = {
  name: 'Camille Martin',
  phone: '+33 6 11 22 33 44',
  email: 'camille.martin@example.com',
  message: 'I would like to know if this work is available.',
}

const title = 'Wanted for Racing Life'
const artwork = artworks.find((item) => item.title === title)
if (!artwork) throw new Error('Sample artwork missing')

const lines: Record<'en' | 'fr', EnquiryMessageLines> = {
  en: {
    artwork: 'Hello Fabian, I would like to enquire about "{title}" ({url}).',
    general: 'Hello Fabian, I would like to enquire about an artwork.',
    name: 'My name is {name}.',
    phone: 'WhatsApp: {phone}',
    email: 'Email: {email}',
    location: 'Location: {location}',
  },
  fr: {
    artwork: 'Bonjour Fabian, je souhaiterais me renseigner auprès de vous sur l’œuvre «\u00a0{title}\u00a0» ({url}).',
    general: 'Bonjour Fabian, je souhaiterais me renseigner auprès de vous sur une œuvre.',
    name: 'Je m’appelle {name}.',
    phone: 'WhatsApp : {phone}',
    email: 'E-mail : {email}',
    location: 'Localisation : {location}',
  },
}

const cases = [
  { locale: 'en' as const, location: 'France' },
  { locale: 'en' as const, location: 'UAE' },
  { locale: 'en' as const, location: 'United Kingdom' },
  { locale: 'en' as const, location: 'Germany' },
  { locale: 'en' as const, location: 'United States' },
  { locale: 'fr' as const, location: 'France' },
  { locale: 'fr' as const, location: 'Émirats arabes unis' },
  { locale: 'fr' as const, location: 'Royaume-Uni' },
  { locale: 'fr' as const, location: 'Allemagne' },
  { locale: 'fr' as const, location: 'États-Unis' },
]

const failures: string[] = []

function check(condition: boolean, message: string) {
  if (!condition) failures.push(message)
}

function decodedMailtoBody(href: string): string {
  const query = href.split('?')[1] ?? ''
  const body = new URLSearchParams(query).get('body') ?? ''
  return body
}

for (const option of ['Dubai, UAE', 'Dubai, UAE.', 'Dubaï, Émirats arabes unis', 'Dubaï, Émirats arabes unis.']) {
  check(!collectorLocationOptions.en.includes(option), `English options include studio location ${option}`)
  check(!collectorLocationOptions.fr.includes(option), `French options include studio location ${option}`)
  check(collectorLocationLabel('en', option) === '', `Studio string ${option} was accepted as a collector location`)
}

check(collectorLocationLabel('en', 'France') === 'France', 'France label was rewritten')
check(collectorLocationLabel('en', 'UAE') === 'UAE', 'UAE label was rewritten')
check(collectorLocationLabel('fr', 'Émirats arabes unis') === 'Émirats arabes unis', 'French UAE label was rewritten')
check(collectorLocationLabel('en', '') === '', 'Empty location became a value')

const samples: string[] = []

for (const item of cases) {
  const url = artworkCanonicalUrl(item.locale, artwork.id)
  const location = collectorLocationLabel(item.locale, item.location)
  const note =
    item.locale === 'fr'
      ? 'Je souhaiterais savoir si cette œuvre est disponible.'
      : collector.message
  const text = buildEnquiryMessage({
    lines: lines[item.locale],
    artworkTitle: title,
    artworkUrl: url,
    name: collector.name,
    phone: collector.phone,
    email: collector.email,
    location,
    message: note,
  })
  const href = whatsappHref(text)
  const mailto = enquiryMailto(STUDIO_EMAIL, 'Artwork enquiry', text)
  const mailBody = decodedMailtoBody(mailto)
  const whatsappBody = new URL(href).searchParams.get('text') ?? ''

  check(location === item.location, `${item.locale} ${item.location} was not kept as the option label`)
  check(text.includes(item.location), `${item.locale} message missing ${item.location}`)
  check(whatsappBody.includes(item.location), `${item.locale} WhatsApp href missing ${item.location}`)
  check(mailBody.includes(item.location), `${item.locale} mailto body missing ${item.location}`)
  check(text.includes(title), `${item.locale} message missing artwork title`)
  check(text.includes(url), `${item.locale} message missing canonical URL`)
  check(whatsappBody.includes(url), `${item.locale} WhatsApp href missing canonical URL`)
  check(text.includes(collector.name), `${item.locale} name was replaced`)
  check(text.includes(collector.phone), `${item.locale} phone was replaced`)
  check(text.includes(collector.email), `${item.locale} email was replaced`)
  check(text.includes(note), `${item.locale} message was replaced`)
  check(!text.includes(artwork.price), `${item.locale} message included a price`)
  check(!text.includes('971567594229') && !text.includes('+971 56 759 4229'), `${item.locale} message used the studio number`)
  check(!text.includes('Lowaina') && !text.includes('Umm Suqeim'), `${item.locale} message used the studio address`)

  const dubaiAsDefault = item.location !== 'UAE' && item.location !== 'Émirats arabes unis'
  if (dubaiAsDefault) {
    check(!text.includes('Dubai'), `${item.locale} ${item.location} message contains Dubai`)
    check(!mailBody.includes('Dubai'), `${item.locale} ${item.location} email contains Dubai`)
  } else {
    check(!text.includes('Dubai, UAE'), `${item.locale} UAE selection was rewritten to Dubai, UAE`)
    check(!text.includes('Dubaï'), `${item.locale} UAE selection was rewritten to Dubaï`)
  }

  if (item.locale === 'en') {
    check(!text.includes('Bonjour') && !text.includes('Localisation'), 'English message contains French')
    check(url.includes('/en/artwork/steve-mcqueen-mugshot-pop-art'), 'English canonical URL is wrong')
  } else {
    check(!text.includes('Hello Fabian') && !text.includes('Location:'), 'French message contains English')
    check(url.includes('/fr/oeuvre/steve-mcqueen-mugshot-pop-art'), 'French canonical URL is wrong')
  }

  if (item.location === 'France' || item.location === 'UAE' || item.location === 'Émirats arabes unis') {
    samples.push(`--- ${item.locale} ${item.location} ---\n${text}`)
  }
}

const omitted = buildEnquiryMessage({
  lines: lines.en,
  artworkTitle: title,
  artworkUrl: artworkCanonicalUrl('en', artwork.id),
  name: collector.name,
  phone: collector.phone,
  email: collector.email,
  message: collector.message,
})
check(!omitted.includes('Dubai') && !omitted.includes('Location:'), 'Missing location was filled with a default')

function emailText(payload: Record<string, unknown>): string {
  return renderEnquiryText(composeEnquiry(payload))
}

for (const location of ['France', 'UAE', 'United Kingdom', 'Germany', 'United States']) {
  const contact = emailText({
    type: 'contact',
    firstName: 'Camille',
    lastName: 'Martin',
    email: collector.email,
    phone: collector.phone,
    location,
    subject: 'inquiry',
    message: collector.message,
  })
  check(contact.includes(`Location: ${location}`), `Contact email missing Location: ${location}`)
  check(contact.includes('Name: Camille Martin'), `Contact email name changed for ${location}`)
  check(contact.includes(`Email: ${collector.email}`), `Contact email address changed for ${location}`)
  check(contact.includes(`Phone: ${collector.phone}`), `Contact email phone changed for ${location}`)
  check(contact.includes('Subject: Artwork Inquiry'), `Contact email subject changed for ${location}`)
  check(contact.includes(collector.message), `Contact email message changed for ${location}`)
  check(!contact.includes(artwork.price), `Contact email included a price for ${location}`)
  if (location !== 'UAE') check(!contact.includes('Dubai'), `Contact email used Dubai for ${location}`)
  if (location === 'UAE') check(!contact.includes('Dubai, UAE'), 'Contact email rewrote UAE to Dubai, UAE')

  const artworkEmail = emailText({
    type: 'artwork',
    name: collector.name,
    email: collector.email,
    phone: collector.phone,
    location,
    artworkId: artwork.id,
    timeline: 'flexible',
    message: collector.message,
  })
  check(artworkEmail.includes(`Location: ${location}`), `Artwork email missing Location: ${location}`)
  check(artworkEmail.includes(`Artwork: ${title}`), `Artwork email title changed for ${location}`)
  check(artworkEmail.includes(`Name: ${collector.name}`), `Artwork email name changed for ${location}`)
  check(artworkEmail.includes(`Phone: ${collector.phone}`), `Artwork email phone changed for ${location}`)
  check(artworkEmail.includes(`Email: ${collector.email}`), `Artwork email address changed for ${location}`)
  check(artworkEmail.includes('Timeline: Flexible'), `Artwork email timeline changed for ${location}`)
  check(artworkEmail.includes(collector.message), `Artwork email message changed for ${location}`)
  check(artworkEmail.includes('/en/artwork/steve-mcqueen-mugshot-pop-art'), `Artwork email URL missing for ${location}`)
  check(!artworkEmail.includes(artwork.price), `Artwork email included a price for ${location}`)
  if (location !== 'UAE') check(!artworkEmail.includes('Dubai'), `Artwork email used Dubai for ${location}`)
  if (location === 'UAE') check(!artworkEmail.includes('Dubai, UAE'), 'Artwork email rewrote UAE to Dubai, UAE')
}

const frenchContact = emailText({
  type: 'contact',
  firstName: 'Camille',
  lastName: 'Martin',
  email: collector.email,
  phone: collector.phone,
  location: 'Émirats arabes unis',
  subject: 'inquiry',
  message: 'Je souhaiterais savoir si cette œuvre est disponible.',
})
check(frenchContact.includes('Location: Émirats arabes unis'), 'French contact label was rewritten')
check(!frenchContact.includes('Dubai') && !frenchContact.includes('Dubaï'), 'French UAE contact email used Dubai')
check(frenchContact.includes('Je souhaiterais savoir si cette œuvre est disponible.'), 'French contact message was replaced')

const blankLocation = emailText({
  type: 'contact',
  firstName: 'Camille',
  lastName: 'Martin',
  email: collector.email,
  phone: collector.phone,
  location: '',
  subject: 'commission',
  message: collector.message,
})
check(!blankLocation.includes('Location:'), 'Blank contact location was still printed')
check(!blankLocation.includes('Dubai'), 'Blank contact location became Dubai')
check(blankLocation.includes('Subject: Commission Request'), 'Selected contact subject was replaced')

const noTimeline = emailText({
  type: 'artwork',
  name: collector.name,
  email: collector.email,
  phone: collector.phone,
  location: 'France',
  artworkId: artwork.id,
  message: collector.message,
})
check(!noTimeline.includes('Timeline:'), 'Omitted timeline was replaced with a default')
check(noTimeline.includes('Location: France'), 'Artwork email lost France when timeline was omitted')

if (failures.length > 0) {
  console.error(failures.join('\n'))
  process.exit(1)
}

console.log(samples.join('\n\n'))
console.log(`\n${cases.length} location cases passed. No email or WhatsApp message was sent.`)
