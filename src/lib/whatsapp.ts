export const WHATSAPP_URL = 'https://wa.me/971567594229'

// Shown on the enquiry form. The spaced form is for reading; the clipboard uses E.164.
export const STUDIO_WHATSAPP_DISPLAY = '+971 56 759 4229'
export const STUDIO_WHATSAPP_INTERNATIONAL = '+971567594229'

function digits(value: string): string {
  return value.replace(/\D/g, '')
}

const studioDigits = digits(WHATSAPP_URL)
if (
  digits(STUDIO_WHATSAPP_DISPLAY) !== studioDigits ||
  digits(STUDIO_WHATSAPP_INTERNATIONAL) !== studioDigits
) {
  throw new Error('Studio WhatsApp number does not match wa.me')
}

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
