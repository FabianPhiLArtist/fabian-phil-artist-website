import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import FaqAccordion from '@/components/FaqAccordion'
import JsonLd from '@/components/JsonLd'
import { isLocale } from '@/i18n/locales'
import { localizedHref } from '@/i18n/pathnames'
import { textLinkClass } from '@/lib/formStyles'
import { faqStructuredData } from '@/lib/structuredData'
import { frenchFaqPage } from '@/i18n/fr/content'
import { frPageHeadings } from '@/i18n/fr/headings'
import { frWhatsapp } from '@/i18n/fr/ui'
import { ARTIST_FAQ_IDS, WORK_FAQ_IDS, faqAnswerText, faqItemsById, type FaqItem } from '@/data/faq'

const groupHeadingClass = 'text-[11px] tracking-[0.16em] uppercase text-gray-500 mb-3'

const schemaItems = (items: FaqItem[]) =>
  items.map((item) => ({ question: item.q, answer: faqAnswerText(item) }))

const englishCopy = {
  heading: 'Common questions',
  artist: 'About the artist',
  artworks: 'Artworks, prices & commissions',
  viewAll: 'View all artworks →',
}

const frenchCopy = {
  heading: frPageHeadings.faq,
  artist: 'À propos de l’artiste',
  artworks: 'Œuvres, prix et commandes',
  viewAll: 'Voir toutes les œuvres →',
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = isLocale(localeParam) ? localeParam : 'en'
  const french = locale === 'fr' ? frenchFaqPage() : undefined
  if (locale === 'fr' && !french) {
    notFound()
  }
  const items = french ? french.items : faqItemsById([...ARTIST_FAQ_IDS, ...WORK_FAQ_IDS])
  const copy = french ? frenchCopy : englishCopy
  const frenchProps = (ids: typeof ARTIST_FAQ_IDS) =>
    french
      ? {
          items: items.filter((item) => ids.includes(item.id)),
          links: { general: frWhatsapp.general, price: frWhatsapp.price },
        }
      : {}
  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <JsonLd data={faqStructuredData(schemaItems(items), locale)} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-6 md:mb-8">
          {copy.heading}
        </h1>
        <section aria-labelledby="faq-artist" className="mb-10 md:mb-12">
          <h2 id="faq-artist" className={groupHeadingClass}>
            {copy.artist}
          </h2>
          <FaqAccordion only={ARTIST_FAQ_IDS} {...frenchProps(ARTIST_FAQ_IDS)} />
        </section>
        <section aria-labelledby="faq-artworks">
          <h2 id="faq-artworks" className={groupHeadingClass}>
            {copy.artworks}
          </h2>
          <FaqAccordion only={WORK_FAQ_IDS} {...frenchProps(WORK_FAQ_IDS)} />
        </section>
        <div className="mt-10">
          <Link href={localizedHref(locale, 'gallery')} className={textLinkClass}>
            {copy.viewAll}
          </Link>
        </div>
      </div>
    </div>
  )
}
