import { whatsappHref } from '@/lib/whatsapp'
import type { NavigationCopy } from '@/components/Navigation'
import type { FooterCopy } from '@/components/Footer'
import type { ArtworkCardCopy } from '@/components/ArtworkCard'
import type { CollectorInquiryCopy } from '@/components/CollectorInquiry'
import type { ImageZoomModalCopy } from '@/components/ImageZoomModal'
import type { SimpleImageModalCopy } from '@/components/SimpleImageModal'
import type { ArtworkDetailCopy } from '@/components/ArtworkDetail'
import type { NavKey } from '../navigation'
import { frCollectionNames } from './collections'

export const frWhatsapp = {
  artistBook: whatsappHref(
    'Bonjour Fabian, je souhaiterais recevoir votre book d’artiste / portfolio. Je vous contacte de la part de [galerie / organisation].'
  ),
  collaboration: whatsappHref(
    'Bonjour Fabian, je souhaiterais discuter d’une collaboration ou d’une commande pour un projet d’intérieur ou d’architecture.'
  ),
  price: whatsappHref('Bonjour Fabian, je souhaiterais me renseigner sur une œuvre. L’œuvre qui m’intéresse est\u00a0: '),
  general: whatsappHref('Bonjour Fabian, '),
}

export const frNavLabels: Record<NavKey, string> = {
  gallery: 'Œuvres',
  about: 'L’artiste',
  exhibitions: 'Expositions',
  collaborations: 'Collaborations',
  professionals: 'Galeries et curateurs d’art',
  contact: 'Contact',
  'price-inquiry': 'Demande de prix',
  faq: 'FAQ',
}

export const frNavigationCopy: NavigationCopy = {
  labels: frNavLabels,
  openMenu: 'Ouvrir le menu',
  closeMenu: 'Fermer le menu',
  language: 'Langue',
  frenchComingSoon: 'Version française bientôt disponible',
}

export const frFooterCopy: FooterCopy = {
  labels: frNavLabels,
  tagline: 'Pop art cinétique sur plexiglas superposé.',
  location: 'Dubaï, Émirats arabes unis.',
  navLabel: 'Pied de page',
}

export const frImageZoomModalCopy: ImageZoomModalCopy = {
  close: 'Fermer',
  previousPhoto: 'Photo précédente',
  nextPhoto: 'Photo suivante',
  viewPhoto: 'Voir la photo {n}',
  additionalView: '{title} par Fabian PhiL, vue complémentaire {n}',
  zoomIn: 'Touchez ou cliquez sur l’image pour zoomer',
  zoomOut: 'Touchez ou cliquez pour dézoomer',
}

export const frSimpleImageModalCopy: SimpleImageModalCopy = {
  close: 'Fermer',
  zoomIn: 'Zoom avant (+)',
  zoomOut: 'Zoom arrière (-)',
  reset: 'Réinitialiser (0)',
  help: 'Zoom\u00a0: {percent}\u00a0% • Molette ou touches +/- • Faites glisser pour vous déplacer',
}

const frEnquiryError = 'Votre message n’a pas pu être envoyé. Veuillez réessayer ou nous contacter sur WhatsApp.'

export const frCollectorInquiryCopy: CollectorInquiryCopy = {
  eyebrow: 'Demande d’information',
  thankYou: 'Merci\u202f!',
  sent: 'Votre demande a bien été envoyée. Fabian vous répondra sous 24 heures.',
  directContact: 'Vous pouvez aussi joindre Fabian directement à fabianphilartist@gmail.com ou au +971 567594229',
  close: 'Fermer',
  headingWithTitle: 'Cette œuvre vous intéresse\u00a0: «\u00a0{title}\u00a0»\u202f?',
  heading: 'Une œuvre en particulier vous intéresse\u202f?',
  intro: 'Remplissez le formulaire ci-dessous\u00a0: Fabian vous répondra personnellement.',
  honeypot: 'Laissez ce champ vide',
  name: 'Nom complet *',
  namePlaceholder: 'Vos nom et prénom',
  email: 'Adresse e-mail *',
  emailPlaceholder: 'vous@exemple.com',
  phone: 'Téléphone',
  phonePlaceholder: '+33 6 12 34 56 78',
  location: 'Localisation',
  locationPlaceholder: 'Ville, pays',
  artwork: 'Œuvre concernée',
  artworkPlaceholder: 'Titre de l’œuvre ou série',
  timeline: 'Échéance',
  timelineOptions: {
    '': 'Choisir une échéance',
    immediate: 'Immédiate',
    '1-3-months': '1 à 3 mois',
    '3-6-months': '3 à 6 mois',
    '6-12-months': '6 à 12 mois',
    flexible: 'Flexible',
  },
  message: 'Message',
  messagePlaceholder: 'Dites-nous en plus sur votre intérêt pour cette œuvre…',
  whatsappError: 'Écrire à Fabian sur WhatsApp',
  sending: 'Envoi…',
  submit: 'Envoyer la demande',
  preferWhatsapp: 'Vous préférez WhatsApp\u202f? →',
  whatsappMessage: 'Bonjour Fabian, je souhaiterais me renseigner sur l’œuvre «\u00a0{title}\u00a0».',
  error: frEnquiryError,
  fieldError: 'Veuillez vérifier ce champ. ' + frEnquiryError,
}

export const frArtworkCardCopy: ArtworkCardCopy = {
  inMotion: ' · En mouvement',
  priceOnRequest: 'Prix sur demande',
  sold: 'VENDU',
  viewDetails: 'Voir l’œuvre →',
  inquire: 'Se renseigner',
  defaultAlt: '{title}, œuvre sur plexiglas superposé de Fabian PhiL',
  inquiry: frCollectorInquiryCopy,
}

export const frArtworkDetailCopy: ArtworkDetailCopy = {
  backToGallery: 'Retour aux œuvres',
  backTo: 'Retour à {label}',
  navigation: 'Navigation\u00a0: {label}',
  previous: '← Précédente',
  next: 'Suivante →',
  imagesAvailable: '{n} images disponibles',
  oneImageAvailable: '1 image disponible',
  viewInDetail: 'Agrandir {title}',
  viewPhoto: 'Voir la photo {n}',
  thumbnailAlt: '{title}, miniature {n}',
  additionalViewAlt: '{title} par Fabian PhiL, vue complémentaire {n}',
  watchFullScreen: 'Voir en plein écran',
  watchFullScreenLink: 'Voir en plein écran →',
  filmedLabel: '{title}, filmée pendant que le spectateur se déplace',
  extraFilmedLabel: '{title}, vue complémentaire {n} filmée pendant que le spectateur se déplace',
  inMotion: 'En mouvement',
  details: 'Détails de l’œuvre',
  medium: 'Technique',
  dimensions: 'Dimensions',
  price: 'Prix',
  availability: 'Disponibilité',
  priceOnRequest: 'Prix sur demande',
  soldPrice: 'VENDU',
  available: 'Disponible',
  sold: 'VENDU',
  about: 'À propos de l’œuvre',
  inquire: 'Se renseigner sur cette œuvre',
  viewFullDetails: 'Agrandir l’œuvre',
  partOf: '{series}',
  partOfText: 'Cette œuvre fait partie d’une collection d’œuvres sélectionnées.',
  viewSeries: 'Voir toutes les œuvres de cette collection →',
  featuredIn: 'Présentée dans',
  closeVideo: 'Fermer la vidéo',
  collectionNames: frCollectionNames,
  zoom: frImageZoomModalCopy,
  inquiry: frCollectorInquiryCopy,
}
