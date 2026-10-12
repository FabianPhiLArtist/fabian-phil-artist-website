import type { StaticRoute } from './pathnames'

export type NavKey = Extract<
  StaticRoute,
  'gallery' | 'about' | 'exhibitions' | 'collaborations' | 'professionals' | 'contact' | 'price-inquiry' | 'faq'
>

// English labels; French labels live in ./fr/ui.ts and reach client components as props.
export const englishNavLabels: Record<NavKey, string> = {
  gallery: 'Artworks',
  about: 'Artist',
  exhibitions: 'Exhibitions',
  collaborations: 'Collaborations',
  professionals: 'Professionals',
  contact: 'Contact',
  'price-inquiry': 'Price Inquiry',
  faq: 'FAQ',
}
