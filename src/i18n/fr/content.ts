import type { StaticRoute } from '../pathnames'
import { artworkIdFrom, isFrenchPageLive } from '../readiness'
import { publishedFrenchArtworks, publishedFrenchCollections, publishedFrenchPages } from './published'
import { frStaticPages, type FrStaticPages } from './pages'
import { frCollections } from './collections'
import { frArtworks } from './artworks'
import type { FrArtworkContent, FrCollectionContent, FrFaqPageContent } from './types'

// Server-side access to French copy. Only server components and route handlers import this module, so
// French text never reaches the client bundles of English pages; client components receive it as props.

export function frenchStaticPage<R extends StaticRoute>(route: R): FrStaticPages[R] | undefined {
  return isFrenchPageLive(route) ? frStaticPages[route] : undefined
}

export function frenchFaqPage(): FrFaqPageContent | undefined {
  return frenchStaticPage('faq')
}

export function frenchArtwork(id: string | number): FrArtworkContent | undefined {
  const artworkId = artworkIdFrom(id)
  return artworkId !== undefined && isFrenchPageLive('artwork', artworkId) ? frArtworks[artworkId] : undefined
}

export function frenchCollection(slug: string | number): FrCollectionContent | undefined {
  return isFrenchPageLive('collection', slug) ? frCollections[String(slug) as keyof typeof frCollections] : undefined
}

// A published French page without content would render English text or nothing; fail the build instead.
const missing = [
  ...publishedFrenchPages.filter((route) => !frStaticPages[route]).map((route) => `page:${route}`),
  ...publishedFrenchCollections.filter((slug) => !frCollections[slug]).map((slug) => `collection:${slug}`),
  ...publishedFrenchArtworks.filter((id) => !frArtworks[id]).map((id) => `artwork:${id}`),
]
if (missing.length > 0) {
  throw new Error(`French pages published without French content: ${missing.join(', ')}`)
}
