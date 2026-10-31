import type { FaqItem } from '@/data/faq'

// French content is never inherited from English. A French page is live only when it is listed in
// ./published.ts; ./content.ts checks at build time that every listed page has its content here.

export type FrSeo = {
  title: string
  description: string
  // Alt text for the Open Graph image; the English alt is never reused on French pages.
  ogImageAlt: string
}

export type FrStaticPageContent = {
  seo: FrSeo
  // ProfilePage / WebPage name in JSON-LD; defaults to seo.title.
  structuredDataName?: string
}

export type FrFaqPageContent = FrStaticPageContent & {
  // Must match the visible French FAQ text exactly; it feeds the FAQPage JSON-LD.
  items: FaqItem[]
}

export type FrCollectionContent = {
  name: string
  intro: string
  seo: FrSeo
}

export type FrArtworkContent = {
  seo: FrSeo
  imageAlt: string
  description: string
  inMotion: string
  medium: string
  size: string
  edition?: string
  availability?: string
  // Visible series label (artwork.series is the English collection name). For artworks in several
  // collections it names all of them; seriesBlock then names artwork.series alone.
  series: string
  seriesBlock?: string
}

// Card text (gallery, collections) for artworks without a published French page.
export type FrArtworkCard = Pick<FrArtworkContent, 'imageAlt' | 'description' | 'series' | 'size' | 'medium'>

// French fields of the single Person entity (same @id as English), so French pages never emit the
// English artist description.
export type FrArtistEntity = {
  description: string
  jobTitle: string
  knowsAbout: string[]
  locationName: string
  portraitCaption: string
}
