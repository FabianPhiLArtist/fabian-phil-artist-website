import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { isLocale } from '@/i18n/locales'
import { pageMetadata } from '@/i18n/seo'

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = isLocale(params.locale) ? params.locale : 'en'
  return pageMetadata({
    locale,
    route: 'professionals',
    noIndex: true,
    title: 'Professionals - Fabian PhiL Artist',
    description:
      'Original kinetic pop artworks on layered plexiglass for interior designers, architects, galleries and curated spaces.',
  })
}

export default function ProfessionalsLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
