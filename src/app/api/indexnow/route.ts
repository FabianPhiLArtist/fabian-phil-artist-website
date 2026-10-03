import { timingSafeEqual } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import {
  MAX_URLS,
  buildPayload,
  canonicalUrls,
  submitToIndexNow,
  validateUrls,
} from '@/lib/indexnow'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const MAX_BODY_BYTES = 1024 * 1024

function json(body: unknown, status: number) {
  return NextResponse.json(body, {
    status,
    headers: { 'cache-control': 'no-store', 'x-robots-tag': 'noindex, nofollow' },
  })
}

function isAuthorized(header: string | null, secret: string): boolean {
  if (!header || !header.startsWith('Bearer ')) return false
  const provided = Buffer.from(header.slice('Bearer '.length), 'utf8')
  const expected = Buffer.from(secret, 'utf8')
  if (provided.length !== expected.length) {
    timingSafeEqual(expected, expected)
    return false
  }
  return timingSafeEqual(provided, expected)
}

export async function POST(request: NextRequest) {
  const secret = process.env.INDEXNOW_TRIGGER_SECRET
  if (!secret) {
    return json({ error: 'IndexNow trigger is not configured' }, 503)
  }
  if (!isAuthorized(request.headers.get('authorization'), secret)) {
    return json({ error: 'Unauthorized' }, 401)
  }

  const declaredLength = Number(request.headers.get('content-length') ?? '0')
  if (declaredLength > MAX_BODY_BYTES) {
    return json({ error: 'Body too large' }, 413)
  }

  const text = await request.text()
  if (Buffer.byteLength(text, 'utf8') > MAX_BODY_BYTES) {
    return json({ error: 'Body too large' }, 413)
  }

  let body: { urls?: unknown; all?: unknown; dryRun?: unknown; allowRemoved?: unknown }
  try {
    body = JSON.parse(text)
  } catch {
    return json({ error: 'Invalid JSON body' }, 400)
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return json({ error: 'Body must be a JSON object' }, 400)
  }

  const dryRun = body.dryRun === true
  let requested: unknown[]
  if (body.all === true) {
    requested = canonicalUrls()
  } else if (Array.isArray(body.urls)) {
    requested = body.urls
  } else {
    return json({ error: 'Provide { "urls": [...] } or { "all": true }' }, 400)
  }

  if (requested.length === 0) {
    return json({ error: 'No URLs provided' }, 400)
  }
  if (requested.length > MAX_URLS) {
    return json({ error: `At most ${MAX_URLS} URLs per request` }, 400)
  }

  const { accepted, rejected } = validateUrls(requested, {
    allowRemovedArtworks: body.allowRemoved === true,
  })

  if (rejected.length > 0 || accepted.length === 0) {
    return json({ error: 'Some URLs were rejected', dryRun, accepted, rejected }, 400)
  }

  if (dryRun) {
    return json(
      { dryRun: true, count: accepted.length, accepted, rejected, payload: buildPayload(accepted) },
      200
    )
  }

  const result = await submitToIndexNow(accepted)
  return json({ dryRun: false, count: accepted.length, ...result }, result.ok ? 200 : 502)
}

export function GET() {
  const response = json({ error: 'Method Not Allowed' }, 405)
  response.headers.set('allow', 'POST')
  return response
}
