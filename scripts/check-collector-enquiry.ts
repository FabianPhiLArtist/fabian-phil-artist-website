import { readFileSync, statSync } from 'fs'
import path from 'path'
import { artworks } from '@/data/artworks'
import { handleEnquiry, type EnquiryMail } from '@/lib/handleEnquiry'
import { artworkCanonicalUrl, buildEnquiryMessage } from '@/lib/artworkEnquiry'
import { artworkOpenGraphImage } from '@/lib/artworkShareImage'
import { collectorSubmitPlan, executeCollectorSubmit } from '@/lib/collectorSubmit'
import {
  EnquiryStoreError,
  resetEnquiryGuards,
  allowEnquiry,
  enquiryRestCredentials,
  sharedEnquiryStoreConfigured,
  writeEnquiryDelivery,
  readEnquiryDelivery,
} from '@/lib/enquiryGuard'
import { enquiryMessageLines } from '@/lib/enquiryWording'
import { STUDIO_EMAIL } from '@/lib/artworkEnquiry'

const failures: string[] = []
function check(condition: boolean, message: string) {
  if (!condition) failures.push(message)
}

async function withEnv(updates: Record<string, string | undefined>, run: () => Promise<void>): Promise<void> {
  const names = Object.keys(updates)
  const previous = new Map(names.map((name) => [name, process.env[name]]))
  for (const [name, value] of Object.entries(updates)) {
    if (value === undefined) delete process.env[name]
    else process.env[name] = value
  }
  try {
    await run()
  } finally {
    for (const name of names) {
      const prior = previous.get(name)
      if (prior === undefined) delete process.env[name]
      else process.env[name] = prior
    }
  }
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

function post(
  body: Record<string, unknown>,
  ip: string,
  send: (mail: EnquiryMail) => Promise<void>,
  writeDelivery?: (key: string, record: { studio: boolean; ack: boolean }, now: number) => Promise<void>
) {
  return handleEnquiry(
    new Request('http://localhost/api/enquiry', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
      body: JSON.stringify({ elapsedMs: 4000, website: '', ...body }),
    }),
    { now, from, to: studioInbox, send, ...(writeDelivery ? { writeDelivery } : {}) }
  )
}

const base = {
  type: 'collector',
  name: collector.name,
  email: collector.email,
  phone: collector.phone,
}

async function main() {
  if (sharedEnquiryStoreConfigured()) {
    console.error('Refusing to run stub checks against the shared store. Unset Redis REST env to exercise the in-memory fallback.')
    process.exit(1)
  }
  if (process.env.VERCEL_ENV === 'production' || process.env.VERCEL_ENV === 'preview') {
    console.error('Refusing to run stub checks with VERCEL_ENV set to production or preview. Unset it to exercise the in-memory fallback.')
    process.exit(1)
  }
  resetEnquiryGuards()
  const sent: EnquiryMail[] = []
  const ok = await post(
    { ...base, locale: 'en', purpose: 'artwork', location: 'France', artworkId: lastSamurai.id, message: '', price: '\u20ac9,999' },
    '203.0.113.10',
    async (mail) => {
      sent.push(mail)
    }
  )
  const okBody = (await ok.json()) as { ok?: boolean; delivery?: string }
  check(ok.status === 200 && okBody.ok === true && okBody.delivery === 'complete', 'Successful enquiry was rejected')
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
  const againBody = (await again.json()) as { ok?: boolean; delivery?: string }
  check(again.status === 200 && againBody.ok === true && againBody.delivery === 'complete', 'Duplicate submission was not accepted without resending')
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
  let studioFailSends = 0
  const studioFail = await post(
    { ...base, locale: 'en', purpose: 'artwork', location: 'France', artworkId: lastSamurai.id, message: 'Studio down once' },
    '203.0.113.91',
    async (mail) => {
      studioFailSends += 1
      if (mail.to[0] === studioInbox) throw new Error('studio')
    }
  )
  const studioFailBody = (await studioFail.json()) as { ok?: boolean; delivery?: string }
  check(studioFail.status === 502 && studioFailBody.ok !== true && studioFailBody.delivery !== 'partial', 'Studio failure claimed success')
  check(studioFailSends === 1, 'Studio failure sent more than the studio attempt')
  let studioOpened = false
  const studioClient = await executeCollectorSubmit({
    plan: 'send',
    post: async () => ({ ok: false, error: 'send_failed' }),
    openWhatsApp: () => {
      studioOpened = true
    },
  })
  check(studioClient.status === 'error' && studioOpened === false, 'A failed studio email opened WhatsApp')
  let studioRetry = 0
  const studioRetryResponse = await post(
    { ...base, locale: 'en', purpose: 'artwork', location: 'France', artworkId: lastSamurai.id, message: 'Studio down once' },
    '203.0.113.91',
    async () => {
      studioRetry += 1
    }
  )
  const studioRetryBody = (await studioRetryResponse.json()) as { ok?: boolean; delivery?: string }
  check(
    studioRetryResponse.status === 200 && studioRetryBody.delivery === 'complete' && studioRetry === 2,
    'A failed studio email was treated as already sent'
  )

  resetEnquiryGuards()
  let partialStudio = 0
  let partialAck = 0
  let partialStudioText = ''
  const partialFields = {
    ...base,
    locale: 'en' as const,
    purpose: 'artwork' as const,
    location: 'France',
    artworkId: lastSamurai.id,
    message: 'Ack down once',
  }
  const partial = await post(partialFields, '203.0.113.92', async (mail) => {
    if (mail.to[0] === studioInbox) {
      partialStudio += 1
      partialStudioText = mail.text
      return
    }
    partialAck += 1
    throw new Error('ack')
  })
  const partialJson = (await partial.json()) as { ok?: boolean; delivery?: string }
  check(
    partial.status === 200 && partialJson.ok === true && partialJson.delivery === 'partial',
    'Acknowledgement failure was reported as a total failure'
  )
  check(partialStudio === 1 && partialAck === 2, `Expected one studio mail and two acknowledgement attempts, got ${partialStudio} and ${partialAck}`)
  check(partialStudioText.includes('Website-submitted enquiry'), 'Partial studio mail is not labelled as a website enquiry')
  check(partialStudioText.includes('This website did not send a WhatsApp message.'), 'Partial studio mail claims WhatsApp was sent')
  const partialRetry = await post(partialFields, '203.0.113.92', async (mail) => {
    if (mail.to[0] === studioInbox) {
      partialStudio += 1
      return
    }
    partialAck += 1
  })
  const partialRetryJson = (await partialRetry.json()) as { ok?: boolean; delivery?: string }
  check(partialRetry.status === 200 && partialRetryJson.delivery === 'complete', 'Acknowledgement retry was not accepted')
  check(partialStudio === 1, 'Acknowledgement retry sent a second studio email')
  check(partialAck === 3, 'Acknowledgement retry did not send the acknowledgement')
  let partialOpened = false
  const partialClient = await executeCollectorSubmit({
    plan: 'send',
    post: async () => ({ ok: true, delivery: 'partial' }),
    openWhatsApp: () => {
      partialOpened = true
    },
  })
  check(partialClient.status === 'partial' && partialOpened, 'A partial enquiry hid WhatsApp')
  check(
    collectorSubmitPlan({
      inFlight: false,
      honeypot: '',
      valid: true,
      succeededFingerprint: null,
      fingerprint: 'partial',
    }) === 'send',
    'A partial enquiry would not be posted again'
  )

  resetEnquiryGuards()
  let unsavedStudio = 0
  let unsavedAck = 0
  const unsavedFields = {
    ...base,
    locale: 'en' as const,
    purpose: 'artwork' as const,
    location: 'France',
    artworkId: lastSamurai.id,
    message: 'Record save failed',
  }
  const failWrite = async () => {
    throw new EnquiryStoreError()
  }
  const unsaved = await post(
    unsavedFields,
    '203.0.113.94',
    async (mail) => {
      if (mail.to[0] === studioInbox) unsavedStudio += 1
      else unsavedAck += 1
    },
    failWrite
  )
  const unsavedJson = (await unsaved.json()) as { ok?: boolean; delivery?: string }
  check(
    unsaved.status === 200 && unsavedJson.ok === true && unsavedJson.delivery === 'unrecorded',
    'A failed delivery record was reported as a safe success'
  )
  check(unsavedStudio === 1 && unsavedAck === 1, `Expected one studio mail and one acknowledgement when the record was not saved, got ${unsavedStudio} and ${unsavedAck}`)
  const unsavedRetry = await post(
    unsavedFields,
    '203.0.113.94',
    async (mail) => {
      if (mail.to[0] === studioInbox) unsavedStudio += 1
      else unsavedAck += 1
    },
    failWrite
  )
  const unsavedRetryJson = (await unsavedRetry.json()) as { ok?: boolean; delivery?: string }
  check(unsavedRetry.status === 200 && unsavedRetryJson.delivery === 'unrecorded', 'A missing delivery record was described as saved')
  check(unsavedStudio === 2, 'A missing delivery record was treated as protection against a second studio email')

  resetEnquiryGuards()
  let lostStudio = 0
  let lostAck = 0
  const lost = await post(
    { ...unsavedFields, message: 'Record and acknowledgement failed' },
    '203.0.113.95',
    async (mail) => {
      if (mail.to[0] === studioInbox) {
        lostStudio += 1
        return
      }
      lostAck += 1
      throw new Error('ack')
    },
    failWrite
  )
  const lostJson = (await lost.json()) as { ok?: boolean; delivery?: string }
  check(
    lost.status === 200 && lostJson.ok === true && lostJson.delivery === 'unrecorded',
    'A failed delivery record was described as a safe acknowledgement retry'
  )
  check(lostStudio === 1 && lostAck === 2, `Expected one studio mail and two acknowledgement attempts, got ${lostStudio} and ${lostAck}`)

  resetEnquiryGuards()
  let recoveredStudio = 0
  let recoveredWrites = 0
  const recoveredFields = { ...unsavedFields, message: 'First record save failed' }
  const recovered = await post(
    recoveredFields,
    '203.0.113.96',
    async (mail) => {
      if (mail.to[0] === studioInbox) recoveredStudio += 1
    },
    async (key, record, at) => {
      recoveredWrites += 1
      if (recoveredWrites === 1) throw new EnquiryStoreError()
      await writeEnquiryDelivery(key, record, at)
    }
  )
  const recoveredJson = (await recovered.json()) as { ok?: boolean; delivery?: string }
  check(recovered.status === 200 && recoveredJson.delivery === 'complete', 'A record saved after the studio email was treated as unsaved')
  const recoveredRetry = await post(recoveredFields, '203.0.113.96', async (mail) => {
    if (mail.to[0] === studioInbox) recoveredStudio += 1
  })
  const recoveredRetryJson = (await recoveredRetry.json()) as { delivery?: string }
  check(recoveredRetry.status === 200 && recoveredRetryJson.delivery === 'complete', 'A saved record did not accept the retry')
  check(recoveredStudio === 1, 'A saved record still sent a second studio email')

  let unrecordedOpened = false
  const unrecordedClient = await executeCollectorSubmit({
    plan: 'send',
    post: async () => ({ ok: true, delivery: 'unrecorded' }),
    openWhatsApp: () => {
      unrecordedOpened = true
    },
  })
  check(unrecordedClient.status === 'unrecorded' && unrecordedOpened, 'An unsaved delivery hid WhatsApp')
  check(
    collectorSubmitPlan({
      inFlight: false,
      honeypot: '',
      valid: true,
      succeededFingerprint: null,
      fingerprint: 'unrecorded',
    }) === 'send',
    'An unsaved delivery was treated as already sent'
  )
  const inquirySource = readFileSync(path.join(process.cwd(), 'src/components/CollectorInquiry.tsx'), 'utf8')
  const frenchSource = readFileSync(path.join(process.cwd(), 'src/i18n/fr/ui.ts'), 'utf8')
  const enUnrecorded =
    'The studio was notified by email. Sending this again may email the studio a second time. If WhatsApp did not open, use the button below.'
  const frUnrecorded =
    'L\u2019atelier a \u00e9t\u00e9 pr\u00e9venu par e-mail. Un nouvel envoi peut \u00e9crire une seconde fois \u00e0 l\u2019atelier. Si WhatsApp ne s\u2019est pas ouvert, utilisez le bouton ci-dessous.'
  check(inquirySource.includes(enUnrecorded), 'English copy still claims a retry will not email the studio again')
  check(frenchSource.includes(frUnrecorded), 'French copy still claims a retry will not email the studio again')
  check(inquirySource.includes('You can try again.'), 'Partial English copy no longer says the visitor can try again')
  check(frenchSource.includes('Vous pouvez r\u00e9essayer.'), 'Partial French copy no longer says the visitor can try again')
  check(!enUnrecorded.includes('try again') && !frUnrecorded.includes('r\u00e9essayer'), 'Unrecorded copy invites another send')

  resetEnquiryGuards()
  let concurrentStudio = 0
  let concurrentAck = 0
  const concurrentFields = {
    ...base,
    locale: 'en' as const,
    purpose: 'artwork' as const,
    location: 'France',
    artworkId: lastSamurai.id,
    message: 'Concurrent',
  }
  const concurrentSend = async (mail: EnquiryMail) => {
    if (mail.to[0] === studioInbox) {
      concurrentStudio += 1
      await new Promise((resolve) => setTimeout(resolve, 40))
      return
    }
    concurrentAck += 1
  }
  const [firstConcurrent, secondConcurrent] = await Promise.all([
    post(concurrentFields, '203.0.113.93', concurrentSend),
    post(concurrentFields, '203.0.113.93', concurrentSend),
  ])
  check(firstConcurrent.status === 200 && secondConcurrent.status === 200, 'Concurrent enquiry was rejected')
  check(concurrentStudio === 1, `Concurrent enquiry sent ${concurrentStudio} studio emails`)
  check(concurrentAck === 1, `Concurrent enquiry sent ${concurrentAck} acknowledgements`)

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
  check(!sharedEnquiryStoreConfigured(), 'In-memory fallback was not the store under test')
  check(process.env.VERCEL_ENV !== 'production' && process.env.VERCEL_ENV !== 'preview', 'Collector cap ran with a hosted VERCEL_ENV')
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

  const guardSource = readFileSync(path.join(process.cwd(), 'src/lib/enquiryGuard.ts'), 'utf8')
  check(!guardSource.includes('KV_REST_API_READ_ONLY_TOKEN'), 'The write client names the read-only token')
  check(!guardSource.includes('REDIS_URL'), 'The REST client references the redis protocol URL')
  check(guardSource.includes("Authorization: `Bearer ${token}`"), 'REST calls no longer send a bearer token')
  check(guardSource.includes("method: 'POST'"), 'REST calls no longer use POST')

  const clearedRedis = {
    KV_REST_API_URL: undefined,
    KV_REST_API_TOKEN: undefined,
    KV_REST_API_READ_ONLY_TOKEN: undefined,
    UPSTASH_REDIS_REST_URL: undefined,
    UPSTASH_REDIS_REST_TOKEN: undefined,
  }
  await withEnv(
    {
      ...clearedRedis,
      KV_REST_API_URL: 'https://kv.example/',
      KV_REST_API_TOKEN: 'write-token',
      KV_REST_API_READ_ONLY_TOKEN: 'read-token',
      UPSTASH_REDIS_REST_URL: 'https://upstash.example',
      UPSTASH_REDIS_REST_TOKEN: 'upstash-token',
    },
    async () => {
      const selected = enquiryRestCredentials()
      check(selected?.url === 'https://kv.example', 'KV REST URL was not preferred')
      check(selected?.token === 'write-token', 'KV write token was not preferred')
      check(selected?.token !== 'read-token', 'Read-only token was selected for the write client')
    }
  )
  await withEnv(
    {
      ...clearedRedis,
      KV_REST_API_URL: 'https://kv.example',
      KV_REST_API_READ_ONLY_TOKEN: 'read-token',
      UPSTASH_REDIS_REST_URL: 'https://upstash.example',
      UPSTASH_REDIS_REST_TOKEN: 'upstash-token',
    },
    async () => {
      const selected = enquiryRestCredentials()
      check(selected?.url === 'https://upstash.example', 'UPSTASH REST URL was not used when the KV write token is absent')
      check(selected?.token === 'upstash-token', 'UPSTASH REST token was not used when the KV write token is absent')
      check(selected?.token !== 'read-token', 'Read-only token replaced the UPSTASH write token')
    }
  )
  await withEnv(
    {
      ...clearedRedis,
      KV_REST_API_URL: 'https://kv.example',
      KV_REST_API_READ_ONLY_TOKEN: 'read-token',
    },
    async () => {
      check(enquiryRestCredentials() === null, 'Read-only token was treated as a write credential')
      check(!sharedEnquiryStoreConfigured(), 'Read-only token marked the shared store as configured')
    }
  )
  check(enquiryRestCredentials() === null && !sharedEnquiryStoreConfigured(), 'Credential selection left Redis env in place')

  const hostedNow = now().getTime()
  for (const hostedEnv of ['production', 'preview'] as const) {
    const hostedIp = hostedEnv === 'production' ? '203.0.113.84' : '203.0.113.85'
    const hostedKey = `hosted-${hostedEnv}`
    await withEnv({ ...clearedRedis, VERCEL_ENV: hostedEnv }, async () => {
      check(!sharedEnquiryStoreConfigured(), `${hostedEnv} without Redis looked configured`)
      let hostedSends = 0
      const hosted = await post(
        { ...base, locale: 'en', purpose: 'artwork', location: 'France', artworkId: lastSamurai.id, message: `Hosted ${hostedEnv}` },
        hostedIp,
        async () => {
          hostedSends += 1
        }
      )
      const hostedBody = (await hosted.json()) as { error?: string }
      check(
        hosted.status === 503 && hostedBody.error === 'unavailable' && hostedSends === 0,
        `${hostedEnv} without Redis sent or accepted an enquiry`
      )
      let writeThrew = false
      try {
        await writeEnquiryDelivery(hostedKey, { studio: true, ack: false }, hostedNow)
      } catch (error) {
        writeThrew = error instanceof EnquiryStoreError
      }
      check(writeThrew, `${hostedEnv} without Redis stored a delivery in memory`)
    })
    check((await readEnquiryDelivery(hostedKey, hostedNow)) === null, `${hostedEnv} without Redis left a memory delivery`)
    for (let i = 0; i < 8; i += 1) {
      check(await allowEnquiry(hostedIp, hostedNow), `${hostedEnv} refusal was counted in memory`)
    }
  }
  check(process.env.VERCEL_ENV !== 'production' && process.env.VERCEL_ENV !== 'preview', 'Hosted env was not restored')

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
  for (let i = 0; i < 8; i += 1) check(await allowEnquiry('203.0.113.50', 1_000), `Rate limit blocked request ${i + 1}`)
  check(!(await allowEnquiry('203.0.113.50', 1_000)), 'Per-IP limit did not trip')

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
