import type { MetadataRoute } from "next";
import { ALL_CALCULATORS, SITE_URL_CONST } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const calculatorPages = ALL_CALCULATORS.map((calc) => ({
    url: `${SITE_URL_CONST}/${calc.slug}/`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: `${SITE_URL_CONST}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...calculatorPages,
    {
      url: `${SITE_URL_CONST}/about/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL_CONST}/contact/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL_CONST}/privacy-policy/`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
