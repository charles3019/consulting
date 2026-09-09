import type { NextConfig } from "next";

const rootDir = __dirname;

const nextConfig: NextConfig = {
  poweredByHeader: false,
  //allowedDevOrigins: ["192.168.250.93"],
  async redirects() {
    return [{
      source: "/:path*",
      has: [{ type: "host", value: "www.connectforge.co.uk" }],
      destination: "https://connectforge.co.uk/:path*",
      permanent: true,
    }];
  },
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ],
    }, ...["/admin/:path*", "/api/:path*"].map((source) => ({
      source,
      headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
    }))];
  },
  outputFileTracingRoot: rootDir,
  turbopack: {
    root: rootDir,
  },
};

export default nextConfig;
