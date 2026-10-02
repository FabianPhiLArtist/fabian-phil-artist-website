import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { artworks } from '@/data/artworks'
import JsonLd from '@/components/JsonLd'
import { isLocale } from '@/i18n/locales'
import { pageMetadata } from '@/i18n/seo'
import { artworkStructuredData } from '@/lib/structuredData'

type ArtworkLayoutProps = {
  children: ReactNode
  params: { locale: string; id: string }
}

function findArtwork(id: string) {
  return artworks.find((art) => String(art.id) === id)
}

export function generateStaticParams() {
  return artworks.map((artwork) => ({ id: String(artwork.id) }))
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
    id: params.id,
    title: `${artwork.title} | Fabian PhiL`,
    description: `${artwork.title} (${artwork.year}) by Fabian PhiL. ${artwork.medium}, ${artwork.size}.`,
    image: { url: artwork.image, alt: `${artwork.title}, layered plexiglass artwork by Fabian PhiL` },
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
