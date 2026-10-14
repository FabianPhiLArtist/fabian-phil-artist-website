import { exhibitions, type Exhibition } from '@/data/exhibitions'
import type { ExhibitionsCopy } from '@/components/ExhibitionsPage'

export const frExhibitionsCopy: ExhibitionsCopy = {
  heading: 'Expositions',
  intro:
    'Une sélection d’expositions et de présentations en galerie consacrées au pop art contemporain et cinétique de Fabian PhiL à Dubaï, de World Art Dubai à la Noor Royal Gallery.',
  dateLabel: 'Date',
  locationLabel: 'Lieu',
  artistsLabel: 'Artistes',
  websiteLabel: 'Site web',
  watchVideo: 'Regarder avec le son et les commandes',
  viewArtworks: 'Voir les œuvres →',
}

// French text only: titles (official names), links, images, videos and event dates come from the
// English data, so both pages always describe the same exhibitions.
type ExhibitionText = Pick<Exhibition, 'date' | 'sections' | 'mediaHeading'> & {
  location?: string
  artists?: string
  // Alt text keyed by image src (lead image included).
  alts: Record<string, string>
  videos?: Record<string, { title: string; label: string }>
}

const frText: Record<string, ExhibitionText> = {
  'Beyond the Gaze': {
    date: '30 septembre – 14 octobre 2026',
    location: 'Alliance Française Dubai',
    sections: [
      {
        heading: 'À propos de l’exposition',
        text: 'Fabian PhiL a présenté son travail dans Beyond the Gaze, à l’Alliance Française Dubai. L’exposition a instauré un dialogue entre le figuratif et l’abstrait, l’intime et l’universel, le mouvement et l’immobilité. De l’intensité d’un regard humain à l’immensité d’un paysage imaginaire, les œuvres invitaient à ralentir, à regarder de nouveau et à laisser la perception évoluer.',
      },
    ],
    mediaHeading: 'Photos de l’exposition',
    alts: {
      '/images/exhibitions/fabian-phil-alliance-francaise-dubai-beyond-the-gaze-2026-08.jpg':
        'Visiteurs devant les œuvres de Fabian PhiL lors de Beyond the Gaze à l’Alliance Française Dubai',
      '/images/exhibitions/fabian-phil-alliance-francaise-dubai-beyond-the-gaze-2026-04.jpg':
        'Vue de l’accrochage des portraits de Fabian PhiL dans Beyond the Gaze',
      '/images/exhibitions/fabian-phil-alliance-francaise-dubai-beyond-the-gaze-2026-07.jpg':
        'Visiteurs observant de près une œuvre de Fabian PhiL dans Beyond the Gaze',
      '/images/exhibitions/fabian-phil-alliance-francaise-dubai-beyond-the-gaze-2026-05.jpg':
        'Texte mural de l’exposition Beyond the Gaze à l’Alliance Française Dubai',
      '/images/exhibitions/fabian-phil-alliance-francaise-dubai-beyond-the-gaze-2026-01.jpeg':
        'Mur de portraits Pop Glasses de Fabian PhiL autour d’Oh Dear! dans Beyond the Gaze',
      '/images/exhibitions/fabian-phil-alliance-francaise-dubai-beyond-the-gaze-2026-06.jpg':
        'Œuvres de Fabian PhiL, dont Runaway Mood, accrochées le long du mur de la galerie dans Beyond the Gaze',
    },
  },
  'Noor Royal Gallery': {
    date: 'Mars – décembre 2026',
    location: 'Dubaï, Émirats arabes unis',
    sections: [
      {
        heading: 'À propos de la présentation',
        text: 'Une présentation en galerie des œuvres de Fabian PhiL à la Noor Royal Gallery, à Dubaï.',
      },
    ],
    mediaHeading: 'Photos et vidéo de la galerie',
    alts: {
      '/images/exhibitions/fabian-phil-noor-royal-gallery-dubai-2026-07.jpg':
        'Intérieur de la Noor Royal Gallery avec les œuvres de Fabian PhiL installées',
      '/images/exhibitions/fabian-phil-noor-royal-gallery-dubai-2026-01.jpg':
        'Fabian PhiL devant l’entrée de la Noor Royal Gallery à Dubaï',
      '/images/exhibitions/fabian-phil-noor-royal-gallery-dubai-2026-05.jpg':
        'Fabian PhiL à côté de son œuvre Ooh! à la Noor Royal Gallery',
      '/images/exhibitions/fabian-phil-noor-royal-gallery-dubai-2026-04.jpg':
        'Fabian PhiL entre Wanted Million Dollar Toon Fight et Wanted for Loving Art à la Noor Royal Gallery',
      '/images/exhibitions/fabian-phil-noor-royal-gallery-dubai-2026-02.jpg':
        'Fabian PhiL devant son triptyque Andy Warhol autour du billet de 100\u00a0USD à la Noor Royal Gallery',
    },
    videos: {
      '/videos/exhibitions/fabian-phil-noor-royal-gallery-dubai-2026-02.mp4': {
        title: 'Noor Royal Gallery – Vue de la galerie',
        label: 'Dans la galerie',
      },
    },
  },
  'DIFC Art Night 2025': {
    date: 'Janvier 2025',
    location: 'Dubai International Financial Centre, Émirats arabes unis',
    sections: [
      {
        heading: 'À propos de la DIFC Art Night',
        text: 'La DIFC Art Night est un événement artistique organisé dans tout le Dubai International Financial Centre, qui présente des œuvres d’artistes confirmés et émergents.',
      },
      {
        heading: 'Participation',
        text: 'Fabian y a présenté des œuvres de pop art cinétique de la série Pop Glasses, dont Maybe I Will See Him, You Call This Art…? et Wanted Smoking Rock Star.',
      },
    ],
    mediaHeading: 'Photos et vidéos de l’exposition',
    alts: {
      '/images/exhibitions/fabian-phil-difc-art-night-2025-christies.jpg': 'DIFC Art Night 2025 – Exposition Christie’s',
      '/images/exhibitions/fabian-phil-difc-art-night-2025-maybe-i-will-see-him-pop-art.jpg':
        'DIFC Art Night 2025 – Maybe I will See Him',
      '/images/exhibitions/fabian-phil-difc-art-night-2025-you-call-this-art-pop-art.jpg':
        'DIFC Art Night 2025 – You Call This Art…?',
      '/images/exhibitions/fabian-phil-difc-art-night-2025-wanted-smoking-rock-star-pop-art-01.jpg':
        'DIFC Art Night 2025 – Wanted Smoking Rock Star',
    },
    videos: {
      '/videos/exhibitions/fabian-phil-difc-art-night-2025-christies.mov': {
        title: 'DIFC Art Night 2025 – Exposition Christie’s',
        label: 'Exposition Christie’s',
      },
      '/videos/exhibitions/fabian-phil-difc-art-night-2025-opera-gallery.mov': {
        title: 'DIFC Art Night 2025 – Opera Gallery',
        label: 'Opera Gallery',
      },
    },
  },
  'World Art Dubai 2024': {
    date: 'Mai 2024',
    location: 'Dubai World Trade Centre, Émirats arabes unis',
    sections: [
      {
        heading: 'À propos de World Art Dubai',
        text: 'World Art Dubai est une foire d’art contemporain organisée au Dubai World Trade Centre, qui présente des artistes et des galeries émergents et confirmés.',
      },
      {
        heading: 'Participation',
        text: 'Fabian y a présenté des œuvres cinétiques des séries Expressive Emotion et Pop Glasses.',
      },
    ],
    mediaHeading: 'Photos et vidéos de l’exposition',
    alts: {
      '/images/exhibitions/fabian-phil-world-art-dubai-2024-artworks.jpg': 'World Art Dubai – Vue d’ensemble des œuvres exposées',
    },
    videos: {
      '/videos/exhibitions/fabian-phil-world-art-dubai-2024-exhibition.mov': {
        title: 'World Art Dubai 2024 – Vue d’ensemble de l’exposition',
        label: 'Vue d’ensemble',
      },
      '/videos/exhibitions/fabian-phil-world-art-dubai-2024-exhibition-catwalk.mov': {
        title: 'World Art Dubai 2024 – Défilé',
        label: 'Défilé',
      },
    },
  },
  'Artmosphere Magazine': {
    date: '2024',
    sections: [
      {
        heading: 'À propos d’Artmosphere',
        text: 'Artmosphere est un magazine d’art consacré aux artistes contemporains, aux expositions et aux tendances artistiques.',
      },
      {
        heading: 'Article',
        text: 'Fabian a fait l’objet d’un article sur l’art cinétique, dans lequel il évoque sa technique du plexiglas superposé et les effets optiques de son travail.',
      },
    ],
    mediaHeading: 'Article de magazine',
    alts: {
      '/images/about/Fabian PhiL_Artmosphere Cover.jpg': 'Couverture du magazine Artmosphere avec Fabian PhiL',
      '/images/about/fabian-phil-artmosphere-magazine-2024-feature.png': 'Article de magazine d’art consacré à Fabian PhiL',
      '/images/about/Fabian Phil Artist overview.png': 'Présentation de l’artiste Fabian PhiL',
    },
  },
}

const required = <T,>(value: T | undefined, what: string): T => {
  if (value === undefined) throw new Error(`Missing French exhibitions text: ${what}`)
  return value
}

export const frExhibitions: Exhibition[] = exhibitions.map((exhibition) => {
  const text = required(frText[exhibition.title], exhibition.title)
  const localizeImage = (image: Exhibition['images'][number]) => ({
    ...image,
    alt: required(text.alts[image.src], image.src),
  })
  return {
    ...exhibition,
    date: text.date,
    ...(exhibition.location ? { location: required(text.location, `${exhibition.title} location`) } : {}),
    ...(exhibition.artists ? { artists: required(text.artists, `${exhibition.title} artists`) } : {}),
    sections: text.sections,
    mediaHeading: text.mediaHeading,
    images: exhibition.images.map(localizeImage),
    ...(exhibition.leadImage ? { leadImage: localizeImage(exhibition.leadImage) } : {}),
    videos: exhibition.videos.map((video) => ({ ...video, ...required(text.videos?.[video.src], video.src) })),
  }
})
