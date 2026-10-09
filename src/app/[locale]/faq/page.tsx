import React from 'react'
import Link from 'next/link'
import FaqAccordion from '@/components/FaqAccordion'
import JsonLd from '@/components/JsonLd'
import { isLocale } from '@/i18n/locales'
import { localizedHref } from '@/i18n/pathnames'
import { textLinkClass } from '@/lib/formStyles'
import { faqStructuredData } from '@/lib/structuredData'
import { ARTIST_FAQ_IDS, FAQ_SCHEMA_EXCLUDED_IDS, WORK_FAQ_IDS, faqAnswerText, faqItemsById } from '@/data/faq'

const groupHeadingClass = 'text-[11px] tracking-[0.16em] uppercase text-gray-500 mb-3'

const schemaItems = faqItemsById([...ARTIST_FAQ_IDS, ...WORK_FAQ_IDS])
  .filter((item) => !FAQ_SCHEMA_EXCLUDED_IDS.includes(item.id))
  .map((item) => ({ question: item.q, answer: faqAnswerText(item) }))

export default function FaqPage({ params }: { params: { locale: string } }) {
  const locale = isLocale(params.locale) ? params.locale : 'en'
  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <JsonLd data={faqStructuredData(schemaItems)} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-6 md:mb-8">
          Common questions
        </h1>
        <section aria-labelledby="faq-artist" className="mb-10 md:mb-12">
          <h2 id="faq-artist" className={groupHeadingClass}>
            About the artist
          </h2>
          <FaqAccordion only={ARTIST_FAQ_IDS} />
        </section>
        <section aria-labelledby="faq-artworks">
          <h2 id="faq-artworks" className={groupHeadingClass}>
            Artworks, prices &amp; commissions
          </h2>
          <FaqAccordion only={WORK_FAQ_IDS} />
        </section>
        <div className="mt-10">
          <Link href={localizedHref(locale, 'gallery')} className={textLinkClass}>
            View all artworks →
          </Link>
        </div>
      </div>
    </div>
  )
}
