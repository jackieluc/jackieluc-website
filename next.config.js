/** @type {import('next').NextConfig} */

const { withPlausibleProxy } = require('next-plausible');

const nextConfig = withPlausibleProxy()({
  reactStrictMode: true,
  experimental: {
    newNextLinkBehavior: true,
  },
});

module.exports = nextConfig;
