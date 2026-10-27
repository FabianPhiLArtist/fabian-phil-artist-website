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
  1: {
    seo: {
      title: 'Steve McQueen pop art | Wanted for Racing Life',
      description:
        'Wanted for Racing Life\u00a0: portrait de Steve McQueen par Fabian PhiL, entre esthétique Mugshot, miroir argenté, lumière LED et plexiglas superposé.',
      ogImageAlt:
        'Portrait de Steve McQueen dans Wanted for Racing Life, pop art avec miroir et lumière LED, par Fabian PhiL',
    },
    imageAlt:
      'Portrait de Steve McQueen dans Wanted for Racing Life, pop art avec miroir et lumière LED, par Fabian PhiL',
    description:
      'Wanted for Racing Life reprend Steve McQueen dans le langage graphique du Mugshot. Le lettrage, le visage et les lignes verticales forment une seule image, tandis que le vinyle miroir et la lumière LED y font entrer reflets et éclairage. Réalisée en 2024, l’œuvre relie ce que Steve McQueen évoque de vitesse et d’indépendance au langage de Fabian PhiL\u00a0: le mouvement, le personnage, la lumière. Selon l’endroit où l’on se place, le portrait n’a plus tout à fait la même tenue.',
    inMotion:
      'Le déplacement change à la fois l’alignement et les reflets. Portrait, texte, matière miroir et lumière LED ne répondent pas de la même façon d’un pas à l’autre, et l’œuvre devient plus théâtrale qu’en vue frontale.',
    medium: 'Acrylique et vinyle miroir argenté sur deux plaques de plexiglas, avec LED',
    size: '70\u00a0×\u00a070\u00a0cm',
    series: 'Collection Mugshot',
  },
  2: {
    seo: {
      title: 'Brad Pitt pop art | Wanted for Fight Club',
      description:
        'Wanted for Fight Club\u00a0: portrait pop art de Brad Pitt par Fabian PhiL, entre référence cinématographique, esthétique Mugshot et plexiglas superposé.',
      ogImageAlt: 'Portrait de Brad Pitt dans Wanted for Fight Club, pop art sur plexiglas superposé, par Fabian PhiL',
    },
    imageAlt: 'Portrait de Brad Pitt dans Wanted for Fight Club, pop art sur plexiglas superposé, par Fabian PhiL',
    description:
      'Wanted for Fight Club cadre Brad Pitt dans l’esthétique du Mugshot. Le titre apporte tout de suite une référence au cinéma, et une tension qui dépasse le visage. Peint en 2024 à l’acrylique et à l’encre, le portrait fait glisser lignes et traits d’une plaque à l’autre. On reconnaît Brad Pitt\u00a0; le texte et le décalage en font un personnage sous pression.',
    inMotion:
      'D’un angle à l’autre, les lignes du visage et le graphisme Wanted sortent de l’alignement, puis se rejoignent. Ce glissement renforce le ton de confrontation.',
    medium: 'Acrylique et encre sur deux plaques de plexiglas',
    size: '70\u00a0×\u00a070\u00a0cm',
    series: 'Collection Mugshot',
  },
  3: {
    seo: {
      title: 'Woody Allen pop art | Wanted $$Reward$$',
      description:
        'Wanted $$Reward$$\u00a0: portrait pop art de Woody Allen par Fabian PhiL. Avis de recherche, récompense et humour, sur plexiglas superposé.',
      ogImageAlt: 'Portrait de Woody Allen dans Wanted $$Reward$$, pop art sur plexiglas superposé, par Fabian PhiL',
    },
    imageAlt: 'Portrait de Woody Allen dans Wanted $$Reward$$, pop art sur plexiglas superposé, par Fabian PhiL',
    description:
      'Wanted $$Reward$$ fait de Woody Allen le sujet d’une affiche de recherche, récompense comprise. Lunettes orange, toise et lettrage entrent dans la plaisanterie\u00a0: on lit le visage, on remarque la récompense, puis on y revient autrement. Peinte en 2023 sur deux plaques de plexiglas, l’œuvre décale légèrement le portrait avec la perspective, entre image connue et profondeur réelle.',
    inMotion:
      'En traversant l’œuvre, le portrait, le texte de la récompense et la structure graphique se décalent les uns par rapport aux autres. Le visage change à peine\u00a0; le personnage Wanted reste lisible.',
    medium: 'Acrylique sur deux plaques de plexiglas',
    size: '70\u00a0×\u00a070\u00a0cm',
    series: 'Collection Mugshot',
  },
  7: {
    seo: {
      title: 'Old Man in Peace | Portrait cinétique, Fabian PhiL',
      description:
        'Old Man in Peace, 2020\u00a0: portrait cinétique de Fabian PhiL. Expression apaisée et cheveux en mouvement, sur plexiglas superposé.',
      ogImageAlt:
        'Old Man in Peace, portrait apaisé d’un homme âgé aux cheveux en mouvement, sur plexiglas superposé, par Fabian PhiL',
    },
    imageAlt:
      'Old Man in Peace, portrait apaisé d’un homme âgé aux cheveux en mouvement, sur plexiglas superposé, par Fabian PhiL',
    description:
      'Old Man in Peace est un portrait de 2020 où le calme du visage s’oppose au mouvement de l’image. Yeux fermés, cheveux et barbe sont construits en marques verticales\u00a0: peints sur deux plaques, ils se déplacent légèrement quand on change de place. L’effet reste discret. La profondeur accompagne une atmosphère d’âge, de sérénité et de réflexion, sans jamais figer le portrait.',
    inMotion:
      'Le visage demeure calme pendant que cheveux et traits bougent avec la perspective. Quand les plans se réalignent, la profondeur apparaît puis s’efface, sans troubler le ton plus silencieux de l’œuvre.',
    medium: 'Acrylique sur deux plaques de plexiglas',
    size: '120\u00a0×\u00a090\u00a0cm',
    series: 'Collection Moving Hair',
  },
  8: {
    seo: {
      title: 'I am the Last Samurai | Art cinétique, Fabian PhiL',
      description:
        'I am the Last Samurai, 2024\u00a0: grand portrait cinétique de Fabian PhiL. Cheveux, regard et caractère sur plexiglas superposé.',
      ogImageAlt:
        'I am the Last Samurai, grand portrait cinétique aux cheveux en mouvement sur plexiglas superposé, par Fabian PhiL',
    },
    imageAlt:
      'I am the Last Samurai, grand portrait cinétique aux cheveux en mouvement sur plexiglas superposé, par Fabian PhiL',
    description:
      'I am the Last Samurai est un grand portrait de 2024, construit autour de l’âge, du caractère et du mouvement des cheveux. Le regard reste franc, mais les traits verticaux ne se posent jamais exactement au même endroit. D’un côté à l’autre, cheveux, barbe et lignes du visage se réalignent et donnent au portrait une autre présence. Fabian PhiL y mène son langage cinétique vers une étude plus retenue.',
    inMotion:
      'En se déplaçant de côté, on voit les cheveux devenir la partie la plus active du portrait. Les lignes, peintes sur des plans séparés, traversent le visage et en changent la profondeur.',
    medium: 'Acrylique et encre sur deux plaques de plexiglas',
    size: '110\u00a0×\u00a0110\u00a0cm',
    series: 'Collection Moving Hair',
  },
  11: {
    seo: {
      title: 'Twiggy pop art | Oh Dear, Fabian PhiL',
      description:
        'Oh Dear\u00a0: portrait pop art de Twiggy par Fabian PhiL, 2018. Regard, rose vif et plexiglas superposé.',
      ogImageAlt: 'Portrait de Twiggy dans Oh Dear, pop art rose sur plexiglas superposé, par Fabian PhiL',
    },
    imageAlt: 'Portrait de Twiggy dans Oh Dear, pop art rose sur plexiglas superposé, par Fabian PhiL',
    description:
      'Oh Dear est un portrait de Twiggy, mannequin associée à la mode des années 1960. Le visage, tracé en rose vif, suspend un instant entre surprise et vulnérabilité, et le titre très court laisse l’émotion ouverte. Peinte en 2018 sur des plaques distinctes, l’œuvre fait se réaligner les lignes du visage dès que l’on bouge.',
    inMotion:
      'Les lignes glissent sur le visage avec le spectateur, et le regard semble changer. L’expression se réajuste, tandis que le rose vif reste le point d’appui.',
    medium: 'Acrylique sur deux plaques de plexiglas',
    size: '90\u00a0×\u00a0120\u00a0cm',
    series: 'Collection Expressive Emotion',
  },
  12: {
    seo: {
      title: 'Ooh! | Portrait pop art cinétique, Fabian PhiL',
      description:
        'Ooh!, 2020\u00a0: portrait pop art de Fabian PhiL. Visage surpris, bouche ouverte et cerise rose fluo, sur plexiglas superposé.',
      ogImageAlt:
        'Ooh!, portrait pop art cinétique d’un visage surpris, une cerise rose à la bouche ouverte, sur plexiglas superposé, par Fabian PhiL',
    },
    imageAlt:
      'Ooh!, portrait pop art cinétique d’un visage surpris, une cerise rose à la bouche ouverte, sur plexiglas superposé, par Fabian PhiL',
    description:
      'Ooh! tient dans une réaction immédiate\u00a0: yeux grands ouverts, bouche ouverte, cerise rose fluo sur un visage autrement en noir et blanc. Le titre n’explique presque rien, et l’on peut y lire surprise, curiosité, plaisir ou incrédulité. Réalisée en 2020, l’œuvre laisse les marques du visage bouger avec le spectateur. L’image et le mot, tous deux très courts, gardent l’interprétation ouverte.',
    inMotion:
      'En passant devant le portrait, les traits se déplacent légèrement. L’expression semble changer avec celui qui regarde, et l’exclamation du titre n’a plus exactement le même sens d’un angle à l’autre.',
    medium: 'Acrylique sur deux plaques de plexiglas',
    size: '90\u00a0×\u00a0120\u00a0cm',
    series: 'Collection Expressive Emotion',
  },
  13: {
    seo: {
      title: 'Blue Lady | Premier portrait cinétique, Fabian PhiL',
      description:
        'Blue Lady, 2011\u00a0: le premier portrait cinétique de Fabian PhiL. Traits bleus et perspective changeante, à l’origine du Pop Art en Mouvement.',
      ogImageAlt: 'Blue Lady, premier portrait cinétique de Fabian PhiL, traits bleus sur plexiglas superposé',
    },
    imageAlt: 'Blue Lady, premier portrait cinétique de Fabian PhiL, traits bleus sur plexiglas superposé',
    description:
      'Blue Lady ouvre l’approche cinétique de Fabian PhiL. En 2011, c’est la première œuvre où des plaques séparées deviennent le cœur de l’image\u00a0: les traits bleus et le visage ne coïncident plus tout à fait d’un point de vue à l’autre. Cette trouvaille a ensuite porté les Œuvres Signature, Pop Glasses et l’idée du Pop Art en Mouvement.',
    inMotion:
      'D’un côté à l’autre, les marques peintes sur des plans distincts glissent contre le visage. Yeux et expression se réalignent\u00a0: c’est la découverte première de la technique cinétique de Fabian PhiL.',
    medium: 'Acrylique sur deux plaques de plexiglas',
    size: '90\u00a0×\u00a0120\u00a0cm',
    series: 'Collection Expressive Emotion',
  },
  18: {
    seo: {
      title: 'Wanted Smoking Rock Star | Pop Glasses, Fabian PhiL',
      description:
        'Wanted Smoking Rock Star, 2024\u00a0: portrait Pop Glasses de Fabian PhiL. Lunettes bleu profond, regard charbonneux et cigarette, sur plexiglas superposé.',
      ogImageAlt:
        'Wanted Smoking Rock Star, portrait aux yeux charbonneux, à la cigarette et aux lunettes bleu profond, par Fabian PhiL',
    },
    imageAlt:
      'Wanted Smoking Rock Star, portrait aux yeux charbonneux, à la cigarette et aux lunettes bleu profond, par Fabian PhiL',
    description:
      'Wanted Smoking Rock Star est un portrait Pop Glasses de 2024, plus sec et plus rebelle. Yeux charbonneux, cigarette et lunettes bleu profond mêlent glamour et mystère, et le titre fait du sujet un personnage plutôt qu’une effigie posée. Sur plexiglas superposé, montures et regard se décalent\u00a0: l’attitude elle-même semble instable.',
    inMotion:
      'Les lunettes bleu profond se déplacent devant les yeux charbonneux et les lignes du visage. Selon l’angle, le regard devient plus ou moins frontal.',
    medium: 'Acrylique et encre sur deux plaques de plexiglas',
    size: '70\u00a0×\u00a070\u00a0cm',
    series: 'Collections Pop Glasses · Wanted',
    seriesBlock: 'Collection Pop Glasses',
  },
  20: {
    seo: {
      title: 'That\'s the Way I Like it | Pop Glasses, Fabian PhiL',
      description:
        'That\'s the Way I Like it, 2019\u00a0: portrait Pop Glasses de Fabian PhiL. Lunettes jaune fluo et attitude directe, sur plexiglas superposé.',
      ogImageAlt:
        'That\'s the Way I Like it, portrait Pop Glasses aux lunettes jaune fluo, sur plexiglas superposé, par Fabian PhiL',
    },
    imageAlt:
      'That\'s the Way I Like it, portrait Pop Glasses aux lunettes jaune fluo, sur plexiglas superposé, par Fabian PhiL',
    description:
      'That\'s the Way I Like it est un portrait Pop Glasses de 2019, d’une assurance nette. Le titre pose l’attitude avant que l’on ait fini de lire le visage. Lunettes jaune fluo, yeux et traits noirs occupent des plans séparés et se décalent avec la perspective. La couleur et la place du spectateur rendent le caractère actif, jamais tout à fait arrêté.',
    inMotion: '',
    medium: 'Acrylique sur deux plaques de plexiglas',
    size: '70\u00a0×\u00a070\u00a0cm',
    series: 'Collection Pop Glasses',
  },
  21: {
    seo: {
      title: 'Maybe I will See Him | Pop Glasses, Fabian PhiL',
      description:
        'Maybe I will See Him, 2018\u00a0: portrait Pop Glasses de Fabian PhiL. Lunettes roses et regard en attente, sur plexiglas superposé.',
      ogImageAlt:
        'Maybe I will See Him, portrait aux lunettes roses et au regard d’attente, sur plexiglas superposé, par Fabian PhiL',
    },
    imageAlt:
      'Maybe I will See Him, portrait aux lunettes roses et au regard d’attente, sur plexiglas superposé, par Fabian PhiL',
    description:
      'Maybe I will See Him est un portrait Pop Glasses plus intérieur, peint en 2018 autour de l’attente. Lunettes roses et regard suspendu laissent place au désir et à l’incertitude\u00a0; le titre ne ferme pas l’histoire. Yeux et montures bougent un peu par rapport au visage. Cette hésitation physique rejoint celle de l’expression.',
    inMotion: '',
    medium: 'Acrylique sur deux plaques de plexiglas',
    size: '60\u00a0×\u00a060\u00a0cm',
    series: 'Collection Pop Glasses',
  },
  23: {
    seo: {
      title: 'Beyoncé pop art | Wanted for Stealing the Blues',
      description:
        'Wanted for Stealing the Blues\u00a0: portrait pop art de Beyoncé par Fabian PhiL. Lunettes bleu électrique, regard pensif et plexiglas superposé.',
      ogImageAlt:
        'La chanteuse Beyoncé aux lunettes bleu électrique dans Wanted for Stealing the Blues, par Fabian PhiL',
    },
    imageAlt: 'La chanteuse Beyoncé aux lunettes bleu électrique dans Wanted for Stealing the Blues, par Fabian PhiL',
    description:
      'Wanted for Stealing the Blues est un portrait de Beyoncé. Les lunettes bleu électrique tiennent un regard pensif, quelque part entre glamour, mystère, musique et retenue. Le titre Wanted apporte l’humour sans recouvrir l’expression. Réalisée en 2024, l’œuvre fait glisser montures, yeux et lignes\u00a0: le visage change à peine, et le bleu reste l’ancre.',
    inMotion:
      'En passant devant le portrait, les lunettes bleu électrique se décalent sur les yeux et le visage. L’alignement accuse le regard et laisse voir la profondeur entre les plaques.',
    medium: 'Acrylique sur deux plaques de plexiglas',
    size: '70\u00a0×\u00a070\u00a0cm',
    series: 'Collections Pop Glasses · Wanted',
    seriesBlock: 'Collection Pop Glasses',
  },
  24: {
    seo: {
      title: 'You Call This Art…? | Pop art, Fabian PhiL',
      description:
        'You Call This Art…?, 2024\u00a0: portrait pop art de Fabian PhiL. Regard direct, collage et reflets, sur plexiglas superposé.',
      ogImageAlt:
        'You Call This Art…?, portrait au regard direct et aux montures réfléchissantes, sur plexiglas superposé, par Fabian PhiL',
    },
    imageAlt:
      'You Call This Art…?, portrait au regard direct et aux montures réfléchissantes, sur plexiglas superposé, par Fabian PhiL',
    description:
      'You Call This Art…? prend le spectateur à partie avant d’expliquer quoi que ce soit. Le titre interroge le jugement et les bords du pop art\u00a0; le portrait répond par un regard direct, des montures réfléchissantes et un collage. Réalisée en 2024 en peinture, impression et collage sur deux plaques, l’expression change avec le point de vue. Regarder devient une courte discussion entre le sujet, l’artiste et celui qui se tient devant.',
    inMotion:
      'Les montures réfléchissantes et les lignes du visage se déplacent sur des plans séparés. Le regard semble changer, et le titre continue de questionner le jugement.',
    medium: 'Peinture, impression et collage sur deux plaques de plexiglas',
    size: '70\u00a0×\u00a070\u00a0cm',
    series: 'Collection Pop Glasses',
  },
  30: {
    seo: {
      title: 'Clint Eastwood pop art | Million Dollar Toon Fight',
      description:
        'Wanted Million Dollar Toon Fight\u00a0: Clint Eastwood, dessins animés et pop art Toon Clash de Fabian PhiL, sur plexiglas superposé.',
      ogImageAlt:
        'Portrait de Clint Eastwood entouré de dessins animés dans Wanted Million Dollar Toon Fight, par Fabian PhiL',
    },
    imageAlt:
      'Portrait de Clint Eastwood entouré de dessins animés dans Wanted Million Dollar Toon Fight, par Fabian PhiL',
    description:
      'Wanted Million Dollar Toon Fight place Clint Eastwood au milieu d’une collision colorée entre portrait et dessins animés. Le format Wanted donne un cadre\u00a0; le titre, une idée d’affrontement et de spectacle. En 2026, le visage est peint sur la face avant et le fond imprimé au dos des plaques\u00a0: portrait et personnages n’occupent pas le même plan. Quand on se déplace, la composition se sépare, puis se reforme.',
    inMotion:
      'Le portrait et les éléments de dessin animé glissent sur des couches distinctes. Visages, texte et graphismes se séparent et se rejoignent, et la collision devient plus sensible.',
    medium: 'Impression numérique au dos des plaques de plexiglas, acrylique sur la face avant',
    size: '70\u00a0×\u00a070\u00a0cm',
    series: 'Collections Wanted · Toon Clash',
    seriesBlock: 'Collection Toon Clash',
  },
  26: {
    seo: {
      title: 'Clint Eastwood pop art | Wanted for Toon KnockOut',
      description:
        'Wanted for Toon KnockOut\u00a0: Clint Eastwood, boxe et dessins animés. Pop art Toon Clash de Fabian PhiL sur plexiglas superposé.',
      ogImageAlt:
        'Portrait de Clint Eastwood et dessins animés sur le thème de la boxe dans Wanted for Toon KnockOut, par Fabian PhiL',
    },
    imageAlt:
      'Portrait de Clint Eastwood et dessins animés sur le thème de la boxe dans Wanted for Toon KnockOut, par Fabian PhiL',
    description:
      'Wanted for Toon KnockOut place Clint Eastwood dans une confrontation pop art rapide et joueuse. La boxe fournit la chute visuelle. Peinture et impression numérique se partagent les deux plaques\u00a0: selon le point de vue, on lit tantôt le visage, tantôt la scène animée. Réalisée en 2024, l’œuvre relève de Toon Clash autant que de Wanted.',
    inMotion:
      'Portrait, dessins animés et signes graphiques sortent de l’alignement avant de se retrouver. Le mouvement donne à la scène l’allure d’un choc en train de se produire, plutôt que d’une image arrêtée.',
    medium: 'Peinture et création numérique imprimée sur deux plaques de plexiglas',
    size: '70\u00a0×\u00a070\u00a0cm',
    series: 'Collections Wanted · Toon Clash',
    seriesBlock: 'Collection Toon Clash',
  },
}

// Card text for artworks shown on French pages before they have a French page of their own.
// Wave 4 publishes the last unpublished artworks, so this stays empty.
export const frArtworkCards: Partial<Record<number, FrArtworkCard>> = {}
