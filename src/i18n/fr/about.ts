import type { AboutPageCopy } from '@/components/AboutPage'
import { frArtistEntity } from './artist'
import { frCollectionNames } from './collections'
import { frSimpleImageModalCopy } from './ui'

export const frAboutCopy: AboutPageCopy = {
  eyebrow: 'L’artiste',
  title: 'Un artiste français façonné par une vie internationale.',
  studioImage: {
    alt: frArtistEntity.portraitCaption,
    title: 'Atelier, Dubaï',
  },
  biography: [
    'Originaire de Paris, Fabian PhiL a vécu et travaillé pendant plus de vingt-cinq ans en Asie, en Europe, en Afrique et au Moyen-Orient, avant d’établir sa pratique artistique à Dubaï, où il est aujourd’hui basé. Il séjourne régulièrement à Megève, dans les Alpes françaises, et développe progressivement sa présence artistique entre Megève et Chamonix.',
    'Son travail passé sur les ondes sismiques lui a laissé une fascination durable pour les couches, le mouvement et ce qui se cache sous la surface — des notions qui ont trouvé plus tard un écho inattendu dans son travail artistique.',
    'Sur plusieurs plaques de plexiglas transparent, Fabian construit ses portraits couche après couche. Quand le spectateur se déplace, ces couches se décalent les unes par rapport aux autres et l’image se transforme avec la perspective.',
    'Visages, regards expressifs, lunettes colorées, titres provocateurs et icônes familières de la culture populaire sont devenus les éléments récurrents d’un langage visuel conçu pour être vécu, et pas seulement regardé.',
  ],
  facts: [
    { label: 'Nom', value: 'Fabian Philandrianos' },
    { label: 'Basé à', value: 'Dubaï, Émirats arabes unis' },
    { label: 'Pratique', value: 'Pop art cinétique sur plexiglas superposé' },
  ],
  gazeHeading: 'Le regard, le mouvement, l’histoire',
  gazeLead:
    'Le regard est souvent le point de départ. Les yeux et l’expression créent le premier lien\u00a0; le mouvement change ce que voit le spectateur\u00a0; les titres introduisent l’humour, l’ambiguïté ou la provocation.',
  gazeText:
    'Dans les œuvres Pop Glasses, la couleur modifie la personnalité du portrait. Dans la série Wanted, le langage du Mugshot transforme le sujet en personnage. Dans toute sa pratique, l’œuvre continue de changer avec la perspective, la lumière et la position du spectateur.',
  quote:
    '«\u00a0Ce qui m’intéresse, c’est l’émotion derrière un visage — le regard, l’expression, ce sentiment que quelque chose est sur le point de bouger. J’utilise la transparence, la lumière et la superposition des images pour donner au portrait une présence changeante.\u00a0»',
  journeyHeading: 'Le parcours artistique',
  journey: [
    {
      title: 'La première peinture — Bornéo',
      text: 'Fabian peint sa première œuvre en 2003, sur l’île de Bornéo, au cœur de la jungle. Ce premier tableau lui demande une année entière de travail et lui apprend la patience et l’engagement qu’exige l’art.',
    },
    {
      title: 'La Blue Lady — Afrique',
      text: 'En 2011, cherchant à transposer dans la peinture son expérience des ondes sismiques en trois dimensions, il peint deux fois la Blue Lady, de manière légèrement différente, sur deux plaques de plexiglas, et découvre que les traits verticaux créent un mouvement à mesure que le spectateur se déplace autour de l’œuvre : les yeux semblent le suivre, comme ceux de La Joconde. Cette découverte devient le fondement de sa technique cinétique et le point de départ de son propre langage visuel.',
    },
    {
      title: 'Évolution — Dubaï',
      text: 'À Dubaï, son travail s’élargit : il introduit la couleur à travers des lunettes fluorescentes pour amplifier le regard, développe des triptyques autour du billet de 100 dollars et associe la création numérique à la peinture, aux dessins animés et à l’univers de la Formule 1. En 2025, il introduit l’univers des pandas dans des paysages zen de temples, de lacs et de cerisiers en fleurs.',
    },
  ],
  influences:
    'En chemin, il étudie des artistes modernes tels que Klasen, Delorme et Warhol, avant de trouver sa propre voix au fil du hasard et de l’expérimentation.',
  exploreHeading: 'Explorer l’œuvre',
  collectionsLabel: 'Collections',
  collectionNames: frCollectionNames,
  viewAll: 'Voir toutes les œuvres →',
  exhibitions: 'Expositions →',
  contactHeading: 'Prendre contact',
  contactText: 'Une œuvre, une exposition ou une commande vous intéresse\u202f? Contactez l’atelier.',
  whatsapp: 'Écrire sur WhatsApp →',
  email: 'Envoyer un e-mail →',
  modal: frSimpleImageModalCopy,
}
