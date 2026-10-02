'use client'

import React, { useEffect, useRef, useState } from 'react'

type Props = {
  src: string
  label: string
  onError?: () => void
  onDimensions?: (width: number, height: number) => void
}

const KineticClip = ({ src, label, onError, onDimensions }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.defaultMuted = true
    video.playsInline = true

    const loadObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true)
          loadObserver.disconnect()
        }
      },
      { rootMargin: '400px 0px' }
    )

    const playObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.25 }
    )

    loadObserver.observe(video)
    playObserver.observe(video)
    return () => {
      loadObserver.disconnect()
      playObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !shouldLoad) return
    video.load()
    video.play().catch(() => {})
  }, [shouldLoad])

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      autoPlay
      preload="none"
      className="absolute inset-0 w-full h-full object-contain bg-black"
      aria-label={label}
      onLoadedMetadata={(event) => {
        const { videoWidth, videoHeight } = event.currentTarget
        if (onDimensions && videoWidth && videoHeight) onDimensions(videoWidth, videoHeight)
      }}
    >
      {shouldLoad && <source src={src} type="video/mp4" onError={onError} />}
    </video>
  )
}

export default KineticClip
