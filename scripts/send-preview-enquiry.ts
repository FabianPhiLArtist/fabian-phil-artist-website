import { existsSync, readFileSync, readdirSync } from 'fs'
import path from 'path'
import { artworks } from '@/data/artworks'
import { artworkCanonicalUrl } from '@/lib/artworkEnquiry'
import { handleEnquiry } from '@/lib/handleEnquiry'

const REQUIRED = ['RESEND_API_KEY', 'ENQUIRY_TO_EMAIL', 'ENQUIRY_FROM_EMAIL'] as const
const EXPECTED_URL = 'https://fabianphil.com/en/artwork/i-am-the-last-samurai-kinetic-art'

// Reads gitignored local env files. Values are never printed.
function loadGitignoredEnv(): void {
  let names: string[] = []
  try {
    names = readdirSync(process.cwd()).filter((name) => name.startsWith('.env') && name.endsWith('.local'))
  } catch {
    return
  }
  for (const name of names) {
    const file = path.join(process.cwd(), name)
    if (!existsSync(file)) continue
    const text = readFileSync(file, 'utf8')
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq <= 0) continue
      const key = trimmed.slice(0, eq).trim()
      if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) continue
      let value = trimmed.slice(eq + 1).trim()
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
      if (!process.env[key]) process.env[key] = value
    }
  }
}

async function main(): Promise<void> {
  loadGitignoredEnv()
  const missing = REQUIRED.filter((key) => !process.env[key])
  if (missing.length > 0) {
    console.error(`Refusing to send. Missing env: ${missing.join(', ')}. No enquiry was sent.`)
    process.exit(2)
  }

  const artwork = artworks.find((item) => item.title === 'I am the Last Samurai')
  const url = artwork ? artworkCanonicalUrl('en', artwork.id) : ''
  if (!artwork || url !== EXPECTED_URL) {
    console.error('Refusing to send. The Last Samurai canonical URL did not match. No enquiry was sent.')
    process.exit(2)
  }

  const response = await handleEnquiry(
    new Request('http://localhost/api/enquiry', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': '127.0.0.1' },
      body: JSON.stringify({
        elapsedMs: 4000,
        website: '',
        type: 'collector',
        locale: 'en',
        purpose: 'artwork',
        name: 'Fabian Test',
        email: 'philandrianos@outlook.com',
        phone: '+33 6 00 00 00 99',
        location: 'France',
        artworkId: artwork.id,
        message: 'Preview test only. Please ignore.',
        subject: '',
      }),
    })
  )
  const data = (await response.json().catch(() => null)) as { ok?: boolean; delivery?: string; error?: string } | null
  if (response.ok && data?.ok === true) {
    const delivery = data.delivery === 'partial' ? 'partial' : 'complete'
    console.log(`Live enquiry accepted (${delivery}). One enquiry was submitted.`)
    return
  }
  const errorCode = data && typeof data.error === 'string' ? data.error : 'unknown'
  console.error(`Live enquiry was not accepted. HTTP ${response.status} (${errorCode}).`)
  process.exit(1)
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : 'send failed')
  process.exit(1)
})
