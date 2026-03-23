import type { MetadataRoute } from "next";
import { SEO_DEFAULTS } from "@libs/seo";

export const revalidate = 10800;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/api/og"],
      disallow: ["/api/revalidate", "/tool/barcode", "/tool/base64"],
    },
    sitemap: `${SEO_DEFAULTS.siteUrl}/sitemap.xml`,
    host: new URL(SEO_DEFAULTS.siteUrl).host,
  };
}
