'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import SimpleImageModal from '@/components/SimpleImageModal'
import VideoModal from '@/components/VideoModal'
import KineticClip from '@/components/home/KineticClip'
import Link from 'next/link'
import { useLocale } from '@/i18n/useLocale'
import { localizedHref } from '@/i18n/pathnames'
import { textLinkClass } from '@/lib/formStyles'

interface ExhibitionImage {
  src: string
  alt: string
  orientation?: 'landscape' | 'portrait'
}

interface ExhibitionVideo {
  src: string
  title: string
  label: string
  landscape?: boolean
}

interface Exhibition {
  title: string
  date: string
  location?: string
  artists?: string
  link?: { href: string; label: string }
  sections: { heading: string; text: string }[]
  mediaHeading: string
  images: ExhibitionImage[]
  leadImage?: ExhibitionImage
  videos: ExhibitionVideo[]
}

const exhibitions: Exhibition[] = [
  {
    title: 'Beyond the Gaze',
    date: '30 September – 14 October 2026',
    location: 'Alliance Française Dubai',
    artists: 'Fabian PhiL & Pascal Navarro',
    sections: [
      {
        heading: 'About the exhibition',
        text: 'Beyond the Gaze brings together two French artists, Fabian Philandrianos and Pascal Navarro. Bringing their two practices together, the exhibition creates a dialogue between the figurative and the abstract, the intimate and the universal, movement and stillness. From the intensity of a human gaze to the vastness of an imagined landscape, the works encourage us to slow down, look again and allow perception to shift.',
      },
    ],
    mediaHeading: 'Exhibition Photos',
    leadImage: { src: '/images/exhibitions/Alliance 8.jpg', alt: 'Visitors viewing Fabian PhiL artworks in Beyond the Gaze at Alliance Française Dubai' },
    images: [
      { src: '/images/exhibitions/Alliance 4.jpg', alt: 'Installation view of Fabian PhiL portraits in Beyond the Gaze', orientation: 'landscape' },
      { src: '/images/exhibitions/Alliance 7.jpg', alt: 'Visitors looking closely at a Fabian PhiL artwork in Beyond the Gaze', orientation: 'landscape' },
      { src: '/images/exhibitions/Alliance 5.jpg', alt: 'Beyond the Gaze exhibition wall text at Alliance Française Dubai', orientation: 'portrait' },
      { src: '/images/exhibitions/Alliance Francaise 1.jpeg', alt: 'Wall of Fabian PhiL Pop glasses portraits around Oh Dear! in Beyond the Gaze', orientation: 'portrait' },
      { src: '/images/exhibitions/Alliance 6.jpg', alt: 'Fabian PhiL artworks including Runaway Mood hung along the gallery wall in Beyond the Gaze', orientation: 'landscape' },
    ],
    videos: [],
  },
  {
    title: 'Noor Royal Gallery',
    date: 'March – December 2026',
    location: 'Dubai, UAE',
    sections: [
      {
        heading: 'About the presentation',
        text: "A gallery presentation of Fabian PhiL's work at Noor Royal Gallery in Dubai.",
      },
    ],
    mediaHeading: 'Gallery Photos & Video',
    leadImage: { src: '/images/exhibitions/Noor 7.jpg', alt: 'Noor Royal Gallery interior with Fabian PhiL artworks installed' },
    images: [
      { src: '/images/exhibitions/Noor 1.jpg', alt: 'Fabian PhiL outside the entrance of Noor Royal Gallery in Dubai', orientation: 'portrait' },
      { src: '/images/exhibitions/Noor 5.jpg', alt: 'Fabian PhiL beside his artwork Ooh! at Noor Royal Gallery', orientation: 'portrait' },
      { src: '/images/exhibitions/Noor 4.jpg', alt: 'Fabian PhiL between Wanted Million Dollar Toon Fight and Wanted for Loving Art at Noor Royal Gallery', orientation: 'landscape' },
      { src: '/images/exhibitions/Noor 2.jpg', alt: 'Fabian PhiL in front of his Andy Warhol 100 USD bill triptych at Noor Royal Gallery', orientation: 'landscape' },
    ],
    videos: [
      { src: '/videos/exhibitions/Noor Gallery 1.mp4', title: 'Noor Royal Gallery - Gallery view', label: 'In the gallery' },
    ],
  },
  {
    title: 'DIFC Art Night 2025',
    date: 'January 2025',
    location: 'Dubai International Financial Centre, UAE',
    link: { href: 'https://www.difc.ae', label: 'difc.ae' },
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
      { src: '/images/exhibitions/DIFC Christies.jpg', alt: 'DIFC Art Night 2025 - Christies Exhibition' },
      { src: '/images/exhibitions/DIFC Maybe I will see him.jpg', alt: 'DIFC Art Night 2025 - Maybe I will see him' },
      { src: '/images/exhibitions/DIFC you call this Art.jpg', alt: 'DIFC Art Night 2025 - You call this Art' },
      { src: '/images/exhibitions/DIFC Wanted Smoking Rock Star.jpg', alt: 'DIFC Art Night 2025 - Wanted Smoking Rock Star' },
    ],
    videos: [
      { src: '/videos/exhibitions/DIFC Christies.MOV', title: 'DIFC Art Night 2025 - Christies Exhibition', label: 'Christies Exhibition' },
      { src: '/videos/exhibitions/DIFC Opera Gallery.mov', title: 'DIFC Art Night 2025 - Opera Gallery', label: 'Opera Gallery', landscape: true },
    ],
  },
  {
    title: 'World Art Dubai 2024',
    date: 'May 2024',
    location: 'Dubai World Trade Centre, UAE',
    link: { href: 'https://www.worldartdubai.com', label: 'worldartdubai.com' },
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
      { src: '/images/exhibitions/WAD_photos all paintings.jpg', alt: 'World Art Dubai - All paintings display' },
    ],
    videos: [
      { src: '/videos/exhibitions/WAD24_exhibition May2024.MOV', title: 'World Art Dubai 2024 - Exhibition Overview', label: 'Exhibition Overview' },
      { src: '/videos/exhibitions/WAD24_exhibition catwalk.MOV', title: 'World Art Dubai 2024 - Catwalk Show', label: 'Catwalk Show' },
    ],
  },
  {
    title: 'Artmosphere Magazine',
    date: '2024',
    link: { href: 'https://www.artmosphere.com', label: 'artmosphere.com' },
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
      { src: '/images/about/Art Magazine picture.png', alt: 'Art Magazine feature' },
      { src: '/images/about/Fabian Phil Artist overview.png', alt: 'Fabian PhiL Artist overview' },
    ],
    videos: [],
  },
]

const imageGridClass = (count: number) => {
  if (count >= 4) return 'grid-cols-2 sm:grid-cols-4'
  if (count === 3) return 'grid-cols-2 sm:grid-cols-3'
  return 'grid-cols-2'
}

const ExhibitionsPage = () => {
  const locale = useLocale()
  const [modalImage, setModalImage] = useState<{
    src: string
    alt: string
    title?: string
  } | null>(null)

  const [modalVideo, setModalVideo] = useState<{
    src: string
    title?: string
    poster?: string
  } | null>(null)

  const [failedVideos, setFailedVideos] = useState<string[]>([])

  const openImageModal = (src: string, alt: string, title?: string) => {
    setModalImage({ src, alt, title })
  }

  const openVideoModal = (src: string, title?: string, poster?: string) => {
    setModalVideo({ src, title, poster })
  }

  const closeModals = () => {
    setModalImage(null)
    setModalVideo(null)
  }

  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl mb-14 md:mb-20">
          <h1 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-6">
            Exhibitions
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-900 leading-relaxed">
            Selected exhibitions and gallery presentations of Fabian PhiL&apos;s contemporary and kinetic pop art in Dubai.
          </p>
        </header>

        <div className="space-y-20 md:space-y-28">
          {exhibitions.map((exhibition, index) => {
            return (
              <article
                key={exhibition.title}
                className="border-t border-gray-900 pt-8 md:pt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16"
              >
                <div className="lg:col-span-4">
                  <p className="text-[11px] tracking-[0.2em] uppercase text-gray-400 mb-4">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h2 className={`font-light uppercase tracking-[0.04em] text-gray-900 mb-6 ${
                    exhibition.leadImage ? 'text-3xl md:text-4xl lg:text-5xl leading-[1.1]' : 'text-2xl md:text-3xl leading-snug'
                  }`}>
                    {exhibition.title}
                  </h2>
                  <dl className="space-y-1.5 text-[11px] tracking-[0.16em] uppercase mb-10">
                    <div className="flex gap-3">
                      <dt className="sr-only">Date</dt>
                      <dd className="text-gray-900">{exhibition.date}</dd>
                    </div>
                    {exhibition.location && (
                      <div className="flex gap-3">
                        <dt className="sr-only">Location</dt>
                        <dd className="text-gray-500">{exhibition.location}</dd>
                      </div>
                    )}
                    {exhibition.artists && (
                      <div className="flex gap-3">
                        <dt className="sr-only">Artists</dt>
                        <dd className="text-gray-500">{exhibition.artists}</dd>
                      </div>
                    )}
                    {exhibition.link && (
                      <div className="flex gap-3 pt-1">
                        <dt className="sr-only">Website</dt>
                        <dd>
                          <a
                            href={exhibition.link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-900 border-b border-gray-900 pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-colors normal-case tracking-[0.06em] text-xs"
                          >
                            {exhibition.link.label}
                          </a>
                        </dd>
                      </div>
                    )}
                  </dl>

                  <div className="space-y-8">
                    {exhibition.sections.map((section) => (
                      <div key={section.heading}>
                        <h3 className="text-[11px] tracking-[0.16em] uppercase text-gray-500 mb-3">
                          {section.heading}
                        </h3>
                        <p className="text-sm md:text-base text-gray-600 font-light leading-relaxed">
                          {section.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-8">
                  <h3 className="sr-only">{exhibition.mediaHeading}</h3>
                  {exhibition.leadImage && (
                    <button
                      type="button"
                      onClick={() => openImageModal(exhibition.leadImage!.src, exhibition.leadImage!.alt, exhibition.title)}
                      className="relative block w-full aspect-[4/3] bg-gray-100 overflow-hidden hover:opacity-90 transition-opacity mb-3 md:mb-4"
                    >
                      <Image
                        src={exhibition.leadImage.src}
                        alt={exhibition.leadImage.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover"
                      />
                    </button>
                  )}
                  <div className={`grid gap-3 md:gap-4 ${exhibition.leadImage ? 'grid-cols-2' : imageGridClass(exhibition.images.length)}`}>
                    {exhibition.images.map((image, imageIndex) => {
                      const spansRow = !!exhibition.leadImage && exhibition.images.length % 2 === 1 && imageIndex === exhibition.images.length - 1
                      return (
                      <button
                        key={image.src}
                        type="button"
                        onClick={() => openImageModal(image.src, image.alt, exhibition.title)}
                        className={`relative block w-full bg-gray-100 overflow-hidden hover:opacity-90 transition-opacity ${
                          spansRow ? 'col-span-2 aspect-[16/9]' : image.orientation === 'landscape' ? 'aspect-[4/3]' : 'aspect-[3/4]'
                        }`}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes={spansRow ? '(max-width: 1024px) 100vw, 60vw' : exhibition.leadImage ? '(max-width: 1024px) 50vw, 30vw' : '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 22vw'}
                          className="object-cover"
                        />
                      </button>
                      )
                    })}
                  </div>

                  {exhibition.videos.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 md:gap-4 mt-3 md:mt-4">
                      {exhibition.videos.filter((video) => !failedVideos.includes(video.src)).map((video) => (
                        <button
                          key={video.src}
                          type="button"
                          onClick={() => openVideoModal(video.src, video.title)}
                          className={`relative block w-full bg-black overflow-hidden text-left ${
                            video.landscape ? 'h-full min-h-[12rem]' : 'aspect-[9/16]'
                          }`}
                          title="Watch with sound and controls"
                        >
                          <KineticClip
                            src={encodeURI(video.src)}
                            label={video.title}
                            onError={() => setFailedVideos((prev) => [...prev, video.src])}
                          />
                          <span className="absolute left-3 bottom-3 flex items-center gap-2 bg-gray-900/85 text-white px-3 py-1.5 text-[10px] tracking-[0.16em] uppercase">
                            <Play size={10} fill="currentColor" />
                            {video.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-20 md:mt-28 border-t border-gray-200 pt-8">
          <Link href={localizedHref(locale, 'gallery')} className={textLinkClass}>
            View the artworks →
          </Link>
        </div>
      </div>

      {/* Image Modal */}
      {modalImage && (
        <SimpleImageModal
          isOpen={!!modalImage}
          onClose={closeModals}
          imageSrc={modalImage.src}
          alt={modalImage.alt}
          title={modalImage.title}
        />
      )}

      {/* Video Modal */}
      {modalVideo && (
        <VideoModal
          isOpen={!!modalVideo}
          onClose={closeModals}
          videoSrc={modalVideo.src}
          title={modalVideo.title}
          poster={modalVideo.poster}
        />
      )}
    </div>
  )
}

export default ExhibitionsPage
