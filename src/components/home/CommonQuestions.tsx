'use client'

import React from 'react'
import Link from 'next/link'
import { useLocale } from '@/i18n/useLocale'
import { localizedHref } from '@/i18n/pathnames'
import FaqAccordion from '@/components/FaqAccordion'

const CommonQuestions = () => {
  const locale = useLocale()

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-6 md:mb-8">
          Common questions
        </h2>
        <FaqAccordion only={['availability', 'price', 'sizes', 'commissions', 'galleries']} />
        <div className="mt-6">
          <Link
            href={localizedHref(locale, 'faq')}
            className="text-xs tracking-[0.18em] uppercase text-gray-900 hover:text-gray-600 transition-colors"
          >
            View all questions →
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CommonQuestions
