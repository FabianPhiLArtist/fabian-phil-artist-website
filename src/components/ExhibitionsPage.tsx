'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import SimpleImageModal, { type SimpleImageModalCopy } from '@/components/SimpleImageModal'
import VideoModal from '@/components/VideoModal'
import KineticClip from '@/components/home/KineticClip'
import JsonLd from '@/components/JsonLd'
import Link from 'next/link'
import { useLocale } from '@/i18n/useLocale'
import { localizedHref } from '@/i18n/pathnames'
import { textLinkClass } from '@/lib/formStyles'
import { exhibitionEventsStructuredData } from '@/lib/structuredDataShared'
import { exhibitions as englishExhibitions, exhibitionEventsFrom, type Exhibition } from '@/data/exhibitions'

export type ExhibitionsCopy = {
  heading: string
  intro: string
  dateLabel: string
  locationLabel: string
  artistsLabel: string
  websiteLabel: string
  watchVideo: string
  viewArtworks: string
}

const englishCopy: ExhibitionsCopy = {
  heading: 'Exhibitions',
  intro: 'Selected exhibitions and gallery presentations of Fabian PhiL\'s contemporary and kinetic pop art in Dubai.',
  dateLabel: 'Date',
  locationLabel: 'Location',
  artistsLabel: 'Artists',
  websiteLabel: 'Website',
  watchVideo: 'Watch with sound and controls',
  viewArtworks: 'View the artworks →',
}

const imageGridClass = (count: number) => {
  if (count >= 4) return 'grid-cols-2 sm:grid-cols-4'
  if (count === 3) return 'grid-cols-2 sm:grid-cols-3'
  return 'grid-cols-2'
}

type Props = {
  exhibitions?: Exhibition[]
  copy?: ExhibitionsCopy
  imageModalCopy?: SimpleImageModalCopy
}

const ExhibitionsPage = ({ exhibitions = englishExhibitions, copy = englishCopy, imageModalCopy }: Props) => {
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
      <JsonLd data={exhibitionEventsStructuredData(exhibitionEventsFrom(exhibitions), locale)} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl mb-14 md:mb-20">
          <h1 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-6">
            {copy.heading}
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-900 leading-relaxed">
            {copy.intro}
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
                      <dt className="sr-only">{copy.dateLabel}</dt>
                      <dd className="text-gray-900">{exhibition.date}</dd>
                    </div>
                    {exhibition.location && (
                      <div className="flex gap-3">
                        <dt className="sr-only">{copy.locationLabel}</dt>
                        <dd className="text-gray-500">{exhibition.location}</dd>
                      </div>
                    )}
                    {exhibition.artists && (
                      <div className="flex gap-3">
                        <dt className="sr-only">{copy.artistsLabel}</dt>
                        <dd className="text-gray-500">{exhibition.artists}</dd>
                      </div>
                    )}
                    {exhibition.link && (
                      <div className="flex gap-3 pt-1">
                        <dt className="sr-only">{copy.websiteLabel}</dt>
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
                          title={copy.watchVideo}
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
            {copy.viewArtworks}
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
          {...(imageModalCopy ? { copy: imageModalCopy } : {})}
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
