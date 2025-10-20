import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "api.microlink.io"
      },
      {
        hostname: "qingwuwei.github.io"
      }
    ]
  },
  // Configure webpack to properly handle third-party packages
  webpack: (config, { isServer }) => {
    // Add fallback for modules that might not be available in browser
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
    };

    // Ensure proper module resolution
    config.resolve.extensions = ['.ts', '.tsx', '.js', '.jsx', '.json'];

    // Don't externalize these packages - let webpack bundle them
    config.resolve.alias = {
      ...config.resolve.alias,
    };

    return config;
  },
};

export default nextConfig;
