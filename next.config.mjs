/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['localhost', 'vercel.app', 'vercel.com', 'numoracle.com', 'v0.blob.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  trailingSlash: false,
  experimental: {
    // This allows dynamic routes to be statically generated
    // even if they use dynamic features like searchParams
    missingSuspenseWithCSRBailout: false,
  },
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
