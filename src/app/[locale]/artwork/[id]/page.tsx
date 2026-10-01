'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ZoomIn, Heart, Share2, MessageSquare, QrCode, Video, Play, X } from 'lucide-react'
import { artworks } from '@/data/artworks'
import ImageZoomModal from '@/components/ImageZoomModal'
import CollectorInquiry from '@/components/CollectorInquiry'
import VideoPlayer from '@/components/VideoPlayer'
import KineticClip from '@/components/home/KineticClip'
import { useLocale } from '@/i18n/useLocale'
import { localizedHref } from '@/i18n/pathnames'
import { primaryButtonClass, textLinkClass } from '@/lib/formStyles'

const overlayButtonClass = 'p-2.5 bg-white/90 text-gray-900 hover:bg-white transition-colors'
const secondaryButtonClass = 'inline-flex items-center justify-center gap-2 border border-gray-900 text-gray-900 px-7 py-3 text-xs tracking-[0.18em] uppercase hover:bg-gray-900 hover:text-white transition-colors'

export default function ArtworkDetailPage() {
  const params = useParams()
  const locale = useLocale()
  const [artwork, setArtwork] = useState<any>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showZoom, setShowZoom] = useState(false)
  const [showInquiry, setShowInquiry] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [clipFailed, setClipFailed] = useState(false)

  useEffect(() => {
    if (params.id) {
      const foundArtwork = artworks.find(art => art.id === parseInt(params.id as string))
      setArtwork(foundArtwork)
      setCurrentImageIndex(0)
      setClipFailed(false)
    }
  }, [params.id])

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
          <div className="pb-6 md:pb-8">
            <Link
              href={localizedHref(locale, 'gallery')}
              className={`${textLinkClass} inline-flex items-center gap-2`}
            >
              <ArrowLeft size={14} />
              Back to Gallery
            </Link>
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
                <Image
                  src={(artwork.images && artwork.images.length > 0)
                    ? artwork.images[currentImageIndex]
                    : artwork.image}
                  alt={artwork.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-contain"
                  priority
                />

                {artwork.video && (
                  <button
                    onClick={() => setShowVideo(true)}
                    className="absolute top-4 left-4 bg-gray-900/85 text-white px-3 py-1.5 text-[10px] tracking-[0.16em] uppercase flex items-center gap-2 hover:bg-gray-900 transition-colors"
                    title="Click to watch video"
                  >
                    <Play size={10} fill="currentColor" />
                    <span>Video Available</span>
                  </button>
                )}

                <div className="absolute top-4 right-4 flex gap-1.5">
                  <button onClick={() => setShowZoom(true)} className={overlayButtonClass} title="Zoom in to see details">
                    <ZoomIn size={16} />
                  </button>
                  <button onClick={() => setShowInquiry(true)} className={overlayButtonClass} title="Inquire about this artwork">
                    <MessageSquare size={16} />
                  </button>
                  <button
                    onClick={() => {
                      // Wishlist functionality
                    }}
                    className={overlayButtonClass}
                    title="Add to wishlist"
                  >
                    <Heart size={16} />
                  </button>
                  <button
                    onClick={() => {
                      // Share functionality
                    }}
                    className={overlayButtonClass}
                    title="Share artwork"
                  >
                    <Share2 size={16} />
                  </button>
                  {artwork.qrCode && (
                    <button onClick={() => setShowQR(!showQR)} className={overlayButtonClass} title="View QR code">
                      <QrCode size={16} />
                    </button>
                  )}
                  {artwork.video && (
                    <button onClick={() => setShowVideo(true)} className={overlayButtonClass} title="Watch video">
                      <Video size={16} />
                    </button>
                  )}
                </div>
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
                <figure className="mt-10 md:mt-12 flex gap-5 md:gap-8 items-start">
                  <button
                    type="button"
                    onClick={() => setShowVideo(true)}
                    className="relative shrink-0 w-[44%] max-w-[300px] aspect-[9/16] bg-black overflow-hidden"
                    title="Watch with controls"
                  >
                    <KineticClip
                      src={encodeURI(artwork.video)}
                      label={`${artwork.title}, filmed as the viewer moves`}
                      onError={() => setClipFailed(true)}
                    />
                  </button>
                  <figcaption className="pt-1">
                    <h2 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-4">In motion</h2>
                    <p className="text-sm md:text-base text-gray-600 font-light leading-relaxed mb-5">
                      Fabian PhiL paints across multiple layers of transparent plexiglass. As the viewer moves, the layers shift in relation to one another, transforming the image with perspective.
                    </p>
                    <button type="button" onClick={() => setShowVideo(true)} className={textLinkClass}>
                      Watch full screen →
                    </button>
                  </figcaption>
                </figure>
              )}

              {showQR && artwork.qrCode && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 border border-gray-200 p-6 text-center"
                >
                  <h3 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-4">Scan QR Code</h3>
                  <img src={artwork.qrCode} alt="QR Code" className="w-48 h-48 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 font-light">
                    Scan this QR code to view the video of this artwork
                  </p>
                </motion.div>
              )}
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
      {artwork.video && showVideo && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-6xl max-h-[90vh]">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/15 hover:bg-white/30 transition-colors"
              aria-label="Close video"
            >
              <X size={22} className="text-white" />
            </button>
            <VideoPlayer
              videoUrl={artwork.video}
              title={artwork.title}
              className="w-full h-[80vh]"
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
