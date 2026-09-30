'use client'

import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'

export type LightboxImage = {
  src: string
  alt: string
  width: number
  height: number
  caption: string
  grayscale?: boolean
}

type Props = {
  image: LightboxImage | null
  onClose: () => void
}

const ImageLightbox = ({ image, onClose }: Props) => {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!image) return
    const previousOverflow = document.body.style.overflow
    const previousFocus = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      previousFocus?.focus()
    }
  }, [image, onClose])

  if (!image) return null

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.caption}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 sm:p-8"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-3 right-3 sm:top-5 sm:right-5 w-11 h-11 flex items-center justify-center text-white/80 hover:text-white text-3xl font-light leading-none"
      >
        ×
      </button>
      <figure className="m-0 flex flex-col items-center" onClick={(event) => event.stopPropagation()}>
        <div
          className="relative bg-white/5"
          style={{
            width: `min(92vw, calc(82vh * ${image.width / image.height}))`,
            aspectRatio: `${image.width} / ${image.height}`,
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="92vw"
            className={`object-contain ${image.grayscale ? 'grayscale' : ''}`}
          />
        </div>
        <figcaption className="mt-3 text-[11px] tracking-[0.18em] uppercase text-white/70">
          {image.caption}
        </figcaption>
      </figure>
    </div>,
    document.body
  )
}

export default ImageLightbox
