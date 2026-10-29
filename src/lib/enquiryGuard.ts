import { createHash } from 'crypto'

const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 8
// Collector submissions also email the address the visitor typed. That path is tighter than the studio-only forms.
const COLLECTOR_WINDOW_MS = 10 * 60 * 1000
const MAX_COLLECTOR_PER_WINDOW = 3
const DEDUPE_MS = 15 * 60 * 1000

const hits = new Map<string, number[]>()
const collectorHits = new Map<string, number[]>()
const done = new Map<string, number>()
const pending = new Map<string, Promise<boolean>>()

export function resetEnquiryGuards(): void {
  hits.clear()
  collectorHits.clear()
  done.clear()
  pending.clear()
}

// Counts requests for this IP. The address is kept only in memory and is not logged.
export function allowEnquiry(ip: string, now: number): boolean {
  const recent = (hits.get(ip) ?? []).filter((at) => now - at < WINDOW_MS)
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent)
    return false
  }
  recent.push(now)
  hits.set(ip, recent)
  return true
}

// Counts collector submissions, which email a visitor-supplied address as well as the studio.
// A rejected call does not send either message.
export function allowCollectorAcknowledgement(ip: string, now: number): boolean {
  const recent = (collectorHits.get(ip) ?? []).filter((at) => now - at < COLLECTOR_WINDOW_MS)
  if (recent.length >= MAX_COLLECTOR_PER_WINDOW) {
    collectorHits.set(ip, recent)
    return false
  }
  recent.push(now)
  collectorHits.set(ip, recent)
  return true
}

export function collectorDedupeKey(ip: string, data: Record<string, unknown>): string {
  const phone = String(data.phone ?? '').replace(/[\s().-]/g, '')
  const pick = {
    type: data.type,
    locale: data.locale,
    purpose: data.purpose,
    name: String(data.name ?? '').trim().toLowerCase(),
    email: String(data.email ?? '').trim().toLowerCase(),
    phone,
    location: String(data.location ?? '').trim(),
    message: String(data.message ?? '').trim(),
    subject: String(data.subject ?? '').trim(),
    artworkId: data.artworkId ?? '',
  }
  return createHash('sha256').update(`${ip}\n${JSON.stringify(pick)}`).digest('hex')
}

// Runs the send once for identical collector contents. A second caller waits and does not send again.
export async function claimCollectorSend(
  key: string,
  now: number,
  task: () => Promise<void>
): Promise<'sent' | 'duplicate'> {
  const seen = done.get(key)
  if (seen !== undefined && now - seen < DEDUPE_MS) return 'duplicate'

  const existing = pending.get(key)
  if (existing) {
    const ok = await existing
    if (ok) return 'duplicate'
    throw new Error('send failed')
  }

  let resolveFn: (ok: boolean) => void = () => {}
  const promise = new Promise<boolean>((resolve) => {
    resolveFn = resolve
  })
  pending.set(key, promise)
  try {
    await task()
    done.set(key, now)
    resolveFn(true)
    return 'sent'
  } catch (error) {
    resolveFn(false)
    throw error
  } finally {
    pending.delete(key)
  }
}
