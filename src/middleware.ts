import { NextRequest, NextResponse } from 'next/server'
import {
  internalPath,
  localizedPath,
  matchLegacyEnglishPath,
  parsePublicPathname,
} from '@/i18n/pathnames'
import { ENABLE_LEGACY_ENGLISH_REDIRECTS, isFrenchRouteReady } from '@/i18n/readiness'

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

  const parsed = parsePublicPathname(pathname)
  if (!parsed) {
    return NextResponse.next()
  }

  if (parsed.locale === 'fr' && !isFrenchRouteReady(parsed.route)) {
    return new NextResponse('Not Found', {
      status: 404,
      headers: {
        'x-robots-tag': 'noindex, nofollow',
        'content-type': 'text/plain; charset=utf-8',
      },
    })
  }

  if (parsed.locale === 'fr' && isFrenchRouteReady(parsed.route)) {
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
    if (normalizedPath !== internal) {
      const url = request.nextUrl.clone()
      url.pathname = internal
      url.search = search
      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|sitemap\\.xml|robots\\.txt|.*\\..*).*)'],
}
