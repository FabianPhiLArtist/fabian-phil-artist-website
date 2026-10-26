import type { PriceInquiryCopy } from '@/components/PriceInquiryPage'
import { frArtistEntity } from './artist'
import { frWhatsapp } from './ui'

export const frPriceInquirySeo = {
  title: 'Demande de prix | Œuvres de Fabian PhiL',
  description:
    'Renseignez-vous discrètement sur une œuvre de Fabian PhiL, artiste français basé à Dubaï. Disponibilité et prix sur demande, pour les collectionneurs.',
  ogImageAlt: frArtistEntity.portraitCaption,
}

export const frPriceInquiryCopy: PriceInquiryCopy = {
  heading: 'Demande de prix',
  intro:
    'Les collectionneurs se renseignent discrètement sur une œuvre. La disponibilité et le prix sont communiqués sur demande, directement par Fabian.',
  follow: 'Indiquez le titre de l’œuvre qui vous intéresse. Fabian vous répond personnellement.',
  contactCta: 'Contacter Fabian',
  galleryCta: 'Voir les œuvres →',
  whatsappCta: 'Écrire sur WhatsApp →',
  whatsappHref: frWhatsapp.price,
}
