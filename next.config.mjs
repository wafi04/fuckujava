/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "standalone",
  images: {
    remotePatterns: [
      {
        hostname: "vazzuniverse.id",
      },
      {
        hostname: "udatopup.com",
      },
      {
        hostname: "storage.udatopup.com",
      },
      {
        protocol: 'https',
        hostname: 'api.qrserver.com',
        pathname: '/v1/create-qr-code/**',
      },
      {
        hostname  : "digicodes.net",
      },
      {
        hostname: "client-cdn.bangjeff.com",
      },
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "www.veinstore.id",
      },
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "api.dicebear.com",
      },
      {
        hostname: "d1csarkz8obe9u.cloudfront.net",
      },
      {
        hostname: "play-lh.googleusercontent.com",
      },
      {
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
