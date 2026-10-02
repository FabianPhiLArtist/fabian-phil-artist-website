import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { isLocale } from '@/i18n/locales'
import { pageMetadata } from '@/i18n/seo'

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = isLocale(params.locale) ? params.locale : 'en'
  return pageMetadata({
    locale,
    route: 'collectors',
    noIndex: true,
    title: 'Collectors - Fabian PhiL Artist',
  })
}

export default function CollectorsLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
