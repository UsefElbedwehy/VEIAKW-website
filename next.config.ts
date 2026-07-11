import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Default (75) plus a higher tier for hero/banner photography where
    // compression artifacts are more visible at full-bleed sizes.
    qualities: [75, 92],
    // Allow our own placeholder SVGs (trusted, first-party) through next/image.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Allow Supabase Storage + common CDNs. Extend via config, not code changes,
    // by adding hostnames to NEXT_PUBLIC_IMAGE_HOSTS (comma separated).
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      ...(process.env.NEXT_PUBLIC_IMAGE_HOSTS ?? "")
        .split(",")
        .map((h) => h.trim())
        .filter(Boolean)
        .map((hostname) => ({ protocol: "https" as const, hostname })),
    ],
  },
  typedRoutes: true,
};

export default withNextIntl(nextConfig);
