import type { CollectionSlug } from '@/data/collections'
import type { StaticRoute } from '../pathnames'

// The only switch for French pages. This file is imported by client code (navigation, links,
// middleware), so it must stay a list of ids: French copy lives in ./content and is server-only.
// Every id listed here needs a complete entry in pages.ts, collections.ts or artworks.ts
// (checked at build time in ./content).

export const publishedFrenchPages: readonly StaticRoute[] = [
  'home',
  'about',
  'gallery',
  'exhibitions',
  'faq',
  'contact',
  'collaborations',
  'professionals',
  'price-inquiry',
]

export const publishedFrenchCollections: readonly CollectionSlug[] = [
  'f1-motorsport',
  'pop-glasses',
  'wanted',
  'signature-works',
  'toon-clash',
  'panda-zen',
]

// Artwork ids from src/data/artworks.ts.
// Wave 1–2: Leclerc Monaco, Senna, Bardot, Casta, Gigi Hadid, Claudia Schiffer, Mick Jagger, Sheikh Zayed.
// Wave 3: Angelina Jolie, Emma Stone, Lucy Liu, Kate Upton, Amanda Seyfried, Andy Warhol,
// Keith Richards, Leclerc Monza, Panda Zen Artist, Panda Dealer, Panda Yin & Yang.
// Wave 4: Steve McQueen, Brad Pitt, Woody Allen, Old Man in Peace, Last Samurai, Twiggy, Ooh!,
// Blue Lady, Smoking Rock Star, That's the Way I Like it, Maybe I will See Him, Beyoncé,
// You Call This Art…?, Clint Eastwood Toon Fight, Clint Eastwood KnockOut.
// Wanted Panda Hong Kong Pop.
export const publishedFrenchArtworks: readonly number[] = [
  4, 32, 27, 22, 17, 33, 5, 9, 16, 19, 34, 15, 10, 6, 14, 31, 28, 25, 29,
  1, 2, 3, 7, 8, 11, 12, 13, 18, 20, 21, 23, 24, 30, 26, 35,
]
