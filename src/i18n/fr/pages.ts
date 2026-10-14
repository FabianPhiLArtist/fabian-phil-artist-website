import type { StaticRoute } from '../pathnames'
import type { FrFaqPageContent, FrStaticPageContent } from './types'
import { frArtistEntity } from './artist'
import { frFaqItems } from './faq'

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
  gallery: {
    seo: {
      title: 'Œuvres pop art à Dubaï | Galerie de Fabian PhiL',
      description:
        'Galerie pop art de Fabian PhiL, artiste français basé à Dubaï\u00a0: œuvres originales d’art contemporain, portraits pop art et art cinétique sur plexiglas superposé.',
      ogImageAlt: 'Wanted for Being Too Smart, œuvre pop art cinétique de Fabian PhiL, présentée dans un intérieur contemporain',
    },
  },
  exhibitions: {
    seo: {
      title: 'Expositions pop art à Dubaï | Fabian PhiL',
      description:
        'Expositions pop art de Fabian PhiL à Dubaï\u00a0: Beyond the Gaze à l’Alliance Française Dubai, Noor Royal Gallery, DIFC Art Night et World Art Dubai.',
      ogImageAlt: 'Visiteurs devant les œuvres de Fabian PhiL lors de Beyond the Gaze à l’Alliance Française Dubai',
    },
  },
  faq: {
    seo: {
      title: 'Questions fréquentes | Fabian PhiL, œuvres et commandes',
      description:
        'Questions fréquentes sur Fabian PhiL, artiste français basé à Dubaï\u00a0: pop art cinétique, plexiglas, disponibilité, prix sur demande, formats et commandes.',
      ogImageAlt: frArtistEntity.portraitCaption,
    },
    items: frFaqItems,
  },
  contact: {
    seo: {
      title: 'Contacter Fabian PhiL | Artiste contemporain à Dubaï',
      description:
        'Contactez Fabian PhiL, artiste contemporain français basé à Dubaï, au sujet d’une œuvre disponible, d’une exposition, d’une commande ou d’une collaboration.',
      ogImageAlt: frArtistEntity.portraitCaption,
    },
  },
}
