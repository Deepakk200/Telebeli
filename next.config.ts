import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    // next/image serves modern formats; add remotePatterns here if remote
    // imagery is introduced later.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
