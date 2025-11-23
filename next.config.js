/** @type {import('next').NextConfig} */
const isWindows = process.platform === "win32"
const isVercel = !!process.env.VERCEL
const path = require("path")
const rootDir = path.resolve(__dirname).replace(/\\/g, "/")
const nextConfig = {
  distDir: "build",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === "production" ? "" : "",
  basePath: "",
  typescript: {
    ignoreBuildErrors: true,
  },
  // Force cache busting
  generateBuildId: async () => {
    return `build-${Date.now()}`
  },
  
  
}

module.exports = nextConfig
