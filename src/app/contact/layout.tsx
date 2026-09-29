import type { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact - Fabian Phil Artist',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    url: '/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
