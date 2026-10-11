import type { FrArtworkContent } from './types'

// Keyed by artwork id (artworks.ts); the URL slug is shared with English (artworkSlugs.ts).
// Empty: no French artwork page is live.
export const frArtworks: Partial<Record<number, FrArtworkContent>> = {}
