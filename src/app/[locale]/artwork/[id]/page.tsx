'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, X } from 'lucide-react'
import { artworks } from '@/data/artworks'
import { collectionsForArtwork } from '@/data/collections'
import ImageZoomModal from '@/components/ImageZoomModal'
import CollectorInquiry from '@/components/CollectorInquiry'
import KineticClip from '@/components/home/KineticClip'
import { useLocale } from '@/i18n/useLocale'
import { localizedHref } from '@/i18n/pathnames'
import { primaryButtonClass, textLinkClass } from '@/lib/formStyles'
import { readBrowseContext, type BrowseContext } from '@/lib/browseContext'

const ExtraClip = ({ src, label, onOpen, onError }: { src: string; label: string; onOpen: () => void; onError: () => void }) => {
  const [ratio, setRatio] = useState<number | null>(null)
  return (
    <button
      type="button"
      onClick={onOpen}
      className="relative w-full bg-black overflow-hidden"
      style={{ aspectRatio: ratio ?? 9 / 16 }}
      title="Watch full screen"
    >
      <KineticClip src={encodeURI(src)} label={label} onError={onError} onDimensions={(width, height) => setRatio(width / height)} />
    </button>
  )
}

const secondaryButtonClass = 'inline-flex items-center justify-center gap-2 border border-gray-900 text-gray-900 px-7 py-3 text-xs tracking-[0.18em] uppercase hover:bg-gray-900 hover:text-white transition-colors'

export default function ArtworkDetailPage() {
  const params = useParams()
  const locale = useLocale()
  const artwork: any = artworks.find(art => String(art.id) === String(params.id)) ?? null
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
    const belongs = context && (!context.ids || context.ids.includes(Number(params.id)))
    setBrowseContext(belongs ? context : null)
  }, [params.id])

  const backHref = browseContext?.href ?? localizedHref(locale, 'gallery')
  const backLabel = browseContext && browseContext.label !== 'Gallery' ? `Back to ${browseContext.label}` : 'Back to Gallery'
  const sequence = browseContext?.ids
  const position = sequence ? sequence.indexOf(Number(params.id)) : -1
  const previousId = sequence && position > 0 ? sequence[position - 1] : null
  const nextId = sequence && position >= 0 && position < sequence.length - 1 ? sequence[position + 1] : null
  const clipIsLandscape = clipRatio !== null && clipRatio > 1

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
            <Link href={backHref} className={`${textLinkClass} inline-flex items-center gap-2`}>
              <ArrowLeft size={14} />
              {backLabel}
            </Link>
            {sequence && position >= 0 && sequence.length > 1 && (
              <nav aria-label={`${browseContext?.label} navigation`} className="flex items-center gap-6">
                {previousId !== null ? (
                  <Link href={localizedHref(locale, 'artwork', { id: previousId })} className={textLinkClass}>
                    ← Previous
                  </Link>
                ) : (
                  <span className="text-xs tracking-[0.18em] uppercase text-gray-300">← Previous</span>
                )}
                <span className="text-[11px] tracking-[0.16em] text-gray-400">
                  {position + 1} / {sequence.length}
                </span>
                {nextId !== null ? (
                  <Link href={localizedHref(locale, 'artwork', { id: nextId })} className={textLinkClass}>
                    Next →
                  </Link>
                ) : (
                  <span className="text-xs tracking-[0.18em] uppercase text-gray-300">Next →</span>
                )}
              </nav>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Image Section */}
            <div className="lg:col-span-7">
              <div className="sr-only">
                {artwork.images?.length ? `${artwork.images.length} images available` : '1 image available'}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="relative bg-[#fafafa] aspect-square"
              >
                <button
                  type="button"
                  onClick={() => setShowZoom(true)}
                  className="absolute inset-0 cursor-zoom-in"
                  aria-label={`View ${artwork.title} in detail`}
                >
                  <Image
                    src={(artwork.images && artwork.images.length > 0)
                      ? artwork.images[currentImageIndex]
                      : artwork.image}
                    alt={`${artwork.title}, layered plexiglass artwork by Fabian PhiL`}
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
                      title={`View photo ${index + 1}`}
                    >
                      <Image
                        src={src}
                        alt={`${artwork.title} thumbnail ${index + 1}`}
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
                    title="Watch full screen"
                  >
                    <KineticClip
                      src={encodeURI(artwork.video)}
                      label={`${artwork.title}, filmed as the viewer moves`}
                      onError={() => setClipFailed(true)}
                      onDimensions={(width, height) => setClipRatio(width / height)}
                    />
                  </button>
                  <figcaption className="pt-1">
                    <h2 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-4">In motion</h2>
                    <p className="text-sm md:text-base text-gray-600 font-light leading-relaxed mb-5">
                      Fabian PhiL paints across multiple layers of transparent plexiglass. As the viewer moves, the layers shift in relation to one another, transforming the image with perspective.
                    </p>
                    <button type="button" onClick={() => setActiveVideo(artwork.video)} className={textLinkClass}>
                      Watch full screen →
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
                        label={`${artwork.title}, additional view ${index + 1} filmed as the viewer moves`}
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
                {artwork.series} · {artwork.year}
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-[0.03em] text-gray-900 leading-[1.1] break-words mb-8 md:mb-10">
                {artwork.title}
              </h1>

              <h2 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-4">Artwork Details</h2>
              <dl className="border-t border-gray-200 divide-y divide-gray-200 mb-10">
                <div className="flex justify-between gap-6 py-3.5">
                  <dt className="text-[11px] tracking-[0.16em] uppercase text-gray-500 pt-0.5">Medium</dt>
                  <dd className="text-sm text-gray-900 font-light text-right">{artwork.medium}</dd>
                </div>
                <div className="flex justify-between gap-6 py-3.5">
                  <dt className="text-[11px] tracking-[0.16em] uppercase text-gray-500 pt-0.5">Dimensions</dt>
                  <dd className="text-sm text-gray-900 font-light text-right">{artwork.size}</dd>
                </div>
                <div className="flex justify-between gap-6 py-3.5">
                  <dt className="text-[11px] tracking-[0.16em] uppercase text-gray-500 pt-0.5">Price</dt>
                  <dd className="text-sm text-gray-900 text-right">
                    {artwork.available ? 'Price upon Inquiry' : 'SOLD'}
                  </dd>
                </div>
                <div className="flex justify-between gap-6 py-3.5 border-b border-gray-200">
                  <dt className="text-[11px] tracking-[0.16em] uppercase text-gray-500 pt-0.5">Availability</dt>
                  <dd className="text-sm text-gray-900 font-light text-right">
                    {artwork.available ? 'Available' : 'Sold'}
                  </dd>
                </div>
              </dl>

              <h2 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-4">About This Artwork</h2>
              <p className="text-sm md:text-base text-gray-600 font-light leading-relaxed mb-10">
                {artwork.description}
              </p>

              <div className="flex flex-col gap-3 mb-12">
                <button onClick={() => setShowInquiry(true)} className={`${primaryButtonClass} w-full`}>
                  Inquire About This Artwork
                </button>
                <button onClick={() => setShowZoom(true)} className={`${secondaryButtonClass} w-full`}>
                  View Full Details
                </button>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-[13px] md:text-sm tracking-[0.12em] uppercase text-gray-900 mb-2">
                  Part of {artwork.series}
                </h3>
                <p className="text-sm text-gray-600 font-light leading-relaxed mb-4">
                  This artwork is part of a curated collection showcasing {artwork.series.toLowerCase()}.
                </p>
                <Link
                  href={localizedHref(locale, 'gallery', { query: { series: artwork.series } })}
                  className={textLinkClass}
                >
                  View all artworks in this collection →
                </Link>
                {artworkCollections.length > 0 && (
                  <div className="mt-6">
                    <p className="text-[11px] tracking-[0.16em] uppercase text-gray-500 mb-2">Featured in</p>
                    <ul className="flex flex-wrap gap-x-5 gap-y-2 list-none p-0 m-0">
                      {artworkCollections.map((collection) => (
                        <li key={collection.slug}>
                          <Link
                            href={localizedHref(locale, 'collection', { id: collection.slug })}
                            className={textLinkClass}
                          >
                            {collection.name} →
                          </Link>
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
        series={artwork.series}
        year={artwork.year}
        medium={artwork.medium}
        size={artwork.size}
        description={artwork.description}
      />

      {/* Inquiry Modal */}
      {showInquiry && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <CollectorInquiry
            artworkTitle={artwork.title}
            artworkId={artwork.id}
            onClose={() => setShowInquiry(false)}
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
            aria-label="Close video"
          >
            <X size={24} />
          </button>
          <div className="flex flex-col items-center max-w-full" onClick={(event) => event.stopPropagation()}>
            <video
              key={activeVideo}
              src={encodeURI(activeVideo)}
              className="block max-h-[78vh] max-w-full w-auto bg-black object-contain"
              aria-label={`${artwork.title}, filmed as the viewer moves`}
              controls
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="mt-4 text-center text-white">
              <h3 className="text-sm tracking-[0.16em] uppercase mb-1">{artwork.title}</h3>
              <p className="text-[11px] tracking-[0.16em] uppercase text-gray-400">{artwork.series} · {artwork.year}</p>
              <p className="text-xs text-gray-500 mt-1 font-light">{artwork.medium}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
