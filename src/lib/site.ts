export const SITE_URL = 'https://fabianphil.com'

export const SITE_NAME = 'Fabian PhiL'

export const INSTAGRAM_URL = 'https://instagram.com/fabianphilartist'

export const FACEBOOK_URL = 'https://facebook.com/fabianphilartist'

export const absoluteUrl = (path: string) => new URL(encodeURI(path), SITE_URL).toString()

export const ARTIST_PORTRAIT = {
  url: '/images/artist/fabian-phil-french-pop-artist-dubai-portrait.jpg',
  alt: 'Fabian PhiL, French contemporary pop artist, in his Dubai studio',
  width: 1200,
  height: 1200,
}

export const DEFAULT_SHARE_IMAGE = ARTIST_PORTRAIT
