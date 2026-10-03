import { NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { INSTAGRAM_FEATURE_CACHE_TAG } from '@/data/instagramFeature'
import { getInstagramFeature } from '@/lib/instagram'

export const dynamic = 'force-dynamic'

// Called weekly by Vercel Cron (vercel.json). Vercel sends "Authorization: Bearer <CRON_SECRET>".
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  revalidateTag(INSTAGRAM_FEATURE_CACHE_TAG)
  revalidatePath('/en')

  const feature = await getInstagramFeature()
  return NextResponse.json({
    ok: true,
    featured: feature ? { id: feature.id, permalink: feature.permalink, reason: feature.reason } : null,
  })
}
