/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/:lang/bolivia-2027',
        destination: '/:lang/salidas-grupales/bolivia-2027',
        permanent: true,
      },
      {
        source: '/:lang/destinos/:slug*',
        destination: '/:lang/destinations/:slug*',
        permanent: true,
      },
      {
        source: '/:lang/sobre-nosotros',
        destination: '/:lang/about',
        permanent: true,
      },
      {
        source: '/:lang/salidas-grupales',
        destination: '/:lang/expeditions',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
