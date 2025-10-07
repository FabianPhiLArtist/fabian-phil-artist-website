export interface Artwork {
  id: number
  title: string
  series: string
  image: string
  video?: string
  qrCode?: string
  year: string
  medium: string
  size: string
  price: string
  description: string
  available: boolean
  isVideo?: boolean
  category: 'mugshot' | 'luminous-vision' | 'panda-pop' | 'moving-hair' | '100-usd' | 'expressive-emotion' | 'digital-fusion' | 'emotional' | 'pop-art' | 'abstract'
}

export const artworks: Artwork[] = [
  // Mugshot Collection (4 artworks)
  {
    id: 1,
    title: "Wanted for Racing Life",
    series: "Mugshot Collection",
    image: "/images/artworks/Fabian PhiL Wanted for Racing Life 2024 B&W.jpg",
    year: "2024",
    medium: "Acrylic paint and silver mirror vinyl on two acrylic sheets, with LED",
    size: "70x70cm",
    price: "€18,000",
    description: "A powerful statement on the high-speed lifestyle and risks of racing culture. Features LED lighting that enhances the dramatic effect of this wanted poster.",
    available: true,
    category: 'mugshot',
    isVideo: true
  },
  {
    id: 2,
    title: "Wanted for Fight Club",
    series: "Mugshot Collection",
    image: "/images/artworks/Fabian PhiL_Wanted for Fight Club_2024_18000ead.jpg",
    year: "2024",
    medium: "Acrylic paint and ink on two acrylic sheets",
    size: "70x70cm",
    price: "€18,000",
    description: "Exploring themes of rebellion, underground culture, and the fight against conformity through the lens of a wanted poster.",
    available: true,
    category: 'mugshot',
    isVideo: true
  },
  {
    id: 3,
    title: "Wanted $$Reward$$",
    series: "Mugshot Collection",
    image: "/images/artworks/Fabian PhiL_Wanted $$Reward$$_2023_18000aed.jpg",
    year: "2023",
    medium: "Acrylic paint on two acrylic sheets",
    size: "70x70cm",
    price: "€18,000",
    description: "A commentary on the commodification of crime and the reward system in society, exploring themes of value and justice.",
    available: true,
    category: 'mugshot',
    isVideo: true
  },
  {
    id: 4,
    title: "Wanted for Racing in Monaco",
    series: "Mugshot Collection",
    image: "/images/artworks/Fabian PhiL_WAnted for Racing in Monaco_2024.jpg",
    year: "2024",
    medium: "Acrylic paint on two acrylic sheets",
    size: "70x70cm",
    price: "€18,000",
    description: "Created after the Monaco Grand Prix 2024, this piece captures the glamour and danger of Formula 1 racing in the most prestigious location.",
    available: true,
    category: 'mugshot',
    isVideo: true
  },
  {
    id: 5,
    title: "Wanted for Being Too Smart",
    series: "Pop glasses Collection",
    image: "/images/artworks/Fabian PhiL_Wanted for Being Too Smart_2023_18000aed.jpg",
    year: "2023",
    medium: "Acrylic paint and ink on two acrylic sheets",
    size: "70x70cm",
    price: "€18,000",
    description: "A commentary on intellectualism with fluorescent glasses that glow in the dark. The luminous effect adds an otherworldly quality to this wanted poster, emphasizing the brilliance of being ahead of one's time.",
    available: true,
    category: 'luminous-vision',
    isVideo: true
  },
  {
    id: 5,
    title: "Wanted for Fashion Crimes",
    series: "Pop glasses Collection",
    image: "/images/artworks/Fabian PhiL_Wanted for Fashion Crimes_2023_18000aed.jpg",
    year: "2023",
    medium: "Acrylic paint and ink on two acrylic sheets",
    size: "70x70cm",
    price: "€18,000",
    description: "Exploring the intersection of fashion, art, and social commentary with glowing fluorescent glasses. The luminous effect creates a striking visual impact that draws attention to the fashion statement.",
    available: true,
    category: 'luminous-vision',
    isVideo: true
  },
  {
    id: 6,
    title: "Wanted for Fight Club",
    series: "Mugshot Collection",
    image: "/images/artworks/Fabian PhiL_Wanted for Fight Club_2024_18000ead.jpg",
    year: "2024",
    medium: "Mixed Media on Canvas",
    size: "100x120cm",
    price: "€18,000",
    description: "A reference to the cult classic, exploring themes of rebellion and identity.",
    available: true,
    category: 'mugshot'
  },
  {
    id: 7,
    title: "Wanted for Loving Art",
    series: "Mugshot Collection",
    image: "/images/artworks/Fabian PhiL_Wanted for Loving Art_2023_18000aed.jpg",
    year: "2023",
    medium: "Mixed Media on Canvas",
    size: "100x120cm",
    price: "€18,000",
    description: "A meta-commentary on the art world and the passion that drives artists.",
    available: true,
    category: 'mugshot'
  },
  {
    id: 8,
    title: "Wanted for Racing in Monaco",
    series: "Mugshot Collection",
    image: "/images/artworks/Fabian PhiL_WAnted for Racing in Monaco_2024.jpg",
    year: "2024",
    medium: "Mixed Media on Canvas",
    size: "100x120cm",
    price: "€18,000",
    description: "Capturing the glamour and danger of Formula 1 racing in Monaco.",
    available: true,
    category: 'mugshot'
  },
  {
    id: 9,
    title: "Wanted for Toon KO",
    series: "Mugshot Collection",
    image: "/images/artworks/Fabian PhiL_Wanted for Toon KO_2024.jpg",
    year: "2024",
    medium: "Mixed Media on Canvas",
    size: "100x120cm",
    price: "€18,000",
    description: "A playful take on cartoon violence and pop culture references.",
    available: true,
    category: 'mugshot'
  },
  {
    id: 10,
    title: "Wanted $$Reward$$",
    series: "Mugshot Collection",
    image: "/images/artworks/Fabian PhiL_Wanted $$Reward$$_2023_18000aed.jpg",
    year: "2023",
    medium: "Mixed Media on Canvas",
    size: "100x120cm",
    price: "€18,000",
    description: "Exploring themes of value, reward, and what society considers worthy of pursuit.",
    available: true,
    category: 'mugshot'
  },

  // 100 USD Bill Collection
  {
    id: 11,
    title: "100 USD Mick Jagger",
    series: "100 USD Bill Collection",
    image: "/images/artworks/Fabian PhiL_100USD Mick Jagger_2022_54000aed.jpg",
    year: "2022",
    medium: "Tryptic. Acrylic paint on two acrylic sheets",
    size: "70x180cm",
    price: "€54,000",
    description: "A revolutionary tryptic representing a 100 USD bill with Mick Jagger as the central figure. The three-panel format mimics the structure of currency, with Jagger's iconic image replacing the traditional portrait, creating a powerful statement about fame, value, and artistic legacy.",
    available: true,
    category: '100-usd',
    isVideo: true
  },
  {
    id: 25,
    title: "100 USD Andy Warhol",
    series: "100 USD Bill Collection",
    image: "/images/artworks/Fabian PhiL Andy Warhol 100 USD Bill 2017.png",
    year: "2017",
    medium: "Tryptic. Acrylic paint on two acrylic sheets",
    size: "70x180cm",
    price: "€54,000",
    description: "A groundbreaking tryptic representing a 100 USD bill with Andy Warhol as the central figure. This piece pays homage to the pop art master while literally placing him in the position of monetary value, creating a meta-commentary on art, commerce, and cultural worth.",
    available: true,
    category: '100-usd',
    isVideo: true
  },

  // Moving Hair Collection (Kinetic Art)
  {
    id: 12,
    title: "Old Man in Peace",
    series: "Moving Hair Collection",
    image: "/images/artworks/Fabian PhiL_Old Man in Peace_2020_72400aed Copyright.jpg",
    year: "2020",
    medium: "Acrylic paint on two acrylic sheets",
    size: "120x90cm",
    price: "€72,400",
    description: "A contemplative portrait exploring themes of wisdom, age, and inner peace. The moving hair creates a dynamic, living element that brings the artwork to life.",
    available: true,
    category: 'moving-hair',
    isVideo: true
  },
  {
    id: 13,
    title: "I am the Last Samurai",
    series: "Moving Hair Collection",
    image: "/images/artworks/Fabian PhiL_I am the Last Samurai_2024_72400aed.jpg",
    year: "2024",
    medium: "Acrylic paint and ink on two acrylic sheets",
    size: "110x110cm",
    price: "€72,400",
    description: "A powerful portrait exploring themes of honor, tradition, and modern identity. The kinetic hair movement adds a dynamic element that enhances the samurai's presence.",
    available: true,
    category: 'moving-hair',
    isVideo: true
  },

  // Expressive Emotion Collection - Eyes That Follow You
  {
    id: 14,
    title: "I have a Dream",
    series: "Expressive Emotion Collection",
    image: "/images/artworks/Fabian PhiL_I have a Dream_2018_58000aed 2.jpg",
    year: "2018",
    medium: "Acrylic paint and silver mirror vinyl on two acrylic sheets",
    size: "90x120cm",
    price: "€58,000",
    description: "A tribute to Martin Luther King Jr. with eyes that follow you as you move. The silver mirror vinyl creates an optical illusion that makes the portrait's gaze track your movement, creating an emotional connection that transcends the piece.",
    available: true,
    category: 'expressive-emotion',
    isVideo: true
  },
  {
    id: 15,
    title: "Why…?",
    series: "Expressive Emotion Collection",
    image: "/images/artworks/Fabian PhiL_Why_2021_72000aed.jpg",
    year: "2021",
    medium: "Acrylic paint on two acrylic sheets",
    size: "120x120cm",
    price: "€72,000",
    description: "An existential exploration with eyes that follow you around the room. The square format intensifies the emotional impact as the questioning gaze tracks your every movement, creating a profound sense of being watched and understood.",
    available: true,
    category: 'expressive-emotion',
    isVideo: true
  },
  {
    id: 16,
    title: "Oh Dear",
    series: "Expressive Emotion Collection",
    image: "/images/artworks/Fabian PhiL_Oh Dear_2018_45000aed Copyright.jpg",
    year: "2018",
    medium: "Acrylic paint on two acrylic sheets",
    size: "90x120cm",
    price: "€45,000",
    description: "A humorous expression of surprise with eyes that follow you. The optical illusion creates a sense of shared experience as the portrait's eyes track your movement, making you feel like you're part of the emotional moment.",
    available: true,
    category: 'expressive-emotion',
    isVideo: true
  },
  {
    id: 17,
    title: "Ooh!",
    series: "Expressive Emotion Collection",
    image: "/images/artworks/Fabian PhiL_Ooh_2020_45000aed Copyright.jpg",
    year: "2020",
    medium: "Acrylic paint on two acrylic sheets",
    size: "90x120cm",
    price: "€45,000",
    description: "An expression of surprise and delight with eyes that follow you. The optical illusion creates an intimate connection as the portrait's gaze tracks your movement, sharing in the joy of discovery.",
    available: true,
    category: 'expressive-emotion',
    isVideo: true
  },
  {
    id: 26,
    title: "Blue Lady",
    series: "Expressive Emotion Collection",
    image: "/images/artworks/Fabian Phil_Blue Lady 2013_37000aed.jpg",
    year: "2011",
    medium: "Acrylic paint on two acrylic sheets",
    size: "90x120cm",
    price: "€37,000",
    description: "An early work in the Big Formats series with eyes that follow you. The blue tones create a contemplative mood while the optical illusion makes the portrait's gaze track your movement, creating a sense of connection and understanding.",
    available: true,
    category: 'expressive-emotion',
    isVideo: true
  },
  {
    id: 27,
    title: "The Last One!",
    series: "Expressive Emotion Collection",
    image: "/images/artworks/Fabian PhiL The Last One 2017.jpg",
    year: "2017",
    medium: "Acrylic paint on two acrylic sheets",
    size: "120x90cm",
    price: "€22,000",
    description: "A contemplative piece about endings with eyes that follow you. The optical illusion creates a profound sense of finality as the portrait's gaze tracks your movement, making you feel like you're witnessing something significant.",
    available: true,
    category: 'expressive-emotion',
    isVideo: true
  },

  // Pop glasses Collection - Fluorescent Glasses
  {
    id: 19,
    title: "Wanted for Loving Art",
    series: "Pop glasses Collection",
    image: "/images/artworks/Fabian PhiL_Wanted for Loving Art_2023_18000aed.jpg",
    year: "2023",
    medium: "Acrylic paint and ink on two acrylic sheets",
    size: "70x70cm",
    price: "€18,000",
    description: "A meta-commentary on the art world with fluorescent glasses that glow in the dark. The luminous effect illuminates the passion that drives artists, creating a radiant celebration of artistic love.",
    available: true,
    category: 'luminous-vision',
    isVideo: true
  },
  {
    id: 20,
    title: "Wanted for Being Too Smart",
    series: "Pop glasses Collection",
    image: "/images/artworks/Fabian PhiL_Wanted for Being Too Smart_2023_18000aed.jpg",
    year: "2023",
    medium: "Acrylic paint and ink on two acrylic sheets",
    size: "70x70cm",
    price: "€18,000",
    description: "A commentary on intellectualism with fluorescent glasses that glow in the dark. The luminous effect adds an otherworldly quality to this wanted poster, emphasizing the brilliance of being ahead of one's time.",
    available: true,
    category: 'luminous-vision',
    isVideo: true
  },
  {
    id: 21,
    title: "Wanted for Fashion Crimes",
    series: "Pop glasses Collection",
    image: "/images/artworks/Fabian PhiL_Wanted for Fashion Crimes_2023_18000aed.jpg",
    year: "2023",
    medium: "Acrylic paint and ink on two acrylic sheets",
    size: "70x70cm",
    price: "€18,000",
    description: "Exploring the intersection of fashion, art, and social commentary with glowing fluorescent glasses. The luminous effect creates a striking visual impact that draws attention to the fashion statement.",
    available: true,
    category: 'luminous-vision',
    isVideo: true
  },
  {
    id: 22,
    title: "Wanted Smoking Rock Star",
    series: "Pop glasses Collection",
    image: "/images/artworks/Fabian PhiL_Wanted Smoking Rock Star_2024_18000aed_progress.jpg",
    year: "2024",
    medium: "Acrylic paint and ink on two acrylic sheets",
    size: "70x70cm",
    price: "€18,000",
    description: "A tribute to rock star culture with glowing fluorescent glasses. The luminous effect captures the electric energy and rebellious spirit of rock and roll, making the portrait literally glow with attitude.",
    available: true,
    category: 'luminous-vision',
    isVideo: true
  },
  {
    id: 23,
    title: "Wow… I Look Good in Green",
    series: "Pop glasses Collection",
    image: "/images/artworks/Fabian PhiL_Wow I look Good in Green_2020_18000aed.jpg",
    year: "2020",
    medium: "Acrylic paint on two acrylic sheets",
    size: "70x70cm",
    price: "€18,000",
    description: "A celebration of self-confidence with fluorescent glasses that glow in green. The luminous effect enhances the joy of self-expression, making the portrait literally radiate with confidence and style.",
    available: true,
    category: 'luminous-vision',
    isVideo: true
  },
  {
    id: 24,
    title: "That's the Way I Like it",
    series: "Pop glasses Collection",
    image: "/images/artworks/Fabian PhiL_That's the way I like it_2019_18000aed.jpg",
    year: "2019",
    medium: "Acrylic paint on two acrylic sheets",
    size: "70x70cm",
    price: "€18,000",
    description: "A celebration of personal preference with glowing fluorescent glasses. The luminous effect illuminates individual taste and personal style, creating a radiant expression of self-identity.",
    available: true,
    category: 'luminous-vision',
    isVideo: true
  },
  {
    id: 33,
    title: "Maybe I will See Him",
    series: "Pop glasses Collection",
    image: "/images/artworks/Fabian PhiL Maybe I Will See Him 2018.jpg",
    year: "2018",
    medium: "Acrylic paint on two acrylic sheets",
    size: "60x60cm",
    price: "€18,000",
    description: "An abstract exploration of anticipation with fluorescent glasses that glow in the dark. The luminous effect creates an otherworldly sense of hope and mystery, illuminating the unknown.",
    available: true,
    category: 'luminous-vision',
    isVideo: true
  },
  {
    id: 26,
    title: "Hi… What's your Number?",
    series: "Pop glasses Collection",
    image: "/images/artworks/Fabian PhiL_Hi Whats your Number_2019_18000aed.jpg",
    year: "2019",
    medium: "Acrylic paint on two acrylic sheets",
    size: "70x70cm",
    price: "€18,000",
    description: "A playful exploration of modern communication with glowing fluorescent glasses. The luminous effect captures the electric energy of social interaction and digital connection.",
    available: true,
    category: 'luminous-vision',
    isVideo: true
  },
  {
    id: 27,
    title: "Wanted for Stealing the Blues",
    series: "Pop glasses Collection",
    image: "/images/artworks/Fabian PhiL Wanted for Stealing the Blues 2024.jpg",
    year: "2024",
    medium: "Acrylic paint on two acrylic sheets",
    size: "70x70cm",
    price: "€18,000",
    description: "Exploring themes of cultural appropriation with fluorescent glasses that glow in the dark. The luminous effect illuminates the complex relationship between artistic expression and cultural identity.",
    available: true,
    category: 'luminous-vision',
    isVideo: true
  },
  {
    id: 28,
    title: "You Call This Art…?",
    series: "Pop glasses Collection",
    image: "/images/artworks/Fabian PhiL You Call This Art 2024.png",
    year: "2024",
    medium: "Paints, print and collage on two acrylic sheets",
    size: "70x70cm",
    price: "€18,000",
    description: "A meta-commentary on art criticism with fluorescent glasses that glow in the dark. The luminous effect illuminates the subjective nature of artistic value and the questioning of what constitutes art.",
    available: true,
    category: 'luminous-vision',
    isVideo: true
  },

  // Panda Pop Collection - Charming Mixed Media
  {
    id: 29,
    title: "Wanted Panda PopArt Dealer",
    series: "Panda Pop Collection",
    image: "/images/artworks/Fabian Phil Wanted Panda Popart Dealer 2025 5.jpg",
    year: "2025",
    medium: "Paints, digital design printed on two acrylic sheets",
    size: "70x70cm",
    price: "€18,000",
    description: "A charming mixed media piece featuring a panda in a wanted poster format. Digital design printed on acrylic sheets is enhanced with traditional painting techniques, creating a playful yet thought-provoking commentary on art dealing and the commercialization of creativity.",
    available: true,
    category: 'panda-pop',
    isVideo: true
  },

  // Digital Design Collection - Mixed Media Innovation
  {
    id: 30,
    title: "Wanted for Toon KnockOut",
    series: "Digital Design Collection",
    image: "/images/artworks/Fabian PhiL_Wanted for Toon KO_2024.jpg",
    year: "2024",
    medium: "Digital design printed on two acrylic sheets",
    size: "70x70cm",
    price: "€18,000",
    description: "A revolutionary mixed media piece featuring cartoon boxing with Clint Eastwood. Digital design is printed on acrylic sheets, then enhanced with traditional painting techniques and collage elements, creating a unique fusion of digital and analog art.",
    available: true,
    category: 'digital-fusion',
    isVideo: true
  },
  {
    id: 31,
    title: "Fame or Peace",
    series: "Digital Design Collection",
    image: "/images/artworks/Fabian PhiL Fame or Peace 2024.png",
    year: "2024",
    medium: "Digital design printed on two acrylic sheets",
    size: "100x70cm",
    price: "€18,000",
    description: "An exploration of the eternal choice between fame and inner peace. Digital design printed on acrylic sheets is enhanced with traditional painting techniques, creating a contemplative piece that questions the price of success and the value of tranquility.",
    available: true,
    category: 'digital-fusion',
    isVideo: true
  },

  // Abstract Series
  {
    id: 32,
    title: "The Last One",
    series: "Abstract Series",
    image: "/images/artworks/Fabian PhiL The Last One 2017.jpg",
    year: "2017",
    medium: "Mixed Media on Canvas",
    size: "100x120cm",
    price: "€22,000",
    description: "A contemplative piece about endings, finality, and what remains.",
    available: true,
    category: 'abstract'
  }
]

export const series = [
  { name: 'Mugshot Collection', count: 4, category: 'mugshot' },
  { name: 'Pop glasses Collection', count: 10, category: 'luminous-vision' },
  { name: 'Expressive Emotion Collection', count: 6, category: 'expressive-emotion' },
  { name: 'Panda Pop Collection', count: 1, category: 'panda-pop' },
  { name: 'Digital Design Collection', count: 2, category: 'digital-fusion' },
  { name: 'Moving Hair Collection', count: 2, category: 'moving-hair' },
  { name: '100 USD Bill Collection', count: 2, category: '100-usd' },
  { name: 'Abstract Series', count: 1, category: 'abstract' }
]