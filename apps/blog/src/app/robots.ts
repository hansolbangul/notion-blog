import type { MetadataRoute } from "next";
import { NOTION_REVALIDATE_SECONDS } from "@blog/notions/constants";
import { SEO_DEFAULTS } from "@libs/seo";

export const revalidate = NOTION_REVALIDATE_SECONDS;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/tool/barcode", "/tool/base64"],
    },
    sitemap: `${SEO_DEFAULTS.siteUrl}/sitemap.xml`,
    host: new URL(SEO_DEFAULTS.siteUrl).host,
  };
}
