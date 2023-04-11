/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  experimental: {
    appDir: true,
    scrollRestoration: true,
  },
  images: {
    domains: ["www.notion.so", "s3-us-west-2.amazonaws.com"],
  },
};

module.exports = nextConfig;
