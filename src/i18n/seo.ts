import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SITE_URL, SITE_NAME, DEFAULT_SHARE_IMAGE } from '@/lib/site'
import type { Locale } from './locales'
import { localizedPath, type AppRoute } from './pathnames'
import { isFrenchPageLive } from './readiness'
import { frenchArtwork, frenchCollection, frenchStaticPage } from './fr/content'
import type { FrSeo } from './fr/types'

// English professionals is noindex. A live French page must not hreflang to that URL, and the
// English page must not hreflang back. Each side keeps its own alternate; canonicals stay separate.
const noIndexEnglishRoutes: AppRoute[] = ['professionals']

// hreflang set shared by both language versions: English always, French only when that exact page is
// live, x-default always English. Pass locale for a noindex English route so each side stays self-only.
export function languageAlternates(
  route: AppRoute,
  options?: { id?: string | number; locale?: Locale }
): NonNullable<NonNullable<Metadata['alternates']>['languages']> {
  const pathOptions = options?.id !== undefined ? { id: options.id } : undefined
  const en = new URL(localizedPath('en', route, pathOptions), SITE_URL).toString()
  const frenchLive = isFrenchPageLive(route, options?.id)

  if (noIndexEnglishRoutes.includes(route) && frenchLive) {
    if (options?.locale === 'fr') {
      const fr = new URL(localizedPath('fr', route, pathOptions), SITE_URL).toString()
      return { fr }
    }
    return { en, 'x-default': en }
  }

  const languages: Record<string, string> = {
    en,
    'x-default': en,
  }

  if (frenchLive) {
    languages.fr = new URL(localizedPath('fr', route, pathOptions), SITE_URL).toString()
  }

  return languages
}

export function frenchSeo(route: AppRoute, id?: string | number): FrSeo | undefined {
  if (!isFrenchPageLive(route, id)) {
    return undefined
  }
  if (route === 'artwork') {
    return id === undefined ? undefined : frenchArtwork(id)?.seo
  }
  if (route === 'collection') {
    return id === undefined ? undefined : frenchCollection(id)?.seo
  }
  return frenchStaticPage(route)?.seo
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
  // English values; French pages take theirs from src/i18n/fr/* and never inherit these.
  title?: string
  description?: string
  id?: string | number
  image?: { url: string; alt: string; width?: number; height?: number }
  noIndex?: boolean
}): Metadata {
  const french = locale === 'fr' ? frenchSeo(route, id) : undefined
  if (locale === 'fr' && !french) {
    // Middleware already 404s unpublished French pages; this guards any request that bypasses it.
    notFound()
  }

  const path = localizedPath(locale, route, { id })
  const canonical = new URL(path, SITE_URL).toString()
  const baseImage = image ?? DEFAULT_SHARE_IMAGE
  const shareImage = french ? { ...baseImage, alt: french.ogImageAlt } : baseImage
  const pageTitle = french ? french.title : title
  const pageDescription = french ? french.description : description
  // Do not advertise the other language when its URL is noindex (professionals).
  const crossLanguage = !(noIndexEnglishRoutes.includes(route) && isFrenchPageLive(route, id))
  const hasAlternateLocale = crossLanguage && (locale === 'fr' || isFrenchPageLive(route, id))

  return {
    ...(pageTitle ? { title: pageTitle } : {}),
    ...(pageDescription ? { description: pageDescription } : {}),
    alternates: {
      canonical,
      languages: languageAlternates(route, { id, locale }),
    },
    openGraph: {
      url: canonical,
      siteName: SITE_NAME,
      type: 'website',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      ...(hasAlternateLocale ? { alternateLocale: locale === 'fr' ? 'en_US' : 'fr_FR' } : {}),
      ...(pageTitle ? { title: pageTitle } : {}),
      ...(pageDescription ? { description: pageDescription } : {}),
      images: [
        {
          url: encodeURI(shareImage.url),
          alt: shareImage.alt,
          ...(shareImage.width && shareImage.height ? { width: shareImage.width, height: shareImage.height } : {}),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      ...(pageTitle ? { title: pageTitle } : {}),
      ...(pageDescription ? { description: pageDescription } : {}),
      images: [encodeURI(shareImage.url)],
    },
    ...(noIndex
      ? {
          robots: {
            index: false,
            follow: true,
          },
        }
      : {}),
  }
}
