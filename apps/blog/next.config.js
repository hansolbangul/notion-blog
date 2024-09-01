/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["@blog/notions"],
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
