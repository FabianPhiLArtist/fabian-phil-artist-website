import { createHash } from 'crypto'

const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 8
// Collector submissions also email the address the visitor typed. That path is tighter than the studio-only forms.
const COLLECTOR_WINDOW_MS = 10 * 60 * 1000
const MAX_COLLECTOR_PER_WINDOW = 3
// A retry later the same day must not send the studio a second copy of one enquiry.
const IDEMPOTENCY_TTL_SEC = 24 * 60 * 60
const LOCK_TTL_SEC = 30

const hits = new Map<string, number[]>()
const collectorHits = new Map<string, number[]>()
const deliveries = new Map<string, { at: number; record: EnquiryDelivery }>()
const pending = new Map<string, Promise<void>>()

export type EnquiryDelivery = {
  studio: boolean
  ack: boolean
}

export class EnquiryStoreError extends Error {
  constructor() {
    super('store unavailable')
  }
}

/**
 * Shared limits and enquiry idempotency use Upstash Redis REST when both
 * UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set in the environment
 * (on Vercel, in the project env). No other database is used.
 *
 * Until those two variables are set, shared limiting is inactive. The maps in
 * this file are only a local-dev fallback: they live in the current process,
 * reset on a cold start, and do not limit or dedupe across serverless instances.
 * That fallback is not cross-instance safety.
 *
 * The shared store keeps a hash of the IP and two delivery flags under a hash
 * of the enquiry. It does not store the enquiry text, and nothing here is logged.
 */
export function sharedEnquiryStoreConfigured(): boolean {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
}

export function resetEnquiryGuards(): void {
  hits.clear()
  collectorHits.clear()
  deliveries.clear()
  pending.clear()
}

export function enquiryIdempotencyKey(parts: {
  email: string
  artworkUrlOrSubject: string
  name: string
  phone: string
  country: string
  message: string
}): string {
  const material = [
    parts.email.trim().toLowerCase(),
    parts.artworkUrlOrSubject.trim(),
    parts.name.trim().toLowerCase(),
    parts.phone.replace(/[\s().-]/g, ''),
    parts.country.trim(),
    parts.message.trim(),
  ].join('\n')
  return createHash('sha256').update(material).digest('hex')
}

// Counts requests for this IP. Without Upstash, the address is kept only in memory and is not logged.
export async function allowEnquiry(ip: string, now: number): Promise<boolean> {
  if (sharedEnquiryStoreConfigured()) return allowShared('all', ip, MAX_PER_WINDOW, WINDOW_MS)
  return allowInMemory(hits, ip, now, WINDOW_MS, MAX_PER_WINDOW)
}

// Counts collector submissions, which email a visitor-supplied address as well as the studio.
// A rejected call does not send either message.
export async function allowCollectorAcknowledgement(ip: string, now: number): Promise<boolean> {
  if (sharedEnquiryStoreConfigured()) return allowShared('collector', ip, MAX_COLLECTOR_PER_WINDOW, COLLECTOR_WINDOW_MS)
  return allowInMemory(collectorHits, ip, now, COLLECTOR_WINDOW_MS, MAX_COLLECTOR_PER_WINDOW)
}

export async function readEnquiryDelivery(key: string, now: number): Promise<EnquiryDelivery | null> {
  if (!sharedEnquiryStoreConfigured()) {
    const saved = deliveries.get(key)
    if (!saved) return null
    if (now - saved.at > IDEMPOTENCY_TTL_SEC * 1000) {
      deliveries.delete(key)
      return null
    }
    return saved.record
  }
  const raw = await upstash(['GET', `enquiry:delivery:${key}`])
  if (typeof raw !== 'string' || raw === '') return null
  try {
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null
    const record = parsed as Partial<EnquiryDelivery>
    if (typeof record.studio !== 'boolean' || typeof record.ack !== 'boolean') return null
    return { studio: record.studio, ack: record.ack }
  } catch {
    return null
  }
}

export async function writeEnquiryDelivery(key: string, record: EnquiryDelivery, now: number): Promise<void> {
  if (!sharedEnquiryStoreConfigured()) {
    deliveries.set(key, { at: now, record })
    return
  }
  const result = await upstash([
    'SET',
    `enquiry:delivery:${key}`,
    JSON.stringify({ studio: record.studio, ack: record.ack }),
    'EX',
    String(IDEMPOTENCY_TTL_SEC),
  ])
  if (result !== 'OK') throw new EnquiryStoreError()
}

// One enquiry at a time for this key. A waiter runs only after the holder finishes, then reads the stored flags.
export async function withEnquiryLock<T>(key: string, task: () => Promise<T>): Promise<T> {
  if (!sharedEnquiryStoreConfigured()) return withMemoryLock(key, task)
  return withSharedLock(key, task, 0)
}

function allowInMemory(store: Map<string, number[]>, ip: string, now: number, windowMs: number, limit: number): boolean {
  const recent = (store.get(ip) ?? []).filter((at) => now - at < windowMs)
  if (recent.length >= limit) {
    store.set(ip, recent)
    return false
  }
  recent.push(now)
  store.set(ip, recent)
  return true
}

function rateKey(prefix: string, ip: string): string {
  return `enquiry:${prefix}:${createHash('sha256').update(ip).digest('hex')}`
}

async function allowShared(prefix: string, ip: string, limit: number, windowMs: number): Promise<boolean> {
  const key = rateKey(prefix, ip)
  const windowSec = Math.max(1, Math.ceil(windowMs / 1000))
  const results = await upstashPipeline([
    ['SET', key, '0', 'NX', 'EX', String(windowSec)],
    ['INCR', key],
  ])
  return asCount(results[1]) <= limit
}

async function withMemoryLock<T>(key: string, task: () => Promise<T>): Promise<T> {
  const existing = pending.get(key)
  if (existing) {
    await existing.catch(() => undefined)
    return withMemoryLock(key, task)
  }
  let release: () => void = () => {}
  const gate = new Promise<void>((resolve) => {
    release = resolve
  })
  pending.set(key, gate)
  try {
    return await task()
  } finally {
    if (pending.get(key) === gate) pending.delete(key)
    release()
  }
}

async function withSharedLock<T>(key: string, task: () => Promise<T>, attempt: number): Promise<T> {
  if (attempt > 40) throw new EnquiryStoreError()
  const lockKey = `enquiry:lock:${key}`
  const acquired = await upstash(['SET', lockKey, '1', 'NX', 'EX', String(LOCK_TTL_SEC)])
  if (acquired !== 'OK') {
    await new Promise((resolve) => setTimeout(resolve, 250))
    return withSharedLock(key, task, attempt + 1)
  }
  try {
    return await task()
  } finally {
    try {
      await upstash(['DEL', lockKey])
    } catch {
      // The lock expires on its own. A failed delete must not hide an enquiry the studio already received.
    }
  }
}

type RedisCommand = (string | number)[]

function restConfig(): { url: string; token: string } {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) throw new EnquiryStoreError()
  return { url: url.replace(/\/$/, ''), token }
}

async function upstash(command: RedisCommand): Promise<unknown> {
  const { url, token } = restConfig()
  const payload = await postJson(url, token, command)
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) throw new EnquiryStoreError()
  const body = payload as { result?: unknown; error?: string }
  if (body.error) throw new EnquiryStoreError()
  return body.result ?? null
}

async function upstashPipeline(commands: RedisCommand[]): Promise<unknown[]> {
  const { url, token } = restConfig()
  const payload = await postJson(`${url}/pipeline`, token, commands)
  if (!Array.isArray(payload)) throw new EnquiryStoreError()
  return payload.map((item) => {
    if (!item || typeof item !== 'object') throw new EnquiryStoreError()
    const row = item as { result?: unknown; error?: string }
    if (row.error) throw new EnquiryStoreError()
    return row.result ?? null
  })
}

async function postJson(url: string, token: string, body: unknown): Promise<unknown> {
  let response: Response
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
      signal: AbortSignal.timeout(8_000),
    })
  } catch {
    throw new EnquiryStoreError()
  }
  if (!response.ok) throw new EnquiryStoreError()
  try {
    return await response.json()
  } catch {
    throw new EnquiryStoreError()
  }
}

function asCount(value: unknown): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && /^\d+$/.test(value)) return Number(value)
  throw new EnquiryStoreError()
}
