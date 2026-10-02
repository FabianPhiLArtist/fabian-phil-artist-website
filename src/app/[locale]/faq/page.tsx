import React from 'react'
import Link from 'next/link'
import FaqAccordion from '@/components/FaqAccordion'
import { isLocale } from '@/i18n/locales'
import { localizedHref } from '@/i18n/pathnames'
import { textLinkClass } from '@/lib/formStyles'

export default function FaqPage({ params }: { params: { locale: string } }) {
  const locale = isLocale(params.locale) ? params.locale : 'en'
  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-6 md:mb-8">
          Common questions
        </h1>
        <FaqAccordion />
        <div className="mt-10">
          <Link href={localizedHref(locale, 'gallery')} className={textLinkClass}>
            View all artworks →
          </Link>
        </div>
      </div>
    </div>
  )
}
