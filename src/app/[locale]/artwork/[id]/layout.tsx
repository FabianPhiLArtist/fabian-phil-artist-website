import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { artworks } from '@/data/artworks'
import { isLocale } from '@/i18n/locales'
import { pageMetadata } from '@/i18n/seo'

type ArtworkLayoutProps = {
  children: ReactNode
  params: { locale: string; id: string }
}

function findArtwork(id: string) {
  return artworks.find((art) => String(art.id) === id)
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

  const metadata = pageMetadata({
    locale,
    route: 'artwork',
    id: params.id,
    title: `${artwork.title} - Fabian PhiL Artist`,
  })

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      title: `${artwork.title} - Fabian PhiL Artist`,
    },
  }
}

export default function ArtworkLayout({ children, params }: ArtworkLayoutProps) {
  if (!findArtwork(params.id)) {
    notFound()
  }

  return children
}
