import type { ProfessionalsCopy } from '@/components/ProfessionalsPage'
import { frArtistEntity } from './artist'
import { frWhatsapp } from './ui'

export const frProfessionalsSeo = {
  title: 'Galeries et curateurs d’art | Fabian PhiL',
  description:
    'Galeries, curateurs d’art et institutions\u00a0: book d’artiste sans prix publics et informations d’exposition sur demande. Contactez Fabian PhiL, artiste français à Dubaï.',
  ogImageAlt: frArtistEntity.portraitCaption,
}

export const frProfessionalsCopy: ProfessionalsCopy = {
  heading: 'Galeries et curateurs d’art',
  intro:
    'Galeries, curateurs d’art, institutions culturelles, organisateurs d’expositions et partenaires professionnels peuvent échanger avec Fabian PhiL sur son travail.',
  bookHeading: 'Book d’artiste',
  bookText:
    'Un book d’artiste, portfolio sans prix publics, est disponible sur demande, ainsi que des informations sur les expositions. Pour le recevoir, écrivez à Fabian ou à l’atelier.',
  bookCta: 'Demander le book d’artiste →',
  bookHref: frWhatsapp.artistBook,
  exhibitionsHeading: 'Expositions',
  exhibitions: [
    {
      title: 'Noor Royal Gallery',
      text: 'Présentation en galerie des œuvres de Fabian PhiL à la Noor Royal Gallery, à Dubaï, de mars à décembre 2026.',
    },
    {
      title: 'Beyond the Gaze',
      text: 'Fabian PhiL a présenté son travail dans Beyond the Gaze, à l’Alliance Française Dubai, du 30 septembre au 14 octobre 2026.',
    },
    {
      title: 'DIFC Art Night',
      text: 'Fabian y a présenté des œuvres lors de la DIFC Art Night, en janvier 2025.',
    },
    {
      title: 'World Art Dubai',
      text: 'Fabian y a présenté des œuvres à World Art Dubai, en mai 2024.',
    },
  ],
  exhibitionsCta: 'Voir les expositions →',
  contactCta: 'Contacter l’atelier →',
}
