import type { Metadata } from "next";
import { SITE_URL_CONST } from "@/lib/seo";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us — RupeesCalc",
  description:
    "Get in touch with the RupeesCalc team. Report a bug, request a new calculator, give feedback, or ask any question about our free Indian finance calculators.",
  alternates: { canonical: `${SITE_URL_CONST}/contact/` },
  openGraph: {
    type: "website",
    url: `${SITE_URL_CONST}/contact/`,
    title: "Contact Us — RupeesCalc",
    description: "Get in touch with the RupeesCalc team. Report bugs, suggest calculators, or share feedback.",
    siteName: "RupeesCalc",
  },
};

const faqs = [
  {
    q: "Is RupeesCalc free?",
    a: "Yes — 100% free, forever. No signup, no premium tier, no hidden charges. All 12 calculators are fully free for everyone.",
  },
  {
    q: "Are the calculations accurate?",
    a: "Our calculators use standard mathematical formulas (EMI formula, SIP compound interest, FY 2025-26 tax slabs). Results are estimates for planning purposes. Always verify with your bank or CA before making financial decisions.",
  },
  {
    q: "Can you add a new calculator?",
    a: "Absolutely — use the contact form and describe the calculator you need. We prioritize requests that many users ask for. Popular requests: PPF calculator, NPS calculator, HRA calculator.",
  },
  {
    q: "I found a bug — how do I report it?",
    a: "Use the contact form below and select 'Bug Report'. Describe what you entered, what you expected, and what you got. Screenshots are helpful.",
  },
  {
    q: "Do you store my financial data?",
    a: "No. All calculations happen in your browser. No financial data is sent to our servers. We only use anonymised analytics (page views) for improving the site.",
  },
  {
    q: "Can I use RupeesCalc results in my financial plan?",
    a: "Yes, for personal planning. Results are for educational purposes and should not replace professional financial advice from a SEBI-registered advisor or Chartered Accountant.",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

      {/* Hero */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-full px-4 py-1.5 text-sm text-emerald-700 dark:text-emerald-400 font-medium mb-5">
            We&apos;d love to hear from you
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Contact Us
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Bug report, calculator request, feedback, or just a hello — we read every message.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid lg:grid-cols-5 gap-8">

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Send a Message</h2>
              <ContactForm />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-5">

            {/* Direct email */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="text-xl">✉️</span> Email Us Directly
              </h3>
              <a
                href="mailto:faraz01041997@gmail.com"
                className="text-brand font-medium hover:underline break-all"
              >
                faraz01041997@gmail.com
              </a>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                We typically respond within 24–48 hours on business days.
              </p>
            </div>

            {/* Response time */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="text-xl">⏱️</span> Response Time
              </h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  Bug reports — within 24 hours
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  Feature requests — within 48 hours
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-400 shrink-0" />
                  General feedback — within 72 hours
                </li>
              </ul>
            </div>

            {/* What to include */}
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6">
              <h3 className="font-bold text-emerald-800 dark:text-emerald-300 mb-3 flex items-center gap-2">
                <span className="text-xl">💡</span> For Bug Reports
              </h3>
              <p className="text-sm text-emerald-800 dark:text-emerald-400 leading-relaxed">
                Please include: the calculator name, the values you entered, what result you expected, and what result you got. A screenshot helps us reproduce and fix faster.
              </p>
            </div>

          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Frequently Asked Questions</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {faqs.map((item) => (
              <div key={item.q} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-sm">{item.q}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
