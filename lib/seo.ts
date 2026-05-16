import type { Metadata } from "next";

const SITE_NAME = "RupeesCalc";
const SITE_URL = "https://www.rupeescalc.in";
const SITE_DESCRIPTION =
  "Free online financial calculators for India — SIP, EMI, Income Tax, GST, FD, RD, Home Loan, Car Loan. Instant results, live charts, mobile-friendly. No signup needed.";

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
    title: "SIP Calculator 2025 — Calculate Mutual Fund SIP Returns Online",
    h1: "SIP Calculator — Calculate Mutual Fund SIP Returns Online",
    description:
      "Free SIP calculator 2025: Calculate monthly SIP returns, maturity amount & wealth gain instantly. Enter SIP amount, rate & years — get live chart & year-wise breakdown. No signup.",
    keywords: [
      "SIP calculator",
      "SIP calculator online",
      "SIP calculator 2025",
      "SIP return calculator",
      "systematic investment plan calculator",
      "mutual fund SIP calculator",
      "SIP calculator for 10 years",
      "SIP calculator for 20 years",
      "monthly SIP calculator",
      "SIP maturity calculator",
      "SIP interest calculator",
      "SIP calculator India",
      "best SIP calculator",
      "SIP calculator with graph",
      "SIP investment calculator",
    ],
  },
  "lumpsum-calculator": {
    slug: "lumpsum-calculator",
    title: "Lumpsum Calculator 2025 — Calculate One-Time Mutual Fund Returns",
    h1: "Lumpsum Calculator — Calculate One-Time Mutual Fund Investment Returns",
    description:
      "Free lumpsum calculator: Calculate returns on one-time mutual fund investment instantly. Enter principal, expected return & years — see maturity amount & growth chart. 100% free.",
    keywords: [
      "lumpsum calculator",
      "lump sum calculator",
      "lumpsum return calculator",
      "one time investment calculator",
      "mutual fund lumpsum calculator",
      "lumpsum investment calculator India",
      "lumpsum calculator online",
      "lumpsum vs SIP calculator",
      "lumpsum calculator 2025",
      "lump sum mutual fund returns",
    ],
  },
  "swp-calculator": {
    slug: "swp-calculator",
    title: "SWP Calculator 2025 — Systematic Withdrawal Plan Calculator",
    h1: "SWP Calculator — Calculate Systematic Withdrawal Plan Returns",
    description:
      "Free SWP calculator: Plan monthly withdrawals from mutual funds. Enter corpus, withdrawal amount & returns — see how long your money lasts. Instant results, live chart.",
    keywords: [
      "SWP calculator",
      "systematic withdrawal plan calculator",
      "SWP mutual fund calculator",
      "monthly withdrawal calculator",
      "SWP calculator online",
      "SWP calculator India",
      "mutual fund withdrawal calculator",
      "retirement withdrawal calculator India",
      "SWP returns calculator",
      "corpus withdrawal calculator",
    ],
  },
  "step-up-sip-calculator": {
    slug: "step-up-sip-calculator",
    title: "Step Up SIP Calculator 2025 — Top Up SIP Returns Calculator",
    h1: "Step Up SIP Calculator — Calculate Returns with Annual SIP Increase",
    description:
      "Free step up SIP calculator: Calculate returns when SIP increases annually. See how 10% yearly step-up boosts your wealth vs flat SIP. Instant results with live charts.",
    keywords: [
      "step up SIP calculator",
      "top up SIP calculator",
      "SIP step up calculator",
      "increasing SIP calculator",
      "step up SIP returns calculator",
      "annual step up SIP calculator",
      "SIP top up calculator online",
      "step SIP calculator India",
      "accelerated SIP calculator",
      "SIP increase calculator",
    ],
  },
  "emi-calculator": {
    slug: "emi-calculator",
    title: "EMI Calculator 2025 — Calculate Loan EMI Online Instantly",
    h1: "EMI Calculator — Calculate Loan EMI Online Instantly",
    description:
      "Free EMI calculator 2025: Calculate monthly EMI for any loan instantly. Enter loan amount, interest rate & tenure — get EMI, total interest & amortization schedule. 100% free.",
    keywords: [
      "EMI calculator",
      "EMI calculator online",
      "loan EMI calculator",
      "EMI calculator 2025",
      "EMI calculator India",
      "monthly EMI calculator",
      "EMI formula calculator",
      "loan calculator India",
      "EMI calculation formula",
      "bank loan EMI calculator",
      "EMI interest calculator",
      "simple EMI calculator",
      "loan repayment calculator",
      "EMI per lakh calculator",
      "EMI calculator with amortization",
    ],
  },
  "home-loan-emi-calculator": {
    slug: "home-loan-emi-calculator",
    title: "Home Loan EMI Calculator 2025 — Housing Loan EMI with Prepayment",
    h1: "Home Loan EMI Calculator — Calculate Housing Loan EMI & Prepayment Savings",
    description:
      "Free home loan EMI calculator 2025: Calculate housing loan EMI, total interest & prepayment savings. Compare SBI, HDFC, ICICI rates. Get year-wise amortization schedule instantly.",
    keywords: [
      "home loan EMI calculator",
      "housing loan EMI calculator",
      "home loan EMI calculator 2025",
      "home loan calculator India",
      "SBI home loan EMI calculator",
      "HDFC home loan EMI calculator",
      "ICICI home loan EMI calculator",
      "home loan EMI calculator with prepayment",
      "home loan interest calculator",
      "mortgage calculator India",
      "housing loan calculator",
      "home loan monthly payment calculator",
      "home loan prepayment calculator",
      "20 year home loan EMI calculator",
      "30 year home loan EMI calculator",
    ],
  },
  "car-loan-emi-calculator": {
    slug: "car-loan-emi-calculator",
    title: "Car Loan EMI Calculator 2025 — Auto Loan EMI Calculator India",
    h1: "Car Loan EMI Calculator — Calculate Auto Loan EMI Online",
    description:
      "Free car loan EMI calculator 2025: Calculate monthly EMI for any car loan. Compare interest rates, tenures & total cost. Get instant amortization schedule. No signup needed.",
    keywords: [
      "car loan EMI calculator",
      "auto loan EMI calculator",
      "car loan calculator India",
      "vehicle loan EMI calculator",
      "car loan EMI calculator 2025",
      "car finance calculator India",
      "car loan interest calculator",
      "SBI car loan EMI calculator",
      "HDFC car loan EMI calculator",
      "car loan monthly payment calculator",
      "car EMI calculator online",
      "used car loan EMI calculator",
      "two wheeler loan EMI calculator",
    ],
  },
  "personal-loan-emi-calculator": {
    slug: "personal-loan-emi-calculator",
    title: "Personal Loan EMI Calculator 2025 — Instant Loan EMI Calculation",
    h1: "Personal Loan EMI Calculator — Calculate Personal Loan EMI Instantly",
    description:
      "Free personal loan EMI calculator 2025: Calculate monthly EMI, total interest & repayment cost instantly. Compare rates from HDFC, ICICI, SBI, Axis Bank. No signup required.",
    keywords: [
      "personal loan EMI calculator",
      "personal loan calculator",
      "personal loan EMI calculator 2025",
      "personal loan interest calculator",
      "unsecured loan EMI calculator",
      "personal loan calculator India",
      "HDFC personal loan EMI calculator",
      "SBI personal loan EMI calculator",
      "ICICI personal loan calculator",
      "personal loan monthly payment calculator",
      "personal loan repayment calculator",
      "instant personal loan calculator",
    ],
  },
  "income-tax-calculator": {
    slug: "income-tax-calculator",
    title: "Income Tax Calculator FY 2025-26 — Old vs New Regime Tax Calculator",
    h1: "Income Tax Calculator FY 2025-26 — Old vs New Tax Regime Comparison",
    description:
      "Free income tax calculator FY 2025-26: Calculate & compare old vs new tax regime instantly. Enter salary, HRA, 80C, home loan deductions — find which regime saves more tax.",
    keywords: [
      "income tax calculator",
      "income tax calculator 2025-26",
      "income tax calculator FY 2025-26",
      "old vs new tax regime calculator",
      "new tax regime calculator 2025",
      "salary tax calculator India",
      "income tax calculator India",
      "tax calculator 2025-26",
      "income tax calculation",
      "tax on salary calculator",
      "AY 2026-27 tax calculator",
      "income tax slab calculator",
      "take home salary calculator India",
      "HRA calculator",
      "80C deduction calculator",
      "income tax calculator online free",
    ],
  },
  "gst-calculator": {
    slug: "gst-calculator",
    title: "GST Calculator 2025 — Calculate GST Online All Slabs (5% 12% 18% 28%)",
    h1: "GST Calculator — Calculate GST Amount Online Instantly",
    description:
      "Free GST calculator 2025: Calculate GST for all slabs — 5%, 12%, 18%, 28%. Add or extract GST instantly. Get CGST, SGST & IGST split. No signup, 100% free & accurate.",
    keywords: [
      "GST calculator",
      "GST calculator online",
      "GST calculator India",
      "GST calculator 2025",
      "GST calculation online",
      "CGST SGST calculator",
      "GST inclusive calculator",
      "GST exclusive calculator",
      "18 percent GST calculator",
      "GST 28 percent calculator",
      "GST 12 percent calculator",
      "GST 5 percent calculator",
      "GST amount calculator",
      "reverse GST calculator",
      "GST tax calculator India",
      "GST calculator for billing",
    ],
  },
  "fd-calculator": {
    slug: "fd-calculator",
    title: "FD Calculator 2025 — Fixed Deposit Maturity Amount Calculator",
    h1: "FD Calculator — Calculate Fixed Deposit Maturity Amount Online",
    description:
      "Free FD calculator 2025: Calculate fixed deposit maturity amount for SBI, HDFC, ICICI & all banks. Compare FD rates, compounding frequencies & see interest earned instantly.",
    keywords: [
      "FD calculator",
      "fixed deposit calculator",
      "FD calculator 2025",
      "FD maturity calculator",
      "fixed deposit maturity calculator",
      "FD interest calculator",
      "bank FD calculator",
      "SBI FD calculator",
      "HDFC FD calculator",
      "ICICI FD calculator",
      "FD calculator online",
      "FD calculator India",
      "fixed deposit interest calculator",
      "FD returns calculator",
      "FD calculator with quarterly compounding",
      "post office FD calculator",
    ],
  },
  "rd-calculator": {
    slug: "rd-calculator",
    title: "RD Calculator 2025 — Recurring Deposit Maturity Calculator",
    h1: "RD Calculator — Calculate Recurring Deposit Maturity Amount Online",
    description:
      "Free RD calculator 2025: Calculate recurring deposit maturity amount for any bank or post office. Enter monthly deposit, rate & tenure — get maturity amount & interest earned instantly.",
    keywords: [
      "RD calculator",
      "recurring deposit calculator",
      "RD calculator 2025",
      "RD maturity calculator",
      "recurring deposit maturity calculator",
      "RD interest calculator",
      "post office RD calculator",
      "SBI RD calculator",
      "RD calculator online",
      "RD calculator India",
      "monthly RD calculator",
      "bank RD calculator",
      "recurring deposit interest calculator",
      "RD scheme calculator",
      "RD returns calculator",
    ],
  },
  "compound-interest-calculator": {
    slug: "compound-interest-calculator",
    title: "Compound Interest Calculator — Free Online with Monthly Contributions",
    h1: "Compound Interest Calculator — Free Online with Monthly Contributions",
    description:
      "Free compound interest calculator: Calculate final balance & interest earned on any investment. Supports daily, monthly, quarterly & annual compounding, monthly contributions, and 6 currencies (USD, EUR, GBP, INR, AUD, CAD). Instant results, no signup.",
    keywords: [
      "compound interest calculator",
      "compound interest calculator online",
      "compound interest calculator free",
      "compound interest calculator with monthly contributions",
      "daily compound interest calculator",
      "monthly compound interest calculator",
      "compound interest formula calculator",
      "compound interest calculator 2025",
      "how to calculate compound interest",
      "compound interest vs simple interest",
      "investment compound interest calculator",
      "savings compound interest calculator",
      "compound interest calculator USD",
      "compound interest calculator UK",
      "compound annual growth rate calculator",
    ],
  },
  "mortgage-calculator": {
    slug: "mortgage-calculator",
    title: "Mortgage Calculator — Free Online Monthly Payment Calculator",
    h1: "Mortgage Calculator — Free Online Monthly Payment Calculator",
    description:
      "Free mortgage calculator: Calculate monthly payment, total interest, and full amortization schedule for any home loan. Supports USD, EUR, GBP, INR, AUD, CAD. Adjust home price, down payment, rate, and term — instant results, no signup.",
    keywords: [
      "mortgage calculator",
      "mortgage calculator online",
      "mortgage payment calculator",
      "home loan calculator",
      "monthly mortgage payment calculator",
      "mortgage amortization calculator",
      "mortgage calculator free",
      "mortgage calculator 2025",
      "how much mortgage can I afford",
      "mortgage interest calculator",
      "house payment calculator",
      "mortgage calculator with down payment",
      "30 year mortgage calculator",
      "15 year mortgage calculator",
      "mortgage affordability calculator",
    ],
  },
  "retirement-calculator": {
    slug: "retirement-calculator",
    title: "Retirement Calculator — Free Online Retirement Savings Planner",
    h1: "Retirement Calculator — Free Online Retirement Savings Planner",
    description:
      "Free retirement calculator: Find out if you're on track for retirement. Enter your age, savings, monthly contributions, and expected return — see your projected corpus, whether it's sufficient, and estimated monthly income using the 4% rule. Multi-currency support.",
    keywords: [
      "retirement calculator",
      "retirement savings calculator",
      "retirement planning calculator",
      "retirement calculator online free",
      "how much to save for retirement",
      "retirement corpus calculator",
      "401k retirement calculator",
      "retirement income calculator",
      "am I saving enough for retirement",
      "retirement fund calculator",
      "retirement calculator 2025",
      "fire calculator",
      "early retirement calculator",
      "pension calculator",
      "retirement withdrawal calculator",
    ],
  },
};

export function buildMetadata(slug: string): Metadata {
  const meta = CALC_META[slug];
  if (!meta) {
    return { title: SITE_NAME, description: SITE_DESCRIPTION };
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
      locale: "en_IN",
      images: [{ url: `${SITE_URL}/og/${slug}.png`, width: 1200, height: 630, alt: meta.h1 }],
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
  { slug: "compound-interest-calculator", label: "Compound Interest", category: "Global", icon: "🌍" },
  { slug: "mortgage-calculator", label: "Mortgage Calculator", category: "Global", icon: "🏠" },
  { slug: "retirement-calculator", label: "Retirement Calculator", category: "Global", icon: "👴" },
  { slug: "currency-converter", label: "Currency Converter", category: "Global", icon: "💱" },
  { slug: "percentage-calculator", label: "Percentage Calculator", category: "Global", icon: "%" },
] as const;

export type CalcSlug = (typeof ALL_CALCULATORS)[number]["slug"];

export const SITE_URL_CONST = SITE_URL;
export const SITE_NAME_CONST = SITE_NAME;
export const SITE_DESCRIPTION_CONST = SITE_DESCRIPTION;
