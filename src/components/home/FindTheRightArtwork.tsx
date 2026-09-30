'use client'

import React from 'react'
import Link from 'next/link'
import { useLocale } from '@/i18n/useLocale'
import { localizedHref } from '@/i18n/pathnames'

const FindTheRightArtwork = () => {
  const locale = useLocale()

  return (
    <section className="bg-[#fafafa] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-10">
          Find the right artwork
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <div>
            <h3 className="text-xl font-light text-gray-900 mb-3">For collectors</h3>
            <p className="text-gray-600 font-light leading-relaxed mb-6">
              Explore original works and currently available artworks.
            </p>
            <Link
              href={localizedHref(locale, 'gallery')}
              className="text-xs tracking-[0.18em] uppercase text-gray-900 hover:text-gray-600 transition-colors"
            >
              View available art →
            </Link>
          </div>
          <div>
            <h3 className="text-xl font-light text-gray-900 mb-3">For professionals</h3>
            <p className="text-gray-600 font-light leading-relaxed mb-6">
              For interior designers, architects, galleries and selected art projects.
            </p>
            <Link
              href={localizedHref(locale, 'contact')}
              className="text-xs tracking-[0.18em] uppercase text-gray-900 hover:text-gray-600 transition-colors"
            >
              Discuss a project →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FindTheRightArtwork
