import type { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Exhibitions - Fabian Phil Artist',
  alternates: {
    canonical: '/exhibitions',
  },
  openGraph: {
    url: '/exhibitions',
  },
}

export default function ExhibitionsLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
