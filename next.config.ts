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

    return config;
  },
  // Transpile these packages to ensure compatibility
  transpilePackages: ['technicalindicators', 'binance-api-node'],
  // Ensure server components can use these packages
  experimental: {
    serverComponentsExternalPackages: ['technicalindicators', 'binance-api-node', 'uuid'],
  },
};

export default nextConfig;
