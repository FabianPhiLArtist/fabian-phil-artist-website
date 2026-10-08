import type { Artwork } from '@/data/artworks'
import type { Collection } from '@/data/collections'
import { localizedPath } from '@/i18n/pathnames'
import { SITE_URL, SITE_NAME, INSTAGRAM_URL } from './site'

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
        jobTitle: 'Artist',
        nationality: { '@type': 'Country', name: 'France' },
        homeLocation: {
          '@type': 'Place',
          address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
        },
        url: SITE_URL,
        sameAs: [INSTAGRAM_URL],
        image: absolute('/images/exhibitions/fabian-phil-artist-studio-dubai.jpg'),
        description:
          'French contemporary artist based in Dubai, creating kinetic pop portraits across multiple layers of transparent plexiglass.',
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
