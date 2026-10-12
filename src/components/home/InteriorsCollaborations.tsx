'use client'

import React from 'react'
import { COLLABORATION_WHATSAPP } from '@/lib/whatsapp'

export type InteriorsCollaborationsCopy = {
  heading: string
  audience: string
  text: string
  cta: string
  whatsappHref: string
}

const englishCopy: InteriorsCollaborationsCopy = {
  heading: 'Interiors & collaborations',
  audience: 'Interior Designers · Architects · Luxury Residential & Hospitality',
  text: 'Selected collaborations and commissions can be discussed for distinctive interiors and significant residential, hospitality or architectural projects.',
  cta: 'Discuss a collaboration →',
  whatsappHref: COLLABORATION_WHATSAPP,
}

const InteriorsCollaborations = ({ copy = englishCopy }: { copy?: InteriorsCollaborationsCopy }) => {
  return (
    <section id="interiors-collaborations" className="bg-[#fafafa] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <h2 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-4">
            {copy.heading}
          </h2>
          <p className="text-[11px] tracking-[0.16em] uppercase text-gray-500 mb-4">
            {copy.audience}
          </p>
          <p className="text-sm md:text-base text-gray-600 font-light leading-relaxed mb-6">
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

export default InteriorsCollaborations
