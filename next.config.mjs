/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // the API gives us images hosted on img.magnific.com, next/image needs
    // this whitelisted or it just refuses to load them
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.magnific.com",
      },
    ],
  },
};

export default nextConfig;
