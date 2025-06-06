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
  unoptimized: true,
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      port: '',
      pathname: '/**',
    },
    {
      protocol: 'https',
      hostname: 'img.youtube.com',
      port: '',
      pathname: '/**',
    }
  ],
  dangerouslyAllowSVG: true,
  contentDispositionType: 'attachment',
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
},
// experimental: {
//   serverActions: true,
// },
webpack: (config, { isServer }) => {
  // Fixes npm packages that depend on `fs` module
  if (!isServer) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
  }
  config.externals.push('sharp'); // Ensure sharp is treated as external

  return config;
},
}

export default nextConfig
