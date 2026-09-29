import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { artworks } from '@/data/artworks'

type ArtworkLayoutProps = {
  children: ReactNode
  params: { id: string }
}

export function generateMetadata({ params }: ArtworkLayoutProps): Metadata {
  const artwork = artworks.find((art) => art.id === parseInt(params.id, 10))
  const path = `/artwork/${params.id}`

  if (!artwork) {
    return {
      title: 'Artwork - Fabian Phil Artist',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  return {
    title: `${artwork.title} - Fabian Phil Artist`,
    alternates: {
      canonical: path,
    },
    openGraph: {
      url: path,
      title: `${artwork.title} - Fabian Phil Artist`,
    },
  }
}

export default function ArtworkLayout({ children }: ArtworkLayoutProps) {
  return children
}
