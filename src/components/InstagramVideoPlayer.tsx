'use client'

import React, { useState } from 'react'
import { ExternalLink, Play, Maximize2 } from 'lucide-react'

interface InstagramVideoPlayerProps {
  videoUrl: string
  title: string
  className?: string
}

const InstagramVideoPlayer = ({ videoUrl, title, className = '' }: InstagramVideoPlayerProps) => {
  const [showEmbed, setShowEmbed] = useState(false)
  
  // Clean Instagram URL for display
  const getCleanInstagramUrl = (url: string) => {
    return url.split('?')[0] // Remove UTM parameters
  }

  // Extract post ID for embed
  const getPostId = (url: string) => {
    const match = url.match(/\/(?:p|reel)\/([^\/\?]+)/)
    return match ? match[1] : null
  }

  const postId = getPostId(videoUrl)
  const cleanUrl = getCleanInstagramUrl(videoUrl)

  return (
    <div className={`relative ${className}`}>
      <div className="relative w-full h-full bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 rounded-lg overflow-hidden">
        {!showEmbed ? (
          // Preview Card
          <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Play size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
              <p className="text-white/80 text-sm mb-6">Instagram Video</p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => setShowEmbed(true)}
                className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200 text-white font-medium flex items-center space-x-2"
              >
                <Play size={20} />
                <span>Load Video</span>
              </button>
              
              <a
                href={cleanUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors duration-200 text-white font-medium flex items-center space-x-2"
              >
                <ExternalLink size={20} />
                <span>Open in Instagram</span>
              </a>
            </div>
          </div>
        ) : (
          // Embedded Video
          <div className="w-full h-full">
            {postId ? (
              <iframe
                src={`https://www.instagram.com/p/${postId}/embed/`}
                title={title}
                className="w-full h-full min-h-[400px]"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <p className="mb-4">Unable to load Instagram video</p>
                  <a
                    href={cleanUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200"
                  >
                    View on Instagram
                  </a>
                </div>
              </div>
            )}
            
            {/* Controls */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={() => setShowEmbed(false)}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200"
                title="Back to preview"
              >
                <Maximize2 size={16} className="text-white" />
              </button>
              <a
                href={cleanUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200"
                title="Open in Instagram"
              >
                <ExternalLink size={16} className="text-white" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default InstagramVideoPlayer





