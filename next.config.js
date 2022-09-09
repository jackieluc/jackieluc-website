const { withPlausibleProxy } = require('next-plausible');

/** @type {import('next').NextConfig} */
const nextConfig = withPlausibleProxy()({
  swcMinify: true,
  reactStrictMode: true,
  experimental: {
    newNextLinkBehavior: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'unsplash.com' },
    ],
  },
});

module.exports = nextConfig;
