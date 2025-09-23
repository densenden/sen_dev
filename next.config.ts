import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['via.placeholder.com', 'qrnzasjjubparpljaibc.supabase.co'],
  },
  serverExternalPackages: ['@react-pdf/renderer', '@react-pdf/fontkit'],
};

export default nextConfig;
