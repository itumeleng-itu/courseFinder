/** @type {import('next').NextConfig} */
const isWindows = process.platform === "win32"
const isVercel = !!process.env.VERCEL
const nextConfig = {
  // Use a custom build directory locally on Windows only; keep default on Vercel
  ...(isWindows && !isVercel ? { distDir: "build" } : {}),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === "production" ? "" : "",
  basePath: "",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Force cache busting
  generateBuildId: async () => {
    return `build-${Date.now()}`
  },
}

module.exports = nextConfig
