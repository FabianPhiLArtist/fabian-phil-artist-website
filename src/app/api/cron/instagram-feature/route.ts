import { NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { INSTAGRAM_FEATURE_CACHE_TAG } from '@/data/instagramFeature'
import { fetchRecentMedia, getInstagramFeature } from '@/lib/instagram'

export const dynamic = 'force-dynamic'

// Called weekly by Vercel Cron (vercel.json). Vercel sends "Authorization: Bearer <CRON_SECRET>".
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  // Invalidating drops the last good media list, so only do it once Instagram is known to answer.
  try {
    await fetchRecentMedia({ cache: 'no-store' })
  } catch (error) {
    console.warn(
      `[instagram-feature] cron health check failed, keeping cached feature: ${error instanceof Error ? error.message : 'unknown error'}`,
    )
    return NextResponse.json({ ok: false, refreshed: false }, { status: 503 })
  }

  revalidateTag(INSTAGRAM_FEATURE_CACHE_TAG)
  revalidatePath('/en')
  revalidatePath('/fr')

  const feature = await getInstagramFeature()
  return NextResponse.json({
    ok: true,
    refreshed: true,
    featured: feature ? { id: feature.id, permalink: feature.permalink, reason: feature.reason } : null,
  })
}
