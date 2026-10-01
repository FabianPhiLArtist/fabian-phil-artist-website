import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { isLocale } from '@/i18n/locales'
import { pageMetadata } from '@/i18n/seo'

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = isLocale(params.locale) ? params.locale : 'en'
  return pageMetadata({
    locale,
    route: 'collaborations',
    title: 'Collaborations - Fabian PhiL Artist',
    description:
      'Selected collaborations and commissions for distinctive interiors and significant residential, hospitality or architectural projects.',
  })
}

export default function CollaborationsLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
