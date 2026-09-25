/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  // Allow product images from any external domain (alamtech.com.np, etc.)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },

  // Relax CSP so external images load in both <img> and SVG <image> tags
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "img-src * data: blob:;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

