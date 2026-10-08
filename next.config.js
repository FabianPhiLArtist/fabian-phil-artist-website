const exhibitionMediaRedirects = require('./exhibition-media-redirects')

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return exhibitionMediaRedirects
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
