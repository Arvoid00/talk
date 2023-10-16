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
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/talk',
        basePath: false,
        permanent: false
      },
      {
        source: '/sign-in',
        destination: '/talk/sign-in',
        basePath: false,
        permanent: false
      }
    ]
  }
}
