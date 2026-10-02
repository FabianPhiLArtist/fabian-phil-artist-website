import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import './globals.css'
import { SITE_URL, SITE_NAME } from '@/lib/site'

const defaultTitle = 'Fabian PhiL | Contemporary Pop Artist in Dubai'
const defaultDescription =
  'Discover Fabian PhiL, a French contemporary artist based in Dubai creating kinetic pop portraits on layered plexiglass that transform with movement, perspective and light.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: defaultTitle,
  description: defaultDescription,
  authors: [{ name: 'Fabian PhiL' }],
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    type: 'website',
    locale: 'en_US',
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
