import { fill } from '@/lib/template'
import type { Locale } from '@/i18n/locales'

type PricedArtwork = { available: boolean; priceAed?: number; atGallery?: 'noor-royal' }

type PriceCopy = {
  priceOnRequest: string
  sold: string
  // "{amount}" is replaced with the formatted number, e.g. "AED {amount}".
  priceFormat: string
  noorEnquire: string
}

// What a visitor sees as the price of an artwork: sold, gallery enquiry, a listed AED price, or price on request.
export function artworkPriceLabel(artwork: PricedArtwork, locale: Locale, copy: PriceCopy): string {
  if (!artwork.available) return copy.sold
  if (artwork.atGallery) return copy.noorEnquire
  if (typeof artwork.priceAed === 'number') {
    const amount = new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US').format(artwork.priceAed)
    return fill(copy.priceFormat, { amount })
  }
  return copy.priceOnRequest
}
