import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { isLocale } from '@/i18n/locales'
import { pageMetadata } from '@/i18n/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = isLocale(localeParam) ? localeParam : 'en'
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
