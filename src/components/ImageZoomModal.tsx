'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, ZoomOut, RotateCcw, Download, Maximize2, Minimize2, Search } from 'lucide-react'
import Image from 'next/image'

interface ImageZoomModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  title: string
  series: string
  year: string
  medium: string
  size: string
  description: string
}

const ImageZoomModal = ({ 
  isOpen, 
  onClose, 
  imageSrc, 
  title, 
  series, 
  year, 
  medium, 
  size, 
  description 
}: ImageZoomModalProps) => {
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [showLens, setShowLens] = useState(false)
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 })
  const [lensZoom, setLensZoom] = useState(2)

  const minZoom = 0.5
  const maxZoom = 5
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

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
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
      
      // Calculate bounds based on zoom level and image size
      const maxX = Math.max(0, (zoomLevel - 1) * 300)
      const maxY = Math.max(0, (zoomLevel - 1) * 200)
      
      setPosition({
        x: Math.max(-maxX, Math.min(maxX, newX)),
        y: Math.max(-maxY, Math.min(maxY, newY))
      })
    }

    // Update lens position
    if (showLens) {
      const rect = e.currentTarget.getBoundingClientRect()
      setLensPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  const toggleLens = () => {
    setShowLens(!showLens)
  }

  const adjustLensZoom = (direction: 'in' | 'out') => {
    if (direction === 'in') {
      setLensZoom(prev => Math.min(prev + 0.5, 5))
    } else {
      setLensZoom(prev => Math.max(prev - 0.5, 1.5))
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
        case 'f':
        case 'F':
          handleFullscreen()
          break
        case 'l':
        case 'L':
          toggleLens()
          break
        case 'ArrowLeft':
          if (zoomLevel > 1) {
            const maxX = Math.max(0, (zoomLevel - 1) * 300)
            setPosition(prev => ({ ...prev, x: Math.min(prev.x + 50, maxX) }))
          }
          break
        case 'ArrowRight':
          if (zoomLevel > 1) {
            const maxX = Math.max(0, (zoomLevel - 1) * 300)
            setPosition(prev => ({ ...prev, x: Math.max(prev.x - 50, -maxX) }))
          }
          break
        case 'ArrowUp':
          if (zoomLevel > 1) {
            const maxY = Math.max(0, (zoomLevel - 1) * 200)
            setPosition(prev => ({ ...prev, y: Math.min(prev.y + 50, maxY) }))
          }
          break
        case 'ArrowDown':
          if (zoomLevel > 1) {
            const maxY = Math.max(0, (zoomLevel - 1) * 200)
            setPosition(prev => ({ ...prev, y: Math.max(prev.y - 50, -maxY) }))
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, zoomLevel])

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
            className="absolute top-4 right-4 z-10 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200"
          >
            <X size={24} className="text-white" />
          </button>

          {/* Zoom Controls */}
          <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 flex flex-col space-y-2">
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= maxZoom}
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Zoom In (+)"
              >
                <ZoomIn size={20} className="text-white" />
              </button>
              
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= minZoom}
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Zoom Out (-)"
              >
                <ZoomOut size={20} className="text-white" />
              </button>
              
              <button
                onClick={handleReset}
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors duration-200"
                title="Reset (0)"
              >
                <RotateCcw size={20} className="text-white" />
              </button>
              
              <button
                onClick={handleFullscreen}
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors duration-200"
                title="Fullscreen (F)"
              >
                {isFullscreen ? <Minimize2 size={20} className="text-white" /> : <Maximize2 size={20} className="text-white" />}
              </button>
              
              <button
                onClick={toggleLens}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  showLens ? 'bg-blue-500/50' : 'bg-white/20 hover:bg-white/30'
                }`}
                title="Magnifying Lens (L)"
              >
                <Search size={20} className="text-white" />
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
            {/* Tryptic Panel Guide Overlay */}
            {series.includes('100 USD Bill') && zoomLevel > 1.5 && (
              <div className="absolute inset-0 pointer-events-none z-10">
                <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm font-medium">
                  Left Panel
                </div>
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded text-sm font-medium">
                  Center Panel
                </div>
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded text-sm font-medium">
                  Right Panel
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded text-sm">
                  Drag to explore each panel
                </div>
              </div>
            )}

            {/* Magnifying Lens Overlay */}
            {showLens && (
              <div className="absolute inset-0 pointer-events-none z-20">
                <div
                  className="absolute w-32 h-32 border-4 border-white rounded-full shadow-2xl overflow-hidden"
                  style={{
                    left: lensPosition.x - 64,
                    top: lensPosition.y - 64,
                    transform: `scale(${lensZoom})`,
                    transformOrigin: 'center center'
                  }}
                >
                  <div className="w-full h-full bg-black/20 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-white text-xs font-bold">
                      {Math.round(lensZoom * 100)}%
                    </div>
                  </div>
                </div>
                
                {/* Lens controls */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg flex items-center space-x-4">
                  <button
                    onClick={() => adjustLensZoom('out')}
                    className="p-1 bg-white/20 rounded hover:bg-white/30 transition-colors"
                    title="Decrease lens zoom"
                  >
                    <ZoomOut size={16} />
                  </button>
                  <span className="text-sm font-medium">
                    Lens: {Math.round(lensZoom * 100)}%
                  </span>
                  <button
                    onClick={() => adjustLensZoom('in')}
                    className="p-1 bg-white/20 rounded hover:bg-white/30 transition-colors"
                    title="Increase lens zoom"
                  >
                    <ZoomIn size={16} />
                  </button>
                </div>
              </div>
            )}
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
                alt={title}
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

          {/* Artwork Info */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-4 left-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-1">{title}</h3>
                <p className="text-sm opacity-90 mb-2">{series} • {year}</p>
                <p className="text-sm opacity-80">{medium} • {size}</p>
                <p className="text-sm opacity-80 mt-2 max-w-2xl">{description}</p>
              </div>
              
              <div className="flex flex-col space-y-2 text-sm opacity-80">
                <div className="flex items-center space-x-2">
                  <span>Zoom: {Math.round(zoomLevel * 100)}%</span>
                  <span>•</span>
                  <span>Mouse wheel or +/- keys</span>
                  <span>•</span>
                  <span>Drag to pan when zoomed</span>
                </div>
                {series.includes('100 USD Bill') && (
                  <div className="flex items-center space-x-2 text-yellow-400">
                    <span>🎨 Tryptic Navigation:</span>
                    <span>Drag mouse or use arrow keys to explore left/center/right panels</span>
                  </div>
                )}
                <div className="flex items-center space-x-2 text-xs opacity-70">
                  <span>Keyboard: +/- zoom, 0 reset, F fullscreen, L lens, arrows pan</span>
                </div>
                {showLens && (
                  <div className="flex items-center space-x-2 text-xs text-blue-300">
                    <span>🔍 Lens active: Move mouse to explore details</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ImageZoomModal
