'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import CollectorInquiry from './CollectorInquiry'
import { useLocale } from '@/i18n/useLocale'
import { localizedHref } from '@/i18n/pathnames'

interface ArtworkCardProps {
  artwork: {
    id: number
    title: string
    series: string
    image: string
    cardImage?: string
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

const textActionClass = 'text-[11px] tracking-[0.16em] uppercase text-gray-900 hover:text-gray-500 transition-colors'

const ArtworkCard = ({ artwork, viewMode }: ArtworkCardProps) => {
  const locale = useLocale()
  const [showInquiry, setShowInquiry] = useState(false)

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
              src={artwork.cardImage ?? artwork.image}
              alt={`${artwork.title}, layered plexiglass artwork by Fabian PhiL`}
              fill
              sizes={isList ? '(max-width: 640px) 100vw, 256px' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
              className="object-cover group-hover:opacity-90 transition-opacity duration-300"
            />
          </div>

          <div className={isList ? 'flex-1 min-w-0' : 'pt-4'}>
            <h3 className="text-lg md:text-xl font-light uppercase tracking-[0.04em] text-gray-900 leading-tight group-hover:text-gray-600 transition-colors">
              {artwork.title}
            </h3>
            <p className="mt-2 text-[10px] tracking-[0.18em] uppercase text-gray-500">
              {artwork.series} · {artwork.year}{artwork.video ? ' · In motion' : ''}
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
            </div>
          </div>
        </div>
      </Link>

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
    </motion.div>
  )
}

export default ArtworkCard
