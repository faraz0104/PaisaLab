import type { Metadata } from "next";

const SITE_NAME = "PaisaLab";
const SITE_URL = "https://www.paisalab.in";
const SITE_DESCRIPTION =
  "Free online financial calculators for India — SIP, EMI, Income Tax, GST, FD, RD and more. Instant results, beautiful charts, mobile-friendly.";

export interface CalcMeta {
  slug: string;
  title: string;
  h1: string;
  description: string;
  keywords: string[];
}

export const CALC_META: Record<string, CalcMeta> = {
  "sip-calculator": {
    slug: "sip-calculator",
    title: "SIP Calculator — Calculate Mutual Fund Returns Online | PaisaLab",
    h1: "SIP Calculator — Calculate Mutual Fund Returns Online",
    description:
      "Use our free SIP calculator to calculate mutual fund returns online. Enter monthly SIP amount, expected returns & duration — get instant results with charts. No signup needed.",
    keywords: [
      "SIP calculator",
      "systematic investment plan calculator",
      "mutual fund SIP calculator",
      "SIP calculator online",
      "SIP calculator for 10 years",
      "SIP returns calculator India",
      "monthly SIP calculator",
    ],
  },
  "lumpsum-calculator": {
    slug: "lumpsum-calculator",
    title: "Lumpsum Calculator — One-Time Mutual Fund Investment Returns | PaisaLab",
    h1: "Lumpsum Calculator — One-Time Mutual Fund Investment Returns",
    description:
      "Calculate returns on lump sum mutual fund investments. See how a one-time investment grows over time with our free lumpsum return calculator.",
    keywords: [
      "lumpsum calculator",
      "lump sum investment calculator",
      "one time investment calculator",
      "mutual fund lumpsum calculator",
      "lumpsum return calculator India",
    ],
  },
  "swp-calculator": {
    slug: "swp-calculator",
    title: "SWP Calculator — Systematic Withdrawal Plan Calculator | PaisaLab",
    h1: "SWP Calculator — Systematic Withdrawal Plan Returns",
    description:
      "Plan your monthly withdrawals from mutual funds with our SWP calculator. See how long your corpus lasts and total returns earned.",
    keywords: [
      "SWP calculator",
      "systematic withdrawal plan calculator",
      "SWP mutual fund calculator",
      "monthly withdrawal calculator",
    ],
  },
  "step-up-sip-calculator": {
    slug: "step-up-sip-calculator",
    title: "Step-Up SIP Calculator — Increasing SIP Returns Calculator | PaisaLab",
    h1: "Step-Up SIP Calculator — Calculate Returns with Annual SIP Increase",
    description:
      "Calculate returns with step-up SIP where your investment increases annually. See how stepping up SIP by 10% each year dramatically improves returns.",
    keywords: [
      "step up SIP calculator",
      "increasing SIP calculator",
      "SIP step up calculator",
      "top up SIP calculator",
    ],
  },
  "emi-calculator": {
    slug: "emi-calculator",
    title: "EMI Calculator — Calculate Loan EMI Online Instantly | PaisaLab",
    h1: "EMI Calculator — Calculate Loan EMI Online",
    description:
      "Free EMI calculator for any loan. Calculate monthly EMI, total interest, and repayment schedule instantly. Supports home loan, car loan & personal loan.",
    keywords: [
      "EMI calculator",
      "loan EMI calculator",
      "EMI calculator online",
      "EMI calculator India",
      "monthly EMI calculator",
      "EMI formula calculator",
    ],
  },
  "home-loan-emi-calculator": {
    slug: "home-loan-emi-calculator",
    title: "Home Loan EMI Calculator — Calculate Housing Loan EMI 2025 | PaisaLab",
    h1: "Home Loan EMI Calculator — Calculate Housing Loan EMI",
    description:
      "Calculate your home loan EMI with prepayment scenarios. See year-wise amortization, total interest saved with prepayment, and compare loan tenures.",
    keywords: [
      "home loan EMI calculator",
      "housing loan EMI calculator",
      "home loan calculator India",
      "home loan EMI calculator with prepayment",
      "SBI home loan EMI calculator",
      "HDFC home loan EMI calculator",
    ],
  },
  "car-loan-emi-calculator": {
    slug: "car-loan-emi-calculator",
    title: "Car Loan EMI Calculator — Calculate Auto Loan EMI | PaisaLab",
    h1: "Car Loan EMI Calculator — Calculate Auto Loan EMI Online",
    description:
      "Calculate car loan EMI for any vehicle. Compare different loan amounts and tenures to find the best car loan EMI that fits your budget.",
    keywords: [
      "car loan EMI calculator",
      "auto loan EMI calculator",
      "vehicle loan EMI calculator",
      "car loan calculator India",
    ],
  },
  "personal-loan-emi-calculator": {
    slug: "personal-loan-emi-calculator",
    title: "Personal Loan EMI Calculator — Calculate Personal Loan EMI | PaisaLab",
    h1: "Personal Loan EMI Calculator — Instant Calculation",
    description:
      "Calculate personal loan EMI instantly. Compare interest rates from different banks and see total repayment cost before you apply.",
    keywords: [
      "personal loan EMI calculator",
      "personal loan calculator",
      "personal loan interest calculator",
      "unsecured loan EMI calculator",
    ],
  },
  "income-tax-calculator": {
    slug: "income-tax-calculator",
    title: "Income Tax Calculator FY 2025-26 — Old vs New Regime | PaisaLab",
    h1: "Income Tax Calculator FY 2025-26 — Old vs New Tax Regime",
    description:
      "Calculate income tax for FY 2025-26. Compare old and new tax regime side-by-side. Enter salary, deductions, HRA to find which regime saves more tax.",
    keywords: [
      "income tax calculator",
      "income tax calculator 2025-26",
      "old vs new tax regime calculator",
      "income tax calculator India",
      "salary tax calculator",
      "new tax regime calculator FY 2025-26",
    ],
  },
  "gst-calculator": {
    slug: "gst-calculator",
    title: "GST Calculator — Calculate GST Online (All Slabs) | PaisaLab",
    h1: "GST Calculator — Calculate GST Amount Online",
    description:
      "Free GST calculator for all slabs (5%, 12%, 18%, 28%). Calculate GST inclusive or exclusive. Get CGST, SGST, and IGST breakdown instantly.",
    keywords: [
      "GST calculator",
      "GST calculator online",
      "GST calculator India",
      "CGST SGST calculator",
      "GST inclusive exclusive calculator",
      "GST 18 percent calculator",
    ],
  },
  "fd-calculator": {
    slug: "fd-calculator",
    title: "FD Calculator — Fixed Deposit Maturity Calculator 2025 | PaisaLab",
    h1: "FD Calculator — Calculate Fixed Deposit Maturity Amount",
    description:
      "Calculate FD maturity amount for SBI, HDFC, ICICI and other banks. Compare FD rates and see how compound interest grows your deposit.",
    keywords: [
      "FD calculator",
      "fixed deposit calculator",
      "FD calculator online",
      "FD maturity calculator",
      "bank FD calculator",
      "SBI FD calculator",
      "HDFC FD calculator",
    ],
  },
  "rd-calculator": {
    slug: "rd-calculator",
    title: "RD Calculator — Recurring Deposit Maturity Calculator | PaisaLab",
    h1: "RD Calculator — Calculate Recurring Deposit Maturity Amount",
    description:
      "Calculate RD maturity amount for any bank. See how monthly recurring deposits grow with compound interest using our free RD calculator.",
    keywords: [
      "RD calculator",
      "recurring deposit calculator",
      "RD maturity calculator",
      "monthly RD calculator",
      "post office RD calculator",
    ],
  },
};

export function buildMetadata(slug: string): Metadata {
  const meta = CALC_META[slug];
  if (!meta) {
    return {
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
    };
  }

  const url = `${SITE_URL}/${slug}/`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: meta.title,
      description: meta.description,
      siteName: SITE_NAME,
      images: [
        {
          url: `${SITE_URL}/og/${slug}.png`,
          width: 1200,
          height: 630,
          alt: meta.h1,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [`${SITE_URL}/og/${slug}.png`],
    },
  };
}

export const ALL_CALCULATORS = [
  { slug: "sip-calculator", label: "SIP Calculator", category: "Investment", icon: "📈" },
  { slug: "lumpsum-calculator", label: "Lumpsum Calculator", category: "Investment", icon: "💰" },
  { slug: "swp-calculator", label: "SWP Calculator", category: "Investment", icon: "🔄" },
  { slug: "step-up-sip-calculator", label: "Step-Up SIP", category: "Investment", icon: "⬆️" },
  { slug: "emi-calculator", label: "EMI Calculator", category: "Loans", icon: "🏦" },
  { slug: "home-loan-emi-calculator", label: "Home Loan EMI", category: "Loans", icon: "🏠" },
  { slug: "car-loan-emi-calculator", label: "Car Loan EMI", category: "Loans", icon: "🚗" },
  { slug: "personal-loan-emi-calculator", label: "Personal Loan EMI", category: "Loans", icon: "👤" },
  { slug: "income-tax-calculator", label: "Income Tax", category: "Tax", icon: "📋" },
  { slug: "gst-calculator", label: "GST Calculator", category: "Tax", icon: "🧾" },
  { slug: "fd-calculator", label: "FD Calculator", category: "Savings", icon: "🏛️" },
  { slug: "rd-calculator", label: "RD Calculator", category: "Savings", icon: "💳" },
] as const;

export type CalcSlug = (typeof ALL_CALCULATORS)[number]["slug"];

export const SITE_URL_CONST = SITE_URL;
export const SITE_NAME_CONST = SITE_NAME;
export const SITE_DESCRIPTION_CONST = SITE_DESCRIPTION;
