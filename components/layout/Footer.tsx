import Link from "next/link";
import { ALL_CALCULATORS } from "@/lib/seo";

const categories = ["Investment", "Loans", "Tax", "Savings"] as const;

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white font-bold text-sm">
                ₹
              </div>
              <span className="font-bold text-xl text-white">
                Paisa<span className="text-brand">Lab</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Free financial calculators built for India. Fast, accurate, mobile-friendly.
            </p>
            <p className="text-xs mt-4 text-slate-500">
              © {new Date().getFullYear()} PaisaLab. All rights reserved.
            </p>
          </div>

          {/* Calculator columns */}
          {categories.map((cat) => (
            <div key={cat}>
              <h3 className="text-white font-semibold text-sm mb-3">{cat}</h3>
              <ul className="space-y-2">
                {ALL_CALCULATORS.filter((c) => c.category === cat).map((calc) => (
                  <li key={calc.slug}>
                    <Link
                      href={`/${calc.slug}/`}
                      className="text-sm hover:text-brand transition-colors"
                    >
                      {calc.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500">
          <div className="flex gap-4">
            <Link href="/about/" className="hover:text-slate-300 transition-colors">About</Link>
            <Link href="/privacy/" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/disclaimer/" className="hover:text-slate-300 transition-colors">Disclaimer</Link>
            <Link href="/contact/" className="hover:text-slate-300 transition-colors">Contact</Link>
          </div>
          <p>
            Calculations are for informational purposes only. Not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
