import type { Artwork } from '@/data/artworks'
import type { Collection } from '@/data/collections'
import { localizedPath } from '@/i18n/pathnames'
import { SITE_URL, SITE_NAME, INSTAGRAM_URL, FACEBOOK_URL } from './site'

export const ARTIST_ID = `${SITE_URL}/#artist`
export const WEBSITE_ID = `${SITE_URL}/#website`

const absolute = (path: string) => new URL(encodeURI(path), SITE_URL).toString()

export function siteStructuredData() {
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
        jobTitle: 'Contemporary pop artist',
        nationality: { '@type': 'Country', name: 'France' },
        homeLocation: DUBAI_PLACE,
        workLocation: DUBAI_PLACE,
        knowsAbout: [
          'Contemporary art',
          'Pop art',
          'Kinetic art',
          'Figurative art',
          'Portrait art',
          'Layered plexiglass',
        ],
        url: SITE_URL,
        sameAs: [INSTAGRAM_URL, FACEBOOK_URL],
        image: absolute('/images/exhibitions/fabian-phil-artist-studio-dubai.jpg'),
        description:
          'French contemporary pop artist based in Dubai, UAE, creating kinetic and figurative pop art using layered plexiglass.',
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: 'en',
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

export function artworkStructuredData(artwork: Artwork) {
  const url = new URL(localizedPath('en', 'artwork', { id: artwork.id }), SITE_URL).toString()
  return {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    '@id': `${url}#artwork`,
    name: artwork.title,
    url,
    image: absolute(artwork.image),
    creator: { '@id': ARTIST_ID },
    dateCreated: artwork.year,
    artMedium: artwork.medium,
    description: artwork.description,
    isPartOf: { '@id': WEBSITE_ID },
  }
}

export function collectionStructuredData(collection: Collection, members: Artwork[]) {
  const url = new URL(localizedPath('en', 'collection', { id: collection.slug }), SITE_URL).toString()
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': url,
    name: collection.name,
    url,
    description: collection.description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ARTIST_ID },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: members.length,
      itemListElement: members.map((artwork, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: new URL(localizedPath('en', 'artwork', { id: artwork.id }), SITE_URL).toString(),
        name: artwork.title,
      })),
    },
  }
}

export function faqStructuredData(items: { question: string; answer: string }[]) {
  const url = new URL(localizedPath('en', 'faq'), SITE_URL).toString()
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

export function exhibitionEventsStructuredData(events: ExhibitionEventInput[]) {
  const url = new URL(localizedPath('en', 'exhibitions'), SITE_URL).toString()
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
