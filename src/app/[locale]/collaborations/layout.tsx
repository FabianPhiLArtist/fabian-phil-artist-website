import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { isLocale } from '@/i18n/locales'
import { pageMetadata } from '@/i18n/seo'

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = isLocale(params.locale) ? params.locale : 'en'
  return pageMetadata({
    locale,
    route: 'collaborations',
    title: 'Art for Interiors & Design Projects | Fabian PhiL Dubai',
    description:
      'Original contemporary art and selected commissions by Fabian PhiL for interior designers, architects, luxury residences and hospitality projects in Dubai and internationally.',
  })
}

export default function CollaborationsLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
