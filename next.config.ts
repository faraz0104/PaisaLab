import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Trailing slashes for clean SEO URLs (/sip-calculator/ not /sip-calculator)
  trailingSlash: true,

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },

  // Compress responses
  compress: true,

  // Power by header removal
  poweredByHeader: false,
};

export default nextConfig;
