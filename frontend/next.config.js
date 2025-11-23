/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // Vercel için optimize edilmiş ayarlar
  images: {
    unoptimized: false,
  },
}

module.exports = nextConfig

