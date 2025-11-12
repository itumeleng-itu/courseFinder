/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use a custom build directory to avoid OneDrive/.next lock issues on Windows
  distDir: "build",
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
