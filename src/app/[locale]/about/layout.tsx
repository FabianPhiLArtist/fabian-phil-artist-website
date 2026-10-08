import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { isLocale } from '@/i18n/locales'
import { pageMetadata } from '@/i18n/seo'

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = isLocale(params.locale) ? params.locale : 'en'
  return pageMetadata({
    locale,
    route: 'about',
    title: 'Fabian PhiL | French Contemporary Artist in Dubai',
    description:
      'Meet Fabian PhiL, the French contemporary artist based in Dubai whose international life and fascination with layers and movement led to kinetic portraits on plexiglass.',
    image: { url: '/images/exhibitions/fabian-phil-artist-studio-dubai.jpg', alt: 'Fabian PhiL in his Dubai studio' },
  })
}

export default function AboutLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
