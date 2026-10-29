import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { artworks } from '@/data/artworks'
import { artworkSlugs } from '@/data/artworkSlugs'
import JsonLd from '@/components/JsonLd'
import { isLocale } from '@/i18n/locales'
import { pageMetadata } from '@/i18n/seo'
import { artworkOpenGraphImage } from '@/lib/artworkShareImage'
import { artworkStructuredData } from '@/lib/structuredData'

type ArtworkLayoutProps = {
  children: ReactNode
  params: Promise<{ locale: string; id: string }>
}

// The route segment is the artwork slug; numeric IDs are redirected by middleware and must not render here.
function findArtwork(slug: string) {
  return artworks.find((art) => artworkSlugs[art.id] === slug)
}

export function generateStaticParams() {
  return artworks.map((artwork) => ({ id: artworkSlugs[artwork.id] }))
}

export async function generateMetadata({ params }: ArtworkLayoutProps): Promise<Metadata> {
  const { locale: localeParam, id } = await params
  const locale = isLocale(localeParam) ? localeParam : 'en'
  const artwork = findArtwork(id)

  if (!artwork) {
    return {
      title: 'Artwork - Fabian PhiL Artist',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const share = artworkOpenGraphImage(artwork.image)
  return pageMetadata({
    locale,
    route: 'artwork',
    id: artwork.id,
    title: artwork.seoTitle ?? `${artwork.title} | Fabian PhiL`,
    description: artwork.metaDescription ?? `${artwork.title} (${artwork.year}) by Fabian PhiL. ${artwork.medium}, ${artwork.size}.`,
    image: {
      url: share.url,
      alt: artwork.imageAlt ?? `${artwork.title}, layered plexiglass artwork by Fabian PhiL`,
      ...(share.width && share.height ? { width: share.width, height: share.height } : {}),
      ...(share.type ? { type: share.type } : {}),
    },
  })
}

export default async function ArtworkLayout({ children, params }: ArtworkLayoutProps) {
  const { locale: localeParam, id } = await params
  const artwork = findArtwork(id)
  if (!artwork) {
    notFound()
  }
  const locale = isLocale(localeParam) ? localeParam : 'en'

  return (
    <>
      <JsonLd data={artworkStructuredData(artwork, locale)} />
      {children}
    </>
  )
}
