import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site'
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
}: {
  locale: Locale
  route: AppRoute
  title?: string
  description?: string
  id?: string | number
}): Metadata {
  const path = localizedPath(locale, route, { id })
  const frenchReady = isFrenchRouteReady(route)
  const shouldNoIndexFrench = locale === 'fr' && !frenchReady

  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    alternates: {
      canonical: path,
      languages: languageAlternates(route, { id }),
    },
    openGraph: {
      url: path,
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
    },
    ...(shouldNoIndexFrench
      ? {
          robots: {
            index: false,
            follow: false,
          },
        }
      : {}),
  }
}
