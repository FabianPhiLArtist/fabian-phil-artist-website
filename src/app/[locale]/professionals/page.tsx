'use client'

import React from 'react'
import Link from 'next/link'
import { useLocale } from '@/i18n/useLocale'
import { localizedHref } from '@/i18n/pathnames'

const ProfessionalsPage = () => {
  const locale = useLocale()

  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-6">
          Art for projects
        </h1>
        <p className="text-xl md:text-2xl font-light text-gray-900 leading-relaxed mb-12">
          Fabian PhiL’s kinetic pop artworks bring colour, movement and changing perspectives to contemporary interiors.
        </p>

        <h2 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-5">
          For interior designers, architects, galleries &amp; curated spaces
        </h2>
        <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed mb-12">
          Explore original artworks on layered plexiglass for residential, hospitality and selected creative projects.
        </p>

        <Link
          href={localizedHref(locale, 'contact')}
          className="inline-flex items-center text-xs tracking-[0.18em] uppercase text-gray-900 border-b border-gray-900 pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-colors"
        >
          Discuss a project →
        </Link>
      </div>
    </div>
  )
}

export default ProfessionalsPage
