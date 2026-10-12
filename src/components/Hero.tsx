'use client'

import React from 'react'
import Image from 'next/image'
import LocaleLink from '@/components/LocaleLink'
import { useLocale } from '@/i18n/useLocale'

// Wanted for Being Too Smart; the hero photo is one of its gallery images.
const HERO_ARTWORK_ID = 16

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
    'Fabian PhiL is a French contemporary pop artist based in Dubai, creating original figurative and kinetic artworks on layered plexiglass. His portraits and cultural icons combine colour, gaze and changing perspective in POP ART THAT MOVES.',
  primaryCta: 'View available art →',
  secondaryCta: 'Interiors & collaborations →',
  imageLabel: 'View Wanted for Being Too Smart',
  imageAlt: 'Wanted for Being Too Smart, kinetic pop artwork by Fabian PhiL, staged in a contemporary interior',
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
            className="order-1 lg:order-1 relative block w-full aspect-[3/2] bg-gray-50 overflow-hidden"
          >
            <Image
              src="/images/artworks/angelina-jolie-pop-art-fabian-phil-interior.jpg"
              alt={copy.imageAlt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </LocaleLink>
        </div>
      </div>
    </section>
  )
}

export default Hero
