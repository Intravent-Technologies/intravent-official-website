import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Refund and cancellation policy for Intravent Technologies' services and training programs.",
};

export default function Refund() {
  return (
    <>
      <LegalPageLayout
        label="Legal"
        title="Refund Policy"
        lastUpdated="Last updated: May 1, 2026"
        sections={[
          {
            title: "General Policy",
            content: (
              <p>
                At Intravent Technologies, we are committed to delivering
                high-quality services. This refund policy outlines the terms under
                which refunds may be issued for our services and training programs.
                Each category of service may have specific terms as detailed below.
              </p>
            ),
          },
          {
            title: "Software Development Services",
            content: (
              <p>
                For custom software development projects, payments are tied to
                milestone deliverables as defined in the project agreement. Refunds
                for incomplete work are handled on a case-by-case basis depending
                on the stage of completion and reason for termination. Partial
                refunds may be applicable for milestones not yet started. Any
                refund will be calculated after deducting the value of completed
                and delivered work.
              </p>
            ),
          },
          {
            title: "PMP Training Program",
            content: (
              <>
                <p>
                  For PMP training programs, the following cancellation and refund
                  terms apply:
                </p>
                <ul className="list-disc pl-6 space-y-1.5">
                  <li>
                    Cancellations made 14 or more days before the start date: full
                    refund minus a 5% processing fee.
                  </li>
                  <li>
                    Cancellations made 7&ndash;13 days before the start date: 50%
                    refund of the total program fee.
                  </li>
                  <li>
                    Cancellations made less than 7 days before the start date: no
                    refund, but credit toward a future session may be offered at our
                    discretion.
                  </li>
                  <li>
                    If Intravent Technologies cancels a session, participants
                    receive a full refund or may transfer to another session at no
                    additional cost.
                  </li>
                </ul>
              </>
            ),
          },
          {
            title: "Digital Products",
            content: (
              <p>
                Due to the nature of digital products, all sales of digital
                downloads, templates, and software licenses are final and
                non-refundable unless the product is found to be defective. If you
                experience a technical issue with a digital product, please contact
                us and we will work to resolve the issue promptly.
              </p>
            ),
          },
          {
            title: "Refund Process",
            content: (
              <p>
                To request a refund, please contact us at{" "}
                <a
                  href="mailto:billing@intravent.com"
                  className="text-brand-purple hover:underline"
                >
                  billing@intravent.com
                </a>{" "}
                with your order details and reason for the request. We will
                review and respond within 5&ndash;7 business days. Approved refunds
                will be processed within 10 business days and credited to the
                original payment method.
              </p>
            ),
          },
          {
            title: "Exceptions",
            content: (
              <p>
                Refund requests outside the stated periods may be considered in
                exceptional circumstances at the sole discretion of Intravent
                Technologies. All refund decisions are final and non-negotiable.
              </p>
            ),
          },
        ]}
      />
      <CTASection
        title="Questions About Your Payment?"
        description="Our billing team is ready to help with any questions about refunds, invoices, or payment terms."
      />
    </>
  );
}
