// Canonical artwork URL slugs from the Phase 2 SEO spreadsheet, matched to artworks by title.
// Keys are artwork IDs from artworks.ts. The old numeric URLs (/en/artwork/{id}) 301-redirect to these
// slugs in middleware, so a slug must never change once published without adding a redirect for it.
export const artworkSlugs: Record<number, string> = {
  1: 'steve-mcqueen-mugshot-pop-art', // Wanted for Racing Life
  2: 'brad-pitt-fight-club-mugshot-pop-art', // Wanted for Fight Club
  3: 'woody-allen-mugshot-pop-art', // Wanted $$Reward$$
  4: 'charles-leclerc-monaco-mugshot-pop-art', // Wanted for Racing in Monaco
  5: 'mick-jagger-rollingstones-usd-pop-art', // 100 USD Mick Jagger
  6: 'andy-warhol-pop-art', // 100 USD Andy Warhol
  7: 'old-man-in-peace-kinetic-art', // Old Man in Peace
  8: 'i-am-the-last-samurai-kinetic-art', // I am the Last Samurai
  9: 'sheikh-zayed-pop-art', // I have a Dream
  10: 'amanda-seyfried-pop-art', // Why…?
  11: 'twiggy-pop-art', // Oh Dear
  12: 'ooh-signature-kinetic-pop-art', // Ooh!
  13: 'blue-lady-african-kinetic-pop-art', // Blue Lady
  14: 'keith-richards-rollingstones-pop-art', // The Last One!
  15: 'kate-upton-pop-art', // Wanted for Loving Art
  16: 'angelina-jolie-pop-art', // Wanted for Being Too Smart
  17: 'gigi-hadid-top-model-pop-art', // Wanted for Fashion Crimes
  18: 'wanted-smoking-rock-star-pop-art', // Wanted Smoking Rock Star
  19: 'emma-stone-pop-art', // Wow… I Look Good in Green
  20: 'thats-the-way-i-like-it-pop-art', // That's the Way I Like it
  21: 'maybe-i-will-see-him-pop-art', // Maybe I will See Him
  22: 'laetitia-casta-pop-art', // Hi… What's your Number?
  23: 'beyonce-blue-pop-art', // Wanted for Stealing the Blues
  24: 'you-call-this-art-pop-art', // You Call This Art…?
  25: 'panda-pop-art-dealer', // Wanted Panda PopArt Dealer
  26: 'clint-eastwood-toon-knockout-pop-art', // Wanted for Toon KnockOut
  27: 'brigitte-bardot-pop-art', // Fame or Peace
  28: 'panda-zen-artist', // Wanted Panda Zen Artist
  29: 'panda-yin-yang-snow-mountain-pop-art', // Wanted Panda Yin & Yang Fan
  30: 'clint-eastwood-boxing-toon-pop-art', // Wanted Million Dollar Toon Fight
  31: 'charles-leclerc-monza-f1-pop-art', // Wanted for Speeding in Monza
  32: 'ayrton-senna-f1-toon-pop-art', // Wanted Ayrton vs Toons Racing
  33: 'claudia-schiffer-fashion-pop-art', // Runaway Mood
  34: 'lucy-liu-angel-pop-art', // Wanted Fashion Police Angel
}

// Slug for a legacy numeric artwork ID ("12" or 12); undefined for anything else, including slugs.
export function slugForLegacyArtworkId(id: string | number): string | undefined {
  const value = String(id)
  return /^[1-9]\d*$/.test(value) ? artworkSlugs[Number(value)] : undefined
}
