import { fill } from '@/lib/template'
import type { Locale } from '@/i18n/locales'

type PricedArtwork = { available: boolean; priceAed?: number; priceUsdApprox?: number; atGallery?: 'noor-royal' }

type PriceCopy = {
  priceOnRequest: string
  sold: string
  // "{amount}" is the AED price and "{usd}" the rounded US dollar equivalent.
  priceFormat: string
  noorEnquire: string
}

// The dirham is pegged to the US dollar at a fixed rate.
const AED_PER_USD = 3.6725

// What a visitor sees as the price of an artwork: sold, gallery enquiry, a listed AED price, or price on request.
export function artworkPriceLabel(artwork: PricedArtwork, locale: Locale, copy: PriceCopy): string {
  if (!artwork.available) return copy.sold
  if (artwork.atGallery) return copy.noorEnquire
  if (typeof artwork.priceAed === 'number') {
    const numbers = new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US')
    const usd = artwork.priceUsdApprox ?? Math.round(artwork.priceAed / AED_PER_USD / 100) * 100
    return fill(copy.priceFormat, { amount: numbers.format(artwork.priceAed), usd: numbers.format(usd) })
  }
  return copy.priceOnRequest
}
