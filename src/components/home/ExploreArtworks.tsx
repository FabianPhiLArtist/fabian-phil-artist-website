'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from '@/i18n/useLocale'
import { localizedHref } from '@/i18n/pathnames'

type Category = {
  name: string
  image: string
  alt: string
  query?: Record<string, string>
}

const categories: Category[] = [
  {
    name: 'Signature works',
    image: '/images/artworks/Fabian PhiL_I am the Last Samurai_2024_72400aed.jpg',
    alt: 'I am the Last Samurai, kinetic portrait by Fabian PhiL',
  },
  {
    name: 'Pop glasses',
    image: '/images/artworks/Fabian PhiL_Wanted for Loving Art_2023_18000aed.jpg',
    alt: 'Wanted for Loving Art, Pop glasses portrait',
    query: { series: 'Pop glasses Collection' },
  },
  {
    name: 'Toon Clash',
    image: '/images/artworks/Fabian PhiL Wanted Million Dollar Toon Fight 2026.jpg',
    alt: 'Wanted Million Dollar Toon Fight, Toon Clash artwork',
    query: { series: 'Toon Clash Collection' },
  },
  {
    name: 'F1 / Motorsport',
    image: '/images/artworks/Fabian Phil Wanted For Racing in Monaco 2024.jpg',
    alt: 'Wanted for Racing in Monaco, F1 portrait',
    query: { series: 'F1 Collection' },
  },
  {
    name: 'Triptych & Mugshots',
    image: '/images/artworks/Fabian PhiL Andy Warhol 100 USD Bill 2017.png',
    alt: '100 USD Andy Warhol, portrait triptych',
    query: { group: 'triptych-mugshots' },
  },
  {
    name: 'Panda / Zen',
    image: '/images/artworks/Fabian PhiL_Wanted Panda Zen Artist 2025.jpg',
    alt: 'Wanted Panda Zen Artist',
    query: { series: 'Panda Pop Collection' },
  },
]

const ExploreArtworks = () => {
  const locale = useLocale()

  return (
    <section className="bg-[#fafafa] py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-6 md:mb-8">
          Explore the artworks
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-3 gap-y-5 md:gap-x-5 md:gap-y-7">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={localizedHref(
                locale,
                'gallery',
                category.query ? { query: category.query } : undefined
              )}
              className="group block"
            >
              <div className="relative overflow-hidden bg-gray-100 aspect-square">
                <Image
                  src={category.image}
                  alt={category.alt}
                  fill
                  className="object-cover group-hover:opacity-90 transition-opacity"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
              </div>
              <p className="mt-2 text-[10px] md:text-[11px] tracking-[0.14em] uppercase text-gray-900 leading-snug">
                {category.name}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href={localizedHref(locale, 'gallery')}
            className="text-xs tracking-[0.18em] uppercase text-gray-900 hover:text-gray-600 transition-colors"
          >
            View all artworks →
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ExploreArtworks
