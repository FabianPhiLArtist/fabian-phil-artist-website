'use client'

import React from 'react'
import Link from 'next/link'
import { useLocale } from '@/i18n/useLocale'
import { localizedHref } from '@/i18n/pathnames'
import { primaryButtonClass, textLinkClass } from '@/lib/formStyles'

const formats = [
  { name: 'Small Format', size: '70x70cm', aed: 'AED 10,000 - 16,000', eur: '€2,500 - 4,000' },
  { name: 'Triptych', size: '70x180cm', aed: 'AED 30,000 - 40,000', eur: '€8,000 - 10,000' },
  { name: 'Medium Format', size: '90x120cm', aed: 'AED 28,000 - 50,000', eur: '€7,000 - 13,000' },
  { name: 'Large Format', size: '110x110cm+', aed: 'AED 35,000 - 45,000', eur: '€9,000 - 11,000' },
]

const PriceInquiryPage = () => {
  const locale = useLocale()
  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl mb-12 md:mb-16">
          <h1 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-6">
            Price Inquiry
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-900 leading-relaxed">
            All artworks are priced upon inquiry. Below are indicative price ranges by format size to help guide your interest and collection planning.
          </p>
        </header>

        <div className="border-t border-gray-900">
          <div className="hidden md:grid grid-cols-12 gap-6 py-3 border-b border-gray-200 text-[10px] tracking-[0.18em] uppercase text-gray-500">
            <span className="col-span-4">Format</span>
            <span className="col-span-2">Size</span>
            <span className="col-span-3">AED</span>
            <span className="col-span-3">EUR</span>
          </div>
          {formats.map((format) => (
            <div
              key={format.name}
              className="grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-2 py-6 md:py-7 border-b border-gray-200"
            >
              <h3 className="col-span-2 md:col-span-4 text-sm md:text-base tracking-[0.12em] uppercase text-gray-900">
                {format.name}
              </h3>
              <p className="col-span-2 md:col-span-2 text-sm text-gray-600 font-light">{format.size}</p>
              <p className="md:col-span-3 text-base md:text-lg font-light text-gray-900">{format.aed}</p>
              <p className="md:col-span-3 text-base md:text-lg font-light text-gray-500">{format.eur}</p>
            </div>
          ))}
        </div>

        <section className="mt-14 md:mt-20 max-w-3xl">
          <h2 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-5">Important Notice</h2>
          <p className="text-sm md:text-base text-gray-600 font-light leading-relaxed mb-10">
            All prices are indicative and subject to change. Final pricing depends on the specific artwork,
            its condition, provenance, and current market conditions. For accurate pricing and availability,
            please contact us directly.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
            <Link href={localizedHref(locale, 'contact')} className={`${primaryButtonClass} self-start`}>
              Contact for Pricing
            </Link>
            <Link href={localizedHref(locale, 'gallery')} className={textLinkClass}>
              Browse Gallery →
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default PriceInquiryPage
