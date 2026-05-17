import { Suspense } from "react";
import type { Metadata } from "next";
import { SITE_URL_CONST } from "@/lib/seo";
import { webAppSchema, faqSchema, JsonLd } from "@/lib/schemas";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import HRACalculator from "@/components/hra/HRACalculator";

const slug = "hra-calculator";
const title = "HRA Calculator 2025 — House Rent Allowance Exemption Calculator";
const description =
  "Free HRA calculator 2025: Calculate House Rent Allowance (HRA) exemption from income tax instantly. Enter basic salary, HRA received & rent paid — see exact tax-free HRA under old tax regime. Metro & non-metro.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "HRA calculator",
    "HRA exemption calculator",
    "house rent allowance calculator",
    "HRA calculator India",
    "HRA calculator 2025",
    "HRA tax exemption calculator",
    "HRA calculation formula",
    "HRA calculator online",
    "HRA calculator for salaried",
    "HRA exemption metro city",
    "HRA calculator old regime",
    "HRA deduction calculator",
    "how to calculate HRA exemption",
    "HRA calculator 50 percent",
    "Section 10 13A HRA calculator",
  ],
  alternates: { canonical: `${SITE_URL_CONST}/${slug}/` },
  openGraph: {
    type: "website",
    url: `${SITE_URL_CONST}/${slug}/`,
    title,
    description,
    siteName: "RupeesCalc",
    images: [{ url: `${SITE_URL_CONST}/og/${slug}.png`, width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL_CONST}/og/${slug}.png`] },
};

const FAQS = [
  {
    question: "What is HRA exemption and how is it calculated?",
    answer: "HRA (House Rent Allowance) exemption under Section 10(13A) of the Income Tax Act allows salaried employees to reduce their taxable income by the amount of HRA they receive — subject to certain limits. The HRA exemption = LEAST of the following three amounts: (1) Actual HRA received from employer. (2) Rent paid − 10% of (Basic + DA). (3) 50% of Basic+DA (metro cities: Mumbai, Delhi, Kolkata, Chennai) OR 40% of Basic+DA (non-metro cities). Example: Basic = ₹40,000/month, HRA = ₹20,000/month, Rent paid = ₹18,000/month, Metro city. Limit 1 = ₹20,000. Limit 2 = ₹18,000 − ₹4,000 = ₹14,000. Limit 3 = ₹20,000 (50%). Exemption = ₹14,000/month = ₹1,68,000/year. Taxable HRA = ₹20,000 − ₹14,000 = ₹6,000/month.",
  },
  {
    question: "Is HRA exemption available under the new tax regime?",
    answer: "No. HRA exemption is NOT available under the New Tax Regime (introduced in FY 2020-21 and revised in FY 2023-24). Under the New Regime: The entire HRA received is included in your gross salary and taxed at slab rates. No deduction for rent paid. This is one of the biggest reasons why the old tax regime can be significantly better for employees living in rented accommodation. Example: ₹40,000/month basic, ₹20,000 HRA, paying ₹18,000 rent in metro. Old regime: ₹1,68,000 HRA exemption + ₹1,50,000 80C + ₹50,000 standard deduction = ₹3,68,000 total deductions. New regime: Only ₹75,000 standard deduction. At ₹15 LPA salary, this difference can mean ₹30,000–50,000 more tax in the new regime.",
  },
  {
    question: "Which cities are considered metro for HRA calculation?",
    answer: "For HRA exemption, only 4 cities qualify as 'metro' (50% of basic): Mumbai (including Navi Mumbai and Thane). Delhi (including NCR — Gurgaon, Noida, Faridabad, Ghaziabad). Kolkata. Chennai. All other cities are non-metro (40% of basic): Bangalore (despite being a major tech hub). Hyderabad. Pune. Ahmedabad. All other cities and towns. Note: This 4-city list has not been updated despite the growth of cities like Bangalore and Hyderabad. A Bangalore employee gets only 40% HRA exemption despite paying rent comparable to Delhi. This is a well-known anomaly in Indian tax law.",
  },
  {
    question: "Can I claim HRA if I live in my own house or parents' house?",
    answer: "Own house: No. If you own the house you live in, you cannot claim HRA exemption (even if you receive HRA as part of your salary — that HRA becomes fully taxable). Parents' house: YES, but with a legal arrangement. You can pay rent to your parents, claim HRA exemption, and your parents report the rental income. For this to be valid: Rent agreement with your parents (written). Regular bank transfer of rent to parents' accounts. Parents must declare it as rental income in their ITR. Actual ownership of the property must be with parents (not jointly owned with you). This is a legal and commonly used tax planning strategy. The key is that it must be genuine — not just a paper transaction.",
  },
  {
    question: "What documents do I need to claim HRA exemption?",
    answer: "Documents required for HRA exemption: Rent receipts: For monthly rent up to ₹3,000/month — no receipts needed (employer can accept declaration). For monthly rent ₹3,001 to ₹8,333 — rent receipts required. For monthly rent above ₹8,333 (₹1 lakh/year) — Landlord's PAN is mandatory. Rent agreement: 11-month rental agreement (registered or notarized for large amounts). Bank statements: Showing rent payment (especially for high amounts). How to submit: Most employers collect rent receipts quarterly (January–March is common). Submit Form 12BB to your employer. If employer doesn't provide full HRA benefit, claim it while filing ITR under Form 16.",
  },
  {
    question: "What if my rent exceeds ₹1 lakh per year? Is PAN mandatory?",
    answer: "Yes. If your annual rent exceeds ₹1,00,000 (₹8,333/month), you MUST provide your landlord's PAN card to claim HRA exemption. If landlord refuses to give PAN: You can submit Form 60 from the landlord (declaration that they don't have PAN). However, in practice, many landlords are reluctant. If you cannot get PAN or Form 60, the employer will deduct TDS on the rent paid above ₹1L. You can still claim HRA exemption while filing your own ITR. If landlord is an NRI: You must deduct 30% TDS on the rent and deposit it with the government using Form 15CA/CB. This is a significant compliance requirement — always check landlord's resident status.",
  },
  {
    question: "How is HRA treated if I change cities or jobs mid-year?",
    answer: "Mid-year job change: Your new employer will calculate HRA exemption from the date you joined. For the previous employer's period, HRA was already accounted for in Form 16. Combine both Form 16s when filing ITR — total HRA exemption for the year is the sum of exemptions from both employers. Mid-year city change (metro to non-metro or vice versa): Calculate HRA exemption separately for each period. January–June (metro): 50% of basic for that period. July–December (non-metro): 40% of basic for that period. Rent paid in different cities is considered separately. Keep rent receipts and agreements from both cities.",
  },
  {
    question: "Can I claim both HRA exemption and home loan deduction?",
    answer: "Yes! You can claim both simultaneously if you: Live in rented accommodation in the city where you work. Own a house (with home loan) in a different city. Or own a house but it's rented out (not self-occupied). Example scenario: You work in Mumbai (rented flat, claiming HRA). You have a home loan on a flat in Pune where your family lives. You can claim: HRA exemption for Mumbai rent. Home loan principal under 80C (up to ₹1.5L). Home loan interest under 24(b) (up to ₹2L for self-occupied property). If both your spouse and you are paying rent and have home loans in the same city, it gets complex. Consult a CA for joint ownership scenarios.",
  },
  {
    question: "What is Section 80GG — HRA deduction for those without HRA?",
    answer: "If you are salaried but your employer does NOT provide HRA (or you are self-employed), you can claim rent deduction under Section 80GG. Eligibility: Don't receive HRA from employer. Pay rent for residential accommodation. You, spouse, minor child should not own residential property in the city of work. 80GG deduction = LEAST of: (1) ₹5,000/month (₹60,000/year). (2) 25% of total income. (3) Rent paid − 10% of total income. Form 10BA must be filed while claiming 80GG. This is much less generous than HRA exemption for salaried employees. Only available under old regime.",
  },
  {
    question: "I didn't submit rent receipts to my employer. Can I still claim HRA in ITR?",
    answer: "Yes! Even if your employer did not provide HRA exemption (because you didn't submit receipts on time), you can claim it directly in your Income Tax Return (ITR). How: File ITR-1 (or ITR-2 if applicable). In 'Salary' section, reduce gross salary by the HRA exemption amount. Calculate HRA exemption yourself (use this calculator). Maintain all rent receipts, agreement, and bank statements — keep them for 6 years in case of scrutiny. Your Form 16 will show higher taxable salary (employer didn't deduct HRA). But your ITR will show lower taxable income after your HRA claim. Any extra TDS deducted will be refunded. Note: If annual rent > ₹1 lakh, you still need landlord's PAN — you cannot skip this even while filing ITR.",
  },
];

export default function HRACalculatorPage() {
  return (
    <>
      <JsonLd data={webAppSchema(slug, title, description)} />
      <JsonLd data={faqSchema(FAQS)} />
      <CalculatorShell
        slug={slug}
        h1={title}
        faqs={FAQS}
        relatedSlugs={["income-tax-calculator", "salary-calculator", "home-loan-emi-calculator", "rd-calculator"]}
        content={<HRAContent />}
      >
        <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl" />}>
          <HRACalculator />
        </Suspense>
      </CalculatorShell>
    </>
  );
}

function HRAContent() {
  return (
    <>
      <h2>What is an HRA Exemption Calculator?</h2>
      <p>
        An <strong>HRA calculator</strong> determines how much of your House Rent Allowance is exempt from income tax. It applies the three-limit test from Section 10(13A) and shows you exactly which limit applies to your situation — available only under the Old Tax Regime.
      </p>

      <h2>HRA Exemption Formula — Three Limits</h2>
      <div className="overflow-x-auto my-3">
        <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Limit</th>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Formula</th>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">When this applies</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              ["Limit 1", "Actual HRA received", "Always — caps at actual HRA"],
              ["Limit 2", "Rent paid − 10% of Basic", "When rent is moderate relative to salary"],
              ["Limit 3 (Metro)", "50% of Basic Salary", "High rent or HRA in metro cities"],
              ["Limit 3 (Non-Metro)", "40% of Basic Salary", "High rent or HRA in non-metro"],
            ].map(([limit, formula, when]) => (
              <tr key={limit} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-2.5 font-semibold text-blue-600 dark:text-blue-400">{limit}</td>
                <td className="px-4 py-2.5 font-mono text-xs text-slate-700 dark:text-slate-200">{formula}</td>
                <td className="px-4 py-2.5 text-slate-500 dark:text-slate-400 text-xs">{when}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">HRA exemption = minimum of all applicable limits. Enter values in the calculator above to see which limit applies to you.</p>

      <h2>HRA Exemption Examples — Quick Reference</h2>
      <div className="overflow-x-auto my-3">
        <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Monthly Basic</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">HRA (50%)</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Rent Paid</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Monthly Exemption</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              ["₹30,000", "₹15,000", "₹14,000", "₹11,000"],
              ["₹50,000", "₹25,000", "₹20,000", "₹15,000"],
              ["₹80,000", "₹40,000", "₹35,000", "₹27,000"],
              ["₹1,20,000","₹60,000", "₹50,000", "₹38,000"],
            ].map(([basic, hra, rent, exemption]) => (
              <tr key={basic} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-200">{basic}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{hra}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{rent}</td>
                <td className="px-4 py-2.5 text-right text-emerald-600 dark:text-emerald-400 font-semibold">{exemption}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">Metro city assumption. Annual exemption = monthly × 12.</p>

      <blockquote>
        <strong>Tip:</strong> If your monthly rent is less than 10% of your basic salary, Limit 2 becomes zero — meaning no HRA exemption at all, even if you receive HRA. Always try to pay rent above 10% of basic to get any exemption.
      </blockquote>
    </>
  );
}
