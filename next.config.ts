import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'qrnzasjjubparpljaibc.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  outputFileTracingIncludes: {
    '/api/pdf/*': [
      './src/lib/pdf/fonts/**/*',
      './scripts/render-pdf.cjs',
      './src/lib/pdf/**/*',
    ],
  },
  serverExternalPackages: [
    '@react-pdf/renderer',
    '@react-pdf/fontkit',
    '@react-pdf/layout',
    '@react-pdf/pdfkit',
    '@react-pdf/primitives',
    '@react-pdf/fns',
    '@react-pdf/stylesheet',
    '@react-pdf/textkit',
    '@react-pdf/image',
  ],
};

export default nextConfig;
