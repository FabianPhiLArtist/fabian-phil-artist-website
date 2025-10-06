'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Play, Heart, Share2, QrCode, ExternalLink, MessageSquare, ZoomIn, Video, X } from 'lucide-react'
import CollectorInquiry from './CollectorInquiry'
import ImageZoomModal from './ImageZoomModal'
import VideoPlayer from './VideoPlayer'

interface ArtworkCardProps {
  artwork: {
    id: number
    title: string
    series: string
    image: string
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

const ArtworkCard = ({ artwork, viewMode }: ArtworkCardProps) => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="group"
    >
      <Link href={`/artwork/${artwork.id}`}>
        <div className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 group-hover:scale-105 ${
          viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
        }`}>
          <div className={`relative overflow-hidden ${
            viewMode === 'list' ? 'h-64 md:h-48 md:w-64 flex-shrink-0' : 'h-80'
          }`}>
            {/* Video or Image */}
            {/* Always Show Image First */}
            <Image
              src={artwork.image}
              alt={artwork.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Video Indicator Overlay - Only if video exists */}
            {artwork.video && (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  toggleVideo()
                }}
                className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 shadow-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 cursor-pointer animate-pulse"
                title="Click to watch video"
              >
                <Play size={12} />
                <span>Video Available</span>
              </button>
            )}

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      toggleZoom()
                    }}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                    title="Zoom in to see details"
                  >
                    <ZoomIn size={16} className="text-white" />
                  </button>
                  {artwork.video && (
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        toggleVideo()
                      }}
                      className="p-2 bg-red-500/80 backdrop-blur-sm rounded-full hover:bg-red-600/90 transition-colors duration-200 shadow-lg"
                      title="Watch video"
                    >
                      <Video size={16} className="text-white" />
                    </button>
                  )}
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setShowInquiry(true)
                }}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200"
                title="Inquire about this artwork"
              >
                <MessageSquare size={16} className="text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  // Add to wishlist functionality
                }}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200"
                title="Add to wishlist"
              >
                <Heart size={16} className="text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  // Share functionality
                }}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200"
                title="Share artwork"
              >
                <Share2 size={16} className="text-white" />
              </button>
              {artwork.qrCode && (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    toggleQR()
                  }}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200"
                  title="Show QR code"
                >
                  <QrCode size={16} className="text-white" />
                </button>
              )}
            </div>

            {/* Series Badge */}
            <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-sm font-medium">{artwork.series}</p>
              <p className="text-xs text-gray-200">{artwork.year} • {artwork.medium}</p>
            </div>

            {/* Sold Overlay */}
            {!artwork.available && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                  Sold
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                {artwork.title}
              </h3>
              <p className="text-2xl font-bold text-gray-900">{artwork.price}</p>
            </div>
            <p className="text-gray-600 text-sm mb-2">{artwork.size}</p>
            <p className="text-gray-500 text-sm line-clamp-2 mb-4">{artwork.description}</p>
            
            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Link
                href={`/artwork/${artwork.id}`}
                className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-200 text-center"
              >
                View Details
              </Link>
              <button
                onClick={() => setShowInquiry(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-1"
              >
                <MessageSquare size={16} />
                <span>Inquire</span>
              </button>
              {artwork.qrCode && (
                <button
                  onClick={toggleQR}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-1"
                >
                  <QrCode size={16} />
                  <span>QR</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* QR Code Modal */}
      {showQR && artwork.qrCode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-sm mx-4">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Scan QR Code</h3>
              <div className="mb-4">
                <img src={artwork.qrCode} alt="QR Code" className="w-48 h-48 mx-auto" />
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Scan this QR code to view the video of this artwork
              </p>
              <button
                onClick={toggleQR}
                className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

          {/* Inquiry Modal */}
          {showInquiry && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
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
                  className="absolute top-4 right-4 z-10 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200"
                >
                  <X size={24} className="text-white" />
                </button>
                <VideoPlayer
                  videoUrl={artwork.video}
                  title={artwork.title}
                  className="w-full h-[70vh]"
                />
                <div className="mt-4 text-center text-white">
                  <h3 className="text-xl font-bold mb-2">{artwork.title}</h3>
                  <p className="text-gray-300">{artwork.series} • {artwork.year}</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )
    }

    export default ArtworkCard
