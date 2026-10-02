import type { Locale } from './locales'

export type AppRoute =
  | 'home'
  | 'gallery'
  | 'about'
  | 'artist-statement'
  | 'cv'
  | 'exhibitions'
  | 'collectors'
  | 'professionals'
  | 'collaborations'
  | 'faq'
  | 'price-inquiry'
  | 'contact'
  | 'artwork'
  | 'collection'

const routesWithId: AppRoute[] = ['artwork', 'collection']

const publicSegments: Record<Locale, Record<Exclude<AppRoute, 'home'>, string>> = {
  en: {
    gallery: 'gallery',
    about: 'about',
    'artist-statement': 'artist-statement',
    cv: 'cv',
    exhibitions: 'exhibitions',
    collectors: 'collectors',
    professionals: 'professionals',
    collaborations: 'collaborations',
    faq: 'faq',
    'price-inquiry': 'price-inquiry',
    contact: 'contact',
    artwork: 'artwork',
    collection: 'collections',
  },
  fr: {
    gallery: 'galerie',
    about: 'a-propos',
    'artist-statement': 'demarche-artistique',
    cv: 'cv',
    exhibitions: 'expositions',
    collectors: 'collectionneurs',
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
  const path =
    routesWithId.includes(route)
      ? `${prefix}/${segment}/${options?.id}`
      : `${prefix}/${segment}`

  return appendQuery(path, options?.query)
}

export function localizedHref(
  locale: Locale,
  route: AppRoute,
  options?: LocalizedHrefOptions
): string {
  return localizedPath(locale, route, options)
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
    return { locale, route, id: parts[2] }
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
    [/^\/artist-statement$/, () => localizedPath('en', 'artist-statement')],
    [/^\/cv$/, () => localizedPath('en', 'cv')],
    [/^\/exhibitions$/, () => localizedPath('en', 'exhibitions')],
    [/^\/collectors$/, () => localizedPath('en', 'collectors')],
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
