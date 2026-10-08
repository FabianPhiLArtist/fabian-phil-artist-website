import { artworks, type Artwork } from '@/data/artworks'
import { collections } from '@/data/collections'
import { SITE_URL, absoluteUrl } from '@/lib/site'
import { localizedPath, type AppRoute } from '@/i18n/pathnames'
import { isFrenchRouteReady } from '@/i18n/readiness'
import type { Locale } from '@/i18n/locales'

export type SitemapImage = { loc: string; title: string; caption: string }
export type SitemapEntry = { url: string; image?: SitemapImage }

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

function sitemapEntry(locale: Locale, route: AppRoute, id?: string | number): SitemapEntry {
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

function artworkImage(artwork: Artwork): SitemapImage {
  const alt = artwork.imageAlt ?? `${artwork.title}, layered plexiglass artwork by Fabian PhiL`
  const title = artwork.seoTitle ? artwork.seoTitle.replace(' | ', ' – ') : artwork.title
  return {
    loc: absoluteUrl(artwork.image),
    title: title.includes('Fabian PhiL') ? title : `${title} by Fabian PhiL`,
    caption: alt.endsWith('Fabian PhiL')
      ? `${alt}, a French artist based in Dubai, UAE.`
      : `${alt}, by French artist Fabian PhiL, based in Dubai, UAE.`,
  }
}

export function sitemapEntries(): SitemapEntry[] {
  const staticEntries = englishStaticRoutes.flatMap((route) => entriesFor(route))
  const collectionEntries = collections.flatMap((collection) => entriesFor('collection', collection.slug))
  const artworkEntries = artworks.flatMap((artwork) =>
    entriesFor('artwork', artwork.id).map((entry) => ({ ...entry, image: artworkImage(artwork) }))
  )

  return [...staticEntries, ...collectionEntries, ...artworkEntries]
}
