import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PrayerRequestForm } from "@/components/ui/PrayerRequestForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Prayer Request",
  description:
    "Share a prayer intention with the San Roque de Sampaloc Parish community.",
};

export default function PrayerRequestPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Prayer Request" }]} />
      <PageHero
        title="Prayer Request"
        subtitle="Share a prayer intention with the parish community."
      />

      {/* Prayer Request Form */}
      <Section bg="default">
        <Container>
          <PrayerRequestForm />

          {/* Privacy guidance */}
          <div className="max-w-2xl mx-auto mt-8 pt-6 border-t border-border-light">
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Please avoid including sensitive personal information that is not
              necessary for your prayer request.
            </p>
          </div>
        </Container>
      </Section>

      {/* Fallback CTA */}
      <Section bg="warm" spacing="compact">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <div
              className="w-px h-8 bg-gold/40 mx-auto mb-6"
              aria-hidden="true"
            />
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-dark mb-4">
              Parish Office
            </h2>
            <p className="text-lg md:text-xl font-serif text-charcoal leading-relaxed">
              You may also share your prayer intentions in person or by
              contacting us directly.
            </p>
            <div className="mt-6">
              <ButtonLink href="/contact" variant="outline">
                Contact the Parish Office
              </ButtonLink>
            </div>
            <div
              className="w-px h-8 bg-gold/40 mx-auto mt-6"
              aria-hidden="true"
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
