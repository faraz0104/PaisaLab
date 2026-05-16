import type { Metadata } from "next";
import { SITE_URL_CONST } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy — RupeesCalc",
  description:
    "Privacy Policy for RupeesCalc. Learn how we collect, use, and protect your information when you use our free finance calculators.",
  alternates: { canonical: `${SITE_URL_CONST}/privacy-policy/` },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "May 16, 2026";
const SITE_NAME = "RupeesCalc";
const SITE_URL = "https://www.rupeescalc.in";
const CONTACT_EMAIL = "faraz01041997@gmail.com";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

      {/* Hero */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Privacy Policy
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Last updated: <strong>{LAST_UPDATED}</strong>
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 sm:p-10 prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3 prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-li:text-slate-600 dark:prose-li:text-slate-300">

          <p>
            Welcome to <strong>{SITE_NAME}</strong> ("{SITE_URL}"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this policy carefully. If you disagree with its terms, please discontinue use of the site.
          </p>

          <h2>1. Information We Collect</h2>

          <h3>Information You Provide</h3>
          <p>
            We collect information you voluntarily provide when you contact us through the contact form, including your name, email address, and message content. We do not require account registration to use any calculator on this site.
          </p>

          <h3>Calculator Inputs</h3>
          <p>
            <strong>All calculator inputs and results are processed entirely in your browser (client-side JavaScript).</strong> Your financial data — loan amounts, income, investment figures, tax information — is never transmitted to our servers. We do not store, log, or have access to any financial information you enter into our calculators.
          </p>

          <h3>Automatically Collected Information</h3>
          <p>When you visit our site, we may automatically collect:</p>
          <ul>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Pages visited and time spent on pages</li>
            <li>Referring URL</li>
            <li>IP address (anonymised)</li>
            <li>Country and general location (city-level)</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Operate, maintain, and improve the website</li>
            <li>Respond to your contact form messages and support requests</li>
            <li>Analyse website usage to understand which calculators are most useful</li>
            <li>Monitor for technical errors and fix bugs</li>
            <li>Comply with legal obligations</li>
          </ul>
          <p>
            We do not sell, rent, or trade your personal information to third parties for marketing purposes.
          </p>

          <h2>3. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to improve your experience on our site.
          </p>

          <h3>Google Analytics</h3>
          <p>
            We use Google Analytics to understand how visitors interact with our site. Google Analytics collects anonymised data including pages visited, session duration, and approximate location. Google Analytics uses cookies to track this information. You can opt out of Google Analytics tracking by installing the{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
              Google Analytics Opt-out Browser Add-on
            </a>
            .
          </p>

          <h3>Google AdSense</h3>
          <p>
            We use Google AdSense to display advertisements on our site. Google AdSense uses cookies to show ads based on your prior visits to our site and other sites on the internet. Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to our site. You can opt out of personalised advertising by visiting{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
              Google Ads Settings
            </a>
            .
          </p>

          <h3>Types of Cookies We Use</h3>
          <ul>
            <li><strong>Essential cookies:</strong> Required for the site to function. Cannot be disabled.</li>
            <li><strong>Analytics cookies:</strong> Help us understand usage patterns (Google Analytics).</li>
            <li><strong>Advertising cookies:</strong> Used by Google AdSense to serve relevant ads.</li>
          </ul>
          <p>
            You can control cookies through your browser settings. Disabling cookies may affect site functionality.
          </p>

          <h2>4. Third-Party Services</h2>
          <p>We use the following third-party services that may collect data:</p>
          <ul>
            <li>
              <strong>Google Analytics</strong> — Website analytics. Privacy policy:{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                policies.google.com/privacy
              </a>
            </li>
            <li>
              <strong>Google AdSense</strong> — Advertising. Privacy policy:{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                policies.google.com/privacy
              </a>
            </li>
            <li>
              <strong>Formspree</strong> — Contact form processing. Privacy policy:{" "}
              <a href="https://formspree.io/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">
                formspree.io/legal/privacy-policy
              </a>
            </li>
            <li>
              <strong>Vercel</strong> — Website hosting. Privacy policy:{" "}
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
                vercel.com/legal/privacy-policy
              </a>
            </li>
          </ul>

          <h2>5. Data Retention</h2>
          <p>
            Contact form submissions (name, email, message) sent via Formspree are retained for up to 90 days for the purpose of responding to your inquiry. Analytics data is retained by Google Analytics per their standard retention policies (default 14 months). We do not retain any calculator input data as it is never sent to our servers.
          </p>

          <h2>6. Children&apos;s Privacy</h2>
          <p>
            {SITE_NAME} is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected information from a child under 13, please contact us immediately and we will take steps to delete such information.
          </p>

          <h2>7. Your Rights</h2>
          <p>Depending on your location, you may have the following rights regarding your personal data:</p>
          <ul>
            <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
            <li><strong>Correction:</strong> Request correction of inaccurate data</li>
            <li><strong>Deletion:</strong> Request deletion of your personal data</li>
            <li><strong>Objection:</strong> Object to processing of your personal data</li>
            <li><strong>Portability:</strong> Request transfer of your data in a machine-readable format</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>

          <h2>8. GDPR (European Users)</h2>
          <p>
            If you are located in the European Economic Area (EEA), you have additional rights under the General Data Protection Regulation (GDPR). Our legal basis for processing your data is:
          </p>
          <ul>
            <li><strong>Legitimate interests:</strong> Analytics to improve the site</li>
            <li><strong>Consent:</strong> Advertising cookies (where consent is required)</li>
            <li><strong>Contract:</strong> Processing contact form submissions to respond to your inquiry</li>
          </ul>

          <h2>9. California Privacy Rights (CCPA)</h2>
          <p>
            If you are a California resident, you have the right to know what personal information we collect, the right to delete your personal information, and the right to opt-out of the sale of personal information. We do not sell personal information. To exercise your rights, contact us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>

          <h2>10. Security</h2>
          <p>
            We implement reasonable technical and organisational measures to protect your information. Our site is served over HTTPS (SSL/TLS encryption). However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2>11. Links to Other Websites</h2>
          <p>
            Our site may contain links to third-party websites. We are not responsible for the privacy practices of those sites. We encourage you to review the privacy policy of any site you visit.
          </p>

          <h2>12. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any significant changes by updating the &quot;Last updated&quot; date at the top of this page. Your continued use of the site after changes are posted constitutes your acceptance of the updated policy.
          </p>

          <h2>13. Contact Us</h2>
          <p>
            If you have questions or concerns about this Privacy Policy, please contact us:
          </p>
          <ul>
            <li><strong>Email:</strong> <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
            <li><strong>Website:</strong> <a href={`${SITE_URL}/contact/`}>{SITE_URL}/contact/</a></li>
            <li><strong>Site:</strong> {SITE_NAME} — {SITE_URL}</li>
          </ul>

        </div>
      </div>
    </div>
  );
}
