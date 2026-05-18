import type { MetadataRoute } from "next";
import { ALL_CALCULATORS, SITE_URL_CONST } from "@/lib/seo";

const LEARN_SLUGS = [
  "sip-to-become-crorepati",
  "old-vs-new-tax-regime-fy-2025-26",
  "hra-exemption-complete-guide",
  "home-loan-vs-sip",
  "ppf-vs-nps-vs-elss",
  "ctc-to-in-hand-salary-guide",
  "budget-2026-income-tax-changes",
];

const SIP_VARIANTS = [
  "5000-per-month-for-10-years",
  "5000-per-month-for-15-years",
  "5000-per-month-for-20-years",
  "10000-per-month-for-10-years",
  "10000-per-month-for-15-years",
  "10000-per-month-for-20-years",
  "10000-per-month-for-25-years",
  "15000-per-month-for-10-years",
  "15000-per-month-for-15-years",
  "20000-per-month-for-10-years",
  "20000-per-month-for-15-years",
  "20000-per-month-for-20-years",
  "25000-per-month-for-15-years",
  "25000-per-month-for-20-years",
  "50000-per-month-for-10-years",
  "50000-per-month-for-15-years",
  "50000-per-month-for-20-years",
  "100000-per-month-for-10-years",
];

const EMI_VARIANTS = [
  "10-lakh-home-loan",
  "20-lakh-home-loan",
  "30-lakh-home-loan",
  "40-lakh-home-loan",
  "50-lakh-home-loan",
  "60-lakh-home-loan",
  "75-lakh-home-loan",
  "1-crore-home-loan",
  "1-5-crore-home-loan",
  "2-crore-home-loan",
  "1-lakh-personal-loan",
  "2-lakh-personal-loan",
  "3-lakh-personal-loan",
  "5-lakh-personal-loan",
  "7-lakh-personal-loan",
  "10-lakh-personal-loan",
  "15-lakh-personal-loan",
  "20-lakh-personal-loan",
  "5-lakh-car-loan",
  "10-lakh-car-loan",
  "15-lakh-car-loan",
];

const FD_VARIANTS = [
  "sbi-1-lakh-for-1-year",
  "sbi-1-lakh-for-3-years",
  "sbi-1-lakh-for-5-years",
  "sbi-5-lakh-for-3-years",
  "sbi-10-lakh-for-5-years",
  "hdfc-1-lakh-for-1-year",
  "hdfc-1-lakh-for-3-years",
  "hdfc-5-lakh-for-3-years",
  "hdfc-10-lakh-for-5-years",
  "1-lakh-for-1-year",
  "1-lakh-for-2-years",
  "1-lakh-for-3-years",
  "1-lakh-for-5-years",
  "2-lakh-for-3-years",
  "5-lakh-for-3-years",
  "5-lakh-for-5-years",
  "10-lakh-for-3-years",
  "10-lakh-for-5-years",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const calculatorPages = ALL_CALCULATORS.map((calc) => ({
    url: `${SITE_URL_CONST}/${calc.slug}/`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const learnPages = [
    { url: `${SITE_URL_CONST}/learn/`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    ...LEARN_SLUGS.map((slug) => ({
      url: `${SITE_URL_CONST}/learn/${slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  const sipVariantPages = SIP_VARIANTS.map((v) => ({
    url: `${SITE_URL_CONST}/sip-calculator/${v}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const emiVariantPages = EMI_VARIANTS.map((v) => ({
    url: `${SITE_URL_CONST}/emi-calculator/${v}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const fdVariantPages = FD_VARIANTS.map((v) => ({
    url: `${SITE_URL_CONST}/fd-calculator/${v}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: `${SITE_URL_CONST}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...calculatorPages,
    ...learnPages,
    ...sipVariantPages,
    ...emiVariantPages,
    ...fdVariantPages,
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
