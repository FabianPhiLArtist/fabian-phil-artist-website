import type { FrArtworkCard, FrArtworkContent } from './types'

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
      'Wanted for Racing in Monaco est un portrait superposé de Charles Leclerc, pilote de Formule 1, mis en scène dans le langage Wanted de Fabian PhiL. L’identité du pilote, le portrait et un graphisme inspiré de l’esthétique Mugshot forment un tout plutôt que des éléments séparés, tandis que la construction en plexiglas superposé crée le mouvement à mesure que le spectateur change de position. Réalisée en 2024, l’œuvre associe le portrait de Charles Leclerc à la culture de la Formule 1 et au portrait pop, sur un ton volontairement ludique et rebelle.',
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
      'Lorsque le spectateur se déplace, le portrait d’Ayrton Senna et l’arrière-plan mêlant course et dessins animés se séparent sur les couches de plexiglas. L’œuvre oscille entre portrait de pilote et scène pop animée.',
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
      ogImageAlt: 'Portrait de Brigitte Bardot dans Fame or Peace, pop art sur plexiglas superposé, par Fabian PhiL',
    },
    imageAlt: 'Portrait de Brigitte Bardot dans Fame or Peace, pop art sur plexiglas superposé, par Fabian PhiL',
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
      'Hi… What\'s your Number? est un portrait Pop Glasses superposé de Laetitia Casta, mannequin et actrice française, qui transforme l’image en conversation directe avec le spectateur. Les lunettes jaune fluo et un sourire assuré créent une énergie taquine, tandis que le titre donne le sentiment que Laetitia Casta a parlé la première. Réalisée en 2019, l’œuvre fait glisser lunettes, regard et lignes du visage d’une couche de plexiglas à l’autre lorsque le spectateur se déplace, prolongeant le jeu au-delà d’un point de vue unique.',
    inMotion:
      'Lorsque le spectateur se déplace, les lunettes jaunes, le regard et le sourire se réalignent subtilement. Le portrait semble s’adresser au spectateur différemment selon l’angle, prolongeant la question espiègle du titre.',
    medium: 'Acrylique sur deux plaques de plexiglas',
    size: '70\u00a0×\u00a070\u00a0cm',
    series: 'Collection Pop Glasses',
  },
  17: {
    seo: {
      title: 'Gigi Hadid pop art, top model | Wanted for Fashion Crimes',
      description:
        'Wanted for Fashion Crimes\u00a0: Gigi Hadid, top model, en portrait pop art aux lunettes rose fluo par Fabian PhiL, entre mode, Mugshot et plexiglas superposé.',
      ogImageAlt: 'Portrait de Gigi Hadid aux lunettes rose fluo dans Wanted for Fashion Crimes, pop art sur plexiglas, par Fabian PhiL',
    },
    imageAlt: 'Portrait de Gigi Hadid aux lunettes rose fluo dans Wanted for Fashion Crimes, pop art sur plexiglas, par Fabian PhiL',
    description:
      'Wanted for Fashion Crimes est un portrait pop art superposé du top model Gigi Hadid, qui fait de la mode une rébellion espiègle. Le format Wanted la cadre à la manière d’un Mugshot, tandis que la couleur fluorescente et un regard direct tirent l’œuvre vers le glamour et l’attitude plutôt que vers la criminalité. Peinte en 2023 sur plexiglas superposé, l’œuvre fait glisser lunettes, regard et lignes du visage lorsque le spectateur se déplace, donnant au portrait de Gigi Hadid une présence changeante, presque théâtrale.',
    inMotion:
      'La couleur fluorescente retient le regard, tandis que les lunettes, les yeux et les lignes du visage glissent sur des couches de plexiglas distinctes. Avec le mouvement, l’attitude de mannequin paraît moins figée et plus théâtrale.',
    medium: 'Acrylique et encre sur deux plaques de plexiglas',
    size: '70\u00a0×\u00a070\u00a0cm',
    series: 'Collections Pop Glasses · Wanted',
    seriesBlock: 'Collection Pop Glasses',
  },
  33: {
    seo: {
      title: 'Claudia Schiffer pop art de mode | Runaway Mood',
      description:
        'Runaway Mood\u00a0: Claudia Schiffer, mannequin, dans un portrait de mode pop art entouré de dessins animés, sur plexiglas superposé, par Fabian PhiL.',
      ogImageAlt: 'Portrait de mode de Claudia Schiffer entouré de dessins animés dans Runaway Mood, pop art par Fabian PhiL',
    },
    imageAlt: 'Portrait de mode de Claudia Schiffer entouré de dessins animés dans Runaway Mood, pop art par Fabian PhiL',
    description:
      'Runaway Mood mêle un portrait de mode de Claudia Schiffer à un foisonnement coloré de dessins animés et d’images pop. La silhouette allongée semble passer du monde de la mode à une échappée animée, dans une composition sur le glamour, l’attitude et l’envie de sortir du cadre attendu. Imprimés et peints en 2026 sur des couches de plexiglas distinctes, le portrait de Claudia Schiffer et l’arrière-plan peuplé de dessins animés ne cessent de se séparer et de se rejoindre, transformant l’image de mode en Pop Art en Mouvement.',
    inMotion:
      'Lorsque le spectateur se déplace, le portrait de mode se détache de l’arrière-plan coloré peuplé de dessins animés. Premier plan et arrière-plan se superposent puis se rejoignent, et l’image oscille entre portrait, défilé et composition pop animée.',
    medium: 'Peinture et création numérique imprimée sur deux plaques de plexiglas',
    size: '100\u00a0×\u00a070\u00a0cm',
    series: 'Collection Toon Clash',
  },
  5: {
    seo: {
      title: 'Mick Jagger pop art, Rolling Stones | 100 USD Mick Jagger',
      description:
        '100 USD Mick Jagger\u00a0: triptyque pop art de Fabian PhiL réunissant l’icône des Rolling Stones et le graphisme du billet de 100 dollars, sur plexiglas superposé.',
      ogImageAlt: 'Mick Jagger des Rolling Stones dans un triptyque autour du billet de 100 dollars, pop art par Fabian PhiL',
    },
    imageAlt: 'Mick Jagger des Rolling Stones dans un triptyque autour du billet de 100 dollars, pop art par Fabian PhiL',
    description:
      '100 USD Mick Jagger est un grand triptyque qui inscrit Mick Jagger, figure des Rolling Stones, dans la structure graphique du billet de 100 dollars américain. Le portrait de Mick Jagger et les motifs du billet occupent des plans de plexiglas distincts, reliant célébrité rock, notoriété, valeur et iconographie pop. Réalisée en 2022, l’œuvre sur plexiglas superposé se transforme à mesure que le spectateur passe d’un panneau à l’autre, loin d’un portrait de célébrité figé et conventionnel.',
    inMotion:
      'Lorsque le spectateur longe le triptyque, le portrait de Mick Jagger se décale par rapport au graphisme du billet. Les trois panneaux amplifient l’effet\u00a0: l’échelle, la profondeur et l’alignement changeant font partie intégrante de l’œuvre.',
    medium: 'Triptyque. Acrylique sur deux plaques de plexiglas',
    size: '70\u00a0×\u00a0210\u00a0cm',
    series: 'Collection 100 USD',
  },
  9: {
    seo: {
      title: 'Sheikh Zayed pop art | I have a Dream par Fabian PhiL',
      description:
        'I have a Dream\u00a0: portrait pop art de Sheikh Zayed bin Sultan Al Nahyan, père fondateur des Émirats arabes unis, par Fabian PhiL, artiste français basé à Dubaï.',
      ogImageAlt: 'Portrait de Sheikh Zayed bin Sultan Al Nahyan dans I have a Dream, œuvre sur plexiglas superposé, par Fabian PhiL',
    },
    imageAlt: 'Portrait de Sheikh Zayed bin Sultan Al Nahyan dans I have a Dream, œuvre sur plexiglas superposé, par Fabian PhiL',
    description:
      'I have a Dream est un portrait pop art superposé de Sheikh Zayed bin Sultan Al Nahyan, père fondateur des Émirats arabes unis. Le titre évoque la vision et l’aspiration, tandis que des détails en miroir argenté font de la lumière et de l’espace environnant une partie de l’image. Réalisée en 2018, l’œuvre fait bouger le portrait peint et les reflets l’un par rapport à l’autre lorsque le spectateur se déplace, reliant mémoire, lieu et changement de perspective.',
    inMotion:
      'Lorsque le spectateur change de position, le portrait peint de Sheikh Zayed et les détails en miroir argenté se séparent puis se rejoignent. Les reflets changent avec la pièce\u00a0: la lumière devient partie intégrante du mouvement plutôt qu’un effet figé.',
    medium: 'Acrylique et vinyle miroir argenté sur deux plaques de plexiglas',
    size: '90\u00a0×\u00a0120\u00a0cm',
    series: 'Collection Expressive Emotion',
  },
  16: {
    seo: {
      title: 'Angelina Jolie pop art | Wanted for Being Too Smart',
      description:
        'Wanted for Being Too Smart\u00a0: portrait pop art d’Angelina Jolie, actrice, aux lunettes bleues. Œuvre Pop Glasses de Fabian PhiL sur plexiglas superposé.',
      ogImageAlt:
        'Angelina Jolie, un doigt sur les lèvres et des lunettes bleues, dans Wanted for Being Too Smart, pop art par Fabian PhiL',
    },
    imageAlt:
      'Angelina Jolie, un doigt sur les lèvres et des lunettes bleues, dans Wanted for Being Too Smart, pop art par Fabian PhiL',
    description:
      'Wanted for Being Too Smart est un portrait pop art d’Angelina Jolie, actrice, dans le langage Pop Glasses de Fabian PhiL. Le regard intense, le doigt posé sur les lèvres et les lunettes bleues installent le personnage, tandis que le titre fait de l’intelligence elle-même le motif de l’affiche. Réalisée en 2023 sur plexiglas superposé, l’œuvre fait glisser lunettes, regard et lignes du visage lorsque le spectateur se déplace\u00a0: l’expression d’Angelina Jolie ne se fige jamais tout à fait.',
    inMotion:
      'Lorsque le spectateur se déplace, les lunettes, les yeux et les lignes du visage glissent les uns par rapport aux autres. Le regard change subtilement, tandis que le titre reste le cadre constant de l’image.',
    medium: 'Acrylique et encre sur deux plaques de plexiglas',
    size: '70\u00a0×\u00a070\u00a0cm',
    series: 'Collections Pop Glasses · Wanted',
    seriesBlock: 'Collection Pop Glasses',
  },
  19: {
    seo: {
      title: 'Emma Stone pop art | Wow… I Look Good in Green',
      description:
        'Wow… I Look Good in Green\u00a0: portrait pop art d’Emma Stone, actrice, aux lunettes vert fluo. Série Pop Glasses de Fabian PhiL sur plexiglas superposé.',
      ogImageAlt: 'Portrait d’Emma Stone aux lunettes vert fluo dans Wow… I Look Good in Green, pop art sur plexiglas, par Fabian PhiL',
    },
    imageAlt: 'Portrait d’Emma Stone aux lunettes vert fluo dans Wow… I Look Good in Green, pop art sur plexiglas, par Fabian PhiL',
    description:
      'Wow… I Look Good in Green est un portrait Pop Glasses d’Emma Stone, actrice, porté par un sourire conscient de lui-même et des lunettes vert fluo. Le titre transforme la coquetterie en humour, en assurance et en charme. Peinte en 2020 sur plexiglas superposé, l’œuvre fait glisser les montures et les traits du visage lorsque le spectateur se déplace, et l’expression d’Emma Stone change de nuance selon l’angle.',
    inMotion:
      'Les lunettes vertes restent le point d’ancrage, tandis que les yeux et les lignes du visage se déplacent autour d’elles. D’un point de vue à l’autre, l’assurance du sourire prend un caractère légèrement différent.',
    medium: 'Acrylique sur deux plaques de plexiglas',
    size: '70\u00a0×\u00a070\u00a0cm',
    series: 'Collection Pop Glasses',
  },
  34: {
    seo: {
      title: 'Lucy Liu pop art | Wanted Fashion Police Angel',
      description:
        'Wanted Fashion Police Angel\u00a0: portrait pop art de Lucy Liu, actrice, aux lunettes rose fluo. Œuvre Pop Glasses de Fabian PhiL, entre mode et regard.',
      ogImageAlt: 'Portrait de Lucy Liu dans Wanted Fashion Police Angel, œuvre Pop Glasses sur plexiglas superposé, par Fabian PhiL',
    },
    imageAlt: 'Portrait de Lucy Liu dans Wanted Fashion Police Angel, œuvre Pop Glasses sur plexiglas superposé, par Fabian PhiL',
    description:
      'Wanted Fashion Police Angel est un portrait Pop Glasses de Lucy Liu, actrice, encadré de lunettes rose fluorescent. Le regard calme et direct mêle mode, identité et grâce\u00a0: le titre espiègle en fait une gardienne de l’élégance. Peinte en 2026 sur plexiglas superposé, l’œuvre décale lunettes, yeux et lignes du visage lorsque le spectateur se déplace, au point que le regard de Lucy Liu semble suivre dans la pièce.',
    inMotion:
      'Lorsque le spectateur se déplace, les lunettes roses et les lignes du visage glissent sur des couches de plexiglas distinctes. Les yeux de Lucy Liu semblent suivre d’un angle à l’autre, et l’expression calme prend une présence discrètement attentive.',
    medium: 'Acrylique et encre sur deux plaques de plexiglas',
    size: '70\u00a0×\u00a070\u00a0cm',
    series: 'Collection Pop Glasses',
  },
  15: {
    seo: {
      title: 'Kate Upton pop art, mannequin | Wanted for Loving Art',
      description:
        'Wanted for Loving Art\u00a0: Kate Upton, mannequin, en portrait pop art aux lunettes. Œuvre Pop Glasses de Fabian PhiL sur plexiglas superposé.',
      ogImageAlt: 'Portrait de Kate Upton, mannequin, dans Wanted for Loving Art, lunettes pop art sur plexiglas, par Fabian PhiL',
    },
    imageAlt: 'Portrait de Kate Upton, mannequin, dans Wanted for Loving Art, lunettes pop art sur plexiglas, par Fabian PhiL',
    description:
      'Wanted for Loving Art est un portrait pop art de Kate Upton, mannequin, qui fait de l’amour de l’art un délit espiègle. Le titre lui donne un personnage, tandis que le langage Pop Glasses apporte la couleur et un regard qui ne se fige pas. Peinte en 2023 sur plexiglas superposé, l’œuvre fait glisser yeux, lunettes et lignes du visage lorsque le spectateur change de position. Portrait, humour et mouvement invitent à regarder une seconde fois.',
    inMotion:
      'Les lunettes, les yeux et le graphisme du titre se décalent lorsque le spectateur se déplace. La couleur tient le portrait, et l’alignement changeant rend le personnage plus animé.',
    medium: 'Acrylique et encre sur deux plaques de plexiglas',
    size: '70\u00a0×\u00a070\u00a0cm',
    series: 'Collections Pop Glasses · Wanted',
    seriesBlock: 'Collection Pop Glasses',
  },
  10: {
    seo: {
      title: 'Amanda Seyfried pop art | Why…? par Fabian PhiL',
      description:
        'Why…?\u00a0: le regard d’Amanda Seyfried, portrait pop art cinétique de Fabian PhiL. Lunettes roses et lignes superposées sur plexiglas.',
      ogImageAlt: 'Les yeux d’Amanda Seyfried derrière des lunettes roses dans Why…?, art cinétique sur plexiglas superposé, par Fabian PhiL',
    },
    imageAlt: 'Les yeux d’Amanda Seyfried derrière des lunettes roses dans Why…?, art cinétique sur plexiglas superposé, par Fabian PhiL',
    description:
      'Le regard d’Amanda Seyfried devient le point de départ de Why…?. Le titre fait d’un visage familier une question ouverte\u00a0: curiosité, doute, défi ou vulnérabilité, selon la façon dont on lit l’expression. Les lunettes roses et les lignes superposées se déplacent avec le spectateur, et le portrait prend une présence changeante. Peinte en 2021 sur plexiglas superposé, l’œuvre laisse cette question volontairement sans réponse.',
    inMotion:
      'Lorsque le spectateur se déplace, les lignes verticales glissent sur le visage et le regard change subtilement. Le portrait ne se fixe jamais dans une seule expression, et l’incertitude du titre demeure.',
    medium: 'Acrylique sur deux plaques de plexiglas',
    size: '120\u00a0×\u00a0120\u00a0cm',
    series: 'Collection Expressive Emotion',
  },
  6: {
    seo: {
      title: 'Andy Warhol pop art | 100 USD Andy Warhol, Fabian PhiL',
      description:
        '100 USD Andy Warhol\u00a0: triptyque de Fabian PhiL mettant en scène Andy Warhol et le billet de 100 dollars, sur plexiglas superposé.',
      ogImageAlt: 'Portrait d’Andy Warhol intégré à un triptyque autour du billet de 100 dollars, œuvre de Fabian PhiL',
    },
    imageAlt: 'Portrait d’Andy Warhol intégré à un triptyque autour du billet de 100 dollars, œuvre de Fabian PhiL',
    description:
      '100 USD Andy Warhol met en scène Andy Warhol dans un triptyque construit autour du graphisme du billet de 100 dollars. Fabian PhiL y confronte portrait, monnaie et culture pop dans une composition sur plexiglas qui évolue avec le déplacement du spectateur. Réalisée en 2017, l’œuvre mesure 70\u00a0×\u00a0210\u00a0cm. Le visage et les détails du billet se séparent puis se rejoignent le long des trois panneaux\u00a0: un dialogue de Fabian PhiL avec une figure majeure du Pop Art.',
    inMotion:
      'Selon l’angle, le portrait d’Andy Warhol et le graphisme du billet se séparent sur les couches de plexiglas du triptyque. L’image se fragmente puis se reconstitue lorsque le spectateur longe toute la largeur de l’œuvre.',
    medium: 'Triptyque. Acrylique sur deux plaques de plexiglas',
    size: '70\u00a0×\u00a0210\u00a0cm',
    series: 'Collection 100 USD',
  },
  14: {
    seo: {
      title: 'Keith Richards pop art, Rolling Stones | The Last One!',
      description:
        'The Last One!\u00a0: portrait pop art de Keith Richards, musicien des Rolling Stones, par Fabian PhiL, sur plexiglas superposé.',
      ogImageAlt: 'Keith Richards des Rolling Stones avec une cigarette, dans The Last One!, œuvre sur plexiglas superposé, par Fabian PhiL',
    },
    imageAlt: 'Keith Richards des Rolling Stones avec une cigarette, dans The Last One!, œuvre sur plexiglas superposé, par Fabian PhiL',
    description:
      'The Last One! est un grand portrait de Keith Richards, guitariste des Rolling Stones. Le titre installe d’abord un sentiment de finalité et de tension, sans en fermer le sens. Peinte en 2017 sur plexiglas superposé, l’œuvre fait bouger les lignes du visage lorsque le spectateur change de position. Le visage reste reconnaissable, mais il ne se fige jamais tout à fait\u00a0: regard, cigarette et perspective relient l’image du musicien au langage de Fabian PhiL.',
    inMotion:
      'Les lignes du visage, peintes sur des plans de plexiglas distincts, trouvent de nouveaux alignements lorsque le spectateur se déplace. L’expression change avec la perspective et prolonge l’ambiguïté du titre.',
    medium: 'Acrylique sur deux plaques de plexiglas',
    size: '120\u00a0×\u00a090\u00a0cm',
    series: 'Collection Expressive Emotion',
  },
  31: {
    seo: {
      title: 'Charles Leclerc pop art F1 | Wanted for Speeding in Monza',
      description:
        'Wanted for Speeding in Monza\u00a0: Charles Leclerc en pop art F1, entre Monza, Formule 1 et Toon Clash. Œuvre de Fabian PhiL sur plexiglas superposé.',
      ogImageAlt: 'Portrait de Charles Leclerc dans Wanted for Speeding in Monza, pop art F1 sur plexiglas, par Fabian PhiL',
    },
    imageAlt: 'Portrait de Charles Leclerc dans Wanted for Speeding in Monza, pop art F1 sur plexiglas, par Fabian PhiL',
    description:
      'Wanted for Speeding in Monza saisit Charles Leclerc, pilote Ferrari, après son triomphe à Monza, dans une composition où le portrait de Formule 1 rencontre des dessins animés et des références au sport automobile. Réalisée en 2026, l’œuvre appartient aux collections F1 / Formule 1 et Toon Clash. Sur plexiglas superposé, le portrait se décale sur le fond animé lorsque le spectateur se déplace, et le pop art F1 devient une scène en mouvement.',
    inMotion:
      'D’un côté à l’autre, le portrait de Charles Leclerc glisse sur le fond coloré de course et de dessins animés. L’écart entre les couches de plexiglas crée une profondeur changeante, et la composition se réaligne sans cesse.',
    medium: 'Peinture et création numérique imprimée sur deux plaques de plexiglas',
    size: '70\u00a0×\u00a070\u00a0cm',
    series: 'Collections F1 / Formule 1 · Toon Clash',
    seriesBlock: 'Collection F1',
  },
  28: {
    seo: {
      title: 'Panda Zen Artist | Panda pop art, Fabian PhiL',
      description:
        'Wanted Panda Zen Artist\u00a0: panda contemporain et art zen, figure calme sur plexiglas superposé, par Fabian PhiL.',
      ogImageAlt: 'Wanted Panda Zen Artist, panda aux lunettes roses dans un univers coloré, pop art sur plexiglas, par Fabian PhiL',
    },
    imageAlt: 'Wanted Panda Zen Artist, panda aux lunettes roses dans un univers coloré, pop art sur plexiglas, par Fabian PhiL',
    description:
      'Wanted Panda Zen Artist met en scène le panda comme figure calme et décalée. Lunettes roses, aplats de couleur et pose assise composent un univers contemplatif que le mouvement des couches de plexiglas vient subtilement perturber. Réalisée en 2025, l’œuvre garde un ton léger\u00a0: le titre sourit, le panda semble déjà ailleurs.',
    inMotion:
      'Lorsque le spectateur se déplace, le panda et les touches de couleur se décalent l’un par rapport à l’autre. La construction en couches crée une profondeur discrète, sans rompre le calme de la pose.',
    medium: 'Techniques mixtes sur plaques de plexiglas',
    size: '70\u00a0×\u00a070\u00a0cm',
    series: 'Collection Panda / Zen',
  },
  25: {
    seo: {
      title: 'Wanted Panda PopArt Dealer | Panda pop art',
      description:
        'Wanted Panda PopArt Dealer\u00a0: panda pop art contemporain et humour, œuvre de Fabian PhiL sur plexiglas superposé.',
      ogImageAlt: 'Wanted Panda PopArt Dealer, panda pop art aux lunettes rondes et au cœur rose, par Fabian PhiL',
    },
    imageAlt: 'Wanted Panda PopArt Dealer, panda pop art aux lunettes rondes et au cœur rose, par Fabian PhiL',
    description:
      'Wanted Panda PopArt Dealer donne au panda un rôle trop grand pour lui\u00a0: lunettes rondes, cœur rose et couleurs franches, comme s’il négociait le pop art lui-même. Le lettrage fait partie de la blague. Imprimée et peinte en 2025 sur plexiglas superposé, l’œuvre sépare la figure et les traits de couleur lorsque le spectateur se déplace. L’humour passe devant.',
    inMotion:
      'Le panda et les aplats de couleur occupent des plans distincts. En se déplaçant, le spectateur ouvre un écart entre la figure, le cœur rose et les lunettes.',
    medium: 'Peinture et création numérique imprimée sur deux plaques de plexiglas',
    size: '70\u00a0×\u00a070\u00a0cm',
    series: 'Collection Panda / Zen',
  },
  29: {
    seo: {
      title: 'Panda Yin & Yang | Montagne enneigée, Fabian PhiL',
      description:
        'Wanted Panda Yin & Yang Fan\u00a0: panda pop art, yin yang et montagne enneigée. Paysage zen de Fabian PhiL sur plexiglas superposé.',
      ogImageAlt: 'Wanted Panda Yin & Yang Fan, panda devant une montagne enneigée, pop art sur plexiglas, par Fabian PhiL',
    },
    imageAlt: 'Wanted Panda Yin & Yang Fan, panda devant une montagne enneigée, pop art sur plexiglas, par Fabian PhiL',
    description:
      'Wanted Panda Yin & Yang Fan place le panda devant une montagne enneigée, avec des cerisiers en fleurs tenus dans la figure elle-même. Le yin et le yang y jouent l’équilibre, sur un mode plus graphique que solennel. Réalisée en 2025 sur plexiglas superposé, l’œuvre décale légèrement le portrait et le paysage lorsque le spectateur change de position. Neige, montagne et couleur restent en conversation.',
    inMotion:
      'Lorsque le spectateur change de position, le panda et le paysage enneigé bougent l’un par rapport à l’autre. Le décalage des couches donne à l’équilibre du yin et du yang une dimension physique, tout en gardant un ton léger.',
    medium: 'Techniques mixtes sur plaques de plexiglas',
    size: '70\u00a0×\u00a070\u00a0cm',
    series: 'Collection Panda / Zen',
  },
}

const size70 = '70\u00a0×\u00a070\u00a0cm'
const acrylic = 'Acrylique sur deux plaques de plexiglas'
const acrylicInk = 'Acrylique et encre sur deux plaques de plexiglas'
const popGlassesWanted = 'Collections Pop Glasses · Wanted'

// Card text on French pages for artworks that appear there but have no French page yet (the card
// links to the English page). The gallery shows every artwork, so every unpublished id has an entry.
export const frArtworkCards: Partial<Record<number, FrArtworkCard>> = {
  1: {
    imageAlt: 'Portrait de Steve McQueen dans Wanted for Racing Life, pop art superposé avec miroir et lumière LED, par Fabian PhiL',
    description:
      'Wanted for Racing Life est un portrait pop art superposé de Steve McQueen, qui reprend le langage graphique du Mugshot pour amplifier sa présence à l’écran et son image rebelle. Matière miroir et lumière LED ajoutent une autre dimension\u00a0: reflets, éclairage et couches de plexiglas changent avec la pièce et le spectateur.',
    series: 'Collection Mugshot',
    size: size70,
    medium: 'Acrylique et vinyle miroir argenté sur deux plaques de plexiglas, avec LED',
  },
  2: {
    imageAlt: 'Portrait de Brad Pitt dans Wanted for Fight Club, pop art sur plexiglas superposé, par Fabian PhiL',
    description:
      'Wanted for Fight Club est un portrait pop art superposé de Brad Pitt, mis en scène dans le langage visuel du Mugshot. Le titre, à la référence cinématographique évidente, introduit confrontation et tension au-delà du visage, tandis que lignes et traits se déplacent légèrement avec le point de vue.',
    series: 'Collection Mugshot',
    size: size70,
    medium: acrylicInk,
  },
  3: {
    imageAlt: 'Portrait de Woody Allen dans Wanted $$Reward$$, pop art sur plexiglas superposé, par Fabian PhiL',
    description:
      'Wanted $$Reward$$ transforme Woody Allen à travers le langage visuel de l’avis de recherche avec récompense. Le texte fait partie de l’humour\u00a0: on lit le visage, on remarque la récompense, puis on revient à l’expression avec un autre regard.',
    series: 'Collection Mugshot',
    size: size70,
    medium: acrylic,
  },
  7: {
    imageAlt: 'Old Man in Peace, portrait apaisé d’un homme âgé aux cheveux en mouvement, sur plexiglas superposé, par Fabian PhiL',
    description:
      'Old Man in Peace est un portrait contemplatif de 2020 où le calme de l’expression contraste avec le mouvement de l’image superposée. Cheveux et lignes du visage se décalent subtilement lorsque le spectateur change de position, au service d’une atmosphère de sérénité, d’âge et de réflexion.',
    series: 'Collection Moving Hair',
    size: '120\u00a0×\u00a090\u00a0cm',
    medium: acrylic,
  },
  8: {
    imageAlt: 'I am the Last Samurai, grand portrait cinétique aux cheveux en mouvement sur plexiglas superposé, par Fabian PhiL',
    description:
      'I am the Last Samurai est un grand portrait de 2024 construit autour de l’âge, du caractère et du mouvement des cheveux sur des couches de plexiglas distinctes. Lorsque le spectateur se déplace, cheveux et lignes du visage se réalignent et donnent au portrait une profondeur et une présence changeantes.',
    series: 'Collection Moving Hair',
    size: '110\u00a0×\u00a0110\u00a0cm',
    medium: acrylicInk,
  },
  11: {
    imageAlt: 'Portrait de Twiggy dans Oh Dear, pop art sur plexiglas superposé, par Fabian PhiL',
    description:
      'Oh Dear est un portrait pop art superposé de Twiggy, mannequin et icône culturelle associée à la mode des années 1960. Son regard singulier devient un instant suspendu de surprise, de vulnérabilité et de tension théâtrale, tandis que les lignes du visage se réalignent avec le mouvement.',
    series: 'Collection Expressive Emotion',
    size: '90\u00a0×\u00a0120\u00a0cm',
    medium: acrylic,
  },
  12: {
    imageAlt: 'Ooh!, portrait pop art cinétique d’un visage surpris, une cerise rose à la bouche ouverte, sur plexiglas superposé, par Fabian PhiL',
    description:
      'Ooh! naît d’une réaction immédiate\u00a0: des yeux écarquillés, une bouche ouverte et une cerise rose fluorescente sur un visage en noir et blanc. Le titre n’explique presque rien et laisse le spectateur projeter sur l’expression surprise, curiosité, plaisir ou incrédulité.',
    series: 'Collection Expressive Emotion',
    size: '90\u00a0×\u00a0120\u00a0cm',
    medium: acrylic,
  },
  13: {
    imageAlt: 'Blue Lady, premier portrait cinétique de Fabian PhiL sur plexiglas superposé',
    description:
      'Blue Lady marque le début de l’approche cinétique superposée de Fabian PhiL. Réalisée en 2011, c’est la première œuvre où des couches de plexiglas distinctes deviennent essentielles à l’image changeante\u00a0: une découverte à l’origine des Œuvres Signature, de Pop Glasses et du Pop Art en Mouvement.',
    series: 'Collection Expressive Emotion',
    size: '90\u00a0×\u00a0120\u00a0cm',
    medium: acrylic,
  },
  18: {
    imageAlt: 'Wanted Smoking Rock Star, portrait aux yeux charbonneux et aux lunettes bleu profond sur plexiglas superposé, par Fabian PhiL',
    description:
      'Wanted Smoking Rock Star est un portrait Pop Glasses de 2024, plus incisif et plus rebelle. Yeux charbonneux et lunettes bleu profond mêlent glamour, défi et mystère de rock star, tandis que le titre Wanted fait du sujet un personnage plutôt qu’un portrait conventionnel.',
    series: popGlassesWanted,
    size: size70,
    medium: acrylicInk,
  },
  20: {
    imageAlt: 'That\'s the Way I Like it, portrait Pop Glasses sur plexiglas superposé, par Fabian PhiL',
    description:
      'That\'s the Way I Like it est un portrait Pop Glasses plein d’assurance, réalisé en 2019. Le titre, sans détour, donne à l’expression une attitude affirmée, tandis que lunettes, yeux et traits du visage se décalent avec la perspective.',
    series: 'Collection Pop Glasses',
    size: size70,
    medium: acrylic,
  },
  21: {
    imageAlt: 'Maybe I will See Him, portrait aux lunettes roses et au regard d’attente sur plexiglas superposé, par Fabian PhiL',
    description:
      'Maybe I will See Him est un portrait Pop Glasses plus intime, réalisé en 2018 autour de l’anticipation. Lunettes roses et regard suspendu évoquent l’attente, le désir et l’incertitude, et le titre laisse l’histoire volontairement ouverte.',
    series: 'Collection Pop Glasses',
    size: '60\u00a0×\u00a060\u00a0cm',
    medium: acrylic,
  },
  23: {
    imageAlt: 'La chanteuse Beyoncé aux lunettes bleu électrique dans Wanted for Stealing the Blues, par Fabian PhiL',
    description:
      'Wanted for Stealing the Blues est un portrait pop art superposé de Beyoncé, dont les lunettes bleu électrique intensifient un regard pensif, entre glamour, mystère, musique et retenue. Le titre Wanted ajoute de l’humour sans prendre le pas sur l’expression.',
    series: popGlassesWanted,
    size: size70,
    medium: acrylic,
  },
  24: {
    imageAlt: 'You Call This Art…?, portrait aux lunettes fluorescentes et au regard direct sur plexiglas superposé, par Fabian PhiL',
    description:
      'You Call This Art…? interpelle le spectateur avant toute explication. Le titre questionne le jugement et les limites du pop art contemporain, et le portrait répond par des lunettes fluorescentes, des détails réfléchissants et un regard direct.',
    series: 'Collection Pop Glasses',
    size: size70,
    medium: 'Peinture, impression et collage sur deux plaques de plexiglas',
  },
  30: {
    imageAlt: 'Portrait de Clint Eastwood entouré de dessins animés dans Wanted Million Dollar Toon Fight, par Fabian PhiL',
    description:
      'Wanted Million Dollar Toon Fight place Clint Eastwood au centre d’une collision colorée entre portrait, dessins animés et culture pop. Le format Wanted donne un cadre narratif à l’œuvre, tandis que le titre évoque l’affrontement et le spectacle.',
    series: 'Collections Wanted · Toon Clash',
    size: size70,
    medium: 'Impression numérique au dos des plaques de plexiglas, acrylique sur la face avant',
  },
  26: {
    imageAlt: 'Portrait de Clint Eastwood entouré de dessins animés sur le thème de la boxe dans Wanted for Toon KnockOut, par Fabian PhiL',
    description:
      'Wanted for Toon KnockOut plonge Clint Eastwood dans une confrontation pop art rapide et ludique. Le vocabulaire de la boxe fournit la chute visuelle, tandis que portrait, dessins animés et références graphiques se répartissent sur des couches de plexiglas distinctes.',
    series: 'Collections Wanted · Toon Clash',
    size: size70,
    medium: 'Création numérique imprimée sur deux plaques de plexiglas',
  },
}
