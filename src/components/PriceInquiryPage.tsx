'use client'

import React from 'react'
import { useLocale } from '@/i18n/useLocale'
import LocaleLink from '@/components/LocaleLink'
import { primaryButtonClass, textLinkClass } from '@/lib/formStyles'

export type PriceFormat = {
  name: string
  size: string
  aed: string
  eur: string
}

export type PriceInquiryCopy = {
  heading: string
  intro: string
  follow: string
  contactCta: string
  galleryCta: string
  whatsappCta?: string
  whatsappHref?: string
  columns?: {
    format: string
    size: string
    aed: string
    eur: string
  }
  formats?: PriceFormat[]
  noticeHeading?: string
  notice?: string
}

const PriceInquiryPage = ({ copy }: { copy: PriceInquiryCopy }) => {
  const locale = useLocale()
  const formats = copy.formats

  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl mb-12 md:mb-16">
          <h1 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-6">{copy.heading}</h1>
          <p className="text-xl md:text-2xl font-light text-gray-900 leading-relaxed">{copy.intro}</p>
          {copy.follow ? (
            <p className="mt-6 text-base md:text-lg text-gray-600 font-light leading-relaxed">{copy.follow}</p>
          ) : null}
        </header>

        {formats && copy.columns ? (
          <div className="border-t border-gray-900">
            <div className="hidden md:grid grid-cols-12 gap-6 py-3 border-b border-gray-200 text-[10px] tracking-[0.18em] uppercase text-gray-500">
              <span className="col-span-4">{copy.columns.format}</span>
              <span className="col-span-2">{copy.columns.size}</span>
              <span className="col-span-3">{copy.columns.aed}</span>
              <span className="col-span-3">{copy.columns.eur}</span>
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
        ) : null}

        <section className={`${formats ? 'mt-14 md:mt-20' : ''} max-w-3xl`}>
          {copy.noticeHeading ? (
            <h2 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-5">{copy.noticeHeading}</h2>
          ) : null}
          {copy.notice ? (
            <p className="text-sm md:text-base text-gray-600 font-light leading-relaxed mb-10">{copy.notice}</p>
          ) : null}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
            <LocaleLink locale={locale} route="contact" className={`${primaryButtonClass} self-start`}>
              {copy.contactCta}
            </LocaleLink>
            <LocaleLink locale={locale} route="gallery" className={textLinkClass}>
              {copy.galleryCta}
            </LocaleLink>
            {copy.whatsappCta && copy.whatsappHref ? (
              <a href={copy.whatsappHref} target="_blank" rel="noopener noreferrer" className={textLinkClass}>
                {copy.whatsappCta}
              </a>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  )
}

export default PriceInquiryPage
