import type { CollaborationsCopy } from '@/components/CollaborationsPage'
import { frArtistEntity } from './artist'
import { frWhatsapp } from './ui'

export const frCollaborationsSeo = {
  title: 'Designers d’intérieur & collaborations | Fabian PhiL',
  description:
    'Collaborations et commandes sélectives avec Fabian PhiL, artiste français basé à Dubaï, pour designers d’intérieur, architectes, collectionneurs et projets résidentiels ou hôteliers.',
  ogImageAlt: frArtistEntity.portraitCaption,
}

export const frCollaborationsCopy: CollaborationsCopy = {
  heading: 'Designers d’intérieur & Collaborations',
  audience: 'Designers d’intérieur · Architectes · Collectionneurs privés',
  lead: 'Fabian PhiL peut envisager des collaborations et des commandes lorsqu’elles s’accordent avec son langage visuel et sa démarche artistique.',
  text: 'Designers d’intérieur, architectes et collectionneurs privés peuvent lui proposer un projet résidentiel, hôtelier ou architectural. Le corpus d’œuvres reste au centre de la pratique\u00a0: chaque proposition est étudiée au cas par cas, et seules celles qui trouvent leur place dans le pop art cinétique sur plexiglas superposé sont retenues.',
  cta: 'Discuter d’une collaboration →',
  whatsappHref: frWhatsapp.collaboration,
}
