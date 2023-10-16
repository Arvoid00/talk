/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  basePath: '/talk',
  experimental: {
    serverActions: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com'
      }
    ]
  }
}
