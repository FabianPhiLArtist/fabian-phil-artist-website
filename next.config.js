const mediaRedirects = require('./media-redirects')
const exhibitionMediaRedirects = require('./exhibition-media-redirects')

// Retired legacy pages; these run before middleware so unprefixed paths skip the /en/* hop.
const retiredPageRedirects = [
  '/en/cv',
  '/cv',
  '/en/artist-statement',
  '/artist-statement',
  '/en/collectors',
  '/collectors',
].map((source) => ({
  source,
  destination: '/en/about',
  statusCode: 301,
}))

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [...retiredPageRedirects, ...mediaRedirects, ...exhibitionMediaRedirects]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
}

module.exports = nextConfig
