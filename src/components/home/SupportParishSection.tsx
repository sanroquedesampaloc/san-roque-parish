import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { PortableTextRenderer } from "@/components/ui/PortableTextRenderer";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { BlockContent } from "../../../sanity.types";

export function SupportParishSection({
  settings,
}: {
  settings: {
    givingInfo: BlockContent | null;
  } | null;
}) {
  return (
    <Section bg="warm">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-start">
            <div className="md:col-span-2">
              <div className="w-px h-8 bg-gold mb-6" aria-hidden="true" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark mb-3">
                Stewardship
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold text-charcoal mb-4 leading-snug">
                Support Our Parish
              </h2>
              <p className="text-charcoal-light leading-relaxed mb-6">
                Your generosity sustains our community of faith, enabling us to serve and worship together.
              </p>
              <ButtonLink href="/contact" variant="primary">
                Support the Parish
              </ButtonLink>
            </div>

            <div className="md:col-span-3">
              {settings?.givingInfo ? (
                <div className="bg-white p-6 md:p-8 border border-border">
                  <PortableTextRenderer value={settings.givingInfo} />
                </div>
              ) : (
                <div className="bg-white p-6 md:p-8 border border-border">
                  <p className="text-charcoal-light leading-relaxed">
                    For information about how to support the parish through tithes, offerings, or other contributions, please visit the parish office or contact us directly.
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
