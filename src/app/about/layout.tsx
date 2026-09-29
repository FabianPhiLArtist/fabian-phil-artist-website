import type { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - Fabian Phil Artist',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    url: '/about',
  },
}

export default function AboutLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
