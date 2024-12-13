import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/quotes',
        destination: 'https://zenquotes.io/api/quotes', // Proxy to External API
      },
    ];
  },
};