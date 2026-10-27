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
    route: 'exhibitions',
    title: 'Art Exhibitions in Dubai | Fabian PhiL',
    description:
      'Explore exhibitions and gallery presentations by French contemporary artist Fabian PhiL in Dubai, including Alliance Française, Noor Royal Gallery and World Art Dubai.',
    image: { url: '/images/exhibitions/fabian-phil-alliance-francaise-dubai-beyond-the-gaze-2026-08.jpg', alt: 'Visitors viewing Fabian PhiL artworks in Beyond the Gaze at Alliance Française Dubai' },
  })
}

export default function ExhibitionsLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
