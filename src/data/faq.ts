import type { AppRoute, LocalizedHrefOptions } from '@/i18n/pathnames'

export type FaqId =
  | 'who'
  | 'based'
  | 'art'
  | 'kinetic'
  | 'movement'
  | 'materials'
  | 'first-kinetic'
  | 'exhibited'
  | 'availability'
  | 'price'
  | 'buy'
  | 'sizes'
  | 'galleries'
  | 'viewing'
  | 'artist-book'
  | 'contact'
  | 'commissions'
  | 'specific-space'
  | 'commission-timing'
  | 'commission-cost'
  | 'interior-designers'

// Answers are plain data so the visible accordion and the FAQPage JSON-LD share one source.
export type FaqPart =
  | string
  | { text: string; route: AppRoute; options?: LocalizedHrefOptions }
  | { text: string; whatsapp: 'general' | 'price' }
  | { size: string }

export type FaqParagraph = FaqPart[]

export type FaqItem = { id: FaqId; q: string; a: FaqParagraph[] }

export const faqItems: FaqItem[] = [
  {
    id: 'who',
    q: 'Who is Fabian PhiL?',
    a: [
      [
        'Fabian PhiL (Fabian Philandrianos) is a French contemporary pop artist based in Dubai, UAE. He creates original figurative and kinetic artworks on layered plexiglass, in which portraits and cultural icons combine colour, gaze and changing perspective.',
      ],
    ],
  },
  {
    id: 'based',
    q: 'Where is Fabian PhiL based?',
    a: [
      [
        'Fabian PhiL is a French contemporary pop artist based in Dubai, United Arab Emirates.',
      ],
    ],
  },
  {
    id: 'art',
    q: 'What kind of art does Fabian PhiL create?',
    a: [
      [
        'Fabian PhiL creates kinetic pop art on layered plexiglass, centred on portraits and cultural icons. Faces, expressive gazes, coloured glasses and provocative titles are recurring elements, across works such as Pop Glasses, Wanted, 100 USD bill triptychs, motorsport portraits and pandas set in zen landscapes.',
      ],
    ],
  },
  {
    id: 'kinetic',
    q: 'What is kinetic pop art in Fabian PhiL’s work?',
    a: [
      [
        'Fabian PhiL paints across multiple layers of transparent plexiglass. As the viewer moves, the layers shift in relation to one another, transforming the image with perspective. Pop imagery, colour and portraiture are combined with this physical movement, which is why his work is described as POP ART THAT MOVES.',
      ],
    ],
  },
  {
    id: 'movement',
    q: 'How do the artworks change as the viewer moves?',
    a: [
      [
        'Because each image is painted on separate transparent layers, lines, eyes, glasses and facial features shift against one another as you move from side to side. An expression can appear to realign or take on a different character from one viewpoint to the next. In some works, a colourful graphic background or light adds another dimension to the movement.',
      ],
    ],
  },
  {
    id: 'materials',
    q: 'What materials does Fabian PhiL use?',
    a: [
      [
        'Most works are painted in acrylic paint on two transparent acrylic (plexiglass) sheets. Depending on the work, Fabian also uses ink, silver mirror vinyl, print, collage or digital design printed on the acrylic, and some special works include LED light. The medium of each work is listed on its artwork page.',
      ],
    ],
  },
  {
    id: 'first-kinetic',
    q: 'What was Fabian PhiL’s first kinetic artwork?',
    a: [
      [
        { text: 'Blue Lady', route: 'artwork', options: { id: 13 } },
        ' (2011). Painting the Blue Lady twice, on two plexiglass sheets, Fabian discovered that vertical strokes created movement as the viewer moved around the work: the eyes seemed to follow, like the Mona Lisa. This became the foundation of his kinetic technique.',
      ],
    ],
  },
  {
    id: 'exhibited',
    q: 'Where has Fabian PhiL exhibited?',
    a: [
      [
        'Recent exhibitions include Beyond the Gaze at Alliance Française Dubai, alongside presentations at Noor Royal Gallery, DIFC Art Night and World Art Dubai. Photos and details are on the ',
        { text: 'Exhibitions', route: 'exhibitions' },
        ' page.',
      ],
    ],
  },
  {
    id: 'availability',
    q: 'Is this artwork available?',
    a: [
      [
        'Availability is indicated on each artwork page. For the latest availability of a specific work, contact Fabian directly via ',
        { text: 'WhatsApp', whatsapp: 'price' },
        ' or send a ',
        { text: 'Price Inquiry', route: 'price-inquiry' },
        '.',
      ],
    ],
  },
  {
    id: 'price',
    q: 'How can I request a price?',
    a: [
      [
        'Prices are available on request. Simply identify the artwork you are interested in through the ',
        { text: 'Price Inquiry', route: 'price-inquiry' },
        ' page or contact Fabian directly on ',
        { text: 'WhatsApp', whatsapp: 'price' },
        '.',
      ],
    ],
  },
  {
    id: 'buy',
    q: 'How can I buy an artwork by Fabian PhiL?',
    a: [
      [
        'Choose the artwork you are interested in, then contact Fabian directly on ',
        { text: 'WhatsApp', whatsapp: 'price' },
        ' or through the ',
        { text: 'Price Inquiry', route: 'price-inquiry' },
        ' page. All artworks are priced upon inquiry, and indicative price ranges by format are listed on the Price Inquiry page. You can also send a message through the ',
        { text: 'contact', route: 'contact' },
        ' page.',
      ],
    ],
  },
  {
    id: 'sizes',
    q: 'What sizes are available?',
    a: [
      [
        'Each artwork page includes the dimensions of the original work. Fabian works across a range of formats, mainly ',
        { size: '70 × 70' },
        ', ',
        { size: '70 × 90' },
        ', ',
        { size: '90 × 120' },
        ', ',
        { size: '120 × 120' },
        ' and triptychs of ',
        { size: '70 × 200' },
        '.',
      ],
      [
        'If you are looking for a particular size for your home or project, contact Fabian to discuss what may be possible.',
      ],
    ],
  },
  {
    id: 'galleries',
    q: 'Do you work with galleries and curators?',
    a: [
      [
        'Yes. Galleries and curators are welcome to contact Fabian regarding exhibitions, available works and curatorial opportunities. A price-free artist book/portfolio is available on request.',
      ],
      [
        'Recent exhibitions include Beyond the Gaze at Alliance Française Dubai, alongside presentations at Noor Royal Gallery, DIFC Art Night and World Art Dubai.',
      ],
    ],
  },
  {
    id: 'viewing',
    q: 'Where can I see Fabian PhiL’s artworks in Dubai?',
    a: [
      [
        'Current exhibitions and gallery presentations are listed on the ',
        { text: 'Exhibitions', route: 'exhibitions' },
        ' page. For other viewing enquiries, ',
        { text: 'contact the studio', route: 'contact' },
        ' directly.',
      ],
    ],
  },
  {
    id: 'artist-book',
    q: 'Can I request Fabian PhiL’s artist book?',
    a: [
      [
        'Yes. Galleries, curators and other art professionals can request the latest artist book directly from Fabian.',
      ],
    ],
  },
  {
    id: 'contact',
    q: 'How can I contact Fabian directly?',
    a: [
      [
        'For artwork, commission, collaboration or professional enquiries, the fastest way to reach Fabian is via ',
        { text: 'WhatsApp', whatsapp: 'general' },
        '.',
      ],
    ],
  },
  {
    id: 'commissions',
    q: 'Do you accept commissions?',
    a: [
      [
        'Yes. Fabian accepts selected commissions for private collectors and for interior, residential, hospitality and architectural projects. Each commission is developed within Fabian PhiL’s artistic language and discussed individually.',
      ],
    ],
  },
  {
    id: 'specific-space',
    q: 'Can an artwork be created for a specific space?',
    a: [
      [
        'Yes, this can be discussed as part of a commission or collaboration. Share the dimensions of the space, photographs or plans, and any relevant project information with Fabian to explore what may be possible.',
      ],
    ],
  },
  {
    id: 'commission-timing',
    q: 'How long does a commissioned artwork take?',
    a: [
      [
        'Timing depends on the size, complexity and requirements of the artwork. Contact Fabian with your project and desired timeframe to discuss feasibility and timing.',
      ],
    ],
  },
  {
    id: 'commission-cost',
    q: 'How much does a commissioned artwork cost?',
    a: [
      [
        'Commission pricing depends on the dimensions, complexity and requirements of the work. Contact Fabian for a proposal based on your project.',
      ],
    ],
  },
  {
    id: 'interior-designers',
    q: 'Do you work with interior designers and architects?',
    a: [
      [
        'Yes. Fabian welcomes selected collaborations with interior designers, architects and professionals working on distinctive residential and hospitality projects.',
      ],
    ],
  },
]

export const ARTIST_FAQ_IDS: FaqId[] = [
  'who',
  'based',
  'art',
  'kinetic',
  'movement',
  'materials',
  'first-kinetic',
  'exhibited',
]

export const WORK_FAQ_IDS: FaqId[] = faqItems
  .map((item) => item.id)
  .filter((id) => !ARTIST_FAQ_IDS.includes(id))

// Triptych dimensions are still unconfirmed, so the sizes answer stays out of the structured data.
export const FAQ_SCHEMA_EXCLUDED_IDS: FaqId[] = ['sizes']

export const faqItemsById = (ids: FaqId[]) =>
  ids.map((id) => faqItems.find((item) => item.id === id)).filter((item): item is FaqItem => Boolean(item))

const partText = (part: FaqPart) => (typeof part === 'string' ? part : 'size' in part ? `${part.size} cm` : part.text)

export const faqParagraphText = (paragraph: FaqParagraph) => paragraph.map(partText).join('')

export const faqAnswerText = (item: FaqItem) => item.a.map(faqParagraphText).join(' ')
