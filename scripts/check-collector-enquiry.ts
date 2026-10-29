import { readFileSync, statSync } from 'fs'
import path from 'path'
import { artworks } from '@/data/artworks'
import { handleEnquiry, type EnquiryMail } from '@/lib/handleEnquiry'
import { artworkCanonicalUrl, buildEnquiryMessage } from '@/lib/artworkEnquiry'
import { artworkOpenGraphImage } from '@/lib/artworkShareImage'
import { collectorSubmitPlan, executeCollectorSubmit } from '@/lib/collectorSubmit'
import { resetEnquiryGuards, allowEnquiry } from '@/lib/enquiryGuard'
import { enquiryMessageLines } from '@/lib/enquiryWording'
import { STUDIO_EMAIL } from '@/lib/artworkEnquiry'

const failures: string[] = []
function check(condition: boolean, message: string) {
  if (!condition) failures.push(message)
}

const collector = {
  name: 'Camille Laurent',
  phone: '+33 6 00 00 00 01',
  email: 'camille.laurent@example.com',
}
const now = () => new Date('2026-10-29T07:20:00Z')
const from = 'enquiries@example.com'
const studioInbox = 'studio-inbox@example.com'

function message(locale: 'en' | 'fr', input: { title?: string; url?: string; location: string; subject?: string; note?: string }) {
  return buildEnquiryMessage({
    lines: enquiryMessageLines[locale],
    ...(input.title && input.url ? { artworkTitle: input.title, artworkUrl: input.url } : {}),
    ...(input.subject !== undefined ? { subject: input.subject } : {}),
    name: collector.name,
    phone: collector.phone,
    email: collector.email,
    location: input.location,
    ...(input.note ? { message: input.note } : {}),
  })
}

const samurai = artworks.find((item) => item.id === 8)
const steve = artworks.find((item) => item.id === 1)
const brad = artworks.find((item) => item.id === 2)
if (!samurai || !steve || !brad) throw new Error('Sample artworks missing')
const lastSamurai = samurai
const steveMcqueen = steve
const bradPitt = brad

const enSamurai = message('en', {
  title: lastSamurai.title,
  url: artworkCanonicalUrl('en', lastSamurai.id),
  location: 'France',
})
const frSamurai = message('fr', {
  title: lastSamurai.title,
  url: artworkCanonicalUrl('fr', lastSamurai.id),
  location: 'France',
})
const enGeneral = message('en', { location: 'France', subject: '' })
const frGeneral = message('fr', { location: 'France', subject: '' })
const enUae = message('en', { title: lastSamurai.title, url: artworkCanonicalUrl('en', lastSamurai.id), location: 'UAE' })
const frUae = message('fr', {
  title: lastSamurai.title,
  url: artworkCanonicalUrl('fr', lastSamurai.id),
  location: 'Émirats arabes unis',
})
const enSteve = message('en', {
  title: steveMcqueen.title,
  url: artworkCanonicalUrl('en', steveMcqueen.id),
  location: 'France',
})
const frSteve = message('fr', {
  title: steveMcqueen.title,
  url: artworkCanonicalUrl('fr', steveMcqueen.id),
  location: 'France',
})

check(
  enSamurai ===
    [
      'Hello Fabian, I\u2019m interested in "I am the Last Samurai".',
      'Could you please share the price and availability?',
      'https://fabianphil.com/en/artwork/i-am-the-last-samurai-kinetic-art',
      '',
      'Name: Camille Laurent',
      'WhatsApp: +33 6 00 00 00 01',
      'Email: camille.laurent@example.com',
      'Location: France',
    ].join('\n'),
  'English Last Samurai message does not match'
)
check(
  frSamurai ===
    [
      'Bonjour Fabian, je suis int\u00e9ress\u00e9 par \u00ab I am the Last Samurai \u00bb.',
      'Pourriez-vous m\u2019indiquer le prix et la disponibilit\u00e9 ?',
      'https://fabianphil.com/fr/oeuvre/i-am-the-last-samurai-kinetic-art',
      '',
      'Nom : Camille Laurent',
      'WhatsApp : +33 6 00 00 00 01',
      'E-mail : camille.laurent@example.com',
      'Localisation : France',
    ].join('\n'),
  'French Last Samurai message does not match'
)
check(enSamurai.includes('Location: France') && !enSamurai.includes('Dubai'), 'France was not kept in English')
check(enUae.includes('Location: UAE') && !enUae.includes('Dubai'), 'UAE was rewritten')
check(frUae.includes('Localisation : \u00c9mirats arabes unis') && !frUae.includes('Duba'), 'French UAE was rewritten')
check(!enGeneral.includes('http') && !enGeneral.includes('I am the Last Samurai'), 'Blank pricing invented an artwork')
check(!frGeneral.includes('http') && !frGeneral.includes('I am the Last Samurai'), 'French blank pricing invented an artwork')
check(message('en', { location: 'France', subject: 'Blue Lady' }).includes('Artwork or question: Blue Lady'), 'Subject line missing')
check(!message('en', { location: 'France', subject: '   ' }).includes('Artwork or question'), 'Blank subject was printed')
const noted = message('en', { title: steveMcqueen.title, url: artworkCanonicalUrl('en', steveMcqueen.id), location: 'France', note: 'Please hold it.' })
check(noted.endsWith('Location: France\nPlease hold it.'), 'Optional note was not appended')
check(!noted.includes('\u20ac'), 'Note message included a euro price')

function post(body: Record<string, unknown>, ip: string, send: (mail: EnquiryMail) => Promise<void>) {
  return handleEnquiry(
    new Request('http://localhost/api/enquiry', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
      body: JSON.stringify({ elapsedMs: 4000, website: '', ...body }),
    }),
    { now, from, to: studioInbox, send }
  )
}

const base = {
  type: 'collector',
  name: collector.name,
  email: collector.email,
  phone: collector.phone,
}

async function main() {
  resetEnquiryGuards()
  const sent: EnquiryMail[] = []
  const ok = await post(
    { ...base, locale: 'en', purpose: 'artwork', location: 'France', artworkId: lastSamurai.id, message: '', price: '\u20ac9,999' },
    '203.0.113.10',
    async (mail) => {
      sent.push(mail)
    }
  )
  check(ok.status === 200, 'Successful enquiry was rejected')
  check(sent.length === 2, `Expected studio and acknowledgement emails, got ${sent.length}`)
  const studio = sent[0]
  const ack = sent[1]
  if (studio && ack) {
    check(studio.to.join(',') === studioInbox, 'Studio mail went to the wrong inbox')
    check(studio.replyTo === collector.email, 'Studio reply-to is not the collector')
    check(studio.from === from, 'Studio mail was not sent from the site sender')
    check(ack.from === from && ack.from !== collector.email, 'Acknowledgement was sent from the collector')
    check(ack.to.join(',') === collector.email, 'Acknowledgement was not addressed to the collector')
    check(ack.replyTo === STUDIO_EMAIL, 'Acknowledgement reply-to is not the studio')
    check(studio.text.includes('Website-submitted enquiry'), 'Studio mail is not labelled as a website enquiry')
    check(studio.text.includes('This website did not send a WhatsApp message.'), 'Studio mail implies WhatsApp was sent')
    check(studio.text.includes('Submitted: 29 October 2026, 07:20 UTC'), 'Studio mail is missing the time')
    check(studio.text.includes('Artwork: I am the Last Samurai'), 'Studio mail is missing the title')
    check(studio.text.includes('https://fabianphil.com/en/artwork/i-am-the-last-samurai-kinetic-art'), 'Studio mail is missing the URL')
    check(studio.text.includes('Name: Camille Laurent'), 'Studio mail is missing the name')
    check(studio.text.includes(`Email: ${collector.email}`), 'Studio mail is missing the email')
    check(studio.text.includes(`WhatsApp number: ${collector.phone}`), 'Studio mail is missing the phone')
    check(studio.text.includes('Country: France'), 'Studio mail is missing France')
    check(!studio.text.includes('\u20ac') && !studio.text.includes('9,999'), 'Studio mail included a price')
    check(!studio.text.includes('verified'), 'Studio mail claimed the address was verified')
    check(ack.text.includes(enSamurai), 'Acknowledgement is missing the enquiry copy')
    check(ack.text.includes('+971 56 759 4229'), 'Acknowledgement is missing the studio number')
    check(ack.text.includes(STUDIO_EMAIL), 'Acknowledgement is missing the studio email')
    check(!ack.text.includes('verified'), 'Acknowledgement claimed the address was verified')
    check(!ack.html.includes('<script>') && ack.html.includes('Camille Laurent'), 'Acknowledgement HTML was not escaped')
    console.log('\n--- STUDIO EN ---\n' + studio.text)
    console.log('\n--- ACK EN ---\n' + ack.text)
  }

  const again = await post(
    { ...base, locale: 'en', purpose: 'artwork', location: 'France', artworkId: lastSamurai.id, message: '' },
    '203.0.113.10',
    async () => {
      failures.push('Duplicate submission sent another email')
    }
  )
  check(again.status === 200, 'Duplicate submission was not accepted without resending')
  check(sent.length === 2, 'Duplicate submission changed the sent count')

  resetEnquiryGuards()
  let opened = false
  const failed = await post(
    { ...base, locale: 'en', purpose: 'artwork', location: 'France', artworkId: lastSamurai.id, message: 'Keep this note' },
    '203.0.113.11',
    async () => {
      throw new Error('network')
    }
  )
  const failedBody = (await failed.json()) as { ok?: boolean }
  check(failed.status === 502 && failedBody.ok === false, 'Network failure claimed success')
  const client = await executeCollectorSubmit({
    plan: 'send',
    post: async () => ({ ok: false, error: 'send_failed' }),
    openWhatsApp: () => {
      opened = true
    },
  })
  check(client.status === 'error' && opened === false, 'A failed post opened WhatsApp')

  const ignored = collectorSubmitPlan({
    inFlight: true,
    honeypot: '',
    valid: true,
    succeededFingerprint: null,
    fingerprint: 'a',
  })
  check(ignored === 'ignore', 'A second click while sending was not ignored')
  let reopened = false
  let reposted = false
  const reopen = await executeCollectorSubmit({
    plan: collectorSubmitPlan({
      inFlight: false,
      honeypot: '',
      valid: true,
      succeededFingerprint: 'same',
      fingerprint: 'same',
    }),
    post: async () => {
      reposted = true
      return { ok: true }
    },
    openWhatsApp: () => {
      reopened = true
    },
  })
  check(reopen.status === 'sent' && reopened && !reposted, 'Repeating the same enquiry sent another email')

  resetEnquiryGuards()
  const frSent: EnquiryMail[] = []
  const frOk = await post(
    { ...base, locale: 'fr', purpose: 'artwork', location: 'France', artworkId: lastSamurai.id, message: '' },
    '203.0.113.12',
    async (mail) => {
      frSent.push(mail)
    }
  )
  check(frOk.status === 200 && frSent.length === 2, 'French enquiry did not send both emails')
  if (frSent[0] && frSent[1]) {
    check(frSent[0].text.includes('Country: France'), 'French studio mail lost France')
    check(frSent[0].text.includes('https://fabianphil.com/fr/oeuvre/i-am-the-last-samurai-kinetic-art'), 'French canonical URL missing')
    check(!frSent[0].text.includes('Dubai') && !frSent[0].text.includes('Duba\u00ef'), 'French France mail mentioned Dubai')
    check(frSent[1].text.includes(frSamurai), 'French acknowledgement is missing the enquiry')
    check(frSent[1].text.startsWith('Bonjour Camille Laurent,'), 'French acknowledgement is not in French')
    console.log('\n--- STUDIO FR ---\n' + frSent[0].text)
    console.log('\n--- ACK FR ---\n' + frSent[1].text)
  }

  resetEnquiryGuards()
  const uaeSent: EnquiryMail[] = []
  await post(
    { ...base, locale: 'en', purpose: 'artwork', location: 'UAE', artworkId: lastSamurai.id, message: '' },
    '203.0.113.13',
    async (mail) => {
      uaeSent.push(mail)
    }
  )
  check(uaeSent[0]?.text.includes('Country: UAE') && !uaeSent[0].text.includes('Dubai'), 'UAE studio location was rewritten')
  const frUaeSent: EnquiryMail[] = []
  await post(
    { ...base, locale: 'fr', purpose: 'artwork', location: '\u00c9mirats arabes unis', artworkId: lastSamurai.id, message: '' },
    '203.0.113.14',
    async (mail) => {
      frUaeSent.push(mail)
    }
  )
  check(
    frUaeSent[0]?.text.includes('Country: \u00c9mirats arabes unis') && !frUaeSent[0].text.includes('Dubai') && !frUaeSent[0].text.includes('Duba\u00ef'),
    'French UAE studio location was rewritten'
  )

  resetEnquiryGuards()
  const priceSent: EnquiryMail[] = []
  await post(
    { ...base, locale: 'en', purpose: 'pricing', location: 'France', subject: '', message: 'ignore me' },
    '203.0.113.15',
    async (mail) => {
      priceSent.push(mail)
    }
  )
  check(priceSent[0]?.text.includes('Enquiry: Pricing'), 'Pricing enquiry was labelled as an artwork')
  check(!priceSent[0]?.text.includes('Artwork:') && !priceSent[0]?.text.includes('http'), 'Blank pricing invented a title or URL')
  check(!priceSent[0]?.text.includes('ignore me'), 'Pricing form kept a hidden note')
  check(priceSent[1]?.text.includes(enGeneral), 'Pricing acknowledgement does not match the general message')

  resetEnquiryGuards()
  const bradSent: EnquiryMail[] = []
  await post(
    { ...base, locale: 'en', purpose: 'artwork', location: 'France', artworkId: bradPitt.id, message: '', price: '\u20ac1,000' },
    '203.0.113.16',
    async (mail) => {
      bradSent.push(mail)
    }
  )
  check(bradPitt.available === false, 'Brad Pitt fixture is not the sold work')
  check(!bradSent[0]?.text.includes('\u20ac') && !bradSent[1]?.text.includes('\u20ac'), 'Sold artwork email included a euro price')
  check(bradSent[0]?.text.includes('Wanted for Fight Club'), 'Sold artwork title missing')

  resetEnquiryGuards()
  const escaped: EnquiryMail[] = []
  await post(
    {
      ...base,
      name: 'Camille <script>alert(1)</script>',
      locale: 'en',
      purpose: 'pricing',
      location: 'France',
      subject: '',
    },
    '203.0.113.17',
    async (mail) => {
      escaped.push(mail)
    }
  )
  check(Boolean(escaped[0]?.html.includes('&lt;script&gt;')) && !escaped[0]?.html.includes('<script>'), 'Email HTML was not escaped')

  resetEnquiryGuards()
  let rejected = 0
  const dubai = await post(
    { ...base, locale: 'en', purpose: 'pricing', location: 'Dubai', subject: '' },
    '203.0.113.18',
    async () => {
      rejected += 1
    }
  )
  check(dubai.status === 422 && rejected === 0, 'Dubai was accepted as a collector location')

  resetEnquiryGuards()
  const contactSent: EnquiryMail[] = []
  const contact = await post(
    {
      type: 'contact',
      firstName: 'Camille',
      lastName: 'Laurent',
      email: collector.email,
      phone: collector.phone,
      location: 'France',
      subject: 'inquiry',
      message: 'Hello from the contact form.',
    },
    '203.0.113.19',
    async (mail) => {
      contactSent.push(mail)
    }
  )
  check(contact.status === 200 && contactSent.length === 1, 'Contact form did not stay a single studio email')
  check(contactSent[0]?.text.includes('General contact enquiry'), 'Contact email template changed')
  check(contactSent[0]?.text.includes('Location: France'), 'Contact location changed')

  resetEnquiryGuards()
  let floodSends = 0
  for (let i = 0; i < 3; i += 1) {
    const response = await post(
      { ...base, locale: 'en', purpose: 'artwork', location: 'France', artworkId: lastSamurai.id, message: `Flood note ${i}` },
      '203.0.113.80',
      async () => {
        floodSends += 1
      }
    )
    check(response.status === 200, `Collector acknowledgement ${i + 1} was rejected`)
  }
  check(floodSends === 6, `Expected 3 studio mails and 3 acknowledgements before the cap, got ${floodSends}`)
  const flooded = await post(
    { ...base, locale: 'en', purpose: 'artwork', location: 'France', artworkId: lastSamurai.id, message: 'Flood note 4' },
    '203.0.113.80',
    async () => {
      floodSends += 1
    }
  )
  const floodedBody = (await flooded.json()) as { error?: string }
  check(flooded.status === 429 && floodedBody.error === 'rate_limited', 'Collector flood was not rejected')
  check(floodSends === 6, 'Collector flood sent another studio or acknowledgement email')

  resetEnquiryGuards()
  let honeySends = 0
  const honey = await post(
    {
      ...base,
      website: 'https://spam.example',
      locale: 'en',
      purpose: 'artwork',
      location: 'France',
      artworkId: lastSamurai.id,
      message: 'bot',
    },
    '203.0.113.81',
    async () => {
      honeySends += 1
    }
  )
  check(honey.status === 400 && honeySends === 0, 'A honeypot submission sent email')

  let badSends = 0
  const bad = await post(
    {
      ...base,
      email: 'not-an-email',
      locale: 'en',
      purpose: 'artwork',
      location: 'France',
      artworkId: lastSamurai.id,
      message: '',
    },
    '203.0.113.82',
    async () => {
      badSends += 1
    }
  )
  check(bad.status === 422 && badSends === 0, 'An invalid address sent email')

  resetEnquiryGuards()
  let studioSends = 0
  for (let i = 0; i < 4; i += 1) {
    const response = await post(
      {
        type: 'contact',
        firstName: 'Camille',
        lastName: String(i),
        email: collector.email,
        phone: collector.phone,
        location: 'France',
        subject: 'inquiry',
        message: `Hello from the contact form ${i}.`,
      },
      '203.0.113.83',
      async () => {
        studioSends += 1
      }
    )
    check(response.status === 200, `Studio contact ${i + 1} was rejected by the collector cap`)
  }
  check(studioSends === 4, 'The collector cap blocked studio-only contact mail')

  resetEnquiryGuards()
  for (let i = 0; i < 8; i += 1) check(allowEnquiry('203.0.113.50', 1_000), `Rate limit blocked request ${i + 1}`)
  check(!allowEnquiry('203.0.113.50', 1_000), 'Per-IP limit did not trip')

  for (const source of [lastSamurai.image, steveMcqueen.image, bradPitt.image]) {
    const image = artworkOpenGraphImage(source)
    check(image.url.startsWith('https://fabianphil.com/'), `${source} og:image is not absolute`)
    check(!image.url.includes('/_next/image') && !image.url.includes('icon.png'), `${source} og:image is the logo or optimizer`)
    check(image.type === 'image/jpeg' && !!image.width && !!image.height, `${source} is missing image dimensions`)
    const relative = image.url.replace('https://fabianphil.com', '')
    const file = path.join(process.cwd(), 'public', decodeURI(relative))
    const size = statSync(file).size
    check(size > 1000 && size <= 300 * 1024, `${relative} is ${size} bytes`)
    const header = readFileSync(file).subarray(0, 3).toString('hex')
    check(header === 'ffd8ff', `${relative} is not a JPEG`)
  }
  const samuraiOg = artworkOpenGraphImage(lastSamurai.image)
  check(samuraiOg.url.includes('/images/share/last-samurai-japanese-pop-art-fabian-phil.jpg'), 'Last Samurai still uses the oversized file')

  console.log('\n--- EN ARTWORK ---\n' + enSamurai)
  console.log('\n--- FR ARTWORK ---\n' + frSamurai)
  console.log('\n--- EN STEVE ---\n' + enSteve)
  console.log('\n--- FR STEVE ---\n' + frSteve)
  console.log('\n--- EN GENERAL ---\n' + enGeneral)
  console.log('\n--- FR GENERAL ---\n' + frGeneral)
  console.log('\n--- OG ---\n' + [lastSamurai, steveMcqueen, bradPitt].map((item) => `${item.title} ${artworkOpenGraphImage(item.image).url}`).join('\n'))

  if (failures.length) {
    console.error(failures.join('\n'))
    process.exit(1)
  }
  console.log('\nCollector enquiry checks passed. No email or WhatsApp message was sent.')
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : 'check failed')
  process.exit(1)
})
