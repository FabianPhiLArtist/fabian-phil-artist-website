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
}

// Collection names on French pages (cards, links), for every collection; only published collections
// also have a French page.
export const frCollectionNames: Record<CollectionSlug, string> = {
  'signature-works': 'Œuvres Signature',
  'pop-glasses': 'Pop Glasses',
  wanted: 'Wanted',
  'f1-motorsport': 'F1 / Formule 1',
  'panda-zen': 'Panda / Zen',
  'toon-clash': 'Toon Clash',
}
