import { notFound } from 'next/navigation'
import type { Artwork } from '@/data/artworks'
import type { Collection } from '@/data/collections'
import type { Locale } from '@/i18n/locales'
import { localizedHref } from '@/i18n/pathnames'
import { frenchArtwork, frenchCollection, frenchFaqPage, frenchStaticPage } from '@/i18n/fr/content'
import { frArtistEntity } from '@/i18n/fr/artist'
import { SITE_URL, SITE_NAME, INSTAGRAM_URL, FACEBOOK_URL, ARTIST_PORTRAIT, absoluteUrl as absolute } from './site'
import { ARTIST_ID, ARTIST_PORTRAIT_ID, DUBAI_PLACE, WEBSITE_ID, pageUrl } from './structuredDataShared'

// Server-only (reads French copy). Client components use ./structuredDataShared.
export { ARTIST_ID, WEBSITE_ID, ARTIST_PORTRAIT_ID } from './structuredDataShared'
export { exhibitionEventsStructuredData, type ExhibitionEventInput } from './structuredDataShared'

// French nodes are only built for live French pages; missing content means the page must not render.
function requireFrench<T>(content: T | null | undefined): T {
  if (content === null || content === undefined) {
    notFound()
  }
  return content
}

// One Person (same @id) in every language; French pages localize its text fields only.
export function siteStructuredData(locale: Locale = 'en') {
  const french = locale === 'fr' ? frArtistEntity : undefined
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
        // English pages keep their published value; French pages declare both languages.
        inLanguage: french ? ['en', 'fr'] : 'en',
        publisher: { '@id': ARTIST_ID },
        about: { '@id': ARTIST_ID },
      },
    ],
  }
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

// List items point to the French artwork page when it is live and to the English page otherwise.
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
