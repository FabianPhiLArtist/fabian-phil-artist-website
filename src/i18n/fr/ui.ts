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
  close: 'Fermer',
  headingWithTitle: 'Cette œuvre vous intéresse\u00a0: «\u00a0{title}\u00a0»\u202f?',
  heading: 'Une œuvre vous intéresse\u202f?',
  intro: 'Poursuivez cette demande dans une conversation WhatsApp personnelle avec Fabian.',
  studioNumber: 'Numéro WhatsApp',
  copyNumber: 'Copier le numéro',
  numberCopied: 'Copié',
  honeypot: 'Laissez ce champ vide',
  name: 'Nom complet *',
  namePlaceholder: 'Vos nom et prénom',
  nameError: 'Veuillez indiquer votre nom.',
  email: 'Adresse e-mail *',
  emailPlaceholder: 'vous@exemple.com',
  emailError: 'Veuillez indiquer une adresse e-mail valide.',
  phone: 'WhatsApp *',
  phonePlaceholder: '+33 6 12 34 56 78',
  phoneHint: 'Indiquez l’indicatif du pays, en commençant par +.',
  phoneError: 'Indiquez un numéro WhatsApp avec l’indicatif du pays, en commençant par +.',
  location: 'Localisation *',
  locationPlaceholder: 'Choisissez votre localisation',
  locationError: 'Veuillez choisir votre localisation.',
  message: 'Message',
  messagePlaceholder: 'Ce que vous souhaitez préciser à Fabian',
  submit: 'Ouvrir WhatsApp',
  emailOption: 'Écrire par e-mail',
  sendNote: 'WhatsApp va s’ouvrir avec votre message. Il n’est envoyé qu’une fois que vous avez appuyé sur Envoyer.',
  openedNote: 'WhatsApp devrait maintenant être ouvert. Votre message n’est envoyé qu’après avoir appuyé sur Envoyer.',
  privacy:
    'Votre nom, votre localisation, votre numéro WhatsApp, votre e-mail et ce que vous écrivez ici figurent dans le message que vous envoyez. WhatsApp traite ces informations lorsque vous appuyez sur Envoyer. Ce site ne les enregistre pas.',
  lineArtwork:
    'Bonjour Fabian, je souhaiterais me renseigner auprès de vous sur l’œuvre «\u00a0{title}\u00a0» ({url}).',
  lineGeneral: 'Bonjour Fabian, je souhaiterais me renseigner auprès de vous sur une œuvre.',
  lineName: 'Je m’appelle {name}.',
  linePhone: 'WhatsApp : {phone}',
  lineEmail: 'E-mail : {email}',
  lineLocation: 'Localisation : {location}',
  emailSubjectArtwork: 'Demande au sujet de l’œuvre « {title} »',
  emailSubjectGeneral: 'Demande au sujet d’une œuvre',
  whatsappError: 'Écrire à Fabian sur WhatsApp',
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
  edition: 'Édition',
  price: 'Prix',
  availability: 'Disponibilité',
  priceOnRequest: 'Prix sur demande',
  soldPrice: 'VENDU',
  available: 'Disponible',
  sold: 'VENDU',
  about: 'À propos de l’œuvre',
  inquire: 'Se renseigner sur cette œuvre',
  emailInstead: 'Écrire à Fabian',
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
