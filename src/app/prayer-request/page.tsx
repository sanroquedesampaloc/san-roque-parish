import type { Metadata } from "next";
import Link from "next/link";
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
        eyebrow="We Are Here for You"
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
              Your intention is read only by parish staff who help carry these
              requests in prayer. Please share only what feels comfortable —
              there&rsquo;s no need to include sensitive personal details
              (such as medical or financial information) for us to pray for
              you. See our{" "}
              <Link href="/privacy" className="underline hover:text-charcoal-light">
                Privacy Notice
              </Link>{" "}
              for how we handle what you share.
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
