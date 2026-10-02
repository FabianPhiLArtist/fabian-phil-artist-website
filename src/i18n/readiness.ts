import type { AppRoute } from './pathnames'

const frenchRouteReady: Record<AppRoute, boolean> = {
  home: false,
  gallery: false,
  about: false,
  'artist-statement': false,
  cv: false,
  exhibitions: false,
  collectors: false,
  professionals: false,
  collaborations: false,
  faq: false,
  'price-inquiry': false,
  contact: false,
  artwork: false,
  collection: false,
}

export function isFrenchRouteReady(route: AppRoute): boolean {
  return frenchRouteReady[route] === true
}

export const ENABLE_LEGACY_ENGLISH_REDIRECTS = true
