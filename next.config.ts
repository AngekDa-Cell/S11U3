import type { NextConfig } from "next";

// next.config.ts
const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["localhost"],
  }
};

export default nextConfig;

