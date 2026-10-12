'use client'

import React from 'react'
import Image from 'next/image'
import LocaleLink from '@/components/LocaleLink'
import { useLocale } from '@/i18n/useLocale'
import type { CollectionSlug } from '@/data/collections'

type CategoryKey = 'panda-zen' | 'signature-works' | 'pop-glasses' | 'toon-clash' | 'f1-motorsport' | 'triptych-mugshots'

type Category = {
  key: CategoryKey
  image: string
  collection?: CollectionSlug
  query?: Record<string, string>
}

export type ExploreArtworksCopy = {
  heading: string
  viewAll: string
  categories: Record<CategoryKey, { name: string; alt: string }>
}

const englishCopy: ExploreArtworksCopy = {
  heading: 'Explore the artworks',
  viewAll: 'View all artworks →',
  categories: {
    'panda-zen': { name: 'Panda / Zen', alt: 'Wanted Panda Zen Artist' },
    'signature-works': { name: 'Signature works', alt: 'I am the Last Samurai, kinetic portrait by Fabian PhiL' },
    'pop-glasses': { name: 'Pop glasses', alt: 'Wanted for Loving Art, Pop glasses portrait' },
    'toon-clash': { name: 'Toon Clash', alt: 'Wanted Million Dollar Toon Fight, Toon Clash artwork' },
    'f1-motorsport': { name: 'F1 / Motorsport', alt: 'Wanted Ayrton vs Toons Racing, F1 portrait' },
    'triptych-mugshots': { name: 'Triptych & Mugshots', alt: '100 USD Andy Warhol, centre panel of the triptych' },
  },
}

const categories: Category[] = [
  {
    key: 'panda-zen',
    image: '/images/artworks/panda-wanted-meditation-zen-artist-pop-art-fabian-phil.jpg',
    collection: 'panda-zen',
  },
  {
    key: 'signature-works',
    image: '/images/artworks/last-samurai-japanese-pop-art-fabian-phil.jpg',
    collection: 'signature-works',
  },
  {
    key: 'pop-glasses',
    image: '/images/artworks/kate-upton-hollywood-pop-glasses-wanted-pop-art-fabian-phil.jpg',
    collection: 'pop-glasses',
  },
  {
    key: 'toon-clash',
    image: '/images/artworks/clint-eastwood-wanted-boxing-cartoon-fight-pop-art-fabian-phil.jpg',
    collection: 'toon-clash',
  },
  {
    key: 'f1-motorsport',
    image: '/images/artworks/ayrton-senna-f1-cartoon-wanted-pop-art-fabian-phil-thumbnail.jpg',
    collection: 'f1-motorsport',
  },
  {
    key: 'triptych-mugshots',
    image: '/images/artworks/andy-warhol-100-usd-bill-pop-art-fabian-phil-triptych-centre.jpg',
    query: { group: 'triptych-mugshots' },
  },
]

const ExploreArtworks = ({ copy = englishCopy }: { copy?: ExploreArtworksCopy }) => {
  const locale = useLocale()

  return (
    <section className="bg-[#fafafa] py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-6 md:mb-8">
          {copy.heading}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-3 gap-y-5 md:gap-x-5 md:gap-y-7">
          {categories.map((category) => {
            const text = copy.categories[category.key]
            return (
              <LocaleLink
                key={category.key}
                locale={locale}
                {...(category.collection
                  ? { route: 'collection' as const, options: { id: category.collection } }
                  : { route: 'gallery' as const, options: category.query ? { query: category.query } : undefined })}
                className="group block"
              >
                <div className="relative overflow-hidden bg-gray-100 aspect-square">
                  <Image
                    src={category.image}
                    alt={text.alt}
                    fill
                    className="object-cover group-hover:opacity-90 transition-opacity"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  />
                </div>
                <p className="mt-2 text-[10px] md:text-[11px] tracking-[0.14em] uppercase text-gray-900 leading-snug">
                  {text.name}
                </p>
              </LocaleLink>
            )
          })}
        </div>

        <div className="mt-8">
          <LocaleLink
            locale={locale}
            route="gallery"
            className="text-xs tracking-[0.18em] uppercase text-gray-900 hover:text-gray-600 transition-colors"
          >
            {copy.viewAll}
          </LocaleLink>
        </div>
      </div>
    </section>
  )
}

export default ExploreArtworks
