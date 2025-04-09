import { clsx, type ClassValue } from "clsx"
import type { NextConfig } from "next"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// next.config.ts
export const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["localhost"],
  },
  experimental: {
    appDir: true,
  },
};
