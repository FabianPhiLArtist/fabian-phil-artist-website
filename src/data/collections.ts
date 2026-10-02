import { artworks, isInSeries, type Artwork } from './artworks'

export type CollectionSlug = 'signature-works' | 'pop-glasses' | 'wanted' | 'f1-motorsport' | 'panda-zen' | 'toon-clash'

export interface Collection {
  slug: CollectionSlug
  name: string
  seoTitle: string
  description: string
  intro: string
  includes: (artwork: Artwork) => boolean
  order?: number[]
}

const signatureWorkIds = [8, 10, 11, 12, 7, 6, 5, 13, 9, 14]
const toonClashIds = [33, 30, 32, 31, 26, 27]

export const collections: Collection[] = [
  {
    slug: 'signature-works',
    name: 'Signature Works',
    seoTitle: 'Signature Works | Fabian PhiL Contemporary Art Dubai',
    description:
      'Explore signature works by Dubai-based French contemporary artist Fabian PhiL, including layered portraits, Pop Art icons and kinetic plexiglass artworks.',
    intro:
      "A curated selection of works that define Fabian PhiL's visual language—from expressive portraits and layered movement to cultural icons, Pop Art references and experiments with perspective.",
    includes: (artwork) => signatureWorkIds.includes(artwork.id),
    order: signatureWorkIds,
  },
  {
    slug: 'pop-glasses',
    name: 'Pop Glasses',
    seoTitle: 'Pop Glasses | Kinetic Pop Art by Fabian PhiL',
    description:
      'Pop Glasses by Fabian PhiL: black-and-white kinetic portraits with fluorescent glasses, painted across layered plexiglass that changes with perspective.',
    intro:
      "Pop Glasses is one of Fabian PhiL's most recognisable visual languages, combining expressive black-and-white portraiture with fluorescent colour, layered transparency and changing perspective.",
    includes: (artwork) => isInSeries(artwork, 'Pop glasses Collection'),
  },
  {
    slug: 'wanted',
    name: 'Wanted',
    seoTitle: 'Wanted Portraits | Fabian PhiL Contemporary Pop Art',
    description:
      'Wanted and mugshot portraits by Fabian PhiL: layered plexiglass artworks combining expressive faces, text and humorous or provocative titles.',
    intro:
      "Wanted brings together Fabian PhiL's portrait and mugshot language, combining expressive faces, text and provocative or humorous titles that turn each subject into a character.",
    includes: (artwork) =>
      (isInSeries(artwork, 'Mugshot Collection') || artwork.title.startsWith('Wanted')) &&
      !isInSeries(artwork, 'Panda Pop Collection'),
  },
  {
    slug: 'f1-motorsport',
    name: 'F1 / Motorsport',
    seoTitle: 'F1 Art & Motorsport Portraits | Fabian PhiL',
    description:
      'Explore original Formula 1 and motorsport art by Fabian PhiL, including kinetic portraits and layered plexiglass works inspired by racing, drivers and iconic circuits.',
    intro:
      "Fabian PhiL's F1 and motorsport works translate the speed, personalities and visual culture of racing into layered portraits and kinetic compositions that shift with the viewer.",
    includes: (artwork) => isInSeries(artwork, 'F1 Collection'),
    order: [32, 31, 4],
  },
  {
    slug: 'panda-zen',
    name: 'Panda / Zen',
    seoTitle: 'Panda Art & Zen Works | Fabian PhiL',
    description:
      'Panda artworks by Fabian PhiL: playful panda imagery and zen landscapes on layered plexiglass, a quieter counterpoint to his portrait practice.',
    intro:
      "The Panda / Zen works bring a quieter, playful counterpoint to Fabian PhiL's portrait practice, combining graphic imagery, layered depth and the changing perspective of plexiglass.",
    includes: (artwork) => isInSeries(artwork, 'Panda Pop Collection'),
  },
  {
    slug: 'toon-clash',
    name: 'Toon Clash',
    seoTitle: 'Toon Clash | Cartoon Pop Art by Fabian PhiL',
    description:
      'Toon Clash by Fabian PhiL: pop portraits meeting cartoon characters, combining paint and digital design printed across layered acrylic sheets.',
    intro:
      "Toon Clash brings Fabian PhiL's portraits face to face with cartoon characters, combining paint and digital design across layered acrylic sheets in playful, high-energy compositions.",
    includes: (artwork) => toonClashIds.includes(artwork.id),
    order: toonClashIds,
  },
]

export function findCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug)
}

export function collectionArtworks(collection: Collection): Artwork[] {
  const members = artworks.filter(collection.includes)
  const order = collection.order
  if (!order) return members
  const rank = (id: number) => (order.includes(id) ? order.indexOf(id) : order.length)
  return [...members].sort((a, b) => rank(a.id) - rank(b.id))
}

export function collectionsForArtwork(artwork: Artwork): Collection[] {
  return collections.filter((collection) => collection.includes(artwork))
}
