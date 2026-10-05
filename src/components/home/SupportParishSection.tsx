import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PortableTextRenderer } from "@/components/ui/PortableTextRenderer";
import type { BlockContent } from "../../../sanity.types";

export function SupportParishSection({
  settings,
}: {
  settings: {
    givingInfo: BlockContent | null;
  } | null;
}) {
  return (
    <Section bg="white">
      <Container>
        <SectionHeading
          title="Support Our Parish"
          subtitle="Your generosity sustains our community of faith"
        />
        <div className="max-w-4xl mx-auto">
          <div className="md:flex md:items-start md:gap-10">
            <div className="hidden md:flex md:w-1/4 justify-center pt-2">
              <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center">
                <svg className="w-10 h-10 text-gold-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="md:w-3/4">
              {settings?.givingInfo ? (
                <div className="bg-ivory rounded-xl p-6 md:p-8 border border-border">
                  <PortableTextRenderer value={settings.givingInfo} />
                </div>
              ) : (
                <div className="bg-ivory rounded-xl p-6 md:p-8 border border-border text-center md:text-left">
                  <p className="text-charcoal-light leading-relaxed text-lg">
                    For information about how to support the parish, please visit the
                    parish office or contact us directly.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
