export const SITE_URL = 'https://fabianphil.com'

export const SITE_NAME = 'Fabian PhiL'

export const INSTAGRAM_URL = 'https://instagram.com/fabianphilartist'

export const FACEBOOK_URL = 'https://facebook.com/fabianphilartist'

export const absoluteUrl = (path: string) => new URL(encodeURI(path), SITE_URL).toString()

export const DEFAULT_SHARE_IMAGE = {
  url: '/images/artworks/angelina-jolie-pop-art-fabian-phil-interior.jpg',
  alt: 'Wanted for Being Too Smart, kinetic pop artwork by Fabian PhiL, staged in a contemporary interior',
}
