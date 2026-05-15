import type { Metadata } from "next";
import Section from "@/components/Section";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Cookie policy for Intravent Technologies. Learn about how we use cookies on our website.",
};

export default function CookiePolicy() {
  return (
    <>
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-soft-grid opacity-[0.02]" />
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full border border-brand-purple/10 animate-float-slow" />
        <div className="absolute bottom-10 right-20 w-48 h-48 rounded-full border border-brand-navy/10 animate-float" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-6 bg-brand-purple/40" />
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-purple">
                Legal
              </span>
              <span className="h-px w-6 bg-brand-purple/40" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-navy tracking-tight mb-6">
              Cookie Policy
            </h1>
            <p className="text-text-secondary">
              Last updated: May 1, 2026
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-brand-navy mb-3">
              1. What Are Cookies
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Cookies are small text files that are placed on your device when
              you visit a website. They are widely used to make websites work
              more efficiently and provide information to website owners.
              Cookies enable us to recognize your device, remember your
              preferences, and improve your browsing experience.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-brand-navy mb-3">
              2. How We Use Cookies
            </h2>
            <p className="text-text-secondary leading-relaxed mb-3">
              Intravent Technologies uses cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-text-secondary leading-relaxed">
              <li>
                <strong>Essential Cookies:</strong> Required for the basic
                functionality of our website, including navigation and access to
                secure areas. The site cannot function properly without them.
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Help us understand how
                visitors interact with our website by collecting anonymous
                information about pages visited, time spent, and error messages
                encountered.
              </li>
              <li>
                <strong>Functional Cookies:</strong> Remember your preferences
                and settings to provide enhanced, personalized functionality
                across sessions.
              </li>
              <li>
                <strong>Marketing Cookies:</strong> Used to deliver relevant
                advertisements and measure the effectiveness of our marketing
                campaigns across different platforms.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-brand-navy mb-3">
              3. Types of Cookies We Use
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border-light">
                    <th className="text-left py-3 pr-4 font-semibold text-brand-navy">
                      Cookie Type
                    </th>
                    <th className="text-left py-3 pr-4 font-semibold text-brand-navy">
                      Purpose
                    </th>
                    <th className="text-left py-3 font-semibold text-brand-navy">
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light">
                  <tr>
                    <td className="py-3 pr-4 text-text-secondary">session_id</td>
                    <td className="py-3 pr-4 text-text-secondary">
                      Maintains your session state across page requests
                    </td>
                    <td className="py-3 text-text-secondary">Session</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-text-secondary">_ga</td>
                    <td className="py-3 pr-4 text-text-secondary">
                      Google Analytics &mdash; distinguishes unique users
                    </td>
                    <td className="py-3 text-text-secondary">2 years</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-text-secondary">_gid</td>
                    <td className="py-3 pr-4 text-text-secondary">
                      Google Analytics &mdash; distinguishes unique users per day
                    </td>
                    <td className="py-3 text-text-secondary">24 hours</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-text-secondary">preferences</td>
                    <td className="py-3 pr-4 text-text-secondary">
                      Stores your user preferences and display settings
                    </td>
                    <td className="py-3 text-text-secondary">1 year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-brand-navy mb-3">
              4. Third-Party Cookies
            </h2>
            <p className="text-text-secondary leading-relaxed">
              We may use third-party services such as Google Analytics and HubSpot
              that place their own cookies on your device. These third parties
              have their own cookie policies governing the use of data. We
              encourage you to review their policies for more information about
              how they handle your data.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-brand-navy mb-3">
              5. Managing Cookies
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Most web browsers allow you to control cookies through their
              settings. You can usually choose to block all cookies, delete
              existing cookies, or receive a notification when a new cookie is
              placed. Please note that disabling certain cookies may affect the
              functionality and performance of our website.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-brand-navy mb-3">
              6. Changes to This Policy
            </h2>
            <p className="text-text-secondary leading-relaxed">
              We may update this cookie policy from time to time to reflect
              changes in technology, regulation, or our business practices. Any
              changes will be posted on this page with an updated revision date.
              We encourage you to review this policy periodically.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-brand-navy mb-3">
              7. Contact
            </h2>
            <p className="text-text-secondary leading-relaxed">
              If you have questions about our use of cookies, please contact us
              at{" "}
              <a
                href="mailto:privacy@intravent.com"
                className="text-brand-purple hover:underline"
              >
                privacy@intravent.com
              </a>
              .
            </p>
          </div>
        </div>
      </Section>

      <CTASection
        title="Transparency in Everything We Do"
        description="We believe in clear communication. If you have any questions about cookies or your privacy, we are here to help."
      />
    </>
  );
}
