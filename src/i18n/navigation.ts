import type { Locale } from './locales'
import type { StaticRoute } from './pathnames'

export type NavKey = Extract<
  StaticRoute,
  'gallery' | 'about' | 'exhibitions' | 'collaborations' | 'professionals' | 'contact' | 'price-inquiry' | 'faq'
>

// 'available' is reserved for the future Available Artworks route; it is only a label until that
// route exists in AppRoute, so nothing can link to it yet.
type LabelKey = NavKey | 'available'

const englishLabels: Record<NavKey, string> = {
  gallery: 'Artworks',
  about: 'Artist',
  exhibitions: 'Exhibitions',
  collaborations: 'Collaborations',
  professionals: 'Professionals',
  contact: 'Contact',
  'price-inquiry': 'Price Inquiry',
  faq: 'FAQ',
}

const frenchLabels: Record<LabelKey, string> = {
  gallery: 'Œuvres',
  about: 'L’artiste',
  exhibitions: 'Expositions',
  collaborations: 'Collaborations',
  professionals: 'Professionnels',
  contact: 'Contact',
  'price-inquiry': 'Demande de prix',
  faq: 'FAQ',
  available: 'Disponibles',
}

export function navLabel(locale: Locale, key: NavKey): string {
  return locale === 'fr' ? frenchLabels[key] : englishLabels[key]
}
