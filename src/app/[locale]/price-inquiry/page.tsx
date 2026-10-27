import React from 'react'
import { notFound } from 'next/navigation'
import PriceInquiryPage, { type PriceInquiryCopy } from '@/components/PriceInquiryPage'
import { frenchStaticPage } from '@/i18n/fr/content'
import { frPriceInquiryCopy } from '@/i18n/fr/priceInquiry'

// Server-only. Passed into the client page as props for English, so the indicative ranges
// stay on the English price page and are not compiled into the French page bundle.
const englishPriceInquiryCopy: PriceInquiryCopy = {
  heading: 'Price Inquiry',
  intro:
    'All artworks are priced upon inquiry. Below are indicative price ranges by format size to help guide your interest and collection planning.',
  follow: '',
  contactCta: 'Contact for Pricing',
  galleryCta: 'Browse Gallery →',
  columns: { format: 'Format', size: 'Size', aed: 'AED', eur: 'EUR' },
  formats: [
    { name: 'Small Format', size: '70x70cm', aed: 'AED 10,000 - 16,000', eur: '€2,500 - 4,000' },
    { name: 'Triptych', size: '70x210cm', aed: 'AED 30,000 - 40,000', eur: '€8,000 - 10,000' },
    { name: 'Medium Format', size: '90x120cm', aed: 'AED 28,000 - 50,000', eur: '€7,000 - 13,000' },
    { name: 'Large Format', size: '110x110cm / 120x120cm', aed: 'AED 35,000 - 45,000', eur: '€9,000 - 11,000' },
  ],
  noticeHeading: 'Important Notice',
  notice:
    'All prices are indicative and subject to change. Final pricing depends on the specific artwork, its condition, provenance, and current market conditions. For accurate pricing and availability, please contact us directly.',
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (locale !== 'fr') {
    return <PriceInquiryPage copy={englishPriceInquiryCopy} />
  }
  if (!frenchStaticPage('price-inquiry')) {
    notFound()
  }
  return <PriceInquiryPage copy={frPriceInquiryCopy} />
}
