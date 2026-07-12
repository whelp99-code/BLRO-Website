import type { NextConfig } from "next"

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  turbopack: {
    root: process.cwd(),
  },
} satisfies NextConfig

export default nextConfig
