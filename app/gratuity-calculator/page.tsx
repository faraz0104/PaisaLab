import { Suspense } from "react";
import type { Metadata } from "next";
import { SITE_URL_CONST } from "@/lib/seo";
import { webAppSchema, faqSchema, JsonLd } from "@/lib/schemas";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import GratuityCalculator from "@/components/gratuity/GratuityCalculator";

const slug = "gratuity-calculator";
const title = "Gratuity Calculator India 2025 — Calculate Gratuity Amount Online";
const description =
  "Free gratuity calculator India: Calculate your gratuity amount instantly. Enter basic salary, years of service — get exact gratuity as per Payment of Gratuity Act. Know your rights. 100% free.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "gratuity calculator",
    "gratuity calculator India",
    "gratuity calculator 2025",
    "gratuity amount calculator",
    "gratuity calculation formula",
    "Payment of Gratuity Act calculator",
    "gratuity calculator online",
    "how to calculate gratuity",
    "gratuity calculator for private sector",
    "gratuity calculator after resignation",
    "gratuity eligibility calculator",
    "gratuity tax calculator",
    "gratuity formula calculator India",
    "gratuity on basic salary calculator",
    "gratuity calculator 5 years",
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
    question: "What is gratuity and who is eligible?",
    answer: "Gratuity is a statutory lump-sum payment made by an employer to an employee as a token of appreciation for their service. It is governed by the Payment of Gratuity Act, 1972. Eligibility: You must have completed a minimum of 5 years of continuous service with the same employer. Exception: In case of death or disability, gratuity is paid regardless of years of service. Coverage: Establishments with 10 or more employees are covered. Many companies voluntarily pay gratuity even if not legally required.",
  },
  {
    question: "What is the gratuity formula for private sector employees?",
    answer: "For employees covered under the Payment of Gratuity Act 1972: Gratuity = (Basic Salary + DA) × 15/26 × Years of Service. The 15/26 factor represents 15 days out of 26 working days per month. Example: Basic + DA = ₹50,000/month, 10 years of service. Gratuity = ₹50,000 × 15/26 × 10 = ₹2,88,462. The maximum gratuity is capped at ₹20 lakh (increased from ₹10 lakh in 2018). Years calculation: If service period has fraction ≥ 6 months, it rounds up to next full year. 9 years 7 months = 10 years. 9 years 4 months = 9 years.",
  },
  {
    question: "How is government employee gratuity calculated?",
    answer: "For central government employees and those under CCS (Pension) Rules: Gratuity = (Basic + DA) ÷ 4 × Number of completed 6-month periods. Or equivalently: Last pay × Service period in years × 1/4. Example: Basic + DA = ₹60,000/month, 25 years (50 half-yearly periods). Gratuity = (₹60,000 ÷ 4) × 50 = ₹7,50,000. For government employees, there is NO upper cap on gratuity (unlike ₹20L cap for private sector). Government gratuity is fully tax-exempt.",
  },
  {
    question: "Is gratuity taxable? What is the tax-free limit?",
    answer: "Tax treatment varies by employment type: Government employees: Gratuity is completely tax-free, no limit. Private sector (covered under Gratuity Act): Tax-free up to the LEAST of: (1) Actual gratuity received, (2) ₹20,00,000 (₹20 lakh), (3) 15 × last salary × years of service ÷ 26. Private sector (not covered under Act): Tax-free up to: (1) Actual gratuity received, (2) ₹20,00,000, (3) Half month's average salary × completed years. Any gratuity above the exemption limit is added to income and taxed at your slab rate. If you receive gratuity from multiple employers, the combined exemption is ₹20L in a lifetime.",
  },
  {
    question: "When is gratuity paid — can I get it before 5 years?",
    answer: "Normally: Gratuity is payable only after 5 years of continuous service, upon resignation, retirement, or termination. Exceptions (gratuity paid even before 5 years): Death of the employee — full gratuity to legal heirs. Permanent disability due to accident or disease. Termination by employer — even if less than 5 years. What counts as continuous service: Approved leaves (sick, maternity, earned). Lay-off or lockout period. This means even with gaps due to approved leaves, you're considered in continuous service. Timeline: Employer must pay within 30 days of the gratuity becoming due. If delayed, they must pay interest at 10% per annum.",
  },
  {
    question: "What is the maximum gratuity I can receive?",
    answer: "Private sector (covered under Payment of Gratuity Act): Maximum ₹20,00,000 (₹20 lakh). This cap was last revised in 2018 (from ₹10L to ₹20L). Government sector: No cap — the full formula applies regardless of amount. How to hit the cap: An employee with Basic+DA of ₹34,667/month and 40 years of service would just hit ₹20L (₹34,667 × 15/26 × 40 = ₹8,00,077 × ... actually about ₹8L). For the cap to be hit: Basic+DA ≥ ₹34,667 × (20,00,000 ÷ (15/26 × 40)) ≈ ₹89,444/month with 40 years, OR higher salary with fewer years. In practice, many senior employees with 30+ years of service and high basic salaries hit this cap.",
  },
  {
    question: "Does gratuity include DA (dearness allowance)?",
    answer: "Yes. The gratuity formula uses (Basic Salary + Dearness Allowance). This applies to both the Payment of Gratuity Act formula and the government formula. However, for many private sector companies that do not pay DA separately, only the Basic Salary is used. How to check: Look at your salary slip. If there is a DA component, add it to basic. If no DA is shown, only use Basic. Important: HRA, special allowances, performance bonus, and other allowances are NOT included in the gratuity calculation — only Basic + DA.",
  },
  {
    question: "How is gratuity shown in CTC? Why isn't it paid monthly?",
    answer: "Gratuity in CTC context: Many companies include gratuity in CTC as 4.81% of annual basic salary. This represents the employer's annual provision for the eventual gratuity payment. The 4.81% comes from: 15/26 × 1/12 months = 0.04808 ≈ 4.81%. Why not paid monthly: Gratuity is a lump-sum payment made only when you leave the company after 5+ years. The employer accumulates the provision internally. If you leave before 5 years: The entire gratuity amount (that was shown in your CTC) is forfeited — you receive nothing. This is why job-hopping frequently before 5-year milestones is financially costly.",
  },
  {
    question: "What happens to gratuity if the company closes or goes bankrupt?",
    answer: "Gratuity is a secured payment — it has priority over other company debts. Under the Payment of Gratuity Act, gratuity is treated as a priority debt, meaning even in bankruptcy/winding up, employee gratuity must be paid before other creditors. Companies with 10+ employees are required to either: (1) Obtain a gratuity insurance from LIC or other insurer, OR (2) Create a gratuity fund. If the employer fails to pay, the employee can approach the Controlling Authority (Labour Commissioner) for enforcement. The government also has provisions to recover unpaid gratuity. In practice, gratuity is relatively well-protected compared to other employee dues.",
  },
  {
    question: "Can I claim gratuity if I'm fired or retrenched?",
    answer: "Yes. If you are terminated (fired, retrenched, or laid off) by the employer, you are entitled to gratuity if you have completed 5 years of continuous service. The 5-year rule does NOT apply in case of termination — wait, actually it does: the 5-year minimum is waived only for death and disability, not termination. However, wrongful termination is different: If you're fired due to violence, riot, or moral turpitude (proven), gratuity can be forfeited. For regular terminations (lay-off, retrenchment, company closure), gratuity is fully payable after 5 years. Timeline: Employer must pay gratuity within 30 days of termination. File a claim with the labour department if not paid.",
  },
];

export default function GratuityCalculatorPage() {
  return (
    <>
      <JsonLd data={webAppSchema(slug, title, description)} />
      <JsonLd data={faqSchema(FAQS)} />
      <CalculatorShell
        slug={slug}
        h1={title}
        faqs={FAQS}
        relatedSlugs={["salary-calculator", "income-tax-calculator", "ppf-calculator", "emi-calculator"]}
        content={<GratuityContent />}
      >
        <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl" />}>
          <GratuityCalculator />
        </Suspense>
      </CalculatorShell>
    </>
  );
}

function GratuityContent() {
  return (
    <>
      <h2>What is a Gratuity Calculator?</h2>
      <p>
        A <strong>gratuity calculator</strong> computes the lump-sum amount you are entitled to receive from your employer upon completing 5 or more years of service. It applies the formula from the Payment of Gratuity Act, 1972 — the standard for all private sector employees in India.
      </p>

      <h2>Gratuity Formula — Private vs Government Employees</h2>
      <div className="overflow-x-auto my-3">
        <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Category</th>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Formula</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Cap</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              ["Private (covered)", "(Basic+DA) × 15/26 × Years", "₹20 Lakh"],
              ["Government", "(Basic+DA) ÷ 4 × Half-year periods", "No cap"],
              ["Private (not covered)", "½ × Avg salary × Years", "₹20 Lakh"],
            ].map(([cat, formula, cap]) => (
              <tr key={cat} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-200">{cat}</td>
                <td className="px-4 py-2.5 text-slate-600 dark:text-slate-300 font-mono text-xs">{formula}</td>
                <td className="px-4 py-2.5 text-right text-emerald-600 dark:text-emerald-400 font-semibold">{cap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Gratuity at Different Salary Levels (10 Years, Private Sector)</h2>
      <div className="overflow-x-auto my-3">
        <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Monthly Basic+DA</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Gratuity (10 yrs)</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Gratuity (20 yrs)</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Gratuity (30 yrs)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              ["₹20,000", "₹1,15,385", "₹2,30,769", "₹3,46,154"],
              ["₹40,000", "₹2,30,769", "₹4,61,538", "₹6,92,308"],
              ["₹60,000", "₹3,46,154", "₹6,92,308", "₹10,38,462"],
              ["₹80,000", "₹4,61,538", "₹9,23,077", "₹13,84,615"],
              ["₹1,00,000", "₹5,76,923", "₹11,53,846", "₹17,30,769"],
            ].map(([basic, y10, y20, y30]) => (
              <tr key={basic} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-200">{basic}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{y10}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{y20}</td>
                <td className="px-4 py-2.5 text-right text-blue-600 dark:text-blue-400 font-semibold">{y30}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <blockquote>
        <strong>Key fact:</strong> If you switch jobs every 3-4 years, you forfeit all gratuity. Staying 5+ years at each employer adds a significant lump-sum to your lifetime wealth. At ₹50,000 basic/month, 5 years earns you ₹1,44,231 in gratuity — completely tax-free.
      </blockquote>
    </>
  );
}
