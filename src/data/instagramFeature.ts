// Homepage "From the studio" Instagram feature.
// To keep a post or reel out of the homepage rotation, paste its URL
// (e.g. https://www.instagram.com/reel/ABC123xyz/) or its media ID here.
export const instagramFeatureExclusions: string[] = []

// Posts whose caption matches these words are preferred when rotating older posts.
export const instagramPreferredTopics =
  /\b(art|artwork|artworks|artist|painting|paintings|exhibition|gallery|studio|kinetic|plexiglass|popart|pop art|moves|movement|collector|collection|portrait|wanted)\b/i

// The feature changes every Monday at 06:00 UTC (10:00 in Dubai), matching the cron in vercel.json.
export const INSTAGRAM_FEATURE_EPOCH = Date.UTC(2026, 8, 28, 6, 0, 0)
export const INSTAGRAM_FEATURE_WEEK_MS = 7 * 24 * 60 * 60 * 1000
export const INSTAGRAM_FEATURE_CACHE_TAG = 'instagram-feature'
export const INSTAGRAM_FEATURE_REVALIDATE_SECONDS = 6 * 60 * 60
