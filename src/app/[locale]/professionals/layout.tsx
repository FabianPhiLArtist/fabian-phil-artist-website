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
    route: 'professionals',
    // English stays noindex. The French page is indexable once it is published.
    noIndex: locale !== 'fr',
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
