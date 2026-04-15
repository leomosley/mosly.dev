import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: {
    blog: {
      stale: 3600,
      revalidate: 86400,
      expire: 604800,
    },
    default: {
      stale: 3600,
      revalidate: 86400,
    },
  },
};

export default nextConfig;
