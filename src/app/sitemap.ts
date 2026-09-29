import type { MetadataRoute } from 'next'
import { artworks } from '@/data/artworks'
import { SITE_URL } from '@/lib/site'

const staticPaths = [
  '/',
  '/gallery',
  '/about',
  '/artist-statement',
  '/cv',
  '/exhibitions',
  '/collectors',
  '/price-inquiry',
  '/contact',
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
  }))

  const artworkEntries: MetadataRoute.Sitemap = artworks.map((artwork) => ({
    url: new URL(`/artwork/${artwork.id}`, SITE_URL).toString(),
  }))

  return [...staticEntries, ...artworkEntries]
}
