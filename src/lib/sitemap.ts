import { artworks, type Artwork } from '@/data/artworks'
import { collections } from '@/data/collections'
import { SITE_URL, absoluteUrl } from '@/lib/site'
import { localizedPath, type AppRoute } from '@/i18n/pathnames'
import { isFrenchPageLive } from '@/i18n/readiness'
import { frenchArtwork } from '@/i18n/fr/content'
import { languageAlternates } from '@/i18n/seo'
import type { Locale } from '@/i18n/locales'

export type SitemapImage = { loc: string; title: string; caption: string }
export type SitemapAlternate = { hreflang: string; href: string }
export type SitemapEntry = { url: string; image?: SitemapImage; alternates?: SitemapAlternate[] }

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

// English always; French only when that exact page is live. A live pair lists the same hreflang
// alternates on both entries, matching the <link rel="alternate"> tags in the page head.
function entriesFor(route: AppRoute, id?: string | number): SitemapEntry[] {
  const en = sitemapEntry('en', route, id)
  if (!isFrenchPageLive(route, id)) {
    return [en]
  }
  const alternates = Object.entries(languageAlternates(route, { id })).map(([hreflang, href]) => ({
    hreflang,
    href: String(href),
  }))
  return [
    { ...en, alternates },
    { ...sitemapEntry('fr', route, id), alternates },
  ]
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

// French image text comes only from the French artwork content, never from English.
function frenchArtworkImage(artwork: Artwork): SitemapImage | undefined {
  const french = frenchArtwork(artwork.id)
  return french
    ? { loc: absoluteUrl(artwork.image), title: french.seo.title, caption: french.imageAlt }
    : undefined
}

export function sitemapEntries(): SitemapEntry[] {
  const staticEntries = englishStaticRoutes.flatMap((route) => entriesFor(route))
  const collectionEntries = collections.flatMap((collection) => entriesFor('collection', collection.slug))
  const artworkEntries = artworks.flatMap((artwork) =>
    entriesFor('artwork', artwork.id).map((entry, index) => ({
      ...entry,
      image: index === 0 ? artworkImage(artwork) : frenchArtworkImage(artwork),
    }))
  )

  return [...staticEntries, ...collectionEntries, ...artworkEntries]
}
