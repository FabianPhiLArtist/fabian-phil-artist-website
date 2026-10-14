import type { ExhibitionEventInput } from '@/lib/structuredDataShared'

export interface ExhibitionImage {
  src: string
  alt: string
  orientation?: 'landscape' | 'portrait'
}

export interface ExhibitionVideo {
  src: string
  title: string
  label: string
  landscape?: boolean
}

export interface Exhibition {
  title: string
  date: string
  location?: string
  artists?: string
  link?: { href: string; label: string }
  // ISO dates must match the visible `date`; leave unset for features that are not events.
  event?: { slug: string; startDate: string; endDate?: string; venue: string }
  sections: { heading: string; text: string }[]
  mediaHeading: string
  images: ExhibitionImage[]
  leadImage?: ExhibitionImage
  videos: ExhibitionVideo[]
}

export const exhibitions: Exhibition[] = [
  {
    title: 'Beyond the Gaze',
    date: '30 September – 14 October 2026',
    location: 'Alliance Française Dubai',
    link: { href: 'https://www.afdubai.org', label: 'afdubai.org' },
    event: { slug: 'beyond-the-gaze', startDate: '2026-09-30', endDate: '2026-10-14', venue: 'Alliance Française Dubai' },
    sections: [
      {
        heading: 'About the exhibition',
        text: 'Fabian PhiL presented his work in Beyond the Gaze at Alliance Française Dubai. The exhibition created a dialogue between the figurative and the abstract, the intimate and the universal, movement and stillness. From the intensity of a human gaze to the vastness of an imagined landscape, the works encouraged us to slow down, look again and allow perception to shift.',
      },
    ],
    mediaHeading: 'Exhibition Photos',
    leadImage: { src: '/images/exhibitions/fabian-phil-alliance-francaise-dubai-beyond-the-gaze-2026-08.jpg', alt: 'Visitors viewing Fabian PhiL artworks in Beyond the Gaze at Alliance Française Dubai' },
    images: [
      { src: '/images/exhibitions/fabian-phil-alliance-francaise-dubai-beyond-the-gaze-2026-04.jpg', alt: 'Installation view of Fabian PhiL portraits in Beyond the Gaze', orientation: 'landscape' },
      { src: '/images/exhibitions/fabian-phil-alliance-francaise-dubai-beyond-the-gaze-2026-07.jpg', alt: 'Visitors looking closely at a Fabian PhiL artwork in Beyond the Gaze', orientation: 'landscape' },
      { src: '/images/exhibitions/fabian-phil-alliance-francaise-dubai-beyond-the-gaze-2026-05.jpg', alt: 'Beyond the Gaze exhibition wall text at Alliance Française Dubai', orientation: 'portrait' },
      { src: '/images/exhibitions/fabian-phil-alliance-francaise-dubai-beyond-the-gaze-2026-01.jpeg', alt: 'Wall of Fabian PhiL Pop glasses portraits around Oh Dear! in Beyond the Gaze', orientation: 'portrait' },
      { src: '/images/exhibitions/fabian-phil-alliance-francaise-dubai-beyond-the-gaze-2026-06.jpg', alt: 'Fabian PhiL artworks including Runaway Mood hung along the gallery wall in Beyond the Gaze', orientation: 'landscape' },
    ],
    videos: [],
  },
  {
    title: 'Noor Royal Gallery',
    date: 'March – December 2026',
    location: 'Dubai, UAE',
    link: { href: 'https://noorroyalgallery.com', label: 'noorroyalgallery.com' },
    event: { slug: 'noor-royal-gallery-2026', startDate: '2026-03', endDate: '2026-12', venue: 'Noor Royal Gallery' },
    sections: [
      {
        heading: 'About the presentation',
        text: "A gallery presentation of Fabian PhiL's work at Noor Royal Gallery in Dubai.",
      },
    ],
    mediaHeading: 'Gallery Photos & Video',
    leadImage: { src: '/images/exhibitions/fabian-phil-noor-royal-gallery-dubai-2026-07.jpg', alt: 'Noor Royal Gallery interior with Fabian PhiL artworks installed' },
    images: [
      { src: '/images/exhibitions/fabian-phil-noor-royal-gallery-dubai-2026-01.jpg', alt: 'Fabian PhiL outside the entrance of Noor Royal Gallery in Dubai', orientation: 'portrait' },
      { src: '/images/exhibitions/fabian-phil-noor-royal-gallery-dubai-2026-05.jpg', alt: 'Fabian PhiL beside his artwork Ooh! at Noor Royal Gallery', orientation: 'portrait' },
      { src: '/images/exhibitions/fabian-phil-noor-royal-gallery-dubai-2026-04.jpg', alt: 'Fabian PhiL between Wanted Million Dollar Toon Fight and Wanted for Loving Art at Noor Royal Gallery', orientation: 'landscape' },
      { src: '/images/exhibitions/fabian-phil-noor-royal-gallery-dubai-2026-02.jpg', alt: 'Fabian PhiL in front of his Andy Warhol 100 USD bill triptych at Noor Royal Gallery', orientation: 'landscape' },
    ],
    videos: [
      { src: '/videos/exhibitions/fabian-phil-noor-royal-gallery-dubai-2026-02.mp4', title: 'Noor Royal Gallery - Gallery view', label: 'In the gallery' },
    ],
  },
  {
    title: 'DIFC Art Night 2025',
    date: 'January 2025',
    location: 'Dubai International Financial Centre, UAE',
    link: { href: 'https://www.difc.ae', label: 'difc.ae' },
    event: { slug: 'difc-art-night-2025', startDate: '2025-01', venue: 'Dubai International Financial Centre' },
    sections: [
      {
        heading: 'About DIFC Art Night',
        text: 'DIFC Art Night is an art event held across Dubai International Financial Centre, presenting work by established and emerging artists.',
      },
      {
        heading: 'Participation',
        text: 'Fabian presented kinetic pop artworks from the Pop glasses series, including Maybe I Will See Him, You Call This Art…? and Wanted Smoking Rock Star.',
      },
    ],
    mediaHeading: 'Exhibition Photos & Videos',
    images: [
      { src: '/images/exhibitions/fabian-phil-difc-art-night-2025-christies.jpg', alt: 'DIFC Art Night 2025 - Christies Exhibition' },
      { src: '/images/exhibitions/fabian-phil-difc-art-night-2025-maybe-i-will-see-him-pop-art.jpg', alt: 'DIFC Art Night 2025 - Maybe I will see him' },
      { src: '/images/exhibitions/fabian-phil-difc-art-night-2025-you-call-this-art-pop-art.jpg', alt: 'DIFC Art Night 2025 - You call this Art' },
      { src: '/images/exhibitions/fabian-phil-difc-art-night-2025-wanted-smoking-rock-star-pop-art-01.jpg', alt: 'DIFC Art Night 2025 - Wanted Smoking Rock Star' },
    ],
    videos: [
      { src: '/videos/exhibitions/fabian-phil-difc-art-night-2025-christies.mov', title: 'DIFC Art Night 2025 - Christies Exhibition', label: 'Christies Exhibition' },
      { src: '/videos/exhibitions/fabian-phil-difc-art-night-2025-opera-gallery.mov', title: 'DIFC Art Night 2025 - Opera Gallery', label: 'Opera Gallery', landscape: true },
    ],
  },
  {
    title: 'World Art Dubai 2024',
    date: 'May 2024',
    location: 'Dubai World Trade Centre, UAE',
    link: { href: 'https://www.worldartdubai.com', label: 'worldartdubai.com' },
    event: { slug: 'world-art-dubai-2024', startDate: '2024-05', venue: 'Dubai World Trade Centre' },
    sections: [
      {
        heading: 'About World Art Dubai',
        text: 'World Art Dubai is a contemporary art fair held at Dubai World Trade Centre, presenting emerging and established artists and galleries.',
      },
      {
        heading: 'Participation',
        text: 'Fabian presented kinetic artworks from the Expressive Emotion and Pop glasses series.',
      },
    ],
    mediaHeading: 'Exhibition Photos & Videos',
    images: [
      { src: '/images/exhibitions/fabian-phil-world-art-dubai-2024-artworks.jpg', alt: 'World Art Dubai - All paintings display' },
    ],
    videos: [
      { src: '/videos/exhibitions/fabian-phil-world-art-dubai-2024-exhibition.mov', title: 'World Art Dubai 2024 - Exhibition Overview', label: 'Exhibition Overview' },
      { src: '/videos/exhibitions/fabian-phil-world-art-dubai-2024-exhibition-catwalk.mov', title: 'World Art Dubai 2024 - Catwalk Show', label: 'Catwalk Show' },
    ],
  },
  {
    title: 'Artmosphere Magazine',
    date: '2024',
    sections: [
      {
        heading: 'About Artmosphere',
        text: 'Artmosphere is an art magazine covering contemporary artists, exhibitions and art trends.',
      },
      {
        heading: 'Feature',
        text: 'Fabian was featured in an article on kinetic art, discussing his layered plexiglass technique and the optical effects in his work.',
      },
    ],
    mediaHeading: 'Magazine Feature',
    images: [
      { src: '/images/about/Fabian PhiL_Artmosphere Cover.jpg', alt: 'Artmosphere Magazine Cover featuring Fabian PhiL' },
      { src: '/images/about/fabian-phil-artmosphere-magazine-2024-feature.png', alt: 'Art Magazine feature' },
      { src: '/images/about/Fabian Phil Artist overview.png', alt: 'Fabian PhiL Artist overview' },
    ],
    videos: [],
  },
]

export const exhibitionEventsFrom = (list: Exhibition[]): ExhibitionEventInput[] =>
  list.flatMap((exhibition) =>
    exhibition.event
      ? [{ ...exhibition.event, name: exhibition.title, image: (exhibition.leadImage ?? exhibition.images[0])?.src }]
      : []
  )
