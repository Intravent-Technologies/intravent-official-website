import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Intravent Technologies. Learn how we collect, use, and protect your data.",
};

export default function Privacy() {
  return (
    <>
      <LegalPageLayout
        label="Legal"
        title="Privacy Policy"
        lastUpdated="Last updated: May 1, 2026"
        sections={[
          {
            title: "Information We Collect",
            content: (
              <p>
                We collect information you provide directly to us, including name,
                email address, company name, and project details when you fill out
                forms on our website or communicate with us. We also automatically
                collect certain technical information about your device and usage
                patterns, including IP address, browser type, and pages visited.
              </p>
            ),
          },
          {
            title: "How We Use Your Information",
            content: (
              <>
                <p>
                  We use the information we collect for the following purposes:
                </p>
                <ul className="list-disc pl-6 space-y-1.5">
                  <li>To provide, maintain, and improve our services and deliverables</li>
                  <li>To communicate with you about your projects, inquiries, and account status</li>
                  <li>To send relevant marketing communications and product updates, with your consent</li>
                  <li>To analyze usage trends and improve the functionality of our website</li>
                  <li>To comply with legal obligations and enforce our terms of service</li>
                  <li>To detect, prevent, and address technical issues or fraudulent activity</li>
                </ul>
              </>
            ),
          },
          {
            title: "Data Sharing and Disclosure",
            content: (
              <p>
                We do not sell your personal information. We may share your data
                with trusted service providers who assist us in operating our
                business, including hosting providers, analytics platforms, and
                communication tools. We may also disclose information when
                required by law or to protect our rights and safety.
              </p>
            ),
          },
          {
            title: "Data Security",
            content: (
              <p>
                We implement appropriate technical and organizational measures to
                protect your personal information against unauthorized access,
                alteration, disclosure, or destruction. This includes encryption
                in transit and at rest, access controls, regular security
                assessments, and employee training on data protection.
              </p>
            ),
          },
          {
            title: "Your Rights",
            content: (
              <p>
                Depending on your jurisdiction, you may have rights to access,
                correct, delete, or port your personal data. You may also object
                to or restrict certain processing activities. To exercise these
                rights, please contact us at the email address below. We will
                respond to your request within applicable timeframes.
              </p>
            ),
          },
          {
            title: "Cookies",
            content: (
              <p>
                We use cookies and similar tracking technologies to enhance your
                browsing experience, analyze website traffic, and understand where
                our visitors come from. You can control cookie preferences through
                your browser settings. For more details, please see our{" "}
                <a href="/cookies" className="text-brand-purple hover:underline">
                  Cookie Policy
                </a>
                .
              </p>
            ),
          },
          {
            title: "Contact Us",
            content: (
              <p>
                For questions about this privacy policy or to exercise your data
                rights, please contact our Data Protection Officer at{" "}
                <a
                  href="mailto:privacy@intravent.com"
                  className="text-brand-purple hover:underline"
                >
                  privacy@intravent.com
                </a>
                .
              </p>
            ),
          },
        ]}
      />
      <CTASection
        title="Your Privacy Matters"
        description="We take data protection seriously. Reach out to our team if you have any questions about how we handle your information."
      />
    </>
  );
}
