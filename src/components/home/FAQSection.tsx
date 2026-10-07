import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PortableTextRenderer } from "@/components/ui/PortableTextRenderer";
import type { BlockContent } from "../../../sanity.types";

type Faq = {
  _id: string;
  question: string;
  answer: BlockContent;
};

function FAQItem({ faq }: { faq: Faq }) {
  return (
    <details className="group border-b border-border-light py-5 first:pt-0 last:border-0 last:pb-0">
      <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-charcoal font-medium text-base md:text-lg marker:content-none [&::-webkit-details-marker]:hidden">
        {faq.question}
        <svg
          className="w-4 h-4 flex-shrink-0 text-burgundy transition-transform duration-200 group-open:rotate-45"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </summary>
      <div className="pt-3 pr-8 text-charcoal-light text-sm md:text-base leading-relaxed [&_p]:mb-3 [&_p:last-child]:mb-0">
        <PortableTextRenderer value={faq.answer} />
      </div>
    </details>
  );
}

export function FAQSection({ faqs }: { faqs: Faq[] }) {
  if (faqs.length === 0) return null;

  return (
    <Section bg="white">
      <Container>
        <SectionHeading eyebrow="Common Questions" title="Frequently Asked Questions" />
        <div className="max-w-3xl mx-auto bg-white border border-border px-6 md:px-8">
          {faqs.map((faq) => (
            <FAQItem key={faq._id} faq={faq} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
