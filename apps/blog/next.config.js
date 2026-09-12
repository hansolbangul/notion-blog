/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/sitemap-0.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "blog.hansolbangul.com" }],
        destination: "https://hansolbangul.com/:path*",
        permanent: true,
      },
    ];
  },
  outputFileTracingIncludes: {
    "/*": ["./.cache/notion-content-snapshot.json"],
  },
  transpilePackages: ["@blog/notions"],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
    };

    return config;
  },
  images: {
    domains: [
      "www.notion.so",
      "lh5.googleusercontent.com",
      "s3-us-west-2.amazonaws.com",
      "lh3.googleusercontent.com",
      "lh6.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
