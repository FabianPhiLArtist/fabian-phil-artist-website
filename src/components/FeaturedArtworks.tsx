'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ZoomIn } from 'lucide-react'
import ImageZoomModal from './ImageZoomModal'

const FeaturedArtworks = () => {
  const [showZoom, setShowZoom] = useState(false)
  const [selectedArtwork, setSelectedArtwork] = useState<any>(null)

  const handleZoom = (artwork: any) => {
    setSelectedArtwork(artwork)
    setShowZoom(true)
  }

  const artworks = [
    {
      id: 1,
      title: "Wanted for Racing Life",
      series: "Mugshot Collection",
      image: "/images/artworks/Fabian PhiL Wanted for Racing Life 2024 B&W.jpg",
      year: "2024",
      medium: "Mixed Media on Canvas",
      description: "A powerful statement on the high-speed lifestyle and risks of racing culture."
    },
    {
      id: 2,
      title: "100 USD Mick Jagger",
      series: "100 USD Bill Collection",
      image: "/images/artworks/Fabian PhiL_100USD Mick Jagger_2022_54000aed.jpg",
      year: "2022",
      medium: "Mixed Media on Canvas",
      description: "A striking portrait of Mick Jagger incorporating currency elements and pop art aesthetics."
    },
    {
      id: 3,
      title: "I am the Last Samurai",
      series: "Moving Hair Collection",
      image: "/images/artworks/Fabian PhiL_I am the Last Samurai_2024_72400aed.jpg",
      year: "2024",
      medium: "Acrylic paint and ink on two acrylic sheets",
      description: "A powerful portrait exploring themes of honor, tradition, and modern identity. The kinetic hair movement adds a dynamic element that enhances the samurai's presence."
    }
  ]

  return (
    <>
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Featured Artworks
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the dynamic world of kinetic pop art through these signature pieces
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link href={`/artwork/${artwork.id}`}>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 group-hover:scale-105">
                      <div className="relative h-80 overflow-hidden">
                        <Image
                          src={artwork.image}
                          alt={artwork.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-sm font-medium">{artwork.series}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            handleZoom(artwork)
                          }}
                          className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                          title="Zoom in to see details"
                        >
                          <ZoomIn size={16} className="text-white" />
                        </button>
                      </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {artwork.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">{artwork.year} • {artwork.medium}</p>
                    <p className="text-gray-500 text-sm line-clamp-2">{artwork.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-full font-semibold text-lg hover:bg-gray-800 transition-colors duration-300"
          >
            View All Artworks
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
          </div>
        </section>

        {/* Image Zoom Modal */}
        {selectedArtwork && (
          <ImageZoomModal
            isOpen={showZoom}
            onClose={() => setShowZoom(false)}
            imageSrc={selectedArtwork.image}
            title={selectedArtwork.title}
            series={selectedArtwork.series}
            year={selectedArtwork.year}
            medium={selectedArtwork.medium}
            size={selectedArtwork.size || 'Various'}
            description={selectedArtwork.description}
          />
        )}
      </>
    )
  }

  export default FeaturedArtworks
