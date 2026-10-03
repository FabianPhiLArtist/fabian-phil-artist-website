'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageZoomModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  images?: string[]
  title: string
  series: string
  year: string
  medium: string
  size: string
  description: string
  mainImageAlt?: string
}

const ZOOM = 2.5

const ImageZoomModal = ({ isOpen, onClose, imageSrc, images, title, series, year, medium, size, mainImageAlt }: ImageZoomModalProps) => {
  const galleryImages = images && images.length > 0 ? images : [imageSrc]
  const [currentIndex, setCurrentIndex] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const [origin, setOrigin] = useState({ x: 50, y: 50 })
  const hasMultiple = galleryImages.length > 1

  const show = useCallback((index: number) => {
    setCurrentIndex((index + galleryImages.length) % galleryImages.length)
    setZoomed(false)
  }, [galleryImages.length])

  useEffect(() => {
    if (!isOpen) return
    setCurrentIndex(0)
    setZoomed(false)
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, imageSrc])

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (hasMultiple && event.key === 'ArrowLeft') show(currentIndex - 1)
      if (hasMultiple && event.key === 'ArrowRight') show(currentIndex + 1)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, hasMultiple, show, currentIndex])

  if (!isOpen) return null

  const updateOrigin = (clientX: number, clientY: number, element: HTMLElement) => {
    const rect = element.getBoundingClientRect()
    setOrigin({
      x: Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)),
      y: Math.min(100, Math.max(0, ((clientY - rect.top) / rect.height) * 100)),
    })
  }

  const arrowClass = 'absolute top-1/2 -translate-y-1/2 z-10 p-2 text-white/60 hover:text-white transition-colors'

  return (
    <div
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-4 md:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 text-white/80 hover:text-white transition-colors"
        aria-label="Close"
      >
        <X size={24} />
      </button>

      {hasMultiple && (
        <>
          <button
            onClick={(event) => { event.stopPropagation(); show(currentIndex - 1) }}
            className={`${arrowClass} left-2 md:left-6`}
            aria-label="Previous photo"
          >
            <ChevronLeft size={32} strokeWidth={1.25} />
          </button>
          <button
            onClick={(event) => { event.stopPropagation(); show(currentIndex + 1) }}
            className={`${arrowClass} right-2 md:right-6`}
            aria-label="Next photo"
          >
            <ChevronRight size={32} strokeWidth={1.25} />
          </button>
        </>
      )}

      <div
        className={`relative overflow-hidden ${zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
        onClick={(event) => {
          event.stopPropagation()
          updateOrigin(event.clientX, event.clientY, event.currentTarget)
          setZoomed((value) => !value)
        }}
        onMouseMove={(event) => zoomed && updateOrigin(event.clientX, event.clientY, event.currentTarget)}
        onTouchMove={(event) => {
          if (!zoomed) return
          const touch = event.touches[0]
          updateOrigin(touch.clientX, touch.clientY, event.currentTarget)
        }}
      >
        <Image
          key={galleryImages[currentIndex]}
          src={galleryImages[currentIndex]}
          alt={
            galleryImages[currentIndex] === imageSrc
              ? mainImageAlt ?? `${title}, layered plexiglass artwork by Fabian PhiL`
              : `${title} by Fabian PhiL, additional view ${currentIndex}`
          }
          width={2000}
          height={2000}
          sizes="90vw"
          quality={90}
          priority
          className="block w-auto h-auto max-w-[90vw] max-h-[72vh] md:max-h-[76vh] object-contain transition-transform duration-300 ease-out"
          style={{ transform: zoomed ? `scale(${ZOOM})` : 'scale(1)', transformOrigin: `${origin.x}% ${origin.y}%` }}
        />
      </div>

      <div className="mt-5 text-center text-white max-w-2xl" onClick={(event) => event.stopPropagation()}>
        {hasMultiple && (
          <div className="flex justify-center gap-2 mb-4">
            {galleryImages.map((src, index) => (
              <button
                key={`${src}-${index}`}
                onClick={() => show(index)}
                className={`relative h-12 w-12 overflow-hidden border transition-colors ${
                  index === currentIndex ? 'border-white' : 'border-white/20 hover:border-white/60'
                }`}
                aria-label={`View photo ${index + 1}`}
              >
                <Image src={src} alt="" fill sizes="48px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
        <h3 className="text-sm tracking-[0.16em] uppercase mb-1">{title}</h3>
        <p className="text-[11px] tracking-[0.16em] uppercase text-gray-400">{series} · {year}</p>
        <p className="text-xs text-gray-500 mt-1 font-light">{[medium, size].filter(Boolean).join(' · ')}</p>
        <p className="text-[10px] tracking-[0.16em] uppercase text-gray-600 mt-3">
          {zoomed ? 'Tap or click to zoom out' : 'Tap or click the image to zoom'}
        </p>
      </div>
    </div>
  )
}

export default ImageZoomModal
