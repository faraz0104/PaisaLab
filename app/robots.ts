import type { MetadataRoute } from "next";
import { SITE_URL_CONST } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${SITE_URL_CONST}/sitemap.xml`,
    host: SITE_URL_CONST,
  };
}
