import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fabian Phil Artist - Kinetic Pop Art',
  description: 'Contemporary kinetic pop art by Fabian Phil. Explore dynamic artworks featuring pandas, F1, and the Wanted series. Available for collectors worldwide.',
  keywords: 'kinetic art, pop art, contemporary art, Fabian Phil, pandas, F1, wanted series, art collector',
  authors: [{ name: 'Fabian Phil' }],
  openGraph: {
    title: 'Fabian Phil Artist - Kinetic Pop Art',
    description: 'Contemporary kinetic pop art by Fabian Phil. Explore dynamic artworks featuring pandas, F1, and the Wanted series.',
    type: 'website',
    locale: 'en_US',
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
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
