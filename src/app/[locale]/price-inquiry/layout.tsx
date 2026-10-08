import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { isLocale } from '@/i18n/locales'
import { pageMetadata } from '@/i18n/seo'

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = isLocale(params.locale) ? params.locale : 'en'
  return pageMetadata({
    locale,
    route: 'price-inquiry',
    title: 'Price Inquiry | Fabian PhiL Artwork Prices in Dubai',
    description:
      'Enquire about available original artworks by Dubai-based French contemporary artist Fabian PhiL, with indicative price ranges by format. All artworks are priced upon inquiry.',
  })
}

export default function PriceInquiryLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
