/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  legacyBrowsers: false,
  experimental: {
    swcPlugins: [['@swc-jotai/react-refresh', {}]],
    serverActions: true
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [256, 512, 768, 1024, 1280, 1536],
    imageSizes: [128, 256, 384, 512, 640, 768, 1024, 1280, 1536],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com'
      }
    ],
  },
  poweredByHeader: true,
  productionBrowserSourceMaps: false,
  trailingSlash: false,
};
