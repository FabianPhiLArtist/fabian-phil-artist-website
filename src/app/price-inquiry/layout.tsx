import type { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Price Inquiry - Fabian Phil Artist',
  alternates: {
    canonical: '/price-inquiry',
  },
  openGraph: {
    url: '/price-inquiry',
  },
}

export default function PriceInquiryLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
