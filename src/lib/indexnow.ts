// Server-only: import from route handlers, never from client components.
import sitemap from '@/app/sitemap'

export const HOST = 'fabianphil.com'
export const KEY = '092b4fa5848744c9862c04737f0e1b1f'
export const KEY_LOCATION = `https://${HOST}/${KEY}.txt`
export const ENDPOINT = 'https://api.indexnow.org/indexnow'
export const MAX_URLS = 10000

const REMOVED_ARTWORK_PATH = /^\/en\/artwork\/[1-9]\d*$/

export type IndexNowPayload = {
  host: string
  key: string
  keyLocation: string
  urlList: string[]
}

export type ValidationResult = {
  accepted: string[]
  rejected: { url: string; reason: string }[]
}

export type SubmitResult = {
  ok: boolean
  status: number
  result:
    | 'success'
    | 'accepted'
    | 'malformed'
    | 'key-invalid'
    | 'url-mismatch'
    | 'rate-limited'
    | 'error'
}

export function canonicalUrls(): string[] {
  return sitemap().map((entry) => entry.url)
}

export function validateUrls(
  urls: unknown[],
  options: { allowRemovedArtworks?: boolean } = {}
): ValidationResult {
  const canonical = new Set(canonicalUrls())
  const accepted: string[] = []
  const rejected: ValidationResult['rejected'] = []
  const seen = new Set<string>()

  for (const raw of urls) {
    const display = typeof raw === 'string' ? raw.slice(0, 300) : String(raw).slice(0, 300)
    if (typeof raw !== 'string') {
      rejected.push({ url: display, reason: 'not a string' })
      continue
    }

    let parsed: URL
    try {
      parsed = new URL(raw)
    } catch {
      rejected.push({ url: display, reason: 'not an absolute URL' })
      continue
    }

    if (parsed.protocol !== 'https:') {
      rejected.push({ url: display, reason: 'protocol must be https' })
      continue
    }
    if (parsed.hostname !== HOST) {
      rejected.push({ url: display, reason: `hostname must be ${HOST}` })
      continue
    }
    if (parsed.username || parsed.password || parsed.port) {
      rejected.push({ url: display, reason: 'credentials or port not allowed' })
      continue
    }
    if (parsed.search || parsed.hash || raw.includes('?') || raw.includes('#')) {
      rejected.push({ url: display, reason: 'query string or hash not allowed' })
      continue
    }

    const normalized = parsed.toString()
    const isCanonical = canonical.has(normalized)
    const isRemovedArtwork =
      !isCanonical &&
      options.allowRemovedArtworks === true &&
      REMOVED_ARTWORK_PATH.test(parsed.pathname)

    if (!isCanonical && !isRemovedArtwork) {
      rejected.push({ url: display, reason: 'not a canonical indexable URL' })
      continue
    }

    if (seen.has(normalized)) continue
    seen.add(normalized)
    accepted.push(normalized)
  }

  if (accepted.length > MAX_URLS) {
    for (const url of accepted.splice(MAX_URLS)) {
      rejected.push({ url, reason: `exceeds ${MAX_URLS} URL limit` })
    }
  }

  return { accepted, rejected }
}

export function buildPayload(urlList: string[]): IndexNowPayload {
  return { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }
}

function mapStatus(status: number): SubmitResult['result'] {
  switch (status) {
    case 200:
      return 'success'
    case 202:
      return 'accepted'
    case 400:
      return 'malformed'
    case 403:
      return 'key-invalid'
    case 422:
      return 'url-mismatch'
    case 429:
      return 'rate-limited'
    default:
      return 'error'
  }
}

export async function submitToIndexNow(urls: string[]): Promise<SubmitResult> {
  const { accepted } = validateUrls(urls, { allowRemovedArtworks: true })
  if (accepted.length === 0) {
    return { ok: false, status: 0, result: 'malformed' }
  }

  let status = 0
  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(buildPayload(accepted)),
      cache: 'no-store',
    })
    status = response.status
  } catch {
    console.error('[indexnow] request failed (network error)')
    return { ok: false, status: 0, result: 'error' }
  }

  const result = mapStatus(status)
  const ok = result === 'success' || result === 'accepted'
  console.log(`[indexnow] status=${status} result=${result} urls=${accepted.length}`)
  return { ok, status, result }
}
