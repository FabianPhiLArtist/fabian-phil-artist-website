import type { MetadataRoute } from 'next'
import { artworks } from '@/data/artworks'
import { collections } from '@/data/collections'
import { SITE_URL } from '@/lib/site'
import { localizedPath, type AppRoute } from '@/i18n/pathnames'
import { isFrenchRouteReady } from '@/i18n/readiness'
import type { Locale } from '@/i18n/locales'

const englishStaticRoutes: AppRoute[] = [
  'home',
  'gallery',
  'about',
  'exhibitions',
  'collaborations',
  'contact',
  'price-inquiry',
  'faq',
]

function sitemapEntry(
  locale: Locale,
  route: AppRoute,
  id?: string | number
): MetadataRoute.Sitemap[number] {
  const path = localizedPath(locale, route, id !== undefined ? { id } : undefined)
  return {
    url: new URL(path, SITE_URL).toString(),
  }
}

function entriesFor(route: AppRoute, id?: string | number) {
  const entries = [sitemapEntry('en', route, id)]
  if (isFrenchRouteReady(route)) {
    entries.push(sitemapEntry('fr', route, id))
  }
  return entries
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = englishStaticRoutes.flatMap((route) => entriesFor(route))
  const collectionEntries = collections.flatMap((collection) => entriesFor('collection', collection.slug))
  const artworkEntries = artworks.flatMap((artwork) => entriesFor('artwork', artwork.id))

  return [...staticEntries, ...collectionEntries, ...artworkEntries]
}
