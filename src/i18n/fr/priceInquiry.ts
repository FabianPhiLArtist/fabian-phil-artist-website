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
    'Les prix figurent sur la page de chaque œuvre. Voici les fourchettes par format, pour guider votre choix. Les œuvres présentées à la Noor Royal Gallery sont proposées par la galerie.',
  follow: 'Fabian vous répond personnellement, sous 24 heures.',
  contactCta: 'Contacter Fabian',
  galleryCta: 'Voir les œuvres →',
  inquiry: frPricingInquiryCopy,
  columns: { format: 'Format', size: 'Dimensions', aed: 'AED', usd: 'USD (approx.)' },
  formats: [
    { name: 'Petit format', size: '60x60cm / 70x70cm', aed: '10 000 - 16 000 AED', usd: '≈ 2 700 - 4 400 USD' },
    { name: 'Format paysage', size: '100x70cm', aed: '16 000 - 23 000 AED', usd: '≈ 4 400 - 6 300 USD' },
    { name: 'Format moyen', size: '90x120cm / 120x90cm', aed: '30 000 - 60 000 AED', usd: '≈ 8 200 - 16 300 USD' },
    { name: 'Grand format', size: '110x110cm / 120x120cm', aed: '46 000 AED', usd: '≈ 12 500 USD' },
    { name: 'Triptyque', size: '70x210cm', aed: '40 000 - 46 000 AED', usd: '≈ 10 900 - 12 500 USD' },
  ],
  noticeHeading: 'Bon à savoir',
  notice:
    'Chaque original est une pièce unique (1/1), livrée avec un cadre en bois et un certificat d’authenticité signé. Les prix concernent l’œuvre seule. Pour une expédition internationale, l’emballage, le transport, l’assurance et les droits de douane ou d’importation sont à la charge de l’acheteur ; l’emballage et l’envoi DHL peuvent être organisés et chiffrés sur demande. La livraison à Dubaï peut être organisée directement avec l’artiste. Le paiement se fait par virement bancaire après facture, ou en USDT ou USDC sur demande. Le prix final dépend de l’œuvre.',
}
