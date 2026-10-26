'use client'

import React from 'react'
import { useLocale } from '@/i18n/useLocale'
import LocaleLink from '@/components/LocaleLink'

export type ProfessionalsExhibition = {
  title: string
  text: string
}

export type ProfessionalsCopy = {
  heading: string
  intro: string
  bookHeading: string
  bookText: string
  bookCta: string
  bookHref: string
  exhibitionsHeading: string
  exhibitions: ProfessionalsExhibition[]
  exhibitionsCta: string
  contactCta: string
}

// English stays the short, noindex project page. French passes its own copy.
const englishProject = {
  heading: 'Art for projects',
  lead: 'Fabian PhiL’s kinetic pop artworks bring colour, movement and changing perspectives to contemporary interiors.',
  subheading: 'For interior designers, architects, galleries & curated spaces',
  text: 'Explore original artworks on layered plexiglass for residential, hospitality and selected creative projects.',
  cta: 'Discuss a project →',
}

const ProfessionalsPage = ({ copy }: { copy?: ProfessionalsCopy }) => {
  const locale = useLocale()

  if (!copy) {
    return (
      <div className="min-h-screen bg-white pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-6">{englishProject.heading}</h1>
          <p className="text-xl md:text-2xl font-light text-gray-900 leading-relaxed mb-12">{englishProject.lead}</p>
          <h2 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-5">{englishProject.subheading}</h2>
          <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed mb-12">{englishProject.text}</p>
          <LocaleLink
            locale={locale}
            route="contact"
            className="inline-flex items-center text-xs tracking-[0.18em] uppercase text-gray-900 border-b border-gray-900 pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-colors"
          >
            {englishProject.cta}
          </LocaleLink>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-6">{copy.heading}</h1>
        <p className="text-xl md:text-2xl font-light text-gray-900 leading-relaxed mb-12">{copy.intro}</p>

        <h2 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-5">{copy.bookHeading}</h2>
        <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed mb-8">{copy.bookText}</p>
        <a
          href={copy.bookHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-xs tracking-[0.18em] uppercase text-gray-900 border-b border-gray-900 pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-colors"
        >
          {copy.bookCta}
        </a>

        <h2 className="text-xs tracking-[0.24em] uppercase text-gray-900 mt-14 mb-8">{copy.exhibitionsHeading}</h2>
        <ul className="space-y-8 list-none p-0 m-0">
          {copy.exhibitions.map((exhibition) => (
            <li key={exhibition.title}>
              <h3 className="text-sm tracking-[0.12em] uppercase text-gray-900 mb-2">{exhibition.title}</h3>
              <p className="text-base text-gray-600 font-light leading-relaxed">{exhibition.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col items-start gap-6">
          <LocaleLink
            locale={locale}
            route="exhibitions"
            className="inline-flex items-center text-xs tracking-[0.18em] uppercase text-gray-900 border-b border-gray-900 pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-colors"
          >
            {copy.exhibitionsCta}
          </LocaleLink>
          <LocaleLink
            locale={locale}
            route="contact"
            className="inline-flex items-center text-xs tracking-[0.18em] uppercase text-gray-900 border-b border-gray-900 pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-colors"
          >
            {copy.contactCta}
          </LocaleLink>
        </div>
      </div>
    </div>
  )
}

export default ProfessionalsPage
