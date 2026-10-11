import type { StaticRoute } from '../pathnames'
import type { FrFaqPageContent, FrStaticPageContent } from './types'

export type FrStaticPages = {
  [R in StaticRoute]?: R extends 'faq' ? FrFaqPageContent : FrStaticPageContent
}

// One entry per static page (home, about, gallery, exhibitions, faq, contact, collaborations,
// professionals, price-inquiry). Empty: no French page is live.
export const frStaticPages: FrStaticPages = {}
