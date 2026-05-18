import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  SITE_NAME_CONST,
  SITE_DESCRIPTION_CONST,
  SITE_URL_CONST,
} from "@/lib/seo";
import { organizationSchema, websiteSchema, JsonLd } from "@/lib/schemas";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const HOME_TITLE = "Finance Calculators India 2026 — SIP, EMI, Tax, GST, FD";
const HOME_DESC = "22 free finance calculators for India. SIP, EMI, income tax, GST, FD, home loan, PPF, NPS, HRA, gratuity, salary. Instant results, live charts, FY 2025-26. No signup.";

export const metadata: Metadata = {
  title: {
    default: HOME_TITLE,
    template: `%s | ${SITE_NAME_CONST}`,
  },
  description: HOME_DESC,
  metadataBase: new URL(SITE_URL_CONST),
  keywords: [
    "SIP calculator",
    "EMI calculator",
    "income tax calculator",
    "GST calculator",
    "FD calculator",
    "home loan calculator",
    "PPF calculator",
    "NPS calculator",
    "HRA calculator",
    "gratuity calculator",
    "salary calculator India",
    "mutual fund calculator India",
    "finance calculators India 2026",
  ],
  authors: [{ name: "RupeesCalc Editorial Team", url: `${SITE_URL_CONST}/about/` }],
  creator: SITE_NAME_CONST,
  alternates: {
    canonical: SITE_URL_CONST,
    languages: {
      "en-IN": SITE_URL_CONST,
      "en": SITE_URL_CONST,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL_CONST,
    siteName: SITE_NAME_CONST,
    title: HOME_TITLE,
    description: HOME_DESC,
    images: [
      {
        url: `${SITE_URL_CONST}/og/home.png`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME_CONST} — Finance Calculators`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESC,
    images: [`${SITE_URL_CONST}/og/home.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "muDAFGh9fj8FtHqlHAmRTqlhHgGiSET6T2oA4-wbFek",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MKL1LTQRQW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MKL1LTQRQW');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
