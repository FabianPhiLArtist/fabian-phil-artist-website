'use client'

import React, { useEffect, useRef, useState } from 'react'

type Props = {
  src: string
  poster: string
  label: string
  fallback: React.ReactNode
  children?: React.ReactNode
}

const InstagramFeatureVideo = ({ src, poster, label, fallback, children }: Props) => {
  const ref = useRef<HTMLVideoElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    video.muted = true
    // A load error raised before hydration never reaches onError.
    if (video.error || video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) setFailed(true)
  }, [])

  if (failed) return <>{fallback}</>

  return (
    <div className="relative w-full max-w-md aspect-[4/5] overflow-hidden bg-gray-50">
      <video
        ref={ref}
        src={src}
        poster={poster}
        aria-label={label}
        controls
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
        onError={() => setFailed(true)}
      />
      {children}
    </div>
  )
}

export default InstagramFeatureVideo
