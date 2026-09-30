import React from 'react'
import FaqAccordion from '@/components/FaqAccordion'

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-6 md:mb-8">
          Common questions
        </h1>
        <FaqAccordion />
      </div>
    </div>
  )
}
