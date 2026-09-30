export const WHATSAPP_URL = 'https://wa.me/971567594229'

export function whatsappHref(message: string): string {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`
}

export const ARTIST_BOOK_WHATSAPP = whatsappHref(
  'Hello Fabian, I would like to receive your artist book/portfolio. I am contacting you from [gallery / organisation].'
)

export const COLLABORATION_WHATSAPP = whatsappHref(
  'Hello Fabian, I would like to discuss a collaboration or commission for an interior or architectural project.'
)

export const PRICE_WHATSAPP = whatsappHref(
  'Hello Fabian, I would like to enquire about an artwork. The work I am interested in is: '
)
