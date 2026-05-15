# PaisaLab — Indian Finance Calculator Suite

Production-ready Next.js 16 finance calculator site targeting #1 Google rankings for high-CPC Indian finance keywords.

## Tech Stack

- **Next.js 16** (App Router, static generation, Turbopack)
- **TypeScript** — full type coverage
- **Tailwind CSS v4** — CSS-first configuration
- **Recharts** — animated area/donut charts

## Calculators (12)

| Category   | Calculator                       | URL                              |
|------------|----------------------------------|----------------------------------|
| Investment | SIP Calculator                   | `/sip-calculator/`               |
| Investment | Lumpsum Calculator               | `/lumpsum-calculator/`           |
| Investment | SWP Calculator                   | `/swp-calculator/`               |
| Investment | Step-Up SIP Calculator           | `/step-up-sip-calculator/`       |
| Loans      | EMI Calculator                   | `/emi-calculator/`               |
| Loans      | Home Loan EMI Calculator         | `/home-loan-emi-calculator/`     |
| Loans      | Car Loan EMI Calculator          | `/car-loan-emi-calculator/`      |
| Loans      | Personal Loan EMI Calculator     | `/personal-loan-emi-calculator/` |
| Tax        | Income Tax Calculator FY 2025-26 | `/income-tax-calculator/`        |
| Tax        | GST Calculator                   | `/gst-calculator/`               |
| Savings    | FD Calculator                    | `/fd-calculator/`                |
| Savings    | RD Calculator                    | `/rd-calculator/`                |

## Local Development

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Production Build

```bash
npm run build
npm start
```

## Deploy to Vercel (Recommended)

1. Push to GitHub
2. Import at vercel.com/new
3. Deploy — Vercel auto-detects Next.js, zero config needed

**Custom domain:**
- Buy `paisalab.in` at GoDaddy/Namecheap (~₹800/yr)
- Add domain in Vercel Dashboard → Settings → Domains

## Before Applying for AdSense

1. Wait until 20–30 pages are indexed by Google (verify in Search Console)
2. Ensure at least 1,000+ organic sessions/month
3. Update `public/ads.txt` with your publisher ID after approval
4. Replace `data-ad-slot` placeholder divs in `CalculatorShell.tsx` with real AdSense scripts

## SEO Configuration (update before launch)

1. **`lib/seo.ts`** — Replace `https://www.paisalab.in` with your actual domain
2. **`app/layout.tsx`** — Replace `YOUR_GOOGLE_VERIFICATION_CODE` with Google Search Console verification code
3. **`public/ads.txt`** — Add AdSense publisher ID after approval

## Project Structure

```
paisalab/
├── app/                       ← Next.js App Router pages
│   ├── layout.tsx             ← Root layout (Header + Footer)
│   ├── page.tsx               ← Homepage
│   ├── sitemap.ts             ← Auto-generated sitemap.xml
│   ├── robots.ts              ← robots.txt
│   └── [calculator]/page.tsx  ← Each calculator page (12 total)
├── components/
│   ├── layout/                ← Header, Footer, Breadcrumb
│   ├── calculator/            ← Shared: SliderInput, GrowthChart, DonutChart,
│   │                              BreakdownTable, InsightCards, ShareBar, CalculatorShell
│   ├── sip/                   ← SIPCalculator widget (standard + step-up modes)
│   ├── emi/                   ← EMICalculator widget (4 loan types)
│   ├── fd/                    ← FDCalculator widget (FD + RD modes)
│   ├── gst/                   ← GSTCalculator widget
│   └── tax/                   ← TaxCalculator widget (old vs new regime)
├── lib/
│   ├── calculators/
│   │   ├── sip.ts             ← SIP + SWP + Step-up math
│   │   ├── emi.ts             ← EMI + amortization math
│   │   ├── fd.ts              ← FD + RD math + bank rates
│   │   ├── gst.ts             ← GST inclusive/exclusive math
│   │   ├── tax.ts             ← Income tax FY 2025-26 (old + new regime)
│   │   └── format.ts          ← Indian number format, lakh/crore, amountInWords
│   ├── seo.ts                 ← Per-page metadata + ALL_CALCULATORS registry
│   ├── schemas.ts             ← JSON-LD schema builders (WebApp, FAQ, Breadcrumb)
│   └── JsonLd.tsx             ← JSON-LD React component
└── public/
    └── ads.txt                ← AdSense authorized sellers
```

## 50 Long-Tail Keyword Article Ideas for the Blog

**SIP / Investment:**
1. How to Calculate SIP Returns: Complete Guide
2. SIP vs FD: Where to Invest in 2026?
3. Best SIP for 10 Years in India
4. Step-Up SIP: How Much Extra Can You Earn?
5. ELSS vs PPF: Which is Better for Tax Saving?
6. How to Start SIP with ₹500/month
7. Nifty 50 Index Fund SIP Returns — 10/15/20 Year Data
8. SIP vs Lumpsum: When Markets Are at All-Time High
9. How to Calculate XIRR in Mutual Fund SIP
10. Top Flexi Cap Funds for SIP in 2026

**Home Loan / EMI:**
11. Home Loan Prepayment: Save Lakhs on Interest (With Calculator)
12. Home Loan vs Rent: Which is Better in 2026?
13. How to Reduce Home Loan EMI (5 Proven Ways)
14. SBI vs HDFC Home Loan: Full Comparison
15. Home Loan Tax Benefits: 24(b), 80C, 80EEA Explained
16. Balance Transfer Home Loan: When Does It Make Sense?
17. Floating vs Fixed Rate Home Loan — Which to Choose
18. Home Loan Eligibility: How Much Can You Get on Your Salary?
19. Under-Construction vs Ready-to-Move: EMI Difference
20. PMAY Subsidy 2026: How Much Can You Save?

**Income Tax:**
21. Old vs New Tax Regime 2026: Which Saves More?
22. How to Save Maximum Tax on ₹10L Salary
23. Section 80C Investments: Full List 2025-26
24. HRA Exemption: How to Calculate It Correctly
25. NPS vs PPF: Which is Better for Tax Saving?
26. Capital Gains Tax on Mutual Funds 2026 (STCG/LTCG)
27. Form 16: How to Read and Use It for ITR
28. Section 87A Rebate: Who Gets Zero Tax in 2026?
29. Tax on ₹50K Monthly Salary: Step-by-Step Calculation
30. ITR Filing Deadline 2026 and Penalties for Late Filing

**GST:**
31. GST Rates List 2026: All Goods and Services
32. GST on Restaurant Bills: What You're Actually Paying
33. GST on Electric Vehicles: Current Rates
34. GST for Freelancers and Consultants
35. GST Input Tax Credit: How to Claim It
36. GST on Gold Jewellery: How Much Do You Really Pay?
37. GST on Home Rent: Residential vs Commercial
38. GST Registration: Do You Need to Register?
39. Reverse Charge Mechanism Under GST Explained
40. GST Calculator for Service Providers

**FD / RD / Savings:**
41. Best FD Rates in India 2026 (All Banks Compared)
42. Post Office vs Bank FD: Which Pays More?
43. FD Laddering Strategy: Maximize Returns
44. Senior Citizen FD Rates 2026: Extra 0.5% Explained
45. Tax on FD Interest: How to Minimize with Form 15G
46. RD vs SIP: Where to Invest ₹5,000/month?
47. Post Office RD vs Bank RD: Full Comparison
48. Sukanya Samriddhi Yojana Calculator 2026
49. PPF Calculator: 15-Year Returns at Current Rate
50. Liquid Fund vs FD: Which is Better for Emergency Fund?

## Homepage Hero Copy

**H1:** India's Smartest Finance Calculators

**Subheadline:** SIP, EMI, Income Tax, GST, FD — 12 calculators that update as you type. No button clicks, no ads above the fold, no clutter. Built for India, optimized for mobile.

**CTA buttons:** "SIP Calculator" | "EMI Calculator" | "Tax Calculator"

## About Page Copy

PaisaLab is India's fastest and most accurate financial calculator suite. We built it because every other Indian finance calculator site is slow, cluttered with ads, and requires you to click a "Calculate" button like it's 2005.

Our calculators update instantly as you drag the slider. They show beautiful charts instead of just numbers. They give you plain-English insights like "If you increase your EMI by ₹2,000, you'll finish your loan 2 years early." And they're designed for the 70% of Indians who browse on mobile.

All calculations are done locally in your browser — we never see your financial data. No signup, no login, no tracking.

PaisaLab is free and always will be. We're supported by Google AdSense advertisements — placed thoughtfully, never above the fold, never interrupting your workflow.
