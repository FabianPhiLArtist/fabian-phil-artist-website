'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ZoomIn, Heart, Share2, MessageSquare, QrCode, Video, X } from 'lucide-react'
import { artworks } from '@/data/artworks'
import ImageZoomModal from '@/components/ImageZoomModal'
import CollectorInquiry from '@/components/CollectorInquiry'
import VideoPlayer from '@/components/VideoPlayer'

export default function ArtworkDetailPage() {
  const params = useParams()
  const [artwork, setArtwork] = useState<any>(null)
  const [showZoom, setShowZoom] = useState(false)
  const [showInquiry, setShowInquiry] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    if (params.id) {
      const foundArtwork = artworks.find(art => art.id === parseInt(params.id as string))
      setArtwork(foundArtwork)
    }
  }, [params.id])

  if (!artwork) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Artwork Not Found</h1>
          <p className="text-gray-600 mb-8">The artwork you're looking for doesn't exist.</p>
          <Link
            href="/gallery"
            className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Gallery
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link
                href="/gallery"
                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to Gallery
              </Link>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">{artwork.series}</span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-500">{artwork.year}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Section */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="relative h-96 lg:h-[600px]">
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  
                  {/* Video Indicator */}
                  {artwork.video && (
                    <button
                      onClick={() => setShowVideo(true)}
                      className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2 shadow-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 cursor-pointer animate-pulse"
                      title="Click to watch video"
                    >
                      <Video size={16} />
                      <span>Video Available</span>
                    </button>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={() => setShowZoom(true)}
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200"
                      title="Zoom in to see details"
                    >
                      <ZoomIn size={20} className="text-white" />
                    </button>
                    <button
                      onClick={() => setShowInquiry(true)}
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200"
                      title="Inquire about this artwork"
                    >
                      <MessageSquare size={20} className="text-white" />
                    </button>
                    <button
                      onClick={() => {
                        // Wishlist functionality
                      }}
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200"
                      title="Add to wishlist"
                    >
                      <Heart size={20} className="text-white" />
                    </button>
                    <button
                      onClick={() => {
                        // Share functionality
                      }}
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200"
                      title="Share artwork"
                    >
                      <Share2 size={20} className="text-white" />
                    </button>
                    {artwork.qrCode && (
                      <button
                        onClick={() => setShowQR(!showQR)}
                        className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200"
                        title="View QR code"
                      >
                        <QrCode size={20} className="text-white" />
                      </button>
                    )}
                    {artwork.video && (
                      <button
                        onClick={() => setShowVideo(true)}
                        className="p-3 bg-red-500/80 backdrop-blur-sm rounded-full hover:bg-red-600/90 transition-colors duration-200 shadow-lg"
                        title="Watch video"
                      >
                        <Video size={20} className="text-white" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* QR Code Display */}
              {showQR && artwork.qrCode && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 bg-white rounded-2xl shadow-lg p-6 text-center"
                >
                  <h3 className="text-xl font-bold mb-4">Scan QR Code</h3>
                  <div className="mb-4">
                    <img src={artwork.qrCode} alt="QR Code" className="w-48 h-48 mx-auto" />
                  </div>
                  <p className="text-gray-600 text-sm">
                    Scan this QR code to view the video of this artwork
                  </p>
                </motion.div>
              )}
            </div>

            {/* Details Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Title and Series */}
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{artwork.title}</h1>
                <div className="flex items-center space-x-4 text-lg text-gray-600">
                  <span className="font-medium">{artwork.series}</span>
                  <span>•</span>
                  <span>{artwork.year}</span>
                </div>
              </div>

              {/* Technical Details */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Artwork Details</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Medium:</span>
                    <span className="font-medium">{artwork.medium}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dimensions:</span>
                    <span className="font-medium">{artwork.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-bold text-lg text-gray-900">{artwork.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Availability:</span>
                    <span className={`font-medium ${artwork.available ? 'text-green-600' : 'text-red-600'}`}>
                      {artwork.available ? 'Available' : 'Sold'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Artwork</h2>
                <p className="text-gray-700 leading-relaxed text-lg">{artwork.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowInquiry(true)}
                  className="flex-1 bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <MessageSquare size={20} />
                  <span>Inquire About This Artwork</span>
                </button>
                <button
                  onClick={() => setShowZoom(true)}
                  className="flex-1 border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-900 hover:text-white transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <ZoomIn size={20} />
                  <span>View Full Details</span>
                </button>
              </div>

              {/* Collection Info */}
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Part of {artwork.series}</h3>
                <p className="text-gray-300 mb-4">
                  This artwork is part of a curated collection showcasing {artwork.series.toLowerCase()}.
                </p>
                <Link
                  href={`/gallery?series=${encodeURIComponent(artwork.series)}`}
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  View all artworks in this collection
                  <ArrowLeft size={16} className="ml-2 rotate-180" />
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
        title={artwork.title}
        series={artwork.series}
        year={artwork.year}
        medium={artwork.medium}
        size={artwork.size}
        description={artwork.description}
      />

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

      {/* Video Modal */}
      {artwork.video && showVideo && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-6xl max-h-[90vh]">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200"
            >
              <X size={24} className="text-white" />
            </button>
            <VideoPlayer
              videoUrl={artwork.video}
              title={artwork.title}
              className="w-full h-[80vh]"
            />
            <div className="mt-4 text-center text-white">
              <h3 className="text-2xl font-bold mb-2">{artwork.title}</h3>
              <p className="text-gray-300 text-lg">{artwork.series} • {artwork.year}</p>
              <p className="text-gray-400 mt-2">{artwork.medium}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
