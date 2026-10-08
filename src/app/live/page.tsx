import type { Metadata } from "next";
import { fetchLiveStreamData } from "@/lib/liveStreamFetch";
import { getFacebookEmbedUrl } from "@/lib/facebookEmbed";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { LiveMassSection } from "@/components/home/LiveMassSection";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionDivider } from "@/components/ui/SectionDivider";

export const metadata: Metadata = {
  title: "Live Mass",
  description:
    "Watch Mass live from San Roque de Sampaloc Parish, or check our Mass schedule and Facebook page.",
  alternates: { canonical: "/live" },
};

// Bypasses the site's usual on-demand Sanity caching so the live/offline
// state flips automatically within ~30s of a publish — see
// src/lib/liveStreamFetch.ts and docs/DECISIONS.md (ADR-012).
export const revalidate = 30;

export default async function LivePage() {
  const liveStreamData = await fetchLiveStreamData();

  const isLive = Boolean(
    liveStreamData?.liveStream?.isActive &&
      getFacebookEmbedUrl(liveStreamData.liveStream.facebookUrl)
  );

  return (
    <>
      <Breadcrumbs items={[{ name: "Live Mass" }]} />
      <PageHero
        eyebrow={isLive ? "Live Now" : "Live Mass"}
        title="Watch Mass Live"
        subtitle="Join our parish community in prayer, wherever you are."
        motif="cross"
      />

      <LiveMassSection
        liveStream={liveStreamData?.liveStream}
        facebookPageUrl={liveStreamData?.facebookUrl}
      />

      <SectionDivider bg="ivory-warm" />

      <Section bg="warm" spacing="compact">
        <Container>
          <div className="max-w-xl mx-auto text-center">
            <p className="text-charcoal-light leading-relaxed mb-6">
              Not sure when Mass is celebrated in person? View our full Mass
              and confession schedule.
            </p>
            <ButtonLink href="/mass-sacraments" variant="outline">
              View Mass Schedule
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
