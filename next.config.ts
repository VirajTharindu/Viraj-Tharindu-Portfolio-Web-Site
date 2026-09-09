import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    compress: true,

    allowedDevOrigins: [
        "http://localhost:3000",
        "http://[IP_ADDRESS]",
    ],

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    qualities: [75, 80],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },



    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    { key: "X-Frame-Options", value: "DENY" },
                    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                ],
            },
            {
                // Long-lived cache for static assets
                source: "/(.*)\\.(png|jpg|jpeg|webp|avif|svg|ico|mp4|webm|woff2|woff)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
