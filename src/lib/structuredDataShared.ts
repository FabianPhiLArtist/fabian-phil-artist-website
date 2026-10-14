import { notFound } from 'next/navigation'
import type { Locale } from '@/i18n/locales'
import { localizedPath, type AppRoute, type LocalizedHrefOptions } from '@/i18n/pathnames'
import { isFrenchPageLive } from '@/i18n/readiness'
import { SITE_URL, absoluteUrl as absolute } from './site'

// Client-safe part of the JSON-LD builders (no French copy): shared @ids and the exhibition events,
// which the client-rendered Exhibitions page builds itself.

export const ARTIST_ID = `${SITE_URL}/#artist`
export const WEBSITE_ID = `${SITE_URL}/#website`
export const ARTIST_PORTRAIT_ID = `${SITE_URL}/#artist-portrait`

export const DUBAI_PLACE = {
  '@type': 'Place',
  name: 'Dubai, UAE',
  address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
}

export const pageUrl = (locale: Locale, route: AppRoute, options?: LocalizedHrefOptions) =>
  new URL(localizedPath(locale, route, options), SITE_URL).toString()

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
  if (locale === 'fr' && !isFrenchPageLive('exhibitions')) {
    notFound()
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
      ...(locale === 'fr' ? { inLanguage: 'fr' } : {}),
    })),
  }
}
