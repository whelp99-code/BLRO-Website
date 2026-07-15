import type { NextConfig } from "next"

const nextConfig = {
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  turbopack: {
    root: process.cwd(),
  },
} satisfies NextConfig

export default nextConfig
