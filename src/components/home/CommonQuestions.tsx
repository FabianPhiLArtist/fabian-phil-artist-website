'use client'

import React from 'react'
import LocaleLink from '@/components/LocaleLink'
import { useLocale } from '@/i18n/useLocale'
import FaqAccordion, { type FaqLinks } from '@/components/FaqAccordion'
import type { FaqItem } from '@/data/faq'

export type CommonQuestionsCopy = {
  heading: string
  viewAll: string
  // Localized answers for the home selection; English uses the shared FAQ data.
  items?: FaqItem[]
  links?: FaqLinks
}

const englishCopy: CommonQuestionsCopy = {
  heading: 'Common questions',
  viewAll: 'View all questions →',
}

const CommonQuestions = ({ copy = englishCopy }: { copy?: CommonQuestionsCopy }) => {
  const locale = useLocale()

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-6 md:mb-8">
          {copy.heading}
        </h2>
        <FaqAccordion
          only={['availability', 'price', 'sizes', 'commissions', 'galleries']}
          items={copy.items}
          links={copy.links}
        />
        <div className="mt-6">
          <LocaleLink
            locale={locale}
            route="faq"
            className="text-xs tracking-[0.18em] uppercase text-gray-900 hover:text-gray-600 transition-colors"
          >
            {copy.viewAll}
          </LocaleLink>
        </div>
      </div>
    </section>
  )
}

export default CommonQuestions
