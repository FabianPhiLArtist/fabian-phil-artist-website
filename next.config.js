const mediaRedirects = require('./media-redirects')
const exhibitionMediaRedirects = require('./exhibition-media-redirects')

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [...mediaRedirects, ...exhibitionMediaRedirects]
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
