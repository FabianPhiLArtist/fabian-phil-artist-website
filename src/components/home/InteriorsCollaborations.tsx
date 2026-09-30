'use client'

import React from 'react'
import { COLLABORATION_WHATSAPP } from '@/lib/whatsapp'

const InteriorsCollaborations = () => {
  return (
    <section id="interiors-collaborations" className="bg-[#fafafa] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <h2 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-4">
            Interiors &amp; collaborations
          </h2>
          <p className="text-[11px] tracking-[0.16em] uppercase text-gray-500 mb-4">
            Interior Designers · Architects · Luxury Residential &amp; Hospitality
          </p>
          <p className="text-sm md:text-base text-gray-600 font-light leading-relaxed mb-6">
            Selected collaborations and commissions can be discussed for distinctive interiors and significant residential, hospitality or architectural projects.
          </p>
          <a
            href={COLLABORATION_WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.18em] uppercase text-gray-900 hover:text-gray-600 transition-colors"
          >
            Discuss a collaboration →
          </a>
        </div>
      </div>
    </section>
  )
}

export default InteriorsCollaborations
