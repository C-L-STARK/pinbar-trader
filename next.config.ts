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
  // Disable barrel file optimization for problematic packages
  experimental: {
    optimizePackageImports: ['recharts'],
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
  // Tell Next.js these packages use native Node.js modules
  // and should not be bundled by webpack
  serverExternalPackages: ['technicalindicators', 'binance-api-node', 'uuid'],
};

export default nextConfig;
