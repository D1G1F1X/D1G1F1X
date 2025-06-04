/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['localhost', 'vercel.app', 'numoracle.com', 'v0.blob.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: '/tools/numerology-report',
        destination: '/tools/numerology-calculator',
        permanent: true,
      },
      {
        source: '/tools/numerology-report/:path*', // Catch any subpaths
        destination: '/tools/numerology-calculator',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
