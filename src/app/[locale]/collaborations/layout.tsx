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
