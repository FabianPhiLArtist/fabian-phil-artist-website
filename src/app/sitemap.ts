import type { MetadataRoute } from 'next'
import { artworks } from '@/data/artworks'
import { SITE_URL } from '@/lib/site'
import { localizedPath, type AppRoute } from '@/i18n/pathnames'
import { isFrenchRouteReady } from '@/i18n/readiness'
import type { Locale } from '@/i18n/locales'

const englishStaticRoutes: AppRoute[] = [
  'home',
  'gallery',
  'about',
  'artist-statement',
  'cv',
  'exhibitions',
  'collectors',
  'professionals',
  'collaborations',
  'faq',
  'price-inquiry',
  'contact',
]

function sitemapEntry(
  locale: Locale,
  route: AppRoute,
  id?: number
): MetadataRoute.Sitemap[number] {
  const path = localizedPath(locale, route, id !== undefined ? { id } : undefined)
  return {
    url: new URL(path, SITE_URL).toString(),
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = englishStaticRoutes.flatMap((route) => {
    const entries = [sitemapEntry('en', route)]
    if (isFrenchRouteReady(route)) {
      entries.push(sitemapEntry('fr', route))
    }
    return entries
  })

  const artworkEntries = artworks.flatMap((artwork) => {
    const entries = [sitemapEntry('en', 'artwork', artwork.id)]
    if (isFrenchRouteReady('artwork')) {
      entries.push(sitemapEntry('fr', 'artwork', artwork.id))
    }
    return entries
  })

  return [...staticEntries, ...artworkEntries]
}
