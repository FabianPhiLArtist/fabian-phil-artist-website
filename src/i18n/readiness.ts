import type { AppRoute, StaticRoute } from './pathnames'
import { artworkSlugs } from '@/data/artworkSlugs'
import { frArtistEntity } from './fr/artist'
import { frArtworks } from './fr/artworks'
import { frCollections } from './fr/collections'
import { frStaticPages } from './fr/pages'
import type { FrArtworkContent, FrCollectionContent, FrFaqPageContent, FrStaticPageContent } from './fr/types'

// French activation is page by page: a French URL is live only when its French content entry exists
// and is published (and the French artist entity exists). Everything else returns 404 + noindex in
// middleware and is excluded from hreflang, the sitemap and internal French links.

const artworkIdBySlug = new Map(Object.entries(artworkSlugs).map(([id, slug]) => [slug, Number(id)]))

// Accepts an artwork id (12 or "12") or its slug.
function artworkIdFrom(id: string | number): number | undefined {
  const value = String(id)
  return /^[1-9]\d*$/.test(value) ? Number(value) : artworkIdBySlug.get(value)
}

function live<T extends { published: boolean }>(content: T | undefined): T | undefined {
  return frArtistEntity && content?.published ? content : undefined
}

export function frenchStaticPage(route: StaticRoute): FrStaticPageContent | undefined {
  return live(frStaticPages[route])
}

export function frenchFaqPage(): FrFaqPageContent | undefined {
  return live(frStaticPages.faq)
}

export function frenchArtwork(id: string | number): FrArtworkContent | undefined {
  const artworkId = artworkIdFrom(id)
  return artworkId === undefined ? undefined : live(frArtworks[artworkId])
}

export function frenchCollection(slug: string | number): FrCollectionContent | undefined {
  return live(frCollections[String(slug) as keyof typeof frCollections])
}

export function isFrenchPageLive(route: AppRoute, id?: string | number): boolean {
  if (route === 'artwork') {
    return id !== undefined && frenchArtwork(id) !== undefined
  }
  if (route === 'collection') {
    return id !== undefined && frenchCollection(id) !== undefined
  }
  return frenchStaticPage(route) !== undefined
}

export function hasLiveFrenchPages(): boolean {
  const entries = [...Object.values(frStaticPages), ...Object.values(frCollections), ...Object.values(frArtworks)]
  return entries.some((content) => live(content) !== undefined)
}

export const ENABLE_LEGACY_ENGLISH_REDIRECTS = true
