import React from 'react'
import { ARTIST_BOOK_WHATSAPP } from '@/lib/whatsapp'

const GalleriesCurators = () => {
  return (
    <section className="bg-white pb-12 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-8 border-t border-gray-100 max-w-xl">
          <h2 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-3">
            Galleries &amp; curators
          </h2>
          <p className="text-sm text-gray-600 font-light leading-relaxed mb-4">
            Artist book and exhibition information available on request.
          </p>
          <a
            href={ARTIST_BOOK_WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.18em] uppercase text-gray-900 hover:text-gray-600 transition-colors"
          >
            Request artist book →
          </a>
        </div>
      </div>
    </section>
  )
}

export default GalleriesCurators
