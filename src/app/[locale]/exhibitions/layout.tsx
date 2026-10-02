import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { isLocale } from '@/i18n/locales'
import { pageMetadata } from '@/i18n/seo'

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = isLocale(params.locale) ? params.locale : 'en'
  return pageMetadata({
    locale,
    route: 'exhibitions',
    title: 'Art Exhibitions in Dubai | Fabian PhiL',
    description:
      'Explore exhibitions and gallery presentations by French contemporary artist Fabian PhiL in Dubai, including Alliance Française, Noor Royal Gallery and World Art Dubai.',
    image: { url: '/images/exhibitions/Alliance 8.jpg', alt: 'Visitors viewing Fabian PhiL artworks in Beyond the Gaze at Alliance Française Dubai' },
  })
}

export default function ExhibitionsLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
