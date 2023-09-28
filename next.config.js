/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [process.env.POCKETBASE_API_DOMAIN],
  },
  experimental: {
    appDir: true,
  },
  eslint: {
    dirs: ["app", "components", "context", "hooks", "services", "utils"],
  },
};

module.exports = nextConfig;
