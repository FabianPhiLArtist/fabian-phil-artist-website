import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { artworks } from '@/data/artworks'
import { artworkSlugs } from '@/data/artworkSlugs'
import JsonLd from '@/components/JsonLd'
import { isLocale } from '@/i18n/locales'
import { pageMetadata } from '@/i18n/seo'
import { artworkStructuredData } from '@/lib/structuredData'

type ArtworkLayoutProps = {
  children: ReactNode
  params: { locale: string; id: string }
}

// The route segment is the artwork slug; numeric IDs are redirected by middleware and must not render here.
function findArtwork(slug: string) {
  return artworks.find((art) => artworkSlugs[art.id] === slug)
}

export function generateStaticParams() {
  return artworks.map((artwork) => ({ id: artworkSlugs[artwork.id] }))
}

export function generateMetadata({ params }: ArtworkLayoutProps): Metadata {
  const locale = isLocale(params.locale) ? params.locale : 'en'
  const artwork = findArtwork(params.id)

  if (!artwork) {
    return {
      title: 'Artwork - Fabian PhiL Artist',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  return pageMetadata({
    locale,
    route: 'artwork',
    id: artwork.id,
    title: artwork.seoTitle ?? `${artwork.title} | Fabian PhiL`,
    description: artwork.metaDescription ?? `${artwork.title} (${artwork.year}) by Fabian PhiL. ${artwork.medium}, ${artwork.size}.`,
    image: { url: artwork.image, alt: artwork.imageAlt ?? `${artwork.title}, layered plexiglass artwork by Fabian PhiL` },
  })
}

export default function ArtworkLayout({ children, params }: ArtworkLayoutProps) {
  const artwork = findArtwork(params.id)
  if (!artwork) {
    notFound()
  }

  return (
    <>
      <JsonLd data={artworkStructuredData(artwork)} />
      {children}
    </>
  )
}
