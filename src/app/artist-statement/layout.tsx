import type { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Artist Statement - Fabian Phil Artist',
  alternates: {
    canonical: '/artist-statement',
  },
  openGraph: {
    url: '/artist-statement',
  },
}

export default function ArtistStatementLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
