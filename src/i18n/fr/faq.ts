import type { FaqId, FaqItem } from '@/data/faq'

// French answers for the home page FAQ selection (same ids and order as CommonQuestions).
export const frHomeFaqItems: FaqItem[] = [
  {
    id: 'availability',
    q: 'Cette œuvre est-elle disponible\u202f?',
    a: [
      [
        'La disponibilité est indiquée sur la page de chaque œuvre. Pour connaître la disponibilité actuelle d’une œuvre, contactez directement Fabian sur ',
        { text: 'WhatsApp', whatsapp: 'price' },
        ' ou envoyez une ',
        { text: 'demande de prix', route: 'price-inquiry' },
        '.',
      ],
    ],
  },
  {
    id: 'price',
    q: 'Comment obtenir un prix\u202f?',
    a: [
      [
        'Les prix sont communiqués sur demande. Indiquez simplement l’œuvre qui vous intéresse via la page ',
        { text: 'Demande de prix', route: 'price-inquiry' },
        ' ou contactez directement Fabian sur ',
        { text: 'WhatsApp', whatsapp: 'price' },
        '.',
      ],
    ],
  },
  {
    id: 'sizes',
    q: 'Quels formats sont disponibles\u202f?',
    a: [
      [
        'Chaque page d’œuvre indique les dimensions de l’original. Fabian travaille dans plusieurs formats, principalement ',
        { size: '60 × 60' },
        ', ',
        { size: '100 × 70' },
        ', ',
        { size: '120 × 90' },
        ', de grands formats de ',
        { size: '110 × 110' },
        ' et ',
        { size: '120 × 120' },
        ', ainsi que des triptyques de ',
        { size: '70 × 210' },
        '.',
      ],
      [
        'Si vous recherchez un format particulier pour votre intérieur ou votre projet, contactez Fabian pour en discuter.',
      ],
    ],
  },
  {
    id: 'commissions',
    q: 'Acceptez-vous les commandes\u202f?',
    a: [
      [
        'Oui. Fabian accepte certaines commandes, pour des collectionneurs privés comme pour des projets d’intérieur, résidentiels, hôteliers et architecturaux. Chaque commande est élaborée dans le langage artistique de Fabian PhiL et étudiée au cas par cas.',
      ],
    ],
  },
  {
    id: 'galleries',
    q: 'Travaillez-vous avec des galeries et des curateurs d’art\u202f?',
    a: [
      [
        'Oui. Les galeries et les curateurs d’art sont invités à contacter Fabian au sujet d’expositions, d’œuvres disponibles et de projets curatoriaux. Un book d’artiste (portfolio sans les prix) est disponible sur demande.',
      ],
      [
        'Parmi les expositions récentes figurent Beyond the Gaze à l’Alliance Française Dubai, ainsi que des présentations à la Noor Royal Gallery, à la DIFC Art Night et à World Art Dubai.',
      ],
    ],
  },
]

const homeItem = (id: FaqId): FaqItem => {
  const item = frHomeFaqItems.find((candidate) => candidate.id === id)
  if (!item) throw new Error(`Missing French home FAQ item: ${id}`)
  return item
}

// Full FAQ page: same ids and order as faqItems (src/data/faq.ts); the home page answers are reused as is.
export const frFaqItems: FaqItem[] = [
  {
    id: 'who',
    q: 'Qui est Fabian PhiL\u202f?',
    a: [
      [
        'Fabian PhiL (Fabian Philandrianos) est un artiste pop contemporain français basé à Dubaï, Émirats arabes unis. Il crée des œuvres originales figuratives et cinétiques sur plexiglas superposé, dans lesquelles portraits et icônes culturelles associent couleur, regard et perspective changeante.',
      ],
    ],
  },
  {
    id: 'based',
    q: 'Où est basé Fabian PhiL\u202f?',
    a: [['Fabian PhiL est un artiste pop contemporain français basé à Dubaï, Émirats arabes unis.']],
  },
  {
    id: 'art',
    q: 'Quel type d’art crée Fabian PhiL\u202f?',
    a: [
      [
        'Fabian PhiL crée du pop art cinétique sur plexiglas superposé, centré sur le portrait et les icônes culturelles. Visages, regards expressifs, lunettes colorées et titres provocateurs reviennent d’une œuvre à l’autre, à travers des séries comme Pop Glasses, Wanted, les triptyques autour du billet de 100\u00a0USD, les portraits de sport automobile et les pandas dans des paysages zen.',
      ],
    ],
  },
  {
    id: 'kinetic',
    q: 'Que signifie le pop art cinétique dans l’œuvre de Fabian PhiL\u202f?',
    a: [
      [
        'Fabian PhiL peint sur plusieurs couches de plexiglas superposées. Lorsque le spectateur se déplace, ces couches se décalent les unes par rapport aux autres et transforment l’image selon la perspective. L’imagerie pop, la couleur et le portrait s’associent à ce mouvement physique\u00a0: c’est pourquoi son travail est décrit comme «\u00a0Le Pop Art en Mouvement\u00a0».',
      ],
    ],
  },
  {
    id: 'movement',
    q: 'Comment les œuvres changent-elles lorsque le spectateur se déplace\u202f?',
    a: [
      [
        'Chaque image étant peinte sur des couches de plexiglas distinctes, les lignes, les yeux, les lunettes et les traits du visage se décalent les uns par rapport aux autres lorsque vous vous déplacez de gauche à droite. Une expression peut sembler se réaligner ou prendre un autre caractère d’un point de vue à l’autre. Dans certaines œuvres, un arrière-plan graphique coloré ou la lumière ajoute une dimension supplémentaire au mouvement.',
      ],
    ],
  },
  {
    id: 'materials',
    q: 'Quels matériaux Fabian PhiL utilise-t-il\u202f?',
    a: [
      [
        'La plupart des œuvres sont peintes à l’acrylique sur deux plaques d’acrylique (plexiglas). Selon l’œuvre, Fabian utilise aussi l’encre, le vinyle miroir argenté, l’impression, le collage ou une création numérique imprimée sur le plexiglas, et certaines œuvres spéciales intègrent un éclairage LED. La technique de chaque œuvre est indiquée sur sa page.',
      ],
    ],
  },
  {
    id: 'first-kinetic',
    q: 'Quelle a été la première œuvre cinétique de Fabian PhiL\u202f?',
    a: [
      [
        { text: 'Blue Lady', route: 'artwork', options: { id: 13 } },
        ' (2011). En peignant deux fois la Blue Lady, sur deux plaques de plexiglas, Fabian a découvert que des traits verticaux créaient du mouvement lorsque le spectateur se déplaçait autour de l’œuvre\u00a0: les yeux semblaient le suivre, comme ceux de la Joconde. Cette découverte est devenue le fondement de sa technique cinétique.',
      ],
    ],
  },
  {
    id: 'exhibited',
    q: 'Où Fabian PhiL a-t-il exposé\u202f?',
    a: [
      [
        'Parmi les expositions récentes figurent Beyond the Gaze à l’Alliance Française Dubai, ainsi que des présentations à la Noor Royal Gallery, à la DIFC Art Night et à World Art Dubai. Photos et informations sont disponibles sur la page ',
        { text: 'Expositions', route: 'exhibitions' },
        '.',
      ],
    ],
  },
  homeItem('availability'),
  homeItem('price'),
  {
    id: 'buy',
    q: 'Comment acheter une œuvre de Fabian PhiL\u202f?',
    a: [
      [
        'Choisissez l’œuvre qui vous intéresse, puis contactez directement Fabian sur ',
        { text: 'WhatsApp', whatsapp: 'price' },
        ' ou via la page ',
        { text: 'Demande de prix', route: 'price-inquiry' },
        '. Le prix de chaque œuvre est communiqué discrètement sur demande, par e-mail, par formulaire ou sur WhatsApp. Vous pouvez aussi envoyer un message depuis la page ',
        { text: 'Contact', route: 'contact' },
        '.',
      ],
    ],
  },
  homeItem('sizes'),
  homeItem('galleries'),
  {
    id: 'viewing',
    q: 'Où voir les œuvres de Fabian PhiL à Dubaï\u202f?',
    a: [
      [
        'Les expositions et présentations en galerie en cours sont indiquées sur la page ',
        { text: 'Expositions', route: 'exhibitions' },
        '. Pour toute autre demande de visite, ',
        { text: 'contactez l’atelier', route: 'contact' },
        ' directement.',
      ],
    ],
  },
  {
    id: 'artist-book',
    q: 'Puis-je demander le book d’artiste de Fabian PhiL\u202f?',
    a: [
      [
        'Oui. Les galeries, les curateurs d’art et les autres professionnels de l’art peuvent demander directement à Fabian son dernier book d’artiste.',
      ],
    ],
  },
  {
    id: 'contact',
    q: 'Comment contacter directement Fabian\u202f?',
    a: [
      [
        'Pour toute demande concernant une œuvre, une commande, une collaboration ou un projet professionnel, le plus rapide est de contacter Fabian sur ',
        { text: 'WhatsApp', whatsapp: 'general' },
        '.',
      ],
    ],
  },
  homeItem('commissions'),
  {
    id: 'specific-space',
    q: 'Une œuvre peut-elle être créée pour un espace précis\u202f?',
    a: [
      [
        'Oui, cela peut être envisagé dans le cadre d’une commande ou d’une collaboration. Transmettez à Fabian les dimensions de l’espace, des photos ou des plans, ainsi que toute information utile sur le projet, afin d’étudier les possibilités.',
      ],
    ],
  },
  {
    id: 'commission-timing',
    q: 'Combien de temps faut-il pour réaliser une œuvre de commande\u202f?',
    a: [
      [
        'Le délai dépend du format, de la complexité et des exigences de l’œuvre. Présentez à Fabian votre projet et le calendrier souhaité pour en évaluer ensemble la faisabilité et les délais.',
      ],
    ],
  },
  {
    id: 'commission-cost',
    q: 'Combien coûte une œuvre de commande\u202f?',
    a: [
      [
        'Le prix d’une commande dépend des dimensions, de la complexité et des exigences de l’œuvre. Contactez Fabian pour recevoir une proposition adaptée à votre projet.',
      ],
    ],
  },
  {
    id: 'interior-designers',
    q: 'Travaillez-vous avec des designers d’intérieur et des architectes\u202f?',
    a: [
      [
        'Oui. Fabian accueille volontiers certaines collaborations avec des designers d’intérieur, des architectes et des professionnels travaillant sur des projets résidentiels et hôteliers singuliers.',
      ],
    ],
  },
]
