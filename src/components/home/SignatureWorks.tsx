'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from '@/i18n/useLocale'
import { localizedHref } from '@/i18n/pathnames'

const works = [
  {
    id: 8,
    title: 'I am the Last Samurai',
    image: '/images/artworks/Fabian PhiL_I am the Last Samurai_2024_72400aed.jpg',
  },
  {
    id: 10,
    title: 'Why…?',
    image: '/images/artworks/Why_2021_Wall.jpg',
  },
  {
    id: 12,
    title: 'Ooh!',
    image: '/images/artworks/Ooh_2020 - Wall.jpg',
  },
]

const SignatureWorks = () => {
  const locale = useLocale()

  return (
    <section className="bg-[#fafafa] py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <h2 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-4">
            Signature works
          </h2>
          <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed">
            A selection of portraits that define Fabian PhiL’s visual language — layered, fragmented and transformed by the viewer’s perspective.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8">
          {works.map((work) => (
            <Link
              key={work.id}
              href={localizedHref(locale, 'artwork', { id: work.id })}
              className="group block"
            >
              <div className="relative aspect-[3/4] bg-white overflow-hidden">
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  className="object-cover group-hover:opacity-90 transition-opacity"
                  sizes="(max-width: 768px) 33vw, 30vw"
                />
              </div>
              <p className="mt-2 sm:mt-3 text-[10px] sm:text-sm text-gray-700 tracking-wide">
                {work.title}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href={localizedHref(locale, 'gallery')}
            className="text-xs tracking-[0.18em] uppercase text-gray-900 hover:text-gray-600 transition-colors"
          >
            View artworks →
          </Link>
        </div>
      </div>
    </section>
  )
}

export default SignatureWorks
