import type { FrArtworkContent } from './types'

// Keyed by artwork id (artworks.ts); the URL slug and the artwork title are shared with English.
// One entry per published artwork (see ./published.ts).
export const frArtworks: Partial<Record<number, FrArtworkContent>> = {
  4: {
    seo: {
      title: 'Charles Leclerc pop art F1 | Wanted for Racing in Monaco',
      description:
        'Wanted for Racing in Monaco\u00a0: Charles Leclerc en portrait pop art F1 par Fabian PhiL, entre esthétique Mugshot, Formule 1 et plexiglas superposé.',
      ogImageAlt: 'Portrait de Charles Leclerc dans Wanted for Racing in Monaco, pop art F1 sur plexiglas, par Fabian PhiL',
    },
    imageAlt: 'Portrait de Charles Leclerc dans Wanted for Racing in Monaco, pop art F1 sur plexiglas, par Fabian PhiL',
    description:
      'Wanted for Racing in Monaco est un portrait superposé de Charles Leclerc, pilote de Formule 1, mis en scène dans le langage Wanted de Fabian PhiL. L’identité du pilote, le portrait et un graphisme inspiré de l’esthétique Mugshot forment un tout plutôt que des éléments séparés, tandis que la construction en plexiglas transparent crée le mouvement à mesure que le spectateur change de position. Réalisée en 2024, l’œuvre associe le portrait de Charles Leclerc à la culture de la Formule 1 et au portrait pop, sur un ton volontairement ludique et rebelle.',
    inMotion:
      'Lorsque le spectateur se déplace, le portrait et le graphisme Wanted glissent vers de nouveaux alignements. Le visage reste reconnaissable, tandis que la construction en couches modifie la profondeur et l’attitude d’un point de vue à l’autre.',
    medium: 'Acrylique sur deux plaques de plexiglas',
    size: '70\u00a0×\u00a070\u00a0cm',
    series: 'Collections F1 / Formule 1 · Mugshot',
    seriesBlock: 'Collection Mugshot',
  },
  32: {
    seo: {
      title: 'Ayrton Senna pop art F1 | Wanted Ayrton vs Toons Racing',
      description:
        'Wanted Ayrton vs Toons Racing\u00a0: Ayrton Senna, légende de la Formule 1, face aux personnages de dessins animés dans un pop art F1 cinétique de Fabian PhiL.',
      ogImageAlt:
        'Portrait d’Ayrton Senna, pilote de Formule 1, entouré de personnages de dessins animés, pop art F1 sur plexiglas par Fabian PhiL',
    },
    imageAlt:
      'Portrait d’Ayrton Senna, pilote de Formule 1, entouré de personnages de dessins animés, pop art F1 sur plexiglas par Fabian PhiL',
    description:
      'Wanted Ayrton vs Toons Racing fait entrer Ayrton Senna, pilote légendaire de la Formule 1, dans une collision entre la mythologie du sport automobile et la culture pop des dessins animés. Les références à la course, le portrait d’Ayrton Senna et des personnages espiègles occupent des plans visuels distincts sur plexiglas superposé. Réalisée en 2026, l’œuvre appartient à la fois aux collections F1 / Formule 1, Wanted et Toon Clash. Lorsque le spectateur se déplace, l’image oscille entre portrait de pilote et scène pop animée.',
    inMotion:
      'Lorsque le spectateur se déplace, le portrait d’Ayrton Senna et l’arrière-plan mêlant course et dessins animés se séparent sur les couches transparentes. L’œuvre oscille entre portrait de pilote et scène pop animée.',
    medium: 'Peinture et création numérique imprimée sur deux plaques de plexiglas',
    size: '70\u00a0×\u00a070\u00a0cm',
    series: 'Collections F1 / Formule 1 · Wanted · Toon Clash',
    seriesBlock: 'Collection F1',
  },
  27: {
    seo: {
      title: 'Brigitte Bardot pop art | Fame or Peace de Fabian PhiL',
      description:
        'Fame or Peace\u00a0: Brigitte Bardot, icône française, en portrait pop art sur plexiglas superposé par Fabian PhiL, entre célébrité, vie privée et perspective changeante.',
      ogImageAlt: 'Portrait de Brigitte Bardot dans Fame or Peace, pop art sur plexiglas transparent superposé, par Fabian PhiL',
    },
    imageAlt: 'Portrait de Brigitte Bardot dans Fame or Peace, pop art sur plexiglas transparent superposé, par Fabian PhiL',
    description:
      'Fame or Peace s’articule autour de l’actrice française Brigitte Bardot et de la tension que porte son titre\u00a0: la visibilité publique face à la quête de sérénité. Plutôt que de traiter le portrait comme une simple image de célébrité, l’œuvre invite le spectateur à lire le visage de Brigitte Bardot à travers cette opposition. Réalisée en 2024 sur plexiglas superposé, elle fait bouger le premier plan et l’arrière-plan l’un par rapport à l’autre lorsque la perspective change. L’image se transforme physiquement, tandis que la question de la célébrité ou de la paix reste en suspens.',
    inMotion:
      'Le premier plan et l’arrière-plan bougent l’un par rapport à l’autre à mesure que le spectateur change de position. L’image se sépare et se reconstitue sans cesse, rendant visuellement instable la tension entre célébrité et paix.',
    medium: 'Création numérique imprimée sur deux plaques de plexiglas',
    size: '100\u00a0×\u00a070\u00a0cm',
    series: 'Collection Toon Clash',
  },
  22: {
    seo: {
      title: 'Laetitia Casta pop art | Hi… What\'s your Number?',
      description:
        'Laetitia Casta, mannequin et actrice française, en portrait pop art aux lunettes jaune fluo\u00a0: une œuvre sur plexiglas superposé de Fabian PhiL.',
      ogImageAlt: 'Laetitia Casta aux lunettes jaune fluo, portrait pop art sur plexiglas, par Fabian PhiL',
    },
    imageAlt: 'Laetitia Casta aux lunettes jaune fluo, portrait pop art sur plexiglas, par Fabian PhiL',
    description:
      'Hi… What\'s your Number? est un portrait Pop Glasses superposé de Laetitia Casta, mannequin et actrice française, qui transforme l’image en conversation directe avec le spectateur. Les lunettes jaune fluo et un sourire assuré créent une énergie taquine, tandis que le titre donne le sentiment que Laetitia Casta a parlé la première. Réalisée en 2019, l’œuvre fait glisser lunettes, regard et lignes du visage d’une couche transparente à l’autre lorsque le spectateur se déplace, prolongeant le jeu au-delà d’un point de vue unique.',
    inMotion:
      'Lorsque le spectateur se déplace, les lunettes jaunes, le regard et le sourire se réalignent subtilement. Le portrait semble s’adresser au spectateur différemment selon l’angle, prolongeant la question espiègle du titre.',
    medium: 'Acrylique sur deux plaques de plexiglas',
    size: '70\u00a0×\u00a070\u00a0cm',
    series: 'Collection Pop Glasses',
  },
}

// Card text on French pages for artworks that appear there but have no French page yet (the card
// links to the English page).
export const frArtworkCards: Partial<Record<number, { imageAlt: string; description: string; series: string; size: string }>> = {
  31: {
    imageAlt: 'Portrait de Charles Leclerc dans Wanted for Speeding in Monza, pop art F1 sur plexiglas, par Fabian PhiL',
    description:
      'Wanted for Speeding in Monza saisit Charles Leclerc, pilote Ferrari, après son triomphe à Monza, entouré d’images de dessins animés colorées et de références à la course. Fabian PhiL y associe la culture de la Formule 1 au langage Wanted\u00a0: portrait, humour et texte sur plexiglas superposé.',
    series: 'Collections F1 / Formule 1 · Toon Clash',
    size: '70\u00a0×\u00a070\u00a0cm',
  },
}
