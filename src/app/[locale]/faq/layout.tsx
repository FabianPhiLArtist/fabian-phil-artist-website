import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { isLocale } from '@/i18n/locales'
import { pageMetadata } from '@/i18n/seo'

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = isLocale(params.locale) ? params.locale : 'en'
  return pageMetadata({
    locale,
    route: 'faq',
    title: 'Fabian PhiL FAQ | Artwork Prices, Commissions & Availability',
    description:
      'Answers about Fabian PhiL artwork availability, prices on request, sizes, commissions, exhibitions in Dubai and collaborations.',
  })
}

export default function FaqLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
