import { artworks, type Artwork } from '@/data/artworks'
import eligiblePhotographs from '@/data/sitemap-photographs.json'
import { collections } from '@/data/collections'
import { SITE_URL, absoluteUrl } from '@/lib/site'
import { fill } from '@/lib/template'
import { localizedPath, type AppRoute } from '@/i18n/pathnames'
import { isFrenchPageLive } from '@/i18n/readiness'
import { frenchArtwork } from '@/i18n/fr/content'
import { frArtworkDetailCopy } from '@/i18n/fr/ui'
import { languageAlternates } from '@/i18n/seo'
import type { Locale } from '@/i18n/locales'

export type SitemapImage = { loc: string; title: string; caption: string }
export type SitemapAlternate = { hreflang: string; href: string }
export type SitemapEntry = { url: string; images?: SitemapImage[]; alternates?: SitemapAlternate[] }

// Same wording as the additional-view alt on the English artwork page.
const englishAdditionalViewAlt = '{title} by Fabian PhiL, additional view {n}'
// Paths only. IndexNow imports this module, so it must not open files in public/images.
const eligiblePhotograph = new Set<string>(eligiblePhotographs)

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
  const pathname = localizedPath(locale, route, id !== undefined ? { id } : undefined)
  return {
    url: new URL(pathname, SITE_URL).toString(),
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

// Photographs already shown on the artwork page. Video, share JPEGs and anything outside the build-time list are omitted.
function isPublicPagePhotograph(src: string): boolean {
  return eligiblePhotograph.has(src)
}

function pagePhotographs(artwork: Artwork): string[] {
  const shown = artwork.images && artwork.images.length > 0 ? artwork.images : [artwork.image]
  const seen = new Set<string>()
  const photos: string[] = []
  const add = (src: string | undefined) => {
    if (!src || seen.has(src) || !isPublicPagePhotograph(src)) return
    seen.add(src)
    photos.push(src)
  }
  // Primary stays first so the existing catalogue image remains the first image entry.
  if (shown.includes(artwork.image)) add(artwork.image)
  for (const src of shown) add(src)
  return photos
}

function uniqueImages(images: SitemapImage[]): SitemapImage[] {
  const seen = new Set<string>()
  return images.filter((image) => {
    if (seen.has(image.loc)) return false
    seen.add(image.loc)
    return true
  })
}

function additionalView(artwork: Artwork, src: string, template: string): SitemapImage {
  const index = artwork.images?.indexOf(src) ?? -1
  const text = fill(template, { title: artwork.title, n: index >= 0 ? index : 1 })
  return { loc: absoluteUrl(src), title: text, caption: text }
}

function artworkSitemapImages(artwork: Artwork, locale: Locale): SitemapImage[] {
  return uniqueImages(
    pagePhotographs(artwork).flatMap((src) => {
      if (src === artwork.image) {
        const primary = locale === 'fr' ? frenchArtworkImage(artwork) : artworkImage(artwork)
        return primary ? [primary] : []
      }
      if (locale === 'fr' && !frenchArtwork(artwork.id)) return []
      const template = locale === 'fr' ? frArtworkDetailCopy.additionalViewAlt : englishAdditionalViewAlt
      return [additionalView(artwork, src, template)]
    })
  )
}

// English professionals is noindex and stays out of the sitemap. Its French page is a live URL.
// languageAlternates omits the English URL here so the sitemap does not hreflang to that noindex page.
const frenchWithoutEnglishSitemap: AppRoute[] = ['professionals']

function frenchOnlyEntry(route: AppRoute): SitemapEntry[] {
  if (!isFrenchPageLive(route)) {
    return []
  }
  const alternates = Object.entries(languageAlternates(route, { locale: 'fr' })).map(([hreflang, href]) => ({
    hreflang,
    href: String(href),
  }))
  return [{ ...sitemapEntry('fr', route), alternates }]
}

export function sitemapEntries(): SitemapEntry[] {
  const staticEntries = englishStaticRoutes.flatMap((route) => entriesFor(route))
  const frenchOnlyEntries = frenchWithoutEnglishSitemap.flatMap((route) => frenchOnlyEntry(route))
  const collectionEntries = collections.flatMap((collection) => entriesFor('collection', collection.slug))
  const artworkEntries = artworks.flatMap((artwork) =>
    entriesFor('artwork', artwork.id).map((entry, index) => {
      const images = artworkSitemapImages(artwork, index === 0 ? 'en' : 'fr')
      return images.length > 0 ? { ...entry, images } : entry
    })
  )

  return [...staticEntries, ...frenchOnlyEntries, ...collectionEntries, ...artworkEntries]
}
