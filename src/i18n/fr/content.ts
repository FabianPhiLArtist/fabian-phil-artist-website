import { artworks } from '@/data/artworks'
import { collectionArtworks, findCollection } from '@/data/collections'
import { faqItems } from '@/data/faq'
import type { StaticRoute } from '../pathnames'
import { artworkIdFrom, isFrenchPageLive } from '../readiness'
import { publishedFrenchArtworks, publishedFrenchCollections, publishedFrenchPages } from './published'
import { frStaticPages, type FrStaticPages } from './pages'
import { frCollections } from './collections'
import { frArtworkCards, frArtworks } from './artworks'
import type { FrArtworkCard, FrArtworkContent, FrCollectionContent, FrFaqPageContent } from './types'

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

// Card text on French pages: full French content for published artworks, card-only text otherwise.
export function frenchCardText(id: number): FrArtworkCard | undefined {
  const french = frenchArtwork(id) ?? frArtworkCards[id]
  return (
    french && {
      imageAlt: french.imageAlt,
      description: french.description,
      series: french.series,
      size: french.size,
      medium: french.medium,
    }
  )
}

// Artworks shown as cards on published French pages (gallery: every artwork).
const frenchCardIds = new Set([
  ...(isFrenchPageLive('gallery') ? artworks.map((artwork) => artwork.id) : []),
  ...publishedFrenchCollections.flatMap((slug) => {
    const collection = findCollection(slug)
    return collection ? collectionArtworks(collection).map((artwork) => artwork.id) : []
  }),
])

const englishFaqIds = faqItems.map((item) => item.id).join(',')

// A published French page without content would render English text or nothing; fail the build instead.
const missing = [
  ...publishedFrenchPages.filter((route) => !frStaticPages[route]).map((route) => `page:${route}`),
  ...publishedFrenchCollections.filter((slug) => !frCollections[slug]).map((slug) => `collection:${slug}`),
  ...publishedFrenchArtworks.filter((id) => !frArtworks[id]).map((id) => `artwork:${id}`),
  ...Array.from(frenchCardIds)
    .filter((id) => !frenchCardText(id))
    .map((id) => `card:${id}`),
  ...(isFrenchPageLive('faq') && frStaticPages.faq?.items.map((item) => item.id).join(',') !== englishFaqIds
    ? ['faq:items (ids/order differ from English)']
    : []),
]
if (missing.length > 0) {
  throw new Error(`French pages published without French content: ${missing.join(', ')}`)
}
