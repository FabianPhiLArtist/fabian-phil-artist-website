import { notFound } from 'next/navigation'
import type { Artwork } from '@/data/artworks'
import type { Collection } from '@/data/collections'
import type { Locale } from '@/i18n/locales'
import { localizedHref, localizedPath, type AppRoute, type LocalizedHrefOptions } from '@/i18n/pathnames'
import {
  frenchArtwork,
  frenchCollection,
  frenchFaqPage,
  frenchStaticPage,
  hasLiveFrenchPages,
} from '@/i18n/readiness'
import { frArtistEntity } from '@/i18n/fr/artist'
import { SITE_URL, SITE_NAME, INSTAGRAM_URL, FACEBOOK_URL, ARTIST_PORTRAIT, absoluteUrl as absolute } from './site'

export const ARTIST_ID = `${SITE_URL}/#artist`
export const WEBSITE_ID = `${SITE_URL}/#website`
export const ARTIST_PORTRAIT_ID = `${SITE_URL}/#artist-portrait`

const pageUrl = (locale: Locale, route: AppRoute, options?: LocalizedHrefOptions) =>
  new URL(localizedPath(locale, route, options), SITE_URL).toString()

// French nodes are only built for live French pages; missing content means the page must not render.
function requireFrench<T>(content: T | null | undefined): T {
  if (content === null || content === undefined) {
    notFound()
  }
  return content
}

// One Person (same @id) in every language; French pages localize its text fields only.
export function siteStructuredData(locale: Locale = 'en') {
  const french = locale === 'fr' ? requireFrench(frArtistEntity) : undefined
  const place = french ? { ...DUBAI_PLACE, name: french.locationName } : DUBAI_PLACE
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': ARTIST_ID,
        name: 'Fabian PhiL',
        alternateName: 'Fabian Philandrianos',
        givenName: 'Fabian',
        familyName: 'Philandrianos',
        jobTitle: french ? french.jobTitle : 'Contemporary pop artist',
        nationality: { '@type': 'Country', name: 'France' },
        homeLocation: place,
        workLocation: place,
        knowsAbout: french
          ? french.knowsAbout
          : [
              'Contemporary art',
              'Pop art',
              'Kinetic art',
              'Figurative art',
              'Portrait art',
              'Layered plexiglass',
            ],
        url: SITE_URL,
        sameAs: [INSTAGRAM_URL, FACEBOOK_URL],
        image: {
          '@type': 'ImageObject',
          '@id': ARTIST_PORTRAIT_ID,
          url: absolute(ARTIST_PORTRAIT.url),
          contentUrl: absolute(ARTIST_PORTRAIT.url),
          width: ARTIST_PORTRAIT.width,
          height: ARTIST_PORTRAIT.height,
          caption: french ? french.portraitCaption : ARTIST_PORTRAIT.alt,
        },
        description: french
          ? french.description
          : 'French contemporary pop artist based in Dubai, UAE, creating kinetic and figurative pop art using layered plexiglass.',
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: hasLiveFrenchPages() ? ['en', 'fr'] : 'en',
        publisher: { '@id': ARTIST_ID },
        about: { '@id': ARTIST_ID },
      },
    ],
  }
}

const DUBAI_PLACE = {
  '@type': 'Place',
  name: 'Dubai, UAE',
  address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
}

export function artworkStructuredData(artwork: Artwork, locale: Locale = 'en') {
  const french = locale === 'fr' ? requireFrench(frenchArtwork(artwork.id)) : undefined
  const url = pageUrl(locale, 'artwork', { id: artwork.id })
  return {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    '@id': `${url}#artwork`,
    name: artwork.title,
    url,
    image: absolute(artwork.image),
    creator: { '@id': ARTIST_ID },
    dateCreated: artwork.year,
    artMedium: french ? french.medium : artwork.medium,
    description: french ? french.description : artwork.description,
    isPartOf: { '@id': WEBSITE_ID },
    ...(french ? { inLanguage: 'fr' } : {}),
  }
}

export function collectionStructuredData(collection: Collection, members: Artwork[], locale: Locale = 'en') {
  const french = locale === 'fr' ? requireFrench(frenchCollection(collection.slug)) : undefined
  const url = pageUrl(locale, 'collection', { id: collection.slug })
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': url,
    name: french ? french.name : collection.name,
    url,
    description: french ? french.seo.description : collection.description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ARTIST_ID },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: members.length,
      itemListElement: members.map((artwork, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: new URL(localizedHref(locale, 'artwork', { id: artwork.id }), SITE_URL).toString(),
        name: artwork.title,
      })),
    },
    ...(french ? { inLanguage: 'fr' } : {}),
  }
}

export function profilePageStructuredData(name: string, locale: Locale = 'en') {
  const french = locale === 'fr' ? requireFrench(frenchStaticPage('about')) : undefined
  const url = pageUrl(locale, 'about')
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${url}#webpage`,
    url,
    name: french ? french.structuredDataName ?? french.seo.title : name,
    mainEntity: { '@id': ARTIST_ID },
    primaryImageOfPage: { '@id': ARTIST_PORTRAIT_ID },
    isPartOf: { '@id': WEBSITE_ID },
    ...(french ? { inLanguage: 'fr' } : {}),
  }
}

// French callers pass the French FAQ items (frenchFaqPage().items), which must match the visible text.
export function faqStructuredData(items: { question: string; answer: string }[], locale: Locale = 'en') {
  if (locale === 'fr') {
    requireFrench(frenchFaqPage())
  }
  const url = pageUrl(locale, 'faq')
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    url,
    about: { '@id': ARTIST_ID },
    isPartOf: { '@id': WEBSITE_ID },
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
    ...(locale === 'fr' ? { inLanguage: 'fr' } : {}),
  }
}

export type ExhibitionEventInput = {
  slug: string
  name: string
  startDate: string
  endDate?: string
  venue: string
  image?: string
}

// Event names are official titles and stay as published (e.g. "Beyond the Gaze") in both languages.
export function exhibitionEventsStructuredData(events: ExhibitionEventInput[], locale: Locale = 'en') {
  if (locale === 'fr') {
    requireFrench(frenchStaticPage('exhibitions'))
  }
  const url = pageUrl(locale, 'exhibitions')
  return {
    '@context': 'https://schema.org',
    '@graph': events.map((event) => ({
      '@type': 'ExhibitionEvent',
      '@id': `${url}#${event.slug}`,
      name: event.name,
      url,
      startDate: event.startDate,
      ...(event.endDate ? { endDate: event.endDate } : {}),
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      eventStatus: 'https://schema.org/EventScheduled',
      location: { ...DUBAI_PLACE, name: event.venue },
      performer: { '@id': ARTIST_ID },
      ...(event.image ? { image: absolute(event.image) } : {}),
    })),
  }
}
