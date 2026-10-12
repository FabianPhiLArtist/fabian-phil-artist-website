import type { HeroCopy } from '@/components/Hero'
import type { ExploreArtworksCopy } from '@/components/home/ExploreArtworks'
import type { ArtThatMovesCopy } from '@/components/home/ArtThatMoves'
import type { ArtistCredibilityCopy } from '@/components/home/ArtistCredibility'
import type { GalleriesCuratorsCopy } from '@/components/home/GalleriesCurators'
import type { InteriorsCollaborationsCopy } from '@/components/home/InteriorsCollaborations'
import type { CommonQuestionsCopy } from '@/components/home/CommonQuestions'
import type { InstagramFeatureCopy } from '@/components/home/InstagramFeature'
import { frArtistEntity } from './artist'
import { frHomeFaqItems } from './faq'
import { frWhatsapp } from './ui'

const hero: HeroCopy = {
  title: 'Le pop art en mouvement.',
  intro:
    'Fabian PhiL est un artiste pop contemporain français basé à Dubaï. Il crée des œuvres originales, figuratives et cinétiques, peintes sur plusieurs plaques de plexiglas superposées. Portraits et icônes de la culture populaire y mêlent couleur, regard et changement de perspective\u00a0: l’image se transforme à mesure que vous vous déplacez.',
  primaryCta: 'Voir les œuvres disponibles ',
  secondaryCta: 'Architecture d’intérieur et collaborations ',
  imageLabel: 'Voir Wanted for Being Too Smart',
  imageAlt:
    'Wanted for Being Too Smart, œuvre pop art cinétique de Fabian PhiL, présentée dans un intérieur contemporain',
}

const explore: ExploreArtworksCopy = {
  heading: 'Explorer les œuvres',
  viewAll: 'Voir toutes les œuvres ',
  categories: {
    'panda-zen': { name: 'Panda / Zen', alt: 'Wanted Panda Zen Artist, œuvre Panda / Zen de Fabian PhiL' },
    'signature-works': { name: 'Œuvres Signature', alt: 'I am the Last Samurai, portrait cinétique de Fabian PhiL' },
    'pop-glasses': { name: 'Pop Glasses', alt: 'Wanted for Loving Art, portrait Pop Glasses' },
    'toon-clash': { name: 'Toon Clash', alt: 'Wanted Million Dollar Toon Fight, œuvre Toon Clash' },
    'f1-motorsport': { name: 'F1 / Formule 1', alt: 'Wanted Ayrton vs Toons Racing, portrait F1' },
    'triptych-mugshots': { name: 'Triptyques et Mugshots', alt: '100 USD Andy Warhol, panneau central du triptyque' },
  },
}

const artThatMoves: ArtThatMovesCopy = {
  heading: 'L’art en mouvement',
  leadLine1: 'Une seule technique.',
  leadLine2: 'Plusieurs façons de bouger.',
  intro:
    'Fabian PhiL peint sur plusieurs couches de plexiglas transparent. Quand le spectateur se déplace, les couches se décalent les unes par rapport aux autres et l’image se transforme avec la perspective.',
  viewLabel: 'Voir {title}',
  viewArtwork: 'Voir l’œuvre →',
  examples: [
    {
      title: 'Why…?',
      series: 'Pop Glasses',
      effect: 'Le mouvement par la perspective',
      copy: 'Le regard d’Amanda Seyfried ne se pose jamais tout à fait\u00a0: à mesure que vous bougez, les lunettes et les lignes superposées se décalent, et la question reste ouverte.',
      label:
        'Why…?, portrait cinétique monochrome d’Amanda Seyfried de la série Pop Glasses, filmé pendant que le spectateur se déplace',
    },
    {
      title: 'Charles Leclerc à Monza',
      series: 'F1 / Formule 1',
      effect: 'Perspective et couleur',
      copy: 'Le portrait superposé se décale sur le fond graphique coloré et ajoute une autre dimension au mouvement.',
      label:
        'Wanted for Speeding in Monza, portrait superposé de Charles Leclerc sur fond coloré, filmé pendant que le spectateur se déplace',
    },
    {
      title: 'Racing Life',
      series: 'Œuvre spéciale LED',
      effect: 'Perspective, couleur et lumière',
      copy: 'Steve McQueen, éclairé de l’intérieur\u00a0: dans cette œuvre spéciale LED, la lumière et les reflets ajoutent une autre dimension au mouvement des couches.',
      label:
        'Wanted for Racing Life, portrait cinétique spécial LED de Steve McQueen, filmé pendant que le spectateur se déplace',
    },
  ],
}

const credibility: ArtistCredibilityCopy = {
  heading: 'L’artiste derrière l’œuvre',
  intro:
    'Fabian PhiL est un artiste contemporain français basé à Dubaï. Il crée des portraits pop originaux sur plusieurs plaques de plexiglas transparent\u00a0: visages, regards expressifs, couleur et mouvement se rencontrent dans des œuvres qui se transforment selon la position du spectateur.',
  aboutLink: 'Découvrir l’artiste →',
  exhibitionsLink: 'Expositions →',
  enlargeLabel: 'Agrandir la photo\u00a0: {caption}',
  closeLabel: 'Fermer',
  studioAlt: frArtistEntity.portraitCaption,
  images: [
    { alt: 'Intérieur de la Noor Royal Gallery avec des œuvres de Fabian PhiL', caption: 'Noor Royal Gallery' },
    { alt: 'Visiteurs devant les œuvres de Fabian PhiL à l’Alliance Française de Dubaï', caption: 'Alliance Française Dubai' },
    { alt: 'Fabian PhiL à World Art Dubai, devant une présentation de ses œuvres', caption: 'World Art Dubai' },
  ],
}

const galleries: GalleriesCuratorsCopy = {
  heading: 'Galeries et commissaires d’exposition',
  text: 'Book d’artiste et informations sur les expositions disponibles sur demande.',
  cta: 'Demander le book d’artiste →',
  whatsappHref: frWhatsapp.artistBook,
}

const interiors: InteriorsCollaborationsCopy = {
  heading: 'Architecture d’intérieur et collaborations',
  audience: 'Architectes d’intérieur · Architectes · Résidentiel et hôtellerie haut de gamme',
  text: 'Des collaborations et des commandes peuvent être envisagées, au cas par cas, pour des intérieurs singuliers et d’importants projets résidentiels, hôteliers ou architecturaux.',
  cta: 'Discuter d’une collaboration →',
  whatsappHref: frWhatsapp.collaboration,
}

const commonQuestions: CommonQuestionsCopy = {
  heading: 'Questions fréquentes',
  viewAll: 'Voir toutes les questions →',
  items: frHomeFaqItems,
  links: { general: frWhatsapp.general, price: frWhatsapp.price },
}

const instagram: InstagramFeatureCopy = {
  heading: 'Depuis l’atelier',
  text: 'Un aperçu régulièrement renouvelé des œuvres récentes, du mouvement et des expositions.',
  viewOnInstagram: 'Voir sur Instagram →',
  reelBadge: 'Reel',
  postAlt: 'Publication Instagram de Fabian PhiL',
  reelAlt: 'Reel Instagram de Fabian PhiL',
  postLinkLabel: 'Ouvrir cette publication sur Instagram (nouvel onglet)',
  reelLinkLabel: 'Ouvrir ce reel sur Instagram (nouvel onglet)',
  altWithExcerpt: '{alt}\u00a0: {excerpt}',
}

export const frHomeCopy = {
  hero,
  explore,
  artThatMoves,
  credibility,
  galleries,
  interiors,
  commonQuestions,
  instagram,
}
