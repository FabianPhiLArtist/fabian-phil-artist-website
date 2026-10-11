import type { FaqItem } from '@/data/faq'

// French content is never inherited from English: a French page exists only when its entry below is
// complete and `published` is true (see src/i18n/readiness.ts).

export type FrSeo = {
  title: string
  description: string
  // Alt text for the Open Graph image; the English alt is never reused on French pages.
  ogImageAlt: string
}

type Publishable = {
  published: boolean
}

export type FrStaticPageContent = Publishable & {
  seo: FrSeo
  // ProfilePage / WebPage name in JSON-LD; defaults to seo.title.
  structuredDataName?: string
}

export type FrFaqPageContent = FrStaticPageContent & {
  // Must match the visible French FAQ text exactly; it feeds the FAQPage JSON-LD.
  items: FaqItem[]
}

export type FrCollectionContent = Publishable & {
  name: string
  intro: string
  seo: FrSeo
}

export type FrArtworkContent = Publishable & {
  seo: FrSeo
  imageAlt: string
  description: string
  inMotion: string
  medium: string
}

// French fields of the single Person entity (same @id as English). Required before any French page
// can go live, so French pages never emit the English artist description.
export type FrArtistEntity = {
  description: string
  jobTitle: string
  knowsAbout: string[]
  locationName: string
  portraitCaption: string
}
