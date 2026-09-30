import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { artworks } from '@/data/artworks'
import { isLocale } from '@/i18n/locales'
import { pageMetadata } from '@/i18n/seo'

type ArtworkLayoutProps = {
  children: ReactNode
  params: { locale: string; id: string }
}

export function generateMetadata({ params }: ArtworkLayoutProps): Metadata {
  const locale = isLocale(params.locale) ? params.locale : 'en'
  const artwork = artworks.find((art) => art.id === parseInt(params.id, 10))

  if (!artwork) {
    return {
      title: 'Artwork - Fabian Phil Artist',
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
    title: `${artwork.title} - Fabian Phil Artist`,
  })

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      title: `${artwork.title} - Fabian Phil Artist`,
    },
  }
}

export default function ArtworkLayout({ children }: ArtworkLayoutProps) {
  return children
}
