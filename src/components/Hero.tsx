'use client'

import React from 'react'
import Image from 'next/image'
import LocaleLink from '@/components/LocaleLink'
import { useLocale } from '@/i18n/useLocale'

// I am the Last Samurai (sold directly from the studio); the hero video zooms into it.
const HERO_ARTWORK_ID = 8

export type HeroCopy = {
  title: string
  intro: string
  primaryCta: string
  secondaryCta: string
  imageLabel: string
  imageAlt: string
}

const englishCopy: HeroCopy = {
  title: 'Pop art that moves.',
  intro:
    'French pop artist based in Dubai. Original kinetic portraits on layered plexiglass: move, and the image changes.',
  primaryCta: 'View available art →',
  secondaryCta: 'Interiors & collaborations →',
  imageLabel: 'View I am the Last Samurai',
  imageAlt: 'I am the Last Samurai, kinetic portrait by Fabian PhiL on layered plexiglass, hung in a contemporary interior',
}

const Hero = ({ copy = englishCopy }: { copy?: HeroCopy }) => {
  const locale = useLocale()

  return (
    <section className="bg-white pt-[4.5rem] pb-8 lg:pt-28 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 lg:gap-16 lg:items-center">
          <div className="order-2 lg:order-2 space-y-2.5 lg:space-y-5 max-w-xl">
            <h1 className="text-[1.7rem] sm:text-5xl lg:text-6xl font-light tracking-[0.04em] uppercase text-gray-900 leading-[1.12]">
              {copy.title}
            </h1>
            <p className="text-[13px] sm:text-base lg:text-lg text-gray-600 font-light leading-snug lg:leading-relaxed">
              {copy.intro}
            </p>
            <div className="pt-1.5 lg:pt-2 space-y-2.5 lg:space-y-4">
              <LocaleLink
                locale={locale}
                route="gallery"
                className="inline-flex items-center justify-center bg-gray-900 text-white px-5 py-2.5 lg:px-7 lg:py-3 text-[11px] lg:text-xs tracking-[0.18em] uppercase hover:bg-gray-800 transition-colors"
              >
                {copy.primaryCta}
              </LocaleLink>
              <div>
                <LocaleLink
                  locale={locale}
                  route="collaborations"
                  className="text-[13px] lg:text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {copy.secondaryCta}
                </LocaleLink>
              </div>
            </div>
          </div>

          <LocaleLink
            locale={locale}
            route="artwork"
            options={{ id: HERO_ARTWORK_ID }}
            aria-label={copy.imageLabel}
            className="order-1 lg:order-1 relative block w-full aspect-[4/3] bg-gray-50 overflow-hidden"
          >
            <Image
              src="/images/hero/last-samurai-interior-poster.jpg"
              alt={copy.imageAlt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <video
              className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
              src="/videos/hero/last-samurai-interior-zoom.mp4"
              poster="/images/hero/last-samurai-interior-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
            />
          </LocaleLink>
        </div>
      </div>
    </section>
  )
}

export default Hero
