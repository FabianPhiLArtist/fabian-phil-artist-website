import React from 'react'
import type { Metadata } from 'next'
import Gallery from '@/components/Gallery'
import { isLocale } from '@/i18n/locales'
import { pageMetadata } from '@/i18n/seo'

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = isLocale(params.locale) ? params.locale : 'en'
  return pageMetadata({
    locale,
    route: 'gallery',
    title: 'Original Art in Dubai | Fabian PhiL Artworks',
    description:
      'Explore original contemporary artworks by Dubai-based French artist Fabian PhiL, including kinetic portraits, Pop Glasses, Wanted, F1 and layered plexiglass works.',
  })
}

// Rendered per request so ?series= / ?group= links arrive already filtered.
export const dynamic = 'force-dynamic'

type SearchParams = { series?: string | string[]; group?: string | string[] }

const firstValue = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value) ?? null

export default function GalleryPage({ searchParams }: { searchParams: SearchParams }) {
  return <Gallery initialSeries={firstValue(searchParams.series)} initialGroup={firstValue(searchParams.group)} />
}
