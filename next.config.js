/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "vercel-og-nextjs-six.vercel.app",
      "lh3.googleusercontent.com",
      "ph-avatars.imgix.net",
      "media.beehiiv.com",
      "enrictrillo.com",
      "cdn.sanity.io",
      "pbs.twimg.com",
      "github.com",
      "xsgames.co",
      "localhost"
    ]
  },
};

module.exports = (nextConfig);