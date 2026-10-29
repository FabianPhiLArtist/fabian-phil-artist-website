import type { CollectorInquiryCopy } from '@/components/CollectorInquiry'
import type { PriceInquiryCopy } from '@/components/PriceInquiryPage'
import { enquiryMessageLines } from '@/lib/enquiryWording'
import { frArtistEntity } from './artist'
import { frCollectorInquiryCopy } from './ui'

export const frPricingInquiryCopy: CollectorInquiryCopy = {
  ...frCollectorInquiryCopy,
  eyebrow: 'Demande de prix',
  heading: 'Vous souhaitez connaître un prix\u202f?',
  headingWithTitle: 'Vous souhaitez connaître un prix\u202f?',
  intro: 'Nommez une œuvre ou posez une question générale. Votre demande est envoyée à l’atelier depuis ce site, puis WhatsApp s’ouvre.',
  subject: 'Œuvre ou question',
  subjectPlaceholder: 'Titre d’une œuvre, ou votre question',
  linePricing: enquiryMessageLines.fr.pricing,
  lineSubject: enquiryMessageLines.fr.subject,
  emailSubjectPricing: 'Demande de prix',
}

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
  inquiry: frPricingInquiryCopy,
}
