import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Een losse server (.next/standalone) voor de Docker-image in Coolify, zonder de volledige node_modules.
  output: "standalone",
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;
