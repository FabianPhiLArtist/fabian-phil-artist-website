import { unstable_cache } from 'next/cache'
import {
  INSTAGRAM_FEATURE_CACHE_TAG,
  INSTAGRAM_FEATURE_EPOCH,
  INSTAGRAM_FEATURE_REVALIDATE_SECONDS,
  INSTAGRAM_FEATURE_WEEK_MS,
  instagramFeatureExclusions,
  instagramPreferredTopics,
} from '@/data/instagramFeature'

// Server-only: reads INSTAGRAM_ACCESS_TOKEN and must never be imported by a client component.

type GraphMedia = {
  id: string
  caption?: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_product_type?: string
  media_url?: string
  thumbnail_url?: string
  permalink: string
  timestamp: string
  children?: { data: { media_type: string; media_url?: string; thumbnail_url?: string }[] }
}

export type InstagramFeature = {
  id: string
  permalink: string
  imageUrl: string
  videoUrl?: string
  isReel: boolean
  excerpt: string
  timestamp: string
  reason: 'newest' | 'rotation'
}

type Candidate = Omit<InstagramFeature, 'reason'> & { time: number; shortcode: string; preferred: boolean }

const GRAPH_TIMEOUT_MS = 8000

const FIELDS =
  'id,caption,media_type,media_product_type,media_url,thumbnail_url,permalink,timestamp,children{media_type,media_url,thumbnail_url}'

function mediaEndpoint(): string | null {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  if (!token) return null
  const version = process.env.INSTAGRAM_GRAPH_VERSION || 'v23.0'
  const userId = process.env.INSTAGRAM_USER_ID
  const base = userId
    ? `https://graph.facebook.com/${version}/${encodeURIComponent(userId)}/media`
    : `https://graph.instagram.com/${version}/me/media`
  const params = new URLSearchParams({ fields: FIELDS, limit: '25', access_token: token })
  return `${base}?${params}`
}

// Throws on any failure: unstable_cache never stores a thrown result, so the last successful media list keeps
// being served while Instagram is failing. Inside unstable_cache the request must not set `cache` or `next`,
// otherwise it would mark the whole page as dynamic.
export async function fetchRecentMedia(init: RequestInit = {}): Promise<GraphMedia[]> {
  const url = mediaEndpoint()
  if (!url) throw new Error('INSTAGRAM_ACCESS_TOKEN is not set')
  const res = await fetch(url, { ...init, signal: AbortSignal.timeout(GRAPH_TIMEOUT_MS) })
  if (!res.ok) throw new Error(`media request failed with status ${res.status}`)
  const body = (await res.json()) as { data?: GraphMedia[] }
  if (!Array.isArray(body.data) || !body.data.length) throw new Error('media request returned no items')
  return body.data
}

const getCachedMedia = unstable_cache(() => fetchRecentMedia(), ['instagram-media'], {
  revalidate: INSTAGRAM_FEATURE_REVALIDATE_SECONDS,
  tags: [INSTAGRAM_FEATURE_CACHE_TAG],
})

function shortcodeOf(value: string): string {
  return value.match(/instagram\.com\/(?:[^/]+\/)?(?:p|reel|reels|tv)\/([A-Za-z0-9_-]+)/)?.[1] ?? ''
}

const excluded = new Set<string>()
for (const entry of instagramFeatureExclusions) {
  const value = entry.trim()
  if (value) excluded.add(value)
  const shortcode = shortcodeOf(value)
  if (shortcode) excluded.add(shortcode)
}

function previewImage(media: GraphMedia): string | undefined {
  if (media.media_type === 'IMAGE') return media.media_url
  if (media.media_type === 'VIDEO') return media.thumbnail_url
  const first = media.children?.data?.[0]
  if (!first) return undefined
  return first.media_type === 'VIDEO' ? first.thumbnail_url : first.media_url
}

function playableVideo(media: GraphMedia): string | undefined {
  if (media.media_type !== 'VIDEO' || !media.media_url) return undefined
  try {
    return new URL(media.media_url).protocol === 'https:' ? media.media_url : undefined
  } catch {
    return undefined
  }
}

function excerptOf(caption = ''): string {
  const firstLine = caption.split('\n').find((line) => line.trim()) ?? ''
  const text = firstLine.replace(/[#@][^\s#@]+/g, '').replace(/\s+/g, ' ').trim()
  if (text.length <= 120) return text
  return text.slice(0, 120).replace(/\s+\S*$/, '') + '…'
}

function toCandidate(media: GraphMedia): Candidate | null {
  if (media.media_product_type === 'STORY') return null
  const imageUrl = previewImage(media)
  const time = Date.parse(media.timestamp)
  if (!imageUrl || !media.permalink || Number.isNaN(time)) return null
  const shortcode = shortcodeOf(media.permalink)
  if (excluded.has(media.id) || (shortcode && excluded.has(shortcode))) return null
  return {
    id: media.id,
    permalink: media.permalink,
    imageUrl,
    videoUrl: playableVideo(media),
    isReel: media.media_type === 'VIDEO',
    excerpt: excerptOf(media.caption),
    timestamp: media.timestamp,
    time,
    shortcode,
    preferred: instagramPreferredTopics.test(media.caption ?? ''),
  }
}

// Replays publish times and Monday boundaries from the epoch, so the result is deterministic and needs no storage:
// a newly published post is featured as soon as the media list is refreshed; at a Monday boundary the newest post
// stays if it appeared since the previous boundary, otherwise the rotation moves to a different older post.
export function selectFeature(candidates: Candidate[], now: number): InstagramFeature | null {
  const sorted = [...candidates].filter((c) => c.time <= now).sort((a, b) => b.time - a.time)
  let previous: Candidate | null = sorted.find((c) => c.time < INSTAGRAM_FEATURE_EPOCH) ?? null
  let reason: InstagramFeature['reason'] = 'newest'
  let lastRotated: Candidate | null = null
  let newSinceBoundary = false
  const published = sorted.filter((c) => c.time >= INSTAGRAM_FEATURE_EPOCH).reverse()
  let next = 0
  for (let week = 1; ; week++) {
    const boundary = INSTAGRAM_FEATURE_EPOCH + week * INSTAGRAM_FEATURE_WEEK_MS
    while (next < published.length && published[next].time <= boundary) {
      previous = published[next++]
      reason = 'newest'
      newSinceBoundary = true
    }
    if (boundary > now) break
    const available = sorted.filter((c) => c.time <= boundary)
    if (!available.length) continue
    if (newSinceBoundary || !previous) {
      previous = available[0]
      reason = 'newest'
      newSinceBoundary = false
      continue
    }
    const preferred = available.filter((c) => c.preferred)
    const pool = preferred.length >= 2 ? preferred : available
    const last: Candidate | null = lastRotated
    // Round-robin from newest to oldest, continuing with the first post older than the last rotated one.
    const start: number = last ? Math.max(0, pool.findIndex((c) => c.time < last.time)) : 0
    for (let step = 0; step < pool.length; step++) {
      const next: Candidate = pool[(start + step) % pool.length]
      if (next.id !== previous!.id) {
        previous = next
        lastRotated = next
        reason = 'rotation'
        break
      }
    }
  }
  if (!previous) return null
  const { id, permalink, imageUrl, videoUrl, isReel, excerpt, timestamp } = previous
  return { id, permalink, imageUrl, videoUrl, isReel, excerpt, timestamp, reason }
}

// Returns null only when no media list has ever been cached successfully (or the cache was just invalidated).
export async function getInstagramFeature(now = Date.now()): Promise<InstagramFeature | null> {
  let media: GraphMedia[]
  try {
    media = await getCachedMedia()
  } catch (error) {
    console.warn(`[instagram-feature] ${error instanceof Error ? error.message : 'media request failed'}`)
    return null
  }
  const candidates = media.map(toCandidate).filter((c): c is Candidate => c !== null)
  return selectFeature(candidates, now)
}
