'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Play, Heart, Share2, QrCode, MessageSquare, ZoomIn, Video, X } from 'lucide-react'
import CollectorInquiry from './CollectorInquiry'
import ImageZoomModal from './ImageZoomModal'
import VideoPlayer from './VideoPlayer'
import { useLocale } from '@/i18n/useLocale'
import { localizedHref } from '@/i18n/pathnames'

interface ArtworkCardProps {
  artwork: {
    id: number
    title: string
    series: string
    image: string
    images?: string[]
    video?: string
    qrCode?: string
    year: string
    medium: string
    size: string
    price: string
    description: string
    available: boolean
  }
  viewMode: 'grid' | 'list'
}

const overlayButtonClass = 'p-2 bg-white/90 text-gray-900 hover:bg-white transition-colors'
const textActionClass = 'text-[11px] tracking-[0.16em] uppercase text-gray-900 hover:text-gray-500 transition-colors'

const ArtworkCard = ({ artwork, viewMode }: ArtworkCardProps) => {
  const locale = useLocale()
  const [showQR, setShowQR] = useState(false)
  const [showInquiry, setShowInquiry] = useState(false)
  const [showZoom, setShowZoom] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  const toggleQR = () => {
    setShowQR(!showQR)
  }

  const toggleZoom = () => {
    setShowZoom(!showZoom)
  }

  const toggleVideo = () => {
    setShowVideo(!showVideo)
  }

  const isList = viewMode === 'list'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Link href={localizedHref(locale, 'artwork', { id: artwork.id })} className="block">
        <div className={isList ? 'flex flex-col sm:flex-row gap-5 sm:gap-8 py-6' : ''}>
          <div className={`relative overflow-hidden bg-[#fafafa] ${
            isList ? 'w-full sm:w-56 md:w-64 aspect-square flex-shrink-0' : 'w-full aspect-square'
          }`}>
            <Image
              src={artwork.image}
              alt={artwork.title}
              fill
              sizes={isList ? '(max-width: 640px) 100vw, 256px' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
              className="object-cover group-hover:opacity-90 transition-opacity duration-300"
            />

            {artwork.video && (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  toggleVideo()
                }}
                className="absolute top-3 left-3 bg-gray-900/85 text-white px-2.5 py-1 text-[10px] tracking-[0.16em] uppercase flex items-center gap-1.5 hover:bg-gray-900 transition-colors"
                title="Click to watch video"
              >
                <Play size={10} fill="currentColor" />
                <span>Video</span>
              </button>
            )}

            <div className="absolute top-3 right-3 hidden md:flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  toggleZoom()
                }}
                className={overlayButtonClass}
                title="Zoom in to see details"
              >
                <ZoomIn size={14} />
              </button>
              {artwork.video && (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    toggleVideo()
                  }}
                  className={overlayButtonClass}
                  title="Watch video"
                >
                  <Video size={14} />
                </button>
              )}
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setShowInquiry(true)
                }}
                className={overlayButtonClass}
                title="Inquire about this artwork"
              >
                <MessageSquare size={14} />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  // Add to wishlist functionality
                }}
                className={overlayButtonClass}
                title="Add to wishlist"
              >
                <Heart size={14} />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  // Share functionality
                }}
                className={overlayButtonClass}
                title="Share artwork"
              >
                <Share2 size={14} />
              </button>
              {artwork.qrCode && (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    toggleQR()
                  }}
                  className={overlayButtonClass}
                  title="Show QR code"
                >
                  <QrCode size={14} />
                </button>
              )}
            </div>
          </div>

          <div className={isList ? 'flex-1 min-w-0' : 'pt-4'}>
            <h3 className="text-lg md:text-xl font-light uppercase tracking-[0.04em] text-gray-900 leading-tight group-hover:text-gray-600 transition-colors">
              {artwork.title}
            </h3>
            <p className="mt-2 text-[10px] tracking-[0.18em] uppercase text-gray-500">
              {artwork.series} · {artwork.year}
            </p>
            <p className="mt-1.5 text-[13px] text-gray-600 font-light">{artwork.size}</p>
            <p className={`mt-1 text-[11px] tracking-[0.14em] uppercase ${artwork.available ? 'text-gray-500' : 'text-gray-900'}`}>
              {artwork.available ? 'Price upon Inquiry' : 'Sold'}
            </p>
            {isList && (
              <p className="mt-1 text-[13px] text-gray-500 font-light">{artwork.medium}</p>
            )}
            <p className="mt-3 text-[13px] text-gray-500 font-light leading-relaxed line-clamp-2">
              {artwork.description}
            </p>

            <div className="mt-4 flex items-center gap-5">
              <span className={textActionClass}>View Details →</span>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setShowInquiry(true)
                }}
                className={textActionClass}
              >
                Inquire
              </button>
              {artwork.qrCode && (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    toggleQR()
                  }}
                  className={textActionClass}
                >
                  QR
                </button>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* QR Code Modal */}
      {showQR && artwork.qrCode && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={toggleQR}>
          <div className="bg-white p-8 max-w-sm w-full text-center" onClick={(e) => e.stopPropagation()}>
            <p className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-6">Scan QR Code</p>
            <img src={artwork.qrCode} alt="QR Code" className="w-48 h-48 mx-auto mb-5" />
            <p className="text-sm text-gray-600 font-light mb-6">
              Scan this QR code to view the video of this artwork
            </p>
            <button
              onClick={toggleQR}
              className="bg-gray-900 text-white px-7 py-3 text-xs tracking-[0.18em] uppercase hover:bg-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

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

      {/* Image Zoom Modal */}
      <ImageZoomModal
        isOpen={showZoom}
        onClose={() => setShowZoom(false)}
        imageSrc={artwork.image}
        images={artwork.images}
        title={artwork.title}
        series={artwork.series}
        year={artwork.year || '2024'}
        medium={artwork.medium}
        size={artwork.size}
        description={artwork.description}
      />

      {/* Video Modal */}
      {artwork.video && showVideo && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl max-h-[90vh]">
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
              className="w-full h-[70vh]"
            />
            <div className="mt-4 text-center text-white">
              <h3 className="text-sm tracking-[0.16em] uppercase mb-1">{artwork.title}</h3>
              <p className="text-[11px] tracking-[0.16em] uppercase text-gray-400">{artwork.series} · {artwork.year}</p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default ArtworkCard
