import type { CollectionSlug } from '@/data/collections'
import type { StaticRoute } from '../pathnames'

// The only switch for French pages. This file is imported by client code (navigation, links,
// middleware), so it must stay a list of ids: French copy lives in ./content and is server-only.
// Every id listed here needs a complete entry in pages.ts, collections.ts or artworks.ts
// (checked at build time in ./content).

export const publishedFrenchPages: readonly StaticRoute[] = ['home', 'about']

export const publishedFrenchCollections: readonly CollectionSlug[] = ['f1-motorsport']

// Artwork ids from src/data/artworks.ts: Leclerc Monaco, Senna, Bardot, Casta.
export const publishedFrenchArtworks: readonly number[] = [4, 32, 27, 22]
