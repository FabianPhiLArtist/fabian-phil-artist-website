'use client'

import React from 'react'
import { COLLABORATION_WHATSAPP } from '@/lib/whatsapp'

export type CollaborationsCopy = {
  heading: string
  audience: string
  lead: string
  text: string
  cta: string
  whatsappHref: string
}

const englishCopy: CollaborationsCopy = {
  heading: 'Interiors & collaborations',
  audience: 'Interior Designers · Architects · Luxury Residential & Hospitality',
  lead: 'Fabian PhiL works with selected interior designers, architects and collectors seeking original contemporary artwork for distinctive residential, hospitality and architectural spaces.',
  text: 'Fabian PhiL’s own body of work remains the centre of the practice. Selected projects are considered where they align with his kinetic pop language on layered plexiglass.',
  cta: 'Discuss a collaboration →',
  whatsappHref: COLLABORATION_WHATSAPP,
}

const CollaborationsPage = ({ copy = englishCopy }: { copy?: CollaborationsCopy }) => {
  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-6">{copy.heading}</h1>
        <p className="text-[11px] tracking-[0.16em] uppercase text-gray-500 mb-6">{copy.audience}</p>
        <p className="text-xl md:text-2xl font-light text-gray-900 leading-relaxed mb-8">{copy.lead}</p>
        <p className="text-base text-gray-600 font-light leading-relaxed mb-12">{copy.text}</p>
        <a
          href={copy.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-xs tracking-[0.18em] uppercase text-gray-900 border-b border-gray-900 pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-colors"
        >
          {copy.cta}
        </a>
      </div>
    </div>
  )
}

export default CollaborationsPage
