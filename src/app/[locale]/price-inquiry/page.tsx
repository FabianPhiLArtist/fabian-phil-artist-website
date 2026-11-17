import React from 'react'
import { notFound } from 'next/navigation'
import PriceInquiryPage, { type PriceInquiryCopy } from '@/components/PriceInquiryPage'
import { englishPricingInquiryCopy } from '@/components/CollectorInquiry'
import { frenchStaticPage } from '@/i18n/fr/content'
import { frPriceInquiryCopy } from '@/i18n/fr/priceInquiry'

// Server-only. Passed into the client page as props for English, so the indicative ranges
// stay on the English price page and are not compiled into the French page bundle.
const englishPriceInquiryCopy: PriceInquiryCopy = {
  heading: 'Price Inquiry',
  intro:
    'Prices are shown on each artwork page. Below are the price ranges by format, to guide your choice. Works shown at Noor Royal Gallery are priced by the gallery.',
  follow: 'Fabian replies personally, within 24 hours.',
  contactCta: 'Contact for Pricing',
  galleryCta: 'Browse Gallery →',
  inquiry: englishPricingInquiryCopy,
  columns: { format: 'Format', size: 'Size', aed: 'AED', usd: 'USD (approx.)' },
  formats: [
    { name: 'Small Format', size: '60x60cm / 70x70cm', aed: 'AED 10,000 - 16,000', usd: '≈ USD 2,700 - 4,400' },
    { name: 'Landscape Format', size: '100x70cm', aed: 'AED 16,000 - 23,000', usd: '≈ USD 4,400 - 6,300' },
    { name: 'Medium Format', size: '90x120cm / 120x90cm', aed: 'AED 30,000 - 60,000', usd: '≈ USD 8,200 - 16,300' },
    { name: 'Large Format', size: '110x110cm / 120x120cm', aed: 'AED 46,000', usd: '≈ USD 12,500' },
    { name: 'Triptych', size: '70x210cm', aed: 'AED 40,000 - 46,000', usd: '≈ USD 10,900 - 12,500' },
  ],
  noticeHeading: 'Good to know',
  notice:
    'Each original is unique (1/1) and comes with a wood frame and a signed certificate of authenticity. Prices are for the artwork only. For international shipping, packaging, transport, insurance and customs or import duties are paid by the buyer; packing and DHL shipping can be arranged and quoted on request. Delivery within Dubai can be arranged directly with the artist. Final price depends on the specific work.',
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
