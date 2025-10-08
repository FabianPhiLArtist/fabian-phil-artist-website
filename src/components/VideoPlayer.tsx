'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, ExternalLink, Maximize2 } from 'lucide-react'
import InstagramVideoPlayer from './InstagramVideoPlayer'

interface VideoPlayerProps {
  videoUrl: string
  title: string
  className?: string
}

const VideoPlayer = ({ videoUrl, title, className = '' }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showControls, setShowControls] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Check if it's a local video file
  const isLocalVideo = videoUrl && (videoUrl.endsWith('.mp4') || videoUrl.endsWith('.mov') || videoUrl.endsWith('.webm'))
  const isInstagramVideo = videoUrl && (videoUrl.includes('instagram.com') || videoUrl.includes('instagr.am'))

  // Ensure we're on the client side to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true)
    const checkMobile = () => {
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                 ('ontouchstart' in window) || 
                 (navigator.maxTouchPoints > 0))
    }
    checkMobile()
  }, [])

  // Auto-hide controls on desktop, keep visible on mobile
  const handleMouseMove = () => {
    if (!isMobile) {
      setShowControls(true)
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
  }

  const handleTouchStart = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isMobile) {
        setShowControls(false)
      }
    }, 4000)
  }

  // Handle missing video URL
  if (!videoUrl) {
    return (
      <div className={`relative ${className}`}>
        <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center">
          <div className="text-center text-white">
            <p className="text-lg mb-2">No video available</p>
            <p className="text-sm text-gray-400">{title}</p>
          </div>
        </div>
      </div>
    )
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen()
        setIsFullscreen(true)
      } else {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  const handleVideoLoad = () => {
    setIsLoading(false)
  }

  const handleVideoEnd = () => {
    setIsPlaying(false)
  }

  // Handle Instagram video embedding
  const getInstagramEmbedUrl = (url: string) => {
    // Extract post ID from various Instagram URL formats
    const postId = url.match(/\/(?:p|reel)\/([^\/\?]+)/)?.[1]
    if (postId) {
      return `https://www.instagram.com/p/${postId}/embed/`
    }
    return url
  }

  // Clean Instagram URL for display
  const getCleanInstagramUrl = (url: string) => {
    return url.split('?')[0] // Remove UTM parameters
  }

  if (isInstagramVideo) {
    return <InstagramVideoPlayer videoUrl={videoUrl} title={title} className={className} />
  }

  if (isLocalVideo) {
    return (
      <div 
        ref={containerRef} 
        className={`relative group ${className}`}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
      >
        <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <div className="text-center text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-sm">Loading video...</p>
              </div>
            </div>
          )}
          
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            onLoadedData={handleVideoLoad}
            onEnded={handleVideoEnd}
            muted={isMuted}
            loop
            playsInline
            preload="metadata"
          >
            <source src={videoUrl} type="video/mp4" />
            <source src={videoUrl} type="video/quicktime" />
            <source src={videoUrl} type="video/webm" />
            Your browser does not support the video tag.
          </video>

          {/* Video Controls Overlay */}
          <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
            showControls || isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={togglePlay}
                className="p-4 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200 touch-manipulation"
              >
                {isPlaying ? (
                  <Pause size={32} className="text-white" />
                ) : (
                  <Play size={32} className="text-white ml-1" />
                )}
              </button>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className={`absolute bottom-4 left-4 right-4 flex items-center justify-between transition-opacity duration-300 ${
            showControls || isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMute}
                className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200 touch-manipulation"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <VolumeX size={20} className="text-white" />
                ) : (
                  <Volume2 size={20} className="text-white" />
                )}
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={toggleFullscreen}
                className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200 touch-manipulation"
                title="Fullscreen"
              >
                <Maximize2 size={20} className="text-white" />
              </button>
            </div>
          </div>

          {/* Play/Pause overlay when not playing */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={togglePlay}
                className="p-6 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors duration-200 touch-manipulation"
              >
                <Play size={48} className="text-white ml-2" />
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={containerRef} 
      className={`relative group ${className}`}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
    >
      <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        )}
        
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          onLoadedData={handleVideoLoad}
          onEnded={handleVideoEnd}
          muted={isMuted}
          loop
          playsInline
        >
          <source src={videoUrl} type="video/mp4" />
          <source src={videoUrl} type="video/webm" />
          Your browser does not support the video tag.
        </video>

        {/* Video Controls Overlay */}
        <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
          showControls || (isClient && isMobile) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="p-4 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200 touch-manipulation"
            >
              {isPlaying ? (
                <Pause size={32} className="text-white" />
              ) : (
                <Play size={32} className="text-white ml-1" />
              )}
            </button>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className={`absolute bottom-4 left-4 right-4 flex items-center justify-between transition-opacity duration-300 ${
          showControls || (isClient && isMobile) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMute}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200 touch-manipulation"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX size={20} className="text-white" />
              ) : (
                <Volume2 size={20} className="text-white" />
              )}
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleFullscreen}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200 touch-manipulation"
              title="Fullscreen"
            >
              <Maximize2 size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Play/Pause overlay when not playing */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="p-6 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors duration-200 touch-manipulation"
            >
              <Play size={48} className="text-white ml-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default VideoPlayer
