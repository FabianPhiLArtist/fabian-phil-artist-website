import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Gallery from '@/components/Gallery'
import type { ArtworkCardText } from '@/components/ArtworkCard'
import { artworks } from '@/data/artworks'
import { isLocale } from '@/i18n/locales'
import { pageMetadata } from '@/i18n/seo'
import { frenchCardText, frenchStaticPage } from '@/i18n/fr/content'
import { frCollectionNames } from '@/i18n/fr/collections'
import { frGalleryCopy } from '@/i18n/fr/gallery'
import { frArtworkCardCopy } from '@/i18n/fr/ui'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = isLocale(localeParam) ? localeParam : 'en'
  return pageMetadata({
    locale,
    route: 'gallery',
    title: 'Original Art in Dubai | Fabian PhiL Artworks',
    description:
      'Explore original contemporary artworks by Dubai-based French artist Fabian PhiL, including kinetic portraits, Pop Glasses, Wanted, F1 and layered plexiglass works.',
    image: {
      url: '/images/artworks/angelina-jolie-pop-art-fabian-phil-interior.jpg',
      alt: 'Wanted for Being Too Smart, kinetic pop artwork by Fabian PhiL, staged in a contemporary interior',
    },
  })
}

// Rendered per request so ?series= / ?group= links arrive already filtered.
export const dynamic = 'force-dynamic'

type SearchParams = { series?: string | string[]; group?: string | string[] }

const firstValue = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value) ?? null

// French card text for every artwork; only French gallery requests serialize it.
function frenchTexts(): Record<number, ArtworkCardText> {
  const texts: Record<number, ArtworkCardText> = {}
  for (const artwork of artworks) {
    const text = frenchCardText(artwork.id)
    if (text) texts[artwork.id] = text
  }
  return texts
}

export default async function GalleryPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<SearchParams>
}) {
  const [{ locale }, query] = await Promise.all([params, searchParams])
  const french = locale === 'fr' && frenchStaticPage('gallery')
  if (locale === 'fr' && !french) {
    notFound()
  }
  return (
    <Gallery
      initialSeries={firstValue(query.series)}
      initialGroup={firstValue(query.group)}
      {...(french
        ? { copy: frGalleryCopy, cardCopy: frArtworkCardCopy, texts: frenchTexts(), collectionNames: frCollectionNames }
        : {})}
    />
  )
}
