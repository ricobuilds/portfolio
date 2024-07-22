/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['next-mdx-remote'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'pbs.twimg.com' }
    ],
    // domains: [
    //   "vercel-og-nextjs-six.vercel.app",
    //   "lh3.googleusercontent.com",
    //   "ph-avatars.imgix.net",
    //   "media.beehiiv.com",
    //   "enrictrillo.com",
    //   "cdn.sanity.io",
    //   "github.com",
    //   "xsgames.co",
    //   "localhost"
    // ]
  },
};

module.exports = nextConfig