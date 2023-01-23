/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [process.env.POCKETBASE_API_DOMAIN],
  },
};

module.exports = nextConfig;
