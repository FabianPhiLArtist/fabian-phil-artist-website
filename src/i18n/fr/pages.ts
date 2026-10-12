import type { StaticRoute } from '../pathnames'
import type { FrFaqPageContent, FrStaticPageContent } from './types'
import { frArtistEntity } from './artist'

export type FrStaticPages = {
  [R in StaticRoute]?: R extends 'faq' ? FrFaqPageContent : FrStaticPageContent
}

// One entry per published static page (see ./published.ts).
export const frStaticPages: FrStaticPages = {
  home: {
    seo: {
      title: 'Fabian PhiL | Pop art cinétique, artiste français à Dubaï',
      description:
        'Fabian PhiL, artiste pop français basé à Dubaï, crée du pop art cinétique sur plexiglas superposé\u00a0: des portraits figuratifs qui changent selon votre point de vue.',
      ogImageAlt: frArtistEntity.portraitCaption,
    },
  },
  about: {
    seo: {
      title: 'Fabian PhiL | Artiste contemporain français à Dubaï',
      description:
        'Fabian PhiL (Fabian Philandrianos), artiste contemporain français basé à Dubaï, crée des portraits cinétiques sur plexiglas nés d’une vie internationale.',
      ogImageAlt: frArtistEntity.portraitCaption,
    },
  },
}
