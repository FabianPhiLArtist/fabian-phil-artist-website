'use client'

import React, { useCallback, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from '@/i18n/useLocale'
import { localizedHref } from '@/i18n/pathnames'
import ImageLightbox, { type LightboxImage } from '@/components/home/ImageLightbox'

const exhibitionImages: LightboxImage[] = [
  {
    src: '/images/exhibitions/Noor 7.jpg',
    alt: 'Noor Royal Gallery interior with Fabian PhiL artworks installed',
    width: 2722,
    height: 2214,
    caption: 'Noor Royal Gallery',
  },
  {
    src: '/images/exhibitions/WAD_photos all paintings.jpg',
    alt: 'Fabian PhiL at World Art Dubai with a presentation of his artworks',
    width: 3024,
    height: 4032,
    caption: 'World Art Dubai',
    grayscale: true,
  },
]

const StudioImage = ({ className }: { className?: string }) => (
  <div className={`relative w-full aspect-[4/5] overflow-hidden bg-gray-100 ${className ?? ''}`}>
    <Image
      src="/images/exhibitions/Fabian Studio Dubai.jpg"
      alt="Fabian PhiL in his Dubai studio at the worktable"
      fill
      className="object-cover object-top grayscale"
      sizes="(max-width: 1024px) 100vw, 50vw"
    />
  </div>
)

const ArtistCredibility = () => {
  const locale = useLocale()
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null)
  const closeLightbox = useCallback(() => setLightboxImage(null), [])

  return (
    <section className="bg-white pt-12 pb-10 md:pt-20 md:pb-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div>
            <h2 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-5">
              The artist behind the work
            </h2>
            <p className="text-lg md:text-xl font-light text-gray-800 leading-relaxed mb-6">
              Fabian PhiL (Fabian Philandrianos) is a French contemporary artist based in Dubai, where he works from his studio in Umm Suqeim 1. He creates his kinetic portraits by painting with chopsticks across multiple layers of transparent plexiglass, building images that shift as the viewer moves.
            </p>

            <StudioImage className="mb-6 lg:hidden" />

            <Link
              href={localizedHref(locale, 'about')}
              className="text-xs tracking-[0.18em] uppercase text-gray-900 hover:text-gray-600 transition-colors"
            >
              About the artist →
            </Link>

            <div className="mt-8 grid grid-cols-2 gap-3 max-w-sm">
              {exhibitionImages.map((image) => (
                <figure key={image.src} className="m-0">
                  <button
                    type="button"
                    onClick={() => setLightboxImage(image)}
                    aria-label={`Enlarge photo: ${image.caption}`}
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
          </div>

          <StudioImage className="hidden lg:block" />
        </div>
      </div>
      <ImageLightbox image={lightboxImage} onClose={closeLightbox} />
    </section>
  )
}

export default ArtistCredibility
