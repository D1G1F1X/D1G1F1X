/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  transpilePackages: ['@emotion/is-prop-valid'], // <-- THIS IS THE CRUCIAL LINE
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy.replace(/\n/g, ''),
          },
        ],
      },
    ];
  },
}

// IMPORTANT: This CSP is more secure than the debugging one.
// Adjust 'connect-src' and other directives as needed for your specific external services.
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://tally.so https://formsubmit.co;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https://blob.v0.dev;
  media-src 'self';
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self' https://formsubmit.co;
  frame-ancestors 'none';
  frame-src 'self' https://tally.so https://formsubmit.co;
  connect-src 'self' https://vitals.vercel-insights.com;
`;

export default nextConfig
