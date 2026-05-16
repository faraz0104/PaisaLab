import { Suspense } from "react";
import type { Metadata } from "next";
import { SITE_URL_CONST } from "@/lib/seo";
import { webAppSchema, faqSchema, JsonLd } from "@/lib/schemas";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import CurrencyConverter from "@/components/currency/CurrencyConverter";

const slug = "currency-converter";
const title = "Currency Converter — Free Live Exchange Rates";
const description =
  "Free currency converter with live exchange rates. Convert between USD, EUR, GBP, INR, AUD, CAD, JPY and 24 more currencies. Instant conversion, no signup required.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "currency converter",
    "currency converter online",
    "currency converter free",
    "live exchange rate converter",
    "USD to INR converter",
    "USD to EUR converter",
    "EUR to GBP converter",
    "GBP to INR converter",
    "currency exchange calculator",
    "foreign exchange calculator",
    "exchange rate today",
    "currency conversion calculator",
    "money converter",
    "forex calculator",
    "currency converter 2025",
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
    question: "How does a currency converter work?",
    answer: "A currency converter uses live exchange rates to calculate how much one currency is worth in another. Exchange rates change constantly based on global forex markets. Formula: Converted Amount = Original Amount × Exchange Rate. Example: To convert $500 to INR at 84.0 rate: 500 × 84.0 = ₹42,000. Our converter fetches live rates automatically and shows you an accurate conversion instantly.",
  },
  {
    question: "What is an exchange rate?",
    answer: "An exchange rate is the price of one currency in terms of another. Example: USD/INR = 84.0 means 1 US Dollar = 84 Indian Rupees. Exchange rates are determined by supply and demand in global forex markets and change every second during trading hours. There are two types: Spot rate (current market rate) and Forward rate (agreed rate for future transaction). The rates shown in our converter are mid-market rates — the midpoint between buy and sell rates, which is the fairest comparison rate.",
  },
  {
    question: "Why do banks charge more than the calculator shows?",
    answer: "Banks and money transfer services add a markup on top of the mid-market rate — this is how they profit. A bank might show you USD/INR = 82.5 when the actual mid-market rate is 84.0. That 1.5 rupee difference on every dollar is their margin. For a $1,000 transfer, that's ₹1,500 extra. Services like Wise (TransferWise), Revolut, and Zerodha offer rates much closer to mid-market. Our calculator shows mid-market rates as a reference — actual rates at banks/transfer services will be slightly different.",
  },
  {
    question: "What is the USD to INR exchange rate today?",
    answer: "The USD to INR exchange rate fluctuates daily based on global forex markets. As of 2025, 1 USD ≈ 83–86 INR. Our currency converter fetches live rates automatically — just select USD and INR to see the current rate. The INR has generally been depreciating against USD over the long term due to India's higher inflation rate compared to the US. RBI (Reserve Bank of India) occasionally intervenes in forex markets to prevent excessive volatility.",
  },
  {
    question: "How often are exchange rates updated?",
    answer: "Forex markets operate 24/5 (24 hours, 5 days a week), closing on weekends. The mid-market exchange rate changes every second during trading hours. Our currency converter fetches the latest available rates daily from an open exchange rate data source. For critical financial transactions (large transfers, international payments), always verify with your bank or a licensed forex dealer as rates can vary by the minute.",
  },
  {
    question: "What is the best way to convert currency?",
    answer: "Options ranked by exchange rate quality: Best rates: Wise (TransferWise), Revolut, OFX — use near mid-market rates with transparent fees. Good rates: Online forex dealers, online banking transfers. Average rates: Airport kiosks, traditional banks — typically 3–8% markup. Worst rates: Hotel desks, tourist area exchange counters — up to 15% markup. For large amounts (>$1,000): compare multiple services. For travel: use a no-foreign-transaction-fee credit card or multi-currency prepaid card. Avoid exchanging large amounts at airports.",
  },
  {
    question: "What currencies can I convert?",
    answer: "Our currency converter supports 30 major world currencies: USD (US Dollar), EUR (Euro), GBP (British Pound), INR (Indian Rupee), AUD (Australian Dollar), CAD (Canadian Dollar), JPY (Japanese Yen), CHF (Swiss Franc), CNY (Chinese Yuan), SGD (Singapore Dollar), AED (UAE Dirham), SAR (Saudi Riyal), HKD (Hong Kong Dollar), NZD (New Zealand Dollar), MXN (Mexican Peso), BRL (Brazilian Real), ZAR (South African Rand), KRW (South Korean Won), THB (Thai Baht), MYR (Malaysian Ringgit), IDR (Indonesian Rupiah), PKR (Pakistani Rupee), BDT (Bangladeshi Taka), NGN (Nigerian Naira), EGP (Egyptian Pound), TRY (Turkish Lira), SEK (Swedish Krona), NOK (Norwegian Krone), DKK (Danish Krone), PLN (Polish Zloty).",
  },
  {
    question: "What is a mid-market rate?",
    answer: "The mid-market rate (also called the interbank rate or real exchange rate) is the midpoint between the buying and selling price of a currency in global forex markets. It's the 'true' exchange rate that banks use when trading with each other. Example: If a bank buys USD at 83.5 INR and sells at 84.5 INR, the mid-market rate is 84.0 INR. When you exchange currency at a bank, you'll get a rate worse than mid-market — the difference is the bank's profit margin. Always compare the rate you're offered against the mid-market rate to understand the true cost of conversion.",
  },
  {
    question: "How much is 1 USD in Indian Rupees?",
    answer: "As of 2025, 1 US Dollar (USD) is approximately 83–86 Indian Rupees (INR). Use our live currency converter above for the exact current rate. Historical context: In 2000, 1 USD = ~45 INR. In 2010, 1 USD = ~46 INR. In 2015, 1 USD = ~65 INR. In 2020, 1 USD = ~75 INR. In 2024, 1 USD = ~83–84 INR. The rupee has depreciated significantly over decades due to India's higher inflation relative to the US. The RBI manages the rate to prevent excessive volatility.",
  },
  {
    question: "What affects currency exchange rates?",
    answer: "Key factors that move exchange rates: Interest rates — higher rates attract foreign investment, strengthening the currency. Inflation — higher inflation weakens a currency over time. Economic growth — stronger GDP growth attracts investment. Trade balance — countries exporting more than they import see stronger currencies. Political stability — uncertainty weakens currencies. Central bank intervention — governments buy/sell their own currency to manage rates. Market speculation — large institutional traders can move rates. Example: When the US Fed raises interest rates, the USD typically strengthens against emerging market currencies like INR, as global capital flows toward higher US yields.",
  },
  {
    question: "Is there a fee for using this currency converter?",
    answer: "No — this currency converter is completely free to use, with no signup, no registration, and no hidden fees. It shows mid-market exchange rates for reference. This calculator does not facilitate actual currency exchange transactions. For actual money transfers or currency exchange, you'll need to use a bank, money transfer service, or licensed forex dealer — those services may charge fees and offer different rates than the mid-market reference rate shown here.",
  },
];

export default function CurrencyConverterPage() {
  return (
    <>
      <JsonLd data={webAppSchema(slug, title, description)} />
      <JsonLd data={faqSchema(FAQS)} />
      <CalculatorShell
        slug={slug}
        h1={title}
        faqs={FAQS}
        relatedSlugs={["compound-interest-calculator", "percentage-calculator", "mortgage-calculator", "retirement-calculator"]}
        content={<CurrencyContent />}
      >
        <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl" />}>
          <CurrencyConverter />
        </Suspense>
      </CalculatorShell>
    </>
  );
}

function CurrencyContent() {
  return (
    <>
      <h2>What is a Currency Converter?</h2>
      <p>
        A <strong>currency converter</strong> calculates how much one currency is worth in another using live exchange rates. Our free converter supports 30 major world currencies with daily rate updates — no signup required.
      </p>

      <h2>Major Currency Pairs — Reference Rates</h2>
      <div className="overflow-x-auto my-3">
        <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Pair</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Approx Rate</th>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300 pl-6">Pair</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Approx Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              ["USD/INR", "~84.0", "EUR/INR", "~90.5"],
              ["USD/EUR", "~0.93", "GBP/INR", "~107"],
              ["USD/GBP", "~0.79", "USD/JPY", "~154"],
              ["USD/CAD", "~1.37", "USD/AUD", "~1.57"],
              ["USD/SGD", "~1.35", "USD/AED", "~3.67"],
            ].map(([p1, r1, p2, r2]) => (
              <tr key={p1} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-200">{p1}</td>
                <td className="px-4 py-2.5 text-right text-brand font-semibold">{r1}</td>
                <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-200 pl-6">{p2}</td>
                <td className="px-4 py-2.5 text-right text-brand font-semibold">{r2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">Approximate mid-market rates as of 2025. Use the live converter above for current rates.</p>

      <h2>Currency Conversion Formula</h2>
      <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 font-mono text-sm my-3">
        Converted Amount = Original Amount × (Rate of Target ÷ Rate of Source)
      </div>
      <p>All rates are stored relative to USD. To convert EUR to INR: first convert EUR → USD, then USD → INR.</p>

      <blockquote>
        <strong>Disclaimer:</strong> Exchange rates are for informational purposes only and may differ from rates offered by banks or money transfer services. Always verify with your financial institution before making international transfers or financial decisions.
      </blockquote>
    </>
  );
}
