const { withPlausibleProxy } = require('next-plausible');

/** @type {import('next').NextConfig} */
const nextConfig = withPlausibleProxy()({
  reactStrictMode: true,
  experimental: {
    newNextLinkBehavior: true,
  },
});

module.exports = nextConfig;
