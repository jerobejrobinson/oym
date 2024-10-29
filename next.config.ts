import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'schools.scsk12.org',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
