import type { AppRoute } from './pathnames'
import { artworkSlugs } from '@/data/artworkSlugs'
import { publishedFrenchArtworks, publishedFrenchCollections, publishedFrenchPages } from './fr/published'

// French activation is page by page: a French URL is live only when it is listed in ./fr/published.
// Everything else returns 404 + noindex in middleware and is excluded from hreflang, the sitemap and
// internal French links. This module is client-safe; French copy is read through ./fr/content.

const artworkIdBySlug = new Map(Object.entries(artworkSlugs).map(([id, slug]) => [slug, Number(id)]))

// Accepts an artwork id (12 or "12") or its slug.
export function artworkIdFrom(id: string | number): number | undefined {
  const value = String(id)
  return /^[1-9]\d*$/.test(value) ? Number(value) : artworkIdBySlug.get(value)
}

export function isFrenchPageLive(route: AppRoute, id?: string | number): boolean {
  if (route === 'artwork') {
    const artworkId = id === undefined ? undefined : artworkIdFrom(id)
    return artworkId !== undefined && publishedFrenchArtworks.includes(artworkId)
  }
  if (route === 'collection') {
    return id !== undefined && (publishedFrenchCollections as readonly string[]).includes(String(id))
  }
  return (publishedFrenchPages as readonly AppRoute[]).includes(route)
}

export function hasLiveFrenchPages(): boolean {
  return publishedFrenchPages.length + publishedFrenchCollections.length + publishedFrenchArtworks.length > 0
}

export const ENABLE_LEGACY_ENGLISH_REDIRECTS = true
