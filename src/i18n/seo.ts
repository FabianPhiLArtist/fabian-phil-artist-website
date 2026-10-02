import type { Metadata } from 'next'
import { SITE_URL, SITE_NAME, DEFAULT_SHARE_IMAGE } from '@/lib/site'
import type { Locale } from './locales'
import { localizedPath, type AppRoute } from './pathnames'
import { isFrenchRouteReady } from './readiness'

export function languageAlternates(
  route: AppRoute,
  options?: { id?: string | number }
): NonNullable<NonNullable<Metadata['alternates']>['languages']> {
  const en = new URL(localizedPath('en', route, options), SITE_URL).toString()
  const languages: Record<string, string> = {
    en,
    'x-default': en,
  }

  if (isFrenchRouteReady(route)) {
    languages.fr = new URL(localizedPath('fr', route, options), SITE_URL).toString()
  }

  return languages
}

export function pageMetadata({
  locale,
  route,
  title,
  description,
  id,
  image,
  noIndex = false,
}: {
  locale: Locale
  route: AppRoute
  title?: string
  description?: string
  id?: string | number
  image?: { url: string; alt: string }
  noIndex?: boolean
}): Metadata {
  const path = localizedPath(locale, route, { id })
  const canonical = new URL(path, SITE_URL).toString()
  const frenchReady = isFrenchRouteReady(route)
  const shouldNoIndexFrench = locale === 'fr' && !frenchReady
  const shareImage = image ?? DEFAULT_SHARE_IMAGE

  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    alternates: {
      canonical,
      languages: languageAlternates(route, { id }),
    },
    openGraph: {
      url: canonical,
      siteName: SITE_NAME,
      type: 'website',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      images: [{ url: encodeURI(shareImage.url), alt: shareImage.alt }],
    },
    twitter: {
      card: 'summary_large_image',
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      images: [encodeURI(shareImage.url)],
    },
    ...(shouldNoIndexFrench
      ? {
          robots: {
            index: false,
            follow: false,
          },
        }
      : noIndex
        ? {
            robots: {
              index: false,
              follow: true,
            },
          }
        : {}),
  }
}
