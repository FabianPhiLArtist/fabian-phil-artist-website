import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { isLocale } from '@/i18n/locales'
import { pageMetadata } from '@/i18n/seo'
import { ARTIST_PORTRAIT } from '@/lib/site'
import { profilePageStructuredData } from '@/lib/structuredData'

const title = 'Fabian PhiL | French Contemporary Artist in Dubai'

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = isLocale(params.locale) ? params.locale : 'en'
  return pageMetadata({
    locale,
    route: 'about',
    title,
    description:
      'Meet Fabian PhiL, the French contemporary artist based in Dubai whose international life and fascination with layers and movement led to kinetic portraits on plexiglass.',
    image: ARTIST_PORTRAIT,
  })
}

export default function AboutLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <JsonLd data={profilePageStructuredData(title)} />
      {children}
    </>
  )
}
