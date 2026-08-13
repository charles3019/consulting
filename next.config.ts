import type { NextConfig } from "next";

const rootDir = __dirname;

const nextConfig: NextConfig = {
  /* config options here */
  outputFileTracingRoot: rootDir,
  turbopack: {
    root: rootDir,
  },
};

export default nextConfig;
