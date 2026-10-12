'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, X } from 'lucide-react'
import { artworks } from '@/data/artworks'
import { artworkSlugs } from '@/data/artworkSlugs'
import { collectionsForArtwork, type CollectionSlug } from '@/data/collections'
import ImageZoomModal, { type ImageZoomModalCopy } from '@/components/ImageZoomModal'
import CollectorInquiry, { type CollectorInquiryCopy } from '@/components/CollectorInquiry'
import KineticClip from '@/components/home/KineticClip'
import LocaleLink from '@/components/LocaleLink'
import { useLocale } from '@/i18n/useLocale'
import { fallbackHrefLang, localizedHref } from '@/i18n/pathnames'
import { fill, fillParts } from '@/lib/template'
import { primaryButtonClass, textLinkClass } from '@/lib/formStyles'
import { readBrowseContext, type BrowseContext } from '@/lib/browseContext'

// Templates: "{title}", "{label}", "{series}", "{seriesLower}" and "{n}" are filled in.
export type ArtworkDetailCopy = {
  backToGallery: string
  backTo: string
  navigation: string
  previous: string
  next: string
  imagesAvailable: string
  oneImageAvailable: string
  viewInDetail: string
  viewPhoto: string
  thumbnailAlt: string
  additionalViewAlt: string
  watchFullScreen: string
  watchFullScreenLink: string
  filmedLabel: string
  extraFilmedLabel: string
  inMotion: string
  details: string
  medium: string
  dimensions: string
  price: string
  availability: string
  priceOnRequest: string
  soldPrice: string
  available: string
  sold: string
  about: string
  inquire: string
  viewFullDetails: string
  partOf: string
  partOfText: string
  viewSeries: string
  featuredIn: string
  closeVideo: string
  collectionNames?: Record<CollectionSlug, string>
  zoom?: ImageZoomModalCopy
  inquiry?: CollectorInquiryCopy
}

// Localized artwork fields; the title is never translated.
export type ArtworkDetailText = {
  imageAlt: string
  description: string
  inMotion: string
  medium: string
  size: string
  series: string
  // Heading of the series block (whose link filters the gallery by artwork.series); defaults to series.
  seriesBlock?: string
}

const englishCopy: ArtworkDetailCopy = {
  backToGallery: 'Back to Gallery',
  backTo: 'Back to {label}',
  navigation: '{label} navigation',
  previous: '← Previous',
  next: 'Next →',
  imagesAvailable: '{n} images available',
  oneImageAvailable: '1 image available',
  viewInDetail: 'View {title} in detail',
  viewPhoto: 'View photo {n}',
  thumbnailAlt: '{title} thumbnail {n}',
  additionalViewAlt: '{title} by Fabian PhiL, additional view {n}',
  watchFullScreen: 'Watch full screen',
  watchFullScreenLink: 'Watch full screen →',
  filmedLabel: '{title}, filmed as the viewer moves',
  extraFilmedLabel: '{title}, additional view {n} filmed as the viewer moves',
  inMotion: 'In motion',
  details: 'Artwork Details',
  medium: 'Medium',
  dimensions: 'Dimensions',
  price: 'Price',
  availability: 'Availability',
  priceOnRequest: 'Price upon Inquiry',
  soldPrice: 'SOLD',
  available: 'Available',
  sold: 'Sold',
  about: 'About This Artwork',
  inquire: 'Inquire About This Artwork',
  viewFullDetails: 'View Full Details',
  partOf: 'Part of {series}',
  partOfText: 'This artwork is part of a curated collection showcasing {seriesLower}.',
  viewSeries: 'View all artworks in this collection →',
  featuredIn: 'Featured in',
  closeVideo: 'Close video',
}

const defaultInMotion =
  'Fabian PhiL paints across multiple layers of transparent plexiglass. As the viewer moves, the layers shift in relation to one another, transforming the image with perspective.'

const ExtraClip = ({ src, label, title, onOpen, onError }: { src: string; label: string; title: string; onOpen: () => void; onError: () => void }) => {
  const [ratio, setRatio] = useState<number | null>(null)
  return (
    <button
      type="button"
      onClick={onOpen}
      className="relative w-full bg-black overflow-hidden"
      style={{ aspectRatio: ratio ?? 9 / 16 }}
      title={title}
    >
      <KineticClip src={encodeURI(src)} label={label} onError={onError} onDimensions={(width, height) => setRatio(width / height)} />
    </button>
  )
}

const secondaryButtonClass = 'inline-flex items-center justify-center gap-2 border border-gray-900 text-gray-900 px-7 py-3 text-xs tracking-[0.18em] uppercase hover:bg-gray-900 hover:text-white transition-colors'

export default function ArtworkDetail({ copy = englishCopy, text }: { copy?: ArtworkDetailCopy; text?: ArtworkDetailText }) {
  const params = useParams()
  const locale = useLocale()
  const artwork: any = artworks.find(art => artworkSlugs[art.id] === String(params.id)) ?? null
  const artworkCollections = artwork ? collectionsForArtwork(artwork) : []
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showZoom, setShowZoom] = useState(false)
  const [showInquiry, setShowInquiry] = useState(false)
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const [failedExtras, setFailedExtras] = useState<string[]>([])
  const [clipFailed, setClipFailed] = useState(false)
  const [clipRatio, setClipRatio] = useState<number | null>(null)
  const [browseContext, setBrowseContext] = useState<BrowseContext | null>(null)

  useEffect(() => {
    setCurrentImageIndex(0)
    setClipFailed(false)
    setClipRatio(null)
    setFailedExtras([])
    const context = readBrowseContext()
    const belongs = context && (!context.ids || context.ids.includes(artwork?.id))
    setBrowseContext(belongs ? context : null)
  }, [params.id])

  const backHref = browseContext?.href ?? localizedHref(locale, 'gallery')
  const backLabel = browseContext && browseContext.label !== 'Gallery' ? fill(copy.backTo, { label: browseContext.label }) : copy.backToGallery
  const sequence = browseContext?.ids
  const position = sequence && artwork ? sequence.indexOf(artwork.id) : -1
  const previousId = sequence && position > 0 ? sequence[position - 1] : null
  const nextId = sequence && position >= 0 && position < sequence.length - 1 ? sequence[position + 1] : null
  const clipIsLandscape = clipRatio !== null && clipRatio > 1
  const series: string = text?.series ?? artwork?.series ?? ''
  const medium: string = text?.medium ?? artwork?.medium
  const size: string = text?.size ?? artwork?.size
  const description: string = text?.description ?? artwork?.description
  const mainImageAlt = text?.imageAlt ?? artwork?.imageAlt ?? `${artwork?.title}, layered plexiglass artwork by Fabian PhiL`
  const photoAlt = (src: string, index: number) =>
    src === artwork?.image ? mainImageAlt : fill(copy.additionalViewAlt, { title: artwork?.title, n: index })
  const filmedLabel = fill(copy.filmedLabel, { title: artwork?.title })

  if (!artwork) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-4">Artwork Not Found</h1>
          <p className="text-sm text-gray-600 font-light mb-8">The artwork you&apos;re looking for doesn&apos;t exist.</p>
          <Link href={localizedHref(locale, 'gallery')} className={textLinkClass}>
            ← Back to Gallery
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-white pt-24 md:pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pb-6 md:pb-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
            <Link
              href={backHref}
              hrefLang={browseContext ? undefined : fallbackHrefLang(locale, 'gallery')}
              className={`${textLinkClass} inline-flex items-center gap-2`}
            >
              <ArrowLeft size={14} />
              {backLabel}
            </Link>
            {sequence && position >= 0 && sequence.length > 1 && (
              <nav aria-label={fill(copy.navigation, { label: browseContext?.label ?? '' })} className="flex items-center gap-6">
                {previousId !== null ? (
                  <LocaleLink locale={locale} route="artwork" options={{ id: previousId }} className={textLinkClass}>
                    {copy.previous}
                  </LocaleLink>
                ) : (
                  <span className="text-xs tracking-[0.18em] uppercase text-gray-300">{copy.previous}</span>
                )}
                <span className="text-[11px] tracking-[0.16em] text-gray-400">
                  {position + 1} / {sequence.length}
                </span>
                {nextId !== null ? (
                  <LocaleLink locale={locale} route="artwork" options={{ id: nextId }} className={textLinkClass}>
                    {copy.next}
                  </LocaleLink>
                ) : (
                  <span className="text-xs tracking-[0.18em] uppercase text-gray-300">{copy.next}</span>
                )}
              </nav>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Image Section */}
            <div className="lg:col-span-7">
              <div className="sr-only">
                {artwork.images?.length ? fill(copy.imagesAvailable, { n: artwork.images.length }) : copy.oneImageAvailable}
              </div>
              {/* The primary image must stay visible in server HTML for image search, so it is never faded from opacity 0. */}
              <motion.div
                initial={{ scale: 0.985 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative bg-[#fafafa] aspect-square"
              >
                <button
                  type="button"
                  onClick={() => setShowZoom(true)}
                  className="absolute inset-0 cursor-zoom-in"
                  aria-label={fill(copy.viewInDetail, { title: artwork.title })}
                >
                  <Image
                    src={(artwork.images && artwork.images.length > 0)
                      ? artwork.images[currentImageIndex]
                      : artwork.image}
                    alt={(artwork.images && artwork.images.length > 0)
                      ? photoAlt(artwork.images[currentImageIndex], currentImageIndex)
                      : mainImageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-contain"
                    priority
                  />
                </button>
              </motion.div>

              {artwork.images && artwork.images.length > 1 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {artwork.images.map((src: string, index: number) => (
                    <button
                      key={`${src}-${index}`}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative h-16 w-16 overflow-hidden bg-[#fafafa] border transition-colors ${
                        index === currentImageIndex ? 'border-gray-900' : 'border-transparent hover:border-gray-300'
                      }`}
                      title={fill(copy.viewPhoto, { n: index + 1 })}
                    >
                      <Image
                        src={src}
                        alt={fill(copy.thumbnailAlt, { title: artwork.title, n: index + 1 })}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {artwork.video && !clipFailed && (
                <figure className={`mt-10 md:mt-12 flex items-start ${clipIsLandscape ? 'flex-col gap-5' : 'gap-5 md:gap-8'}`}>
                  <button
                    type="button"
                    onClick={() => setActiveVideo(artwork.video)}
                    className={`relative shrink-0 bg-black overflow-hidden ${clipIsLandscape ? 'w-full' : 'w-[44%] max-w-[300px]'}`}
                    style={{ aspectRatio: clipRatio ?? 9 / 16 }}
                    title={copy.watchFullScreen}
                  >
                    <KineticClip
                      src={encodeURI(artwork.video)}
                      label={filmedLabel}
                      onError={() => setClipFailed(true)}
                      onDimensions={(width, height) => setClipRatio(width / height)}
                    />
                  </button>
                  <figcaption className="pt-1">
                    <h2 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-4">{copy.inMotion}</h2>
                    <p className="text-sm md:text-base text-gray-600 font-light leading-relaxed mb-5">
                      {text?.inMotion ?? artwork.inMotion ?? defaultInMotion}
                    </p>
                    <button type="button" onClick={() => setActiveVideo(artwork.video)} className={textLinkClass}>
                      {copy.watchFullScreenLink}
                    </button>
                  </figcaption>
                </figure>
              )}

              {(() => {
                const extras = (artwork.extraVideos ?? []).filter((src: string) => !failedExtras.includes(src))
                if (extras.length === 0) return null
                return (
                  <div className="mt-6 md:mt-8 grid grid-cols-3 gap-3 md:gap-4 items-start">
                    {extras.map((src: string, index: number) => (
                      <ExtraClip
                        key={src}
                        src={src}
                        label={fill(copy.extraFilmedLabel, { title: artwork.title, n: index + 1 })}
                        title={copy.watchFullScreen}
                        onOpen={() => setActiveVideo(src)}
                        onError={() => setFailedExtras((current) => [...current, src])}
                      />
                    ))}
                  </div>
                )
              })()}

            </div>

            {/* Details Section */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <p className="text-[11px] tracking-[0.18em] uppercase text-gray-500 mb-3">
                {series} · {artwork.year}
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-[0.03em] text-gray-900 leading-[1.1] break-words mb-8 md:mb-10">
                {artwork.title}
              </h1>

              <h2 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-4">{copy.details}</h2>
              <dl className="border-t border-gray-200 divide-y divide-gray-200 mb-10">
                <div className="flex justify-between gap-6 py-3.5">
                  <dt className="text-[11px] tracking-[0.16em] uppercase text-gray-500 pt-0.5">{copy.medium}</dt>
                  <dd className="text-sm text-gray-900 font-light text-right">{medium}</dd>
                </div>
                <div className="flex justify-between gap-6 py-3.5">
                  <dt className="text-[11px] tracking-[0.16em] uppercase text-gray-500 pt-0.5">{copy.dimensions}</dt>
                  <dd className="text-sm text-gray-900 font-light text-right">{size}</dd>
                </div>
                <div className="flex justify-between gap-6 py-3.5">
                  <dt className="text-[11px] tracking-[0.16em] uppercase text-gray-500 pt-0.5">{copy.price}</dt>
                  <dd className="text-sm text-gray-900 text-right">
                    {artwork.available ? copy.priceOnRequest : copy.soldPrice}
                  </dd>
                </div>
                <div className="flex justify-between gap-6 py-3.5 border-b border-gray-200">
                  <dt className="text-[11px] tracking-[0.16em] uppercase text-gray-500 pt-0.5">{copy.availability}</dt>
                  <dd className="text-sm text-gray-900 font-light text-right">
                    {artwork.available ? copy.available : copy.sold}
                  </dd>
                </div>
              </dl>

              <h2 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-4">{copy.about}</h2>
              <p className="text-sm md:text-base text-gray-600 font-light leading-relaxed mb-10">
                {description}
              </p>

              <div className="flex flex-col gap-3 mb-12">
                <button onClick={() => setShowInquiry(true)} className={`${primaryButtonClass} w-full`}>
                  {copy.inquire}
                </button>
                <button onClick={() => setShowZoom(true)} className={`${secondaryButtonClass} w-full`}>
                  {copy.viewFullDetails}
                </button>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-[13px] md:text-sm tracking-[0.12em] uppercase text-gray-900 mb-2">
                  {fillParts(copy.partOf, { series: text?.seriesBlock ?? series })}
                </h3>
                <p className="text-sm text-gray-600 font-light leading-relaxed mb-4">
                  {fillParts(copy.partOfText, { seriesLower: artwork.series.toLowerCase() })}
                </p>
                <LocaleLink
                  locale={locale}
                  route="gallery"
                  options={{ query: { series: artwork.series } }}
                  className={textLinkClass}
                >
                  {copy.viewSeries}
                </LocaleLink>
                {artworkCollections.length > 0 && (
                  <div className="mt-6">
                    <p className="text-[11px] tracking-[0.16em] uppercase text-gray-500 mb-2">{copy.featuredIn}</p>
                    <ul className="flex flex-wrap gap-x-5 gap-y-2 list-none p-0 m-0">
                      {artworkCollections.map((collection) => (
                        <li key={collection.slug}>
                          <LocaleLink
                            locale={locale}
                            route="collection"
                            options={{ id: collection.slug }}
                            className={textLinkClass}
                          >
                            {copy.collectionNames?.[collection.slug] ?? collection.name} →
                          </LocaleLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Image Zoom Modal */}
      <ImageZoomModal
        isOpen={showZoom}
        onClose={() => setShowZoom(false)}
        imageSrc={artwork.image}
        images={artwork.images}
        title={artwork.title}
        series={series}
        year={artwork.year}
        medium={medium}
        size={size}
        description={description}
        mainImageAlt={mainImageAlt}
        {...(copy.zoom ? { copy: copy.zoom } : {})}
      />

      {/* Inquiry Modal */}
      {showInquiry && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <CollectorInquiry
            artworkTitle={artwork.title}
            artworkId={artwork.id}
            onClose={() => setShowInquiry(false)}
            {...(copy.inquiry ? { copy: copy.inquiry } : {})}
          />
        </div>
      )}

      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 bg-black flex items-center justify-center z-50 p-4 md:p-8"
          onClick={() => setActiveVideo(null)}
        >
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-4 right-4 z-10 p-2 text-white/80 hover:text-white transition-colors"
            aria-label={copy.closeVideo}
          >
            <X size={24} />
          </button>
          <div className="flex flex-col items-center max-w-full" onClick={(event) => event.stopPropagation()}>
            <video
              key={activeVideo}
              src={encodeURI(activeVideo)}
              className="block max-h-[78vh] max-w-full w-auto bg-black object-contain"
              aria-label={filmedLabel}
              controls
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="mt-4 text-center text-white">
              <h3 className="text-sm tracking-[0.16em] uppercase mb-1">{artwork.title}</h3>
              <p className="text-[11px] tracking-[0.16em] uppercase text-gray-400">{series} · {artwork.year}</p>
              <p className="text-xs text-gray-500 mt-1 font-light">{medium}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}