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
import { organizationSchema, JsonLd } from "@/lib/schemas";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME_CONST} — Free Indian Finance Calculators`,
    template: `%s | ${SITE_NAME_CONST}`,
  },
  description: SITE_DESCRIPTION_CONST,
  metadataBase: new URL(SITE_URL_CONST),
  keywords: [
    "SIP calculator",
    "EMI calculator",
    "income tax calculator",
    "GST calculator",
    "FD calculator",
    "home loan calculator",
    "mutual fund calculator India",
  ],
  authors: [{ name: SITE_NAME_CONST }],
  creator: SITE_NAME_CONST,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL_CONST,
    siteName: SITE_NAME_CONST,
    title: `${SITE_NAME_CONST} — Free Indian Finance Calculators`,
    description: SITE_DESCRIPTION_CONST,
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
    title: `${SITE_NAME_CONST} — Free Indian Finance Calculators`,
    description: SITE_DESCRIPTION_CONST,
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
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
