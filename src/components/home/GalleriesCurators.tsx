import React from 'react'
import { ARTIST_BOOK_WHATSAPP } from '@/lib/whatsapp'

export type GalleriesCuratorsCopy = {
  heading: string
  text: string
  cta: string
  whatsappHref: string
}

const englishCopy: GalleriesCuratorsCopy = {
  heading: 'Galleries & curators',
  text: 'Artist book and exhibition information available on request.',
  cta: 'Request artist book →',
  whatsappHref: ARTIST_BOOK_WHATSAPP,
}

const GalleriesCurators = ({ copy = englishCopy }: { copy?: GalleriesCuratorsCopy }) => {
  return (
    <section className="bg-white pb-12 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-8 border-t border-gray-100 max-w-xl">
          <h2 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-3">
            {copy.heading}
          </h2>
          <p className="text-sm text-gray-600 font-light leading-relaxed mb-4">
            {copy.text}
          </p>
          <a
            href={copy.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.18em] uppercase text-gray-900 hover:text-gray-600 transition-colors"
          >
            {copy.cta}
          </a>
        </div>
      </div>
    </section>
  )
}

export default GalleriesCurators
