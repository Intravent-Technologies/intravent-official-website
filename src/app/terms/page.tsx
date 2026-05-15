import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions for using Intravent Technologies' website and services.",
};

export default function Terms() {
  return (
    <>
      <LegalPageLayout
        label="Legal"
        title="Terms &amp; Conditions"
        lastUpdated="Last updated: May 1, 2026"
        sections={[
          {
            title: "Introduction",
            content: (
              <p>
                Welcome to Intravent Technologies. These Terms &amp; Conditions
                govern your use of our website, products, and services. By
                accessing or using our services, you agree to be bound by these
                terms. If you do not agree with any part of these terms, you
                should not use our services.
              </p>
            ),
          },
          {
            title: "Definitions",
            content: (
              <p>
                &ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; and
                &ldquo;our&rdquo; refer to Intravent Technologies.
                &ldquo;Services&rdquo; refers to all products, software, and
                consulting provided by Intravent Technologies. &ldquo;User,&rdquo;
                &ldquo;you,&rdquo; and &ldquo;your&rdquo; refer to the individual
                or entity using our services. &ldquo;Content&rdquo; refers to any
                text, graphics, images, or software made available through our
                services.
              </p>
            ),
          },
          {
            title: "Use of Services",
            content: (
              <p>
                You agree to use our services only for lawful purposes and in
                accordance with these terms. You are responsible for maintaining
                the confidentiality of your account credentials and for all
                activities that occur under your account. You may not use our
                services to transmit any harmful code, engage in unauthorized
                access, or violate applicable laws.
              </p>
            ),
          },
          {
            title: "Intellectual Property",
            content: (
              <p>
                All content, designs, code, and materials provided as part of
                our services are the intellectual property of Intravent
                Technologies unless otherwise stated. You may not reproduce,
                distribute, or create derivative works without our express
                written consent. All trademarks and brand assets remain the
                exclusive property of their respective owners.
              </p>
            ),
          },
          {
            title: "Limitation of Liability",
            content: (
              <p>
                Intravent Technologies shall not be liable for any indirect,
                incidental, special, consequential, or punitive damages arising
                from your use of our services. Our total liability for any
                claims shall not exceed the amount paid by you for the specific
                service giving rise to the claim. Some jurisdictions do not
                allow certain limitations, so these may not apply to you.
              </p>
            ),
          },
          {
            title: "Governing Law",
            content: (
              <p>
                These terms shall be governed by and construed in accordance
                with the laws of the State of California, without regard to its
                conflict of law provisions. Any disputes arising under these
                terms shall be resolved in the courts of San Francisco County,
                California.
              </p>
            ),
          },
          {
            title: "Changes to Terms",
            content: (
              <p>
                We reserve the right to modify these terms at any time. We will
                notify users of material changes via email or through our
                website. Continued use of our services after changes constitutes
                acceptance of the new terms. We encourage you to review this
                page periodically.
              </p>
            ),
          },
          {
            title: "Contact",
            content: (
              <p>
                For questions about these terms, please contact us at{" "}
                <a
                  href="mailto:legal@intravent.com"
                  className="text-brand-purple hover:underline"
                >
                  legal@intravent.com
                </a>
                .
              </p>
            ),
          },
        ]}
      />
      <CTASection
        title="Have Questions About Our Terms?"
        description="Our team is happy to clarify any questions about how our services work and what you can expect."
      />
    </>
  );
}
