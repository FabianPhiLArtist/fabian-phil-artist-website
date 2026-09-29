import type { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Collectors - Fabian Phil Artist',
  alternates: {
    canonical: '/collectors',
  },
  openGraph: {
    url: '/collectors',
  },
}

export default function CollectorsLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
