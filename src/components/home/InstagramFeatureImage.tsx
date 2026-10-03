'use client'

import React, { useState } from 'react'
import Image from 'next/image'

const InstagramFeatureImage = ({ src, alt }: { src: string; alt: string }) => {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span className="absolute inset-0 flex items-center justify-center text-xs tracking-[0.18em] uppercase text-gray-500">
        View on Instagram
      </span>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      unoptimized
      loading="lazy"
      sizes="(max-width: 1024px) 100vw, 448px"
      className="object-cover group-hover:opacity-90 transition-opacity"
      onError={() => setFailed(true)}
    />
  )
}

export default InstagramFeatureImage
