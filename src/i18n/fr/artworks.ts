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
}

const size70 = '70\u00a0×\u00a070\u00a0cm'
const acrylic = 'Acrylique sur deux plaques de plexiglas'
const acrylicInk = 'Acrylique et encre sur deux plaques de plexiglas'
const paintPrint = 'Peinture et création numérique imprimée sur deux plaques de plexiglas'
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
  6: {
    imageAlt: 'Portrait d’Andy Warhol intégré à un triptyque autour du billet de 100 dollars, par Fabian PhiL',
    description:
      '100 USD Andy Warhol est un grand triptyque qui représente Andy Warhol dans le langage graphique du billet de dollar américain, reliant portrait, célébrité, argent et histoire du pop art. Réalisée en 2017, c’est l’une des Œuvres Signature de Fabian PhiL et un dialogue direct avec une figure majeure du Pop Art.',
    series: 'Collection 100 USD',
    size: '70\u00a0×\u00a0210\u00a0cm',
    medium: 'Triptyque. Acrylique sur deux plaques de plexiglas',
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
  10: {
    imageAlt: 'Les yeux d’Amanda Seyfried derrière des lunettes roses dans Why…?, art cinétique sur plexiglas superposé, par Fabian PhiL',
    description:
      'Why…? est un portrait superposé d’Amanda Seyfried construit autour de l’ambiguïté de son regard. Le titre fait d’un visage familier une question sans réponse, et les traits verticaux glissent sur le visage à mesure que le spectateur se déplace.',
    series: 'Collection Expressive Emotion',
    size: '120\u00a0×\u00a0120\u00a0cm',
    medium: acrylic,
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
  14: {
    imageAlt: 'Keith Richards des Rolling Stones avec une cigarette, dans The Last One!, œuvre sur plexiglas superposé, par Fabian PhiL',
    description:
      'The Last One! est un grand portrait superposé de Keith Richards, guitariste des Rolling Stones. Le titre installe un sentiment de finalité et de tension, et les lignes du visage trouvent de nouveaux alignements lorsque le spectateur change de position.',
    series: 'Collection Expressive Emotion',
    size: '120\u00a0×\u00a090\u00a0cm',
    medium: acrylic,
  },
  15: {
    imageAlt: 'Portrait de Kate Upton dans Wanted for Loving Art, œuvre Pop Glasses sur plexiglas superposé, par Fabian PhiL',
    description:
      'Wanted for Loving Art est un portrait pop art superposé de Kate Upton qui fait de l’amour de l’art un délit espiègle. Le format Wanted donne un personnage à Kate Upton, tandis que le langage Pop Glasses apporte la couleur et un regard changeant.',
    series: popGlassesWanted,
    size: size70,
    medium: acrylicInk,
  },
  16: {
    imageAlt: 'Angelina Jolie, un doigt sur les lèvres et des lunettes bleues, dans Wanted for Being Too Smart, pop art par Fabian PhiL',
    description:
      'Wanted for Being Too Smart est un portrait pop art d’Angelina Jolie dans les langages Pop Glasses et Wanted de Fabian PhiL. Son regard intense et ses lunettes colorées installent le personnage, tandis que le titre fait de l’intelligence elle-même le délit supposé.',
    series: popGlassesWanted,
    size: size70,
    medium: acrylicInk,
  },
  18: {
    imageAlt: 'Wanted Smoking Rock Star, portrait aux yeux charbonneux et aux lunettes bleu profond sur plexiglas superposé, par Fabian PhiL',
    description:
      'Wanted Smoking Rock Star est un portrait Pop Glasses de 2024, plus incisif et plus rebelle. Yeux charbonneux et lunettes bleu profond mêlent glamour, défi et mystère de rock star, tandis que le titre Wanted fait du sujet un personnage plutôt qu’un portrait conventionnel.',
    series: popGlassesWanted,
    size: size70,
    medium: acrylicInk,
  },
  19: {
    imageAlt: 'Portrait d’Emma Stone aux lunettes vert fluo, pop art sur plexiglas superposé, par Fabian PhiL',
    description:
      'Wow… I Look Good in Green est un portrait Pop Glasses d’Emma Stone, construit autour d’un sourire plein d’autodérision et de montures vert fluorescent. Le titre fait de la coquetterie une affaire d’humour, d’assurance et de charme.',
    series: 'Collection Pop Glasses',
    size: size70,
    medium: acrylic,
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
  34: {
    imageAlt: 'Portrait de Lucy Liu dans Wanted Fashion Police Angel, œuvre Pop Glasses sur plexiglas superposé, par Fabian PhiL',
    description:
      'Wanted Fashion Police Angel est un portrait Pop Glasses superposé de Lucy Liu, encadré de lunettes rose fluorescent et d’un titre Wanted espiègle. Son regard calme et direct mêle mode, identité et grâce, et fait d’elle une gardienne de l’élégance plutôt qu’une suspecte.',
    series: 'Collection Pop Glasses',
    size: size70,
    medium: acrylicInk,
  },
  25: {
    imageAlt: 'Wanted Panda PopArt Dealer, pop art de panda sur plexiglas superposé, par Fabian PhiL',
    description:
      'Wanted Panda PopArt Dealer place un panda espiègle dans un paysage coloré d’inspiration zen, avec silhouettes de temples, cerisiers en fleurs, eau et pont. Le titre introduit l’humour du pop art dans une scène par ailleurs paisible.',
    series: 'Collection Panda Pop',
    size: size70,
    medium: paintPrint,
  },
  28: {
    imageAlt: 'Wanted Panda Zen Artist, pop art de panda sur plexiglas superposé, par Fabian PhiL',
    description:
      'Wanted Panda Zen Artist associe un panda contemplatif à l’humour du format Wanted. Le calme, la couleur et un décor d’inspiration zen adoucissent le langage du Mugshot, dans une tension ludique entre sérénité et pop art.',
    series: 'Collection Panda Pop',
    size: size70,
    medium: 'Techniques mixtes sur plaques de plexiglas',
  },
  29: {
    imageAlt: 'Wanted Panda Yin & Yang Fan, pop art de panda sur plexiglas superposé, par Fabian PhiL',
    description:
      'Wanted Panda Yin & Yang Fan joue avec l’équilibre, la dualité et le calme à travers le panda et l’idée du Yin et du Yang. Le titre Wanted garde à l’œuvre une tonalité légère et pleine d’humour, loin d’un symbolisme solennel.',
    series: 'Collection Panda Pop',
    size: size70,
    medium: 'Techniques mixtes sur plaques de plexiglas',
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
  31: {
    imageAlt: 'Portrait de Charles Leclerc dans Wanted for Speeding in Monza, pop art F1 sur plexiglas, par Fabian PhiL',
    description:
      'Wanted for Speeding in Monza saisit Charles Leclerc, pilote Ferrari, après son triomphe à Monza, entouré d’images de dessins animés colorées et de références à la course. Fabian PhiL y associe la culture de la Formule 1 au langage Wanted\u00a0: portrait, humour et texte sur plexiglas superposé.',
    series: 'Collections F1 / Formule 1 · Toon Clash',
    size: size70,
    medium: paintPrint,
  },
}
