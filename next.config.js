/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      '/blog/[path]': ['node_modules/shiki/**/*'],
    },
  }
};

module.exports = nextConfig;