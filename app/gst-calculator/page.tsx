import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { webAppSchema, faqSchema, JsonLd } from "@/lib/schemas";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import GSTCalculator from "@/components/gst/GSTCalculator";

export const metadata: Metadata = buildMetadata("gst-calculator");

const FAQS = [
  { question: "What are the GST slabs in India?", answer: "India has 5 GST slabs: 0% (essential goods — fresh food, books), 5% (packaged food, coal, economy air travel), 12% (processed food, computers, business air travel), 18% (most services, electronics, restaurants), and 28% (luxury goods, tobacco, aerated drinks)." },
  { question: "What is the difference between CGST and SGST?", answer: "For intra-state transactions, GST is split equally between CGST (Central GST) and SGST (State GST). Each is half the applicable slab — for 18% GST, CGST = 9% and SGST = 9%. For inter-state transactions, the full slab applies as IGST (Integrated GST)." },
  { question: "How do I calculate GST on a price?", answer: "To add GST: GST Amount = Price × GST Rate / 100. Total = Price + GST Amount. To extract GST from an inclusive price: Original Price = Total / (1 + GST Rate/100). GST Amount = Total − Original Price." },
];

const CONTENT = (
  <>
    <h2>GST Calculator India — All Slabs</h2>
    <p>Calculate GST for any transaction in seconds. Choose whether to add GST to a base price (exclusive) or extract GST from a total price (inclusive). Get the CGST, SGST, and IGST breakdown instantly for all slabs — 0%, 3%, 5%, 12%, 18%, and 28%.</p>
    <h2>GST Rates by Category</h2>
    <ul>
      <li><strong>0%:</strong> Fresh vegetables, milk, eggs, books, newspapers, healthcare services</li>
      <li><strong>5%:</strong> Packaged food, coal, economy air tickets, fertilizers</li>
      <li><strong>12%:</strong> Mobile phones, computers, processed food, business class air tickets</li>
      <li><strong>18%:</strong> Most services, consumer electronics, AC restaurants, cement</li>
      <li><strong>28%:</strong> Luxury cars, tobacco products, aerated drinks, casinos</li>
    </ul>
    <h2>Input Tax Credit (ITC)</h2>
    <p>Businesses registered under GST can claim Input Tax Credit — the GST paid on inputs can be offset against GST collected on outputs. This eliminates the cascading effect of taxes and reduces the overall tax burden in the supply chain.</p>
  </>
);

export default function GSTPage() {
  return (
    <>
      <JsonLd data={webAppSchema("gst-calculator", "GST Calculator", "Calculate GST for all slabs")} />
      <JsonLd data={faqSchema(FAQS)} />
      <CalculatorShell
        slug="gst-calculator"
        h1="GST Calculator — Calculate GST Amount Online"
        faqs={FAQS}
        content={CONTENT}
        relatedSlugs={["income-tax-calculator", "emi-calculator"]}
      >
        <GSTCalculator />
      </CalculatorShell>
    </>
  );
}
