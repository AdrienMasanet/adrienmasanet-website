/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [process.env.POCKETBASE_API_DOMAIN ?? ""],
  },
  eslint: {
    dirs: [
      "app",
      "components",
      "context",
      "hooks",
      "services",
      "utils",
      "testing",
    ],
  },
};

module.exports = nextConfig;
