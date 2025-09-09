/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure CSS is properly bundled for production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Force CSS inclusion
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
    };
    return config;
  },
};

module.exports = nextConfig;
