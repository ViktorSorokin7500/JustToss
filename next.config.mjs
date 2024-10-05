/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.leafly.com",
      },
    ],
  },
};

export default nextConfig;
