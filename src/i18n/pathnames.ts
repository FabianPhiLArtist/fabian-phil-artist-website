import type { Locale } from './locales'
import { slugForLegacyArtworkId } from '@/data/artworkSlugs'
import { isFrenchPageLive } from './readiness'

export type AppRoute =
  | 'home'
  | 'gallery'
  | 'about'
  | 'exhibitions'
  | 'professionals'
  | 'collaborations'
  | 'faq'
  | 'price-inquiry'
  | 'contact'
  | 'artwork'
  | 'collection'

export type StaticRoute = Exclude<AppRoute, 'artwork' | 'collection'>

const routesWithId: AppRoute[] = ['artwork', 'collection']

const publicSegments: Record<Locale, Record<Exclude<AppRoute, 'home'>, string>> = {
  en: {
    gallery: 'gallery',
    about: 'about',
    exhibitions: 'exhibitions',
    professionals: 'professionals',
    collaborations: 'collaborations',
    faq: 'faq',
    'price-inquiry': 'price-inquiry',
    contact: 'contact',
    artwork: 'artwork',
    collection: 'collections',
  },
  // Artwork slugs are shared. Collection slugs below can differ by locale; only these route
  // segments are translated.
  fr: {
    gallery: 'oeuvres',
    about: 'artiste',
    exhibitions: 'expositions',
    professionals: 'professionnels',
    collaborations: 'collaborations',
    faq: 'faq',
    'price-inquiry': 'demande-de-prix',
    contact: 'contact',
    artwork: 'oeuvre',
    collection: 'collections',
  },
}

const internalSegments: Record<Exclude<AppRoute, 'home'>, string> = publicSegments.en

// Public collection URLs that differ from the internal collection slug. The internal slug
// (CollectionSlug) stays the series identity; these values are the URL segment only.
const collectionPublicSlugs: Record<Locale, Record<string, string>> = {
  en: {
    'toon-clash': 'portrait-cartoon-pop-art',
  },
  fr: {
    'pop-glasses': 'lunette-pop-art',
    'signature-works': 'pop-art-signature',
    'f1-motorsport': 'f1-sport-auto',
  },
}

export function publicCollectionSlug(locale: Locale, slug: string): string {
  return collectionPublicSlugs[locale][slug] ?? slug
}

// Map a public collection URL segment back to the internal slug. Unknown segments are returned
// unchanged so unpublished or mistyped URLs still 404.
export function internalCollectionSlug(locale: Locale, publicSlug: string): string {
  const match = Object.entries(collectionPublicSlugs[locale]).find(([, slug]) => slug === publicSlug)
  return match ? match[0] : publicSlug
}

// Old public URLs that must 301 once, with no further hop. Locale-less /collections/* is not
// included: those paths 404 today and do not resolve to a collection page.
export function retiredCollectionRedirect(pathname: string): string | null {
  const clean = pathname.replace(/\/$/, '') || '/'
  for (const locale of ['en', 'fr'] as const) {
    for (const [internal, publicSlug] of Object.entries(collectionPublicSlugs[locale])) {
      if (publicSlug !== internal && clean === `/${locale}/collections/${internal}`) {
        return `/${locale}/collections/${publicSlug}`
      }
    }
  }
  return null
}

export type LocalizedHrefOptions = {
  id?: string | number
  query?: Record<string, string>
}

export function localizedPath(
  locale: Locale,
  route: AppRoute,
  options?: LocalizedHrefOptions
): string {
  const prefix = `/${locale}`
  if (route === 'home') {
    return appendQuery(prefix, options?.query)
  }

  const segment = publicSegments[locale][route]
  const id =
    route === 'artwork' && options?.id !== undefined
      ? slugForLegacyArtworkId(options.id) ?? options.id
      : route === 'collection' && options?.id !== undefined
        ? publicCollectionSlug(locale, String(options.id))
        : options?.id
  const path =
    routesWithId.includes(route)
      ? `${prefix}/${segment}/${id}`
      : `${prefix}/${segment}`

  return appendQuery(path, options?.query)
}

// Link target for in-page navigation: a French page that is not live yet falls back to its English
// equivalent, so French pages never link to a 404. Canonicals and alternates use localizedPath.
export function localizedHref(
  locale: Locale,
  route: AppRoute,
  options?: LocalizedHrefOptions
): string {
  if (locale === 'fr' && !isFrenchPageLive(route, options?.id)) {
    return localizedPath('en', route, options)
  }
  return localizedPath(locale, route, options)
}

// hrefLang for a link built with localizedHref: "en" when a French page falls back to English.
export function fallbackHrefLang(
  locale: Locale,
  route: AppRoute,
  options?: LocalizedHrefOptions
): 'en' | undefined {
  return locale === 'fr' && !isFrenchPageLive(route, options?.id) ? 'en' : undefined
}

// The same page in the other locale, or null when that version does not exist (French not live).
export function alternateLocalePath(pathname: string): string | null {
  const parsed = parsePublicPathname(pathname)
  if (!parsed) {
    return null
  }
  if (parsed.locale === 'fr') {
    return localizedPath('en', parsed.route, { id: parsed.id })
  }
  return isFrenchPageLive(parsed.route, parsed.id)
    ? localizedPath('fr', parsed.route, { id: parsed.id })
    : null
}

export function internalPath(
  locale: Locale,
  route: AppRoute,
  options?: LocalizedHrefOptions
): string {
  const prefix = `/${locale}`
  if (route === 'home') {
    return prefix
  }

  const segment = internalSegments[route]
  return routesWithId.includes(route)
    ? `${prefix}/${segment}/${options?.id}`
    : `${prefix}/${segment}`
}

export type ParsedPath = {
  locale: Locale
  route: AppRoute
  id?: string
}

export function parsePublicPathname(pathname: string): ParsedPath | null {
  const clean = pathname.replace(/\/$/, '') || '/'
  const parts = clean.split('/').filter(Boolean)
  if (parts.length === 0) {
    return null
  }

  const locale = parts[0]
  if (locale !== 'en' && locale !== 'fr') {
    return null
  }

  if (parts.length === 1) {
    return { locale, route: 'home' }
  }

  const segment = parts[1]
  const route = routeFromSegment(locale, segment)
  if (!route) {
    return null
  }

  if (routesWithId.includes(route)) {
    if (parts.length !== 3) {
      return null
    }
    const rawId = parts[2]
    const id = route === 'collection' ? internalCollectionSlug(locale, rawId) : rawId
    return { locale, route, id }
  }

  if (parts.length !== 2) {
    return null
  }

  return { locale, route }
}

function routeFromSegment(locale: Locale, segment: string): AppRoute | null {
  const entries = Object.entries(publicSegments[locale]) as Array<
    [Exclude<AppRoute, 'home'>, string]
  >
  const match = entries.find(([, slug]) => slug === segment)
  if (match) {
    return match[0]
  }

  const internal = Object.entries(internalSegments).find(([, slug]) => slug === segment)
  if (internal && locale === 'fr') {
    return internal[0] as Exclude<AppRoute, 'home'>
  }

  return null
}

export function matchLegacyEnglishPath(pathname: string): string | null {
  const clean = pathname.replace(/\/$/, '') || '/'

  if (clean === '/') {
    return '/en'
  }

  const legacy: Array<[RegExp, (match: RegExpMatchArray) => string]> = [
    [/^\/gallery$/, () => localizedPath('en', 'gallery')],
    [/^\/about$/, () => localizedPath('en', 'about')],
    [/^\/exhibitions$/, () => localizedPath('en', 'exhibitions')],
    [/^\/professionals$/, () => localizedPath('en', 'professionals')],
    [/^\/collaborations$/, () => localizedPath('en', 'collaborations')],
    [/^\/faq$/, () => localizedPath('en', 'faq')],
    [/^\/price-inquiry$/, () => localizedPath('en', 'price-inquiry')],
    [/^\/contact$/, () => localizedPath('en', 'contact')],
    [/^\/artwork\/([^/]+)$/, (match) => localizedPath('en', 'artwork', { id: match[1] })],
  ]

  for (const [pattern, toPath] of legacy) {
    const match = clean.match(pattern)
    if (match) {
      return toPath(match)
    }
  }

  return null
}

function appendQuery(path: string, query?: Record<string, string>): string {
  if (!query || Object.keys(query).length === 0) {
    return path
  }
  const params = new URLSearchParams(query)
  return `${path}?${params.toString()}`
}
