'use client'

import React, { useCallback, useState } from 'react'
import Image from 'next/image'
import LocaleLink from '@/components/LocaleLink'
import { useLocale } from '@/i18n/useLocale'
import { fill } from '@/lib/template'
import ImageLightbox, { type LightboxImage } from '@/components/home/ImageLightbox'

type ImageText = { alt: string; caption: string }

export type ArtistCredibilityCopy = {
  heading: string
  intro: string
  aboutLink: string
  exhibitionsLink: string
  // "{caption}" is replaced with the photo caption.
  enlargeLabel: string
  closeLabel: string
  studioAlt: string
  images: [ImageText, ImageText, ImageText]
}

const englishCopy: ArtistCredibilityCopy = {
  heading: 'The artist behind the work',
  intro:
    'Fabian PhiL is a French contemporary artist based in Dubai, creating original pop portraits on layered plexiglass. Faces, expressive gazes, colour and movement come together in works that transform as the viewer changes position.',
  aboutLink: 'About the artist →',
  exhibitionsLink: 'Exhibitions →',
  enlargeLabel: 'Enlarge photo: {caption}',
  closeLabel: 'Close',
  studioAlt: 'Fabian PhiL, French contemporary pop artist, in his Dubai studio',
  images: [
    { alt: 'Noor Royal Gallery interior with Fabian PhiL artworks installed', caption: 'Noor Royal Gallery' },
    { alt: 'Visitors viewing Fabian PhiL artworks at Alliance Française Dubai', caption: 'Alliance Française Dubai' },
    { alt: 'Fabian PhiL at World Art Dubai with a presentation of his artworks', caption: 'World Art Dubai' },
  ],
}

const exhibitionImages: Omit<LightboxImage, 'alt' | 'caption'>[] = [
  {
    src: '/images/exhibitions/fabian-phil-noor-royal-gallery-dubai-2026-07.jpg',
    width: 2722,
    height: 2214,
  },
  {
    src: '/images/exhibitions/fabian-phil-alliance-francaise-dubai-beyond-the-gaze-2026-08.jpg',
    width: 4032,
    height: 3024,
  },
  {
    src: '/images/exhibitions/fabian-phil-world-art-dubai-2024-artworks.jpg',
    width: 3024,
    height: 4032,
    grayscale: true,
  },
]

const StudioImage = ({ alt, className }: { alt: string; className?: string }) => (
  <div className={`relative w-full aspect-[4/5] overflow-hidden bg-gray-100 ${className ?? ''}`}>
    <Image
      src="/images/exhibitions/fabian-phil-artist-studio-dubai.jpg"
      alt={alt}
      fill
      className="object-cover object-top grayscale"
      sizes="(max-width: 1024px) 100vw, 50vw"
    />
  </div>
)

const ArtistCredibility = ({ copy = englishCopy }: { copy?: ArtistCredibilityCopy }) => {
  const locale = useLocale()
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null)
  const closeLightbox = useCallback(() => setLightboxImage(null), [])
  const images: LightboxImage[] = exhibitionImages.map((image, index) => ({ ...image, ...copy.images[index] }))

  return (
    <section className="bg-white pt-12 pb-10 md:pt-20 md:pb-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div>
            <h2 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-5">
              {copy.heading}
            </h2>
            <p className="text-lg md:text-xl font-light text-gray-800 leading-relaxed mb-6">
              {copy.intro}
            </p>

            <StudioImage alt={copy.studioAlt} className="mb-6 lg:hidden" />

            <LocaleLink
              locale={locale}
              route="about"
              className="text-xs tracking-[0.18em] uppercase text-gray-900 hover:text-gray-600 transition-colors"
            >
              {copy.aboutLink}
            </LocaleLink>

            <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
              {images.map((image) => (
                <figure key={image.src} className="m-0">
                  <button
                    type="button"
                    onClick={() => setLightboxImage(image)}
                    aria-label={fill(copy.enlargeLabel, { caption: image.caption })}
                    className="group relative block w-full aspect-[16/10] overflow-hidden bg-gray-100 cursor-zoom-in"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className={`object-cover group-hover:opacity-90 transition-opacity ${image.grayscale ? 'grayscale' : ''}`}
                      sizes="(max-width: 1024px) 40vw, 16vw"
                    />
                  </button>
                  <figcaption className="mt-1.5 text-[11px] tracking-wide text-gray-500">
                    {image.caption}
                  </figcaption>
                </figure>
              ))}
            </div>

            <LocaleLink
              locale={locale}
              route="exhibitions"
              className="mt-5 inline-block text-xs tracking-[0.18em] uppercase text-gray-900 hover:text-gray-600 transition-colors"
            >
              {copy.exhibitionsLink}
            </LocaleLink>
          </div>

          <StudioImage alt={copy.studioAlt} className="hidden lg:block" />
        </div>
      </div>
      <ImageLightbox image={lightboxImage} onClose={closeLightbox} closeLabel={copy.closeLabel} />
    </section>
  )
}

export default ArtistCredibility
