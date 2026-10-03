'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from '@/i18n/useLocale'
import { localizedHref } from '@/i18n/pathnames'

const Hero = () => {
  const locale = useLocale()

  return (
    <section className="bg-white pt-[4.5rem] pb-8 lg:pt-28 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 lg:gap-16 lg:items-center">
          <div className="order-2 lg:order-2 space-y-2.5 lg:space-y-5 max-w-xl">
            <h1 className="text-[1.7rem] sm:text-5xl lg:text-6xl font-light tracking-[0.04em] uppercase text-gray-900 leading-[1.12]">
              Pop art that moves.
            </h1>
            <p className="text-[13px] sm:text-base lg:text-lg text-gray-600 font-light leading-snug lg:leading-relaxed">
              Fabian PhiL is a French contemporary pop artist based in Dubai, creating original figurative and kinetic artworks on layered plexiglass. His portraits and cultural icons combine colour, gaze and changing perspective in POP ART THAT MOVES.
            </p>
            <div className="pt-1.5 lg:pt-2 space-y-2.5 lg:space-y-4">
              <Link
                href={localizedHref(locale, 'gallery')}
                className="inline-flex items-center justify-center bg-gray-900 text-white px-5 py-2.5 lg:px-7 lg:py-3 text-[11px] lg:text-xs tracking-[0.18em] uppercase hover:bg-gray-800 transition-colors"
              >
                View available art →
              </Link>
              <div>
                <Link
                  href={localizedHref(locale, 'collaborations')}
                  className="text-[13px] lg:text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Interiors & collaborations →
                </Link>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-1 relative w-full aspect-[3/2] bg-gray-50 overflow-hidden">
            <Image
              src="/images/artworks/Wanted for Being Too Smart - WideWall.jpg"
              alt="Wanted for Being Too Smart, kinetic pop artwork by Fabian PhiL, staged in a contemporary interior"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
