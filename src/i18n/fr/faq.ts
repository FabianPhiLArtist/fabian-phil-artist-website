import type { FaqItem } from '@/data/faq'

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
        'Oui. Fabian accepte certaines commandes, pour des collectionneurs privés comme pour des projets d’architecture intérieure, résidentiels, hôteliers et architecturaux. Chaque commande est élaborée dans le langage artistique de Fabian PhiL et étudiée au cas par cas.',
      ],
    ],
  },
  {
    id: 'galleries',
    q: 'Travaillez-vous avec des galeries et des commissaires d’exposition\u202f?',
    a: [
      [
        'Oui. Les galeries et les commissaires d’exposition sont invités à contacter Fabian au sujet d’expositions, d’œuvres disponibles et de projets curatoriaux. Un book d’artiste (portfolio sans les prix) est disponible sur demande.',
      ],
      [
        'Parmi les expositions récentes figurent Beyond the Gaze à l’Alliance Française de Dubaï, ainsi que des présentations à la Noor Royal Gallery, à la DIFC Art Night et à World Art Dubai.',
      ],
    ],
  },
]
