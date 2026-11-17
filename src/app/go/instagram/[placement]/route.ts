import { NextResponse } from 'next/server'
import { instagramUrl } from '@/lib/site'

export const dynamic = 'force-dynamic'

// Counts clicks on the website's Instagram links: each link points here, this logs one line
// (placement only, no personal data) and sends the visitor on to Instagram with its UTM tags.
export async function GET(_request: Request, { params }: { params: Promise<{ placement: string }> }) {
  const { placement } = await params
  const safe = /^[a-z0-9-]{1,40}$/.test(placement) ? placement : 'other'
  console.log(`[instagram-click] ${safe}`)
  const response = NextResponse.redirect(instagramUrl(safe), 302)
  response.headers.set('Cache-Control', 'no-store')
  response.headers.set('X-Robots-Tag', 'noindex')
  return response
}
