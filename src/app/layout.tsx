import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import './globals.css'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Fabian Phil Artist - Kinetic Pop Art',
  description: 'Contemporary kinetic pop art by Fabian Phil. Explore dynamic artworks featuring pandas, F1, and the Wanted series. Available for collectors worldwide.',
  keywords: 'kinetic art, pop art, contemporary art, Fabian Phil, pandas, F1, wanted series, art collector',
  authors: [{ name: 'Fabian Phil' }],
  openGraph: {
    title: 'Fabian Phil Artist - Kinetic Pop Art',
    description: 'Contemporary kinetic pop art by Fabian Phil. Explore dynamic artworks featuring pandas, F1, and the Wanted series.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Fabian Phil Artist',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fabian Phil Artist - Kinetic Pop Art',
    description: 'Contemporary kinetic pop art by Fabian Phil. Explore dynamic artworks featuring pandas, F1, and the Wanted series.',
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
