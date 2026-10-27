import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { isLocale } from '@/i18n/locales'
import { pageMetadata } from '@/i18n/seo'
import { ARTIST_PORTRAIT } from '@/lib/site'
import { profilePageStructuredData } from '@/lib/structuredData'

const title = 'Fabian PhiL | French Contemporary Artist in Dubai'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = isLocale(localeParam) ? localeParam : 'en'
  return pageMetadata({
    locale,
    route: 'about',
    title,
    description:
      'Meet Fabian PhiL, the French contemporary artist based in Dubai whose international life and fascination with layers and movement led to kinetic portraits on plexiglass.',
    image: ARTIST_PORTRAIT,
  })
}

export default async function AboutLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: localeParam } = await params
  const locale = isLocale(localeParam) ? localeParam : 'en'
  return (
    <>
      <JsonLd data={profilePageStructuredData(title, locale)} />
      {children}
    </>
  )
}
