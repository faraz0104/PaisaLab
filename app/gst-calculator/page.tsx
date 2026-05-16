import type { Metadata } from "next";
import { buildMetadata, CALC_META } from "@/lib/seo";
import { webAppSchema, faqSchema, JsonLd } from "@/lib/schemas";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import GSTCalculator from "@/components/gst/GSTCalculator";

export const metadata: Metadata = buildMetadata("gst-calculator");

const slug = "gst-calculator";
const meta = CALC_META[slug];

const FAQS = [
  {
    question: "What is a GST calculator?",
    answer: "A GST calculator is a free online tool that instantly computes the Goods and Services Tax amount for any transaction. It works in two modes: (1) Add GST — enter base price and GST rate to get the GST amount and final price, (2) Remove GST — enter a GST-inclusive price to extract the original price and exact GST paid. It also shows the CGST, SGST, and IGST breakdown.",
  },
  {
    question: "What are the GST slabs in India 2025?",
    answer: "India has 5 primary GST rate slabs: 0% — essential items (fresh food, milk, books, healthcare), 5% — packaged food, coal, economy air tickets, 12% — processed food, computers, mobile phones, 18% — most services, electronics, restaurants with AC, 28% — luxury goods, tobacco, aerated drinks. Plus special rates: 3% on gold/silver, 0.25% on cut/polished diamonds, 1.5% on precious stones.",
  },
  {
    question: "How to calculate GST?",
    answer: "Adding GST (exclusive): GST Amount = Original Price × GST Rate ÷ 100. Total Price = Original Price + GST Amount. Example: ₹1,000 item at 18% GST → GST = ₹180, Total = ₹1,180. Removing GST from inclusive price: Original Price = Total ÷ (1 + GST Rate ÷ 100). GST Amount = Total − Original Price. Example: ₹1,180 inclusive price at 18% → Original = ₹1,180 ÷ 1.18 = ₹1,000, GST = ₹180.",
  },
  {
    question: "What is the difference between CGST, SGST, and IGST?",
    answer: "CGST (Central GST): Collected by Central Government on intra-state sales. SGST (State GST): Collected by State Government on intra-state sales. Both CGST and SGST are each half the applicable GST rate — for 18% GST intra-state: CGST = 9%, SGST = 9%. IGST (Integrated GST): Collected by Central Government on inter-state sales and imports — the full 18% goes as IGST instead of being split. IGST is shared between centre and state.",
  },
  {
    question: "What is GST on gold and jewelry in India?",
    answer: "GST on gold and jewelry: Gold (raw) — 3% GST. Silver — 3% GST. Making charges on jewelry — 5% GST (on making charges, not total price). Diamonds (cut and polished) — 0.25% GST. Imitation jewelry — 3% GST. Example: ₹1L gold + ₹5K making charges. GST = ₹1L × 3% + ₹5K × 5% = ₹3,000 + ₹250 = ₹3,250 total GST. Total price = ₹1,08,250.",
  },
  {
    question: "What is GST on real estate?",
    answer: "GST on real estate: Under-construction properties — 5% GST (effective from 2019) without ITC for residential, 12% for affordable housing (below ₹45L stamp value). Ready-to-move/completed properties — 0% GST (no GST on sale of completed property). Land purchase — no GST. Rental income: residential rent exempt from GST. Commercial rent — 18% GST if landlord is GST registered. Note: Stamp duty is separate and not part of GST.",
  },
  {
    question: "What is GST on restaurant food?",
    answer: "GST on restaurants: Non-AC restaurants, takeaways, and delivery — 5% GST (no Input Tax Credit). AC restaurants and restaurants in 5-star hotels — 5% GST (effective from 2019, down from 18%). Alcohol served in restaurants — 18% GST on the food portion (alcohol itself not under GST, taxed by state). Outdoor catering (weddings, events) — 18% GST. Swiggy/Zomato delivery — 5% GST collected at platform level.",
  },
  {
    question: "What is GST on mobile phones and electronics?",
    answer: "GST on electronics: Mobile phones (smartphones) — 18% GST. Laptops, computers, tablets — 18% GST. Earphones/headphones — 18% GST. Televisions (32 inches and below) — 18% GST. Televisions (above 32 inches) — 28% GST. Refrigerators — 18% GST. Washing machines — 18% GST. Air conditioners — 28% GST. Solar panels — 12% GST. LED bulbs and tubes — 12% GST.",
  },
  {
    question: "Who needs to register for GST in India?",
    answer: "GST registration is mandatory for: Businesses with annual turnover above ₹40L (goods) or ₹20L (services) in regular states. ₹10L threshold for NE states. Inter-state suppliers regardless of turnover. E-commerce operators. Casual and non-resident taxable persons. Input service distributors. Voluntary registration is allowed even below threshold. GST number is a 15-digit GSTIN. Registration penalty: up to 10% of tax due or ₹10,000 minimum for not registering when required.",
  },
  {
    question: "What is Input Tax Credit (ITC) in GST?",
    answer: "Input Tax Credit (ITC) allows GST-registered businesses to deduct the GST paid on inputs (purchases) from the GST collected on outputs (sales). Example: Manufacturer buys raw material paying ₹18,000 GST and sells finished goods collecting ₹45,000 GST. Net GST payable = ₹45,000 − ₹18,000 = ₹27,000. This eliminates the 'tax on tax' (cascading effect) from the old VAT/excise regime. Conditions: supplier must have filed their GST return and tax must appear in your GSTR-2A.",
  },
  {
    question: "What is reverse charge mechanism (RCM) in GST?",
    answer: "Reverse Charge Mechanism (RCM): Instead of supplier collecting and paying GST, the receiver (buyer) pays GST directly to the government. Applies when: Buying from unregistered dealers (for notified categories), specific services (legal, GTA transport, import of services), government services. Example: If you pay a lawyer (not GST registered) ₹1L, you must pay 18% GST = ₹18,000 directly to the government under RCM. You can claim ITC for this RCM payment.",
  },
  {
    question: "What is the GST return filing deadline?",
    answer: "GST return filing deadlines: GSTR-1 (outward supplies) — 11th of next month (monthly) or quarterly for QRMP filers. GSTR-3B (summary return with tax payment) — 20th of next month for large taxpayers, 22nd/24th for small. Annual return GSTR-9 — December 31 of next financial year. Composition scheme (GSTR-4) — 30th April annually. Late fee: ₹50/day (₹20/day for nil returns) capped at ₹10,000 per return. Always file on time to avoid interest at 18% per annum on late tax.",
  },
  {
    question: "What is the GST composition scheme?",
    answer: "GST Composition Scheme is for small businesses with turnover ≤ ₹1.5 crore (₹75L for services). Rates: Manufacturers/traders — 1% GST (0.5% CGST + 0.5% SGST), Restaurants — 5%, Service providers — 6%. Benefits: simplified compliance (quarterly filing instead of monthly), fixed low rate, no ITC filing burden. Restrictions: Cannot collect GST from customers, cannot claim ITC, cannot sell inter-state, cannot supply through e-commerce.",
  },
  {
    question: "What is the GST rate on insurance and financial services?",
    answer: "GST on financial services: Term life insurance premium — 18% GST. ULIPs — 18% GST on charges. Health insurance — 18% GST (a key concern — pre-Budget 2025 many requested reduction). Mutual fund management charges — 18% GST. Brokerage on equity/commodity — 18% GST. Bank charges (account maintenance, NEFT, RTGS) — 18% GST. Home loan processing fee — 18% GST. Note: The government is considering reducing GST on health insurance from 18% to lower slabs.",
  },
  {
    question: "How is GST different from VAT?",
    answer: "GST replaced VAT (and other indirect taxes) in India from July 1, 2017. Key differences: GST is a single unified tax vs multiple taxes (VAT, service tax, excise, CST) under old regime. GST allows Input Tax Credit across the supply chain vs VAT's limited ITC. GST is destination-based vs origin-based VAT. One national registration vs state-by-state under VAT. Electronic filing under GST vs paper-based VAT compliance. GST has eliminated the cascading tax effect that added 25–30% to product costs.",
  },
];

export default function GSTPage() {
  return (
    <>
      <JsonLd data={webAppSchema(slug, "GST Calculator", meta.description)} />
      <JsonLd data={faqSchema(FAQS)} />
      <CalculatorShell
        slug={slug}
        h1={meta.h1}
        faqs={FAQS}
        relatedSlugs={["income-tax-calculator", "emi-calculator", "fd-calculator"]}
        content={<GSTContent />}
      >
        <GSTCalculator />
      </CalculatorShell>
    </>
  );
}

function GSTContent() {
  return (
    <>
      <h2>What is a GST Calculator?</h2>
      <p>
        A <strong>GST Calculator</strong> is a free online tool that instantly computes the Goods and Services Tax amount for any transaction in India. It works in two modes: <strong>Add GST</strong> (enter base price, get the final price including GST) and <strong>Remove GST</strong> (enter GST-inclusive price, get original price and GST paid separately). You also get the full CGST + SGST breakdown for intra-state transactions.
      </p>
      <p>
        Whether you&apos;re a business owner creating invoices, a consumer checking what tax you paid, or an accountant reconciling GST returns — this calculator handles all 5 GST slabs instantly: 5%, 12%, 18%, 28%, and more.
      </p>

      <h2>How to Use the GST Calculator</h2>
      <ol>
        <li><strong>Select Mode:</strong> Choose &quot;Add GST&quot; (exclusive price) or &quot;Remove GST&quot; (inclusive price).</li>
        <li><strong>Enter Amount:</strong> Type the price in rupees.</li>
        <li><strong>Select GST Rate:</strong> Choose the applicable slab — 5%, 12%, 18%, 28%, or custom rate.</li>
        <li><strong>Read Results:</strong> See GST amount, CGST, SGST, and final/original price instantly.</li>
      </ol>

      <h2>GST Rates by Product/Service Category</h2>
      <div className="overflow-x-auto my-3">
        <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">GST Rate</th>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Category Examples</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              ["0%", "Fresh vegetables, milk, eggs, books, newspapers, healthcare, educational services"],
              ["3%", "Gold, silver, precious metals, gems and jewelry"],
              ["5%", "Packaged food, coal, economy air tickets, fertilizers, hand tools"],
              ["12%", "Mobile phones, computers, processed food, business class air, medicines"],
              ["18%", "Most services, AC restaurants, electronics, cement, capital goods, insurance"],
              ["28%", "Luxury cars, tobacco, aerated drinks, AC, large TVs (>32\"), casinos"],
            ].map(([rate, examples]) => (
              <tr key={rate} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-2.5 font-bold text-brand whitespace-nowrap">{rate}</td>
                <td className="px-4 py-2.5 text-slate-600 dark:text-slate-300">{examples}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>CGST + SGST Split for Each GST Rate</h2>
      <ul>
        <li><strong>5% GST:</strong> CGST 2.5% + SGST 2.5% (intra-state) or IGST 5% (inter-state)</li>
        <li><strong>12% GST:</strong> CGST 6% + SGST 6% (intra-state) or IGST 12% (inter-state)</li>
        <li><strong>18% GST:</strong> CGST 9% + SGST 9% (intra-state) or IGST 18% (inter-state)</li>
        <li><strong>28% GST:</strong> CGST 14% + SGST 14% (intra-state) or IGST 28% (inter-state)</li>
      </ul>

      <h2>GST Formula</h2>
      <p>
        <strong>Adding GST:</strong> GST Amount = Price × Rate ÷ 100 | Total = Price + GST Amount
      </p>
      <p>
        <strong>Removing GST:</strong> Original Price = Total ÷ (1 + Rate ÷ 100) | GST = Total − Original Price
      </p>
      <p>
        <strong>Example:</strong> ₹50,000 laptop at 18% GST → GST = ₹9,000, Total = ₹59,000. To reverse: ₹59,000 ÷ 1.18 = ₹50,000 original, GST = ₹9,000.
      </p>

      <blockquote>
        <strong>Disclaimer:</strong> GST rates may change per government notifications. Always verify with the official GST portal (gst.gov.in) before filing returns. This GST calculator is for informational purposes only.
      </blockquote>
    </>
  );
}
