import { NextRequest, NextResponse } from 'next/server'
import {
  internalPath,
  localizedPath,
  matchLegacyEnglishPath,
  parsePublicPathname,
  retiredCollectionRedirect,
} from '@/i18n/pathnames'
import { ENABLE_LEGACY_ENGLISH_REDIRECTS, isFrenchPageLive } from '@/i18n/readiness'
import { slugForLegacyArtworkId } from '@/data/artworkSlugs'

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  if (ENABLE_LEGACY_ENGLISH_REDIRECTS) {
    const destination = matchLegacyEnglishPath(pathname)
    if (destination) {
      const url = request.nextUrl.clone()
      url.pathname = destination
      url.search = search
      return NextResponse.redirect(url, 308)
    }
  }

  const retiredCollection = retiredCollectionRedirect(pathname)
  if (retiredCollection) {
    const url = request.nextUrl.clone()
    url.pathname = retiredCollection
    url.search = search
    return NextResponse.redirect(url, 301)
  }

  const parsed = parsePublicPathname(pathname)
  if (!parsed) {
    return /^\/fr(\/|$)/.test(pathname) ? frenchNotFound() : NextResponse.next()
  }

  const artworkSlug =
    parsed.locale === 'en' && parsed.route === 'artwork' && parsed.id
      ? slugForLegacyArtworkId(parsed.id)
      : undefined
  if (artworkSlug) {
    const url = request.nextUrl.clone()
    url.pathname = localizedPath('en', 'artwork', { id: artworkSlug })
    url.search = search
    return NextResponse.redirect(url, 301)
  }

  const frenchLive = parsed.locale === 'fr' && isFrenchPageLive(parsed.route, parsed.id)

  if (parsed.locale === 'fr' && !frenchLive) {
    return frenchNotFound()
  }

  // English pages are always live. Rewrite when the public URL differs from the internal route
  // (collection slugs); French keeps the same treatment for translated segments and slugs.
  if (parsed.locale === 'en' || frenchLive) {
    const publicPath = localizedPath(parsed.locale, parsed.route, { id: parsed.id })
    const normalizedPublic = publicPath.split('?')[0]
    const normalizedPath = pathname.replace(/\/$/, '') || '/'

    if (normalizedPath !== normalizedPublic) {
      const url = request.nextUrl.clone()
      url.pathname = normalizedPublic
      url.search = search
      return NextResponse.redirect(url, 308)
    }

    const internal = internalPath(parsed.locale, parsed.route, { id: parsed.id })
    // Collection pages resolve a public slug themselves. Rewriting to the internal slug would
    // make Next treat the old URL as this request's address.
    if (parsed.route !== 'collection' && normalizedPath !== internal) {
      const url = request.nextUrl.clone()
      url.pathname = internal
      url.search = search
      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next()
}

function frenchNotFound() {
  return new NextResponse('Not Found', {
    status: 404,
    headers: {
      'x-robots-tag': 'noindex, nofollow',
      'content-type': 'text/plain; charset=utf-8',
    },
  })
}

export const config = {
  matcher: ['/((?!_next|sitemap\\.xml|robots\\.txt|.*\\..*).*)'],
}
