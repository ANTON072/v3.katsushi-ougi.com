/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    WORDPRESS_URL: process.env.WORDPRESS_URL,
  },
};

module.exports = nextConfig;
