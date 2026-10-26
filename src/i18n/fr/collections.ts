import type { CollectionSlug } from '@/data/collections'
import type { FrCollectionContent } from './types'

// Keyed by collection slug (shared with English). One entry per published collection.
export const frCollections: Partial<Record<CollectionSlug, FrCollectionContent>> = {
  'f1-motorsport': {
    name: 'F1 / Formule 1',
    intro:
      'Les œuvres F1 de Fabian PhiL transposent les figures de la Formule 1 et la culture visuelle du sport automobile en compositions pop superposées, qui changent à mesure que le spectateur se déplace. Ayrton Senna, légende de la discipline, y côtoie Charles Leclerc, de Monaco à Monza.',
    seo: {
      title: 'Pop art F1 | Formule 1 par Fabian PhiL',
      description:
        'Œuvres originales de pop art F1 par Fabian PhiL\u00a0: portraits cinétiques d’Ayrton Senna et de Charles Leclerc, entre Formule 1, Grand Prix et plexiglas superposé.',
      ogImageAlt: 'Wanted Ayrton vs Toons Racing, portrait pop art F1 d’Ayrton Senna sur plexiglas, par Fabian PhiL',
    },
  },
  'pop-glasses': {
    name: 'Pop Glasses',
    intro:
      'Pop Glasses est l’un des langages visuels les plus reconnaissables de Fabian PhiL\u00a0: des portraits pop art en noir et blanc, rehaussés de lunettes fluo et colorées, peints sur plusieurs couches de plexiglas qui changent selon la position du spectateur. La série réunit des actrices hollywoodiennes, Angelina Jolie, Emma Stone et Lucy Liu, aux côtés des mannequins Gigi Hadid et Kate Upton.',
    seo: {
      title: 'Pop Glasses | Portraits pop art aux lunettes fluo, Fabian PhiL',
      description:
        'Pop Glasses\u00a0: portraits pop art de Fabian PhiL aux lunettes fluo, avec Angelina Jolie, Emma Stone, Lucy Liu, Gigi Hadid et Kate Upton, sur plexiglas superposé.',
      ogImageAlt: 'Portrait de Kate Upton dans Wanted for Loving Art, œuvre Pop Glasses sur plexiglas superposé, par Fabian PhiL',
    },
  },
  wanted: {
    name: 'Wanted',
    intro:
      'Wanted réunit le langage du portrait et du Mugshot propre à Fabian PhiL\u00a0: des visages expressifs, du texte et des titres pleins d’humour ou de provocation, qui font de chaque sujet un personnage. Inspirés de l’avis de recherche, ces portraits pop art détournent les codes de la culture pop, du cinéma au sport automobile.',
    seo: {
      title: 'Wanted | Portraits Mugshot pop art par Fabian PhiL',
      description:
        'Wanted\u00a0: portraits Mugshot pop art de Fabian PhiL, entre visages expressifs, texte et titres provocateurs, sur plexiglas superposé. Culture pop et humour.',
      ogImageAlt: 'Portrait de Steve McQueen dans Wanted for Racing Life, pop art superposé avec miroir et lumière LED, par Fabian PhiL',
    },
  },
  'signature-works': {
    name: 'Œuvres Signature',
    intro:
      'Une sélection d’œuvres qui définissent le langage visuel de Fabian PhiL, des premières expériences sur plexiglas superposé aux portraits expressifs, aux icônes pop et aux grands triptyques. Art figuratif et pop art cinétique s’y rejoignent\u00a0: chaque portrait change selon le déplacement du spectateur.',
    seo: {
      title: 'Œuvres Signature | Portraits pop art cinétiques de Fabian PhiL',
      description:
        'Les Œuvres Signature de Fabian PhiL\u00a0: portraits pop art cinétiques, art figuratif et grands triptyques sur plexiglas, de Blue Lady (2011) aux icônes pop.',
      ogImageAlt: 'I am the Last Samurai, grand portrait cinétique aux cheveux en mouvement sur plexiglas superposé, par Fabian PhiL',
    },
  },
  'toon-clash': {
    name: 'Toon Clash',
    intro:
      'Toon Clash confronte portraits, personnages de cartoons et références à la culture pop dans des compositions où humour, mouvement et collision visuelle se rencontrent. Dessins animés et portrait pop art occupent des plans distincts sur plexiglas superposé\u00a0: ils se décalent selon le point de vue du spectateur, et cet art cinétique transforme chaque portrait en scène animée.',
    seo: {
      title: 'Toon Clash | Portrait pop art et cartoon pop art, Fabian PhiL',
      description:
        'Toon Clash de Fabian PhiL\u00a0: portraits, cartoons et culture pop sur plexiglas superposé. Humour, mouvement et art cinétique, où chaque portrait devient une scène animée.',
      ogImageAlt:
        'Portrait de Claudia Schiffer entouré de dessins animés dans Runaway Mood, collection Toon Clash, pop art sur plexiglas par Fabian PhiL',
    },
  },
  'panda-zen': {
    name: 'Panda / Zen',
    intro:
      'La collection Panda / Zen fait entrer l’univers du panda dans des paysages inspirés par le calme, la nature et la contemplation. Temples, lacs, montagnes et cerisiers en fleurs y rencontrent l’énergie visuelle du pop art de Fabian PhiL, dans des œuvres où humour et sérénité coexistent.',
    seo: {
      title: 'Panda / Zen | Panda pop art contemporain, Fabian PhiL',
      description:
        'Collection Panda / Zen de Fabian PhiL\u00a0: panda pop art et paysages contemplatifs, entre humour, sérénité et plexiglas superposé.',
      ogImageAlt: 'Wanted Panda PopArt Dealer, panda pop art aux lunettes rondes et au cœur rose, par Fabian PhiL',
    },
  },
}

// Collection labels in French navigation (collection links, filters), for every collection; only
// published collections also have a French page. Page H1s and metadata keep the official names above.
export const frCollectionNames: Record<CollectionSlug, string> = {
  'signature-works': 'Œuvres Signature',
  'pop-glasses': 'Lunette Pop Art',
  wanted: 'Wanted',
  'f1-motorsport': 'F1 / Formule 1',
  'panda-zen': 'Panda / Zen',
  'toon-clash': 'Portraits & Cartoons',
}
