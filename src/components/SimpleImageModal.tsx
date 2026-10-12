'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'
import Image from 'next/image'
import { fillParts } from '@/lib/template'

export type SimpleImageModalCopy = {
  // The English close button has no label; localized copy adds one.
  close?: string
  zoomIn: string
  zoomOut: string
  reset: string
  // "{percent}" is replaced with the zoom level.
  help: string
}

const englishCopy: SimpleImageModalCopy = {
  zoomIn: 'Zoom In (+)',
  zoomOut: 'Zoom Out (-)',
  reset: 'Reset (0)',
  help: 'Zoom: {percent}% • Mouse wheel or +/- keys • Drag to pan when zoomed',
}

interface SimpleImageModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  alt: string
  title?: string
  copy?: SimpleImageModalCopy
}

const SimpleImageModal = ({ 
  isOpen, 
  onClose, 
  imageSrc, 
  alt,
  title,
  copy = englishCopy
}: SimpleImageModalProps) => {
  const [zoomLevel, setZoomLevel] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const minZoom = 0.5
  const maxZoom = 3
  const zoomStep = 0.25

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + zoomStep, maxZoom))
  }

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - zoomStep, minZoom))
  }

  const handleReset = () => {
    setZoomLevel(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    if (e.deltaY < 0) {
      handleZoomIn()
    } else {
      handleZoomOut()
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      const newX = e.clientX - dragStart.x
      const newY = e.clientY - dragStart.y
      
      // Calculate bounds based on zoom level
      const maxX = Math.max(0, (zoomLevel - 1) * 200)
      const maxY = Math.max(0, (zoomLevel - 1) * 150)
      
      setPosition({
        x: Math.max(-maxX, Math.min(maxX, newX)),
        y: Math.max(-maxY, Math.min(maxY, newY))
      })
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case '+':
        case '=':
          handleZoomIn()
          break
        case '-':
          handleZoomOut()
          break
        case '0':
          handleReset()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      >
        <div className="relative w-full h-full flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label={copy.close}
            className="absolute top-4 right-4 z-10 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200"
          >
            <X size={24} className="text-white" />
          </button>

          {/* Zoom Controls */}
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 flex space-x-2">
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= maxZoom}
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                title={copy.zoomIn}
              >
                <ZoomIn size={20} className="text-white" />
              </button>
              
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= minZoom}
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                title={copy.zoomOut}
              >
                <ZoomOut size={20} className="text-white" />
              </button>
              
              <button
                onClick={handleReset}
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors duration-200"
                title={copy.reset}
              >
                <RotateCcw size={20} className="text-white" />
              </button>
            </div>
          </div>

          {/* Image Container */}
          <div
            className="relative max-w-full max-h-full overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
              style={{
                transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
                transformOrigin: 'center center',
                cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
              }}
            >
              <Image
                src={imageSrc}
                alt={alt}
                width={1200}
                height={1200}
                className="max-w-none"
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '90vw',
                  maxHeight: '90vh'
                }}
                priority
              />
            </motion.div>
          </div>

          {/* Image Info */}
          {(title || alt) && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-4 left-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white"
            >
              <div className="text-center">
                {title && <h3 className="text-xl font-bold mb-1">{title}</h3>}
                <p className="text-sm opacity-90">{alt}</p>
                <p className="text-xs opacity-70 mt-2">
                  {fillParts(copy.help, { percent: Math.round(zoomLevel * 100) })}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SimpleImageModal


