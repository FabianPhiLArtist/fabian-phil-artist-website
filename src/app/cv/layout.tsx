import type { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CV - Fabian Phil Artist',
  alternates: {
    canonical: '/cv',
  },
  openGraph: {
    url: '/cv',
  },
}

export default function CVLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
