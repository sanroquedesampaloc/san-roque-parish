import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { FacebookLiveEmbed } from "@/components/ui/FacebookLiveEmbed";
import { getFacebookEmbedUrl } from "@/lib/facebookEmbed";
import type { PARISH_SETTINGS_QUERY_RESULT } from "../../../sanity.types";

export function LiveMassSection({
  liveStream,
  facebookPageUrl,
}: {
  liveStream: NonNullable<PARISH_SETTINGS_QUERY_RESULT>["liveStream"] | undefined;
  facebookPageUrl: string | null | undefined;
}) {
  const isLive = Boolean(liveStream?.isActive && getFacebookEmbedUrl(liveStream?.facebookUrl));

  if (isLive) {
    return (
      <Section bg="white">
        <Container>
          <div className="max-w-2xl mx-auto text-center mb-10">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-burgundy mb-3">
              <span className="w-2 h-2 rounded-full bg-burgundy" aria-hidden="true" />
              Live
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-charcoal leading-tight">
              {liveStream!.title || "Live Mass"}
            </h2>
            <div className="mt-5 h-px w-12 mx-auto bg-gold/60" aria-hidden="true" />
            {liveStream!.description && (
              <p className="mt-5 text-charcoal-light leading-relaxed">
                {liveStream!.description}
              </p>
            )}
          </div>

          <div className="max-w-3xl mx-auto border border-border">
            <FacebookLiveEmbed
              url={liveStream!.facebookUrl}
              title={liveStream!.title || "Live Mass from San Roque de Sampaloc Parish"}
            />
          </div>

          <div className="mt-8 text-center">
            <ButtonLink href={liveStream!.facebookUrl!} variant="outline">
              Watch on Facebook
            </ButtonLink>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section bg="white">
      <Container>
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-shimmer mb-3">
            Live Mass
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-charcoal leading-tight">
            Join Us in Prayer
          </h2>
          <div className="mt-5 h-px w-12 mx-auto bg-gold/60" aria-hidden="true" />
          <p className="mt-5 text-charcoal-light leading-relaxed">
            There is no live broadcast at this time. Please check the parish
            Facebook page for upcoming livestreams and announcements.
          </p>
          {facebookPageUrl && (
            <div className="mt-8">
              <ButtonLink href={facebookPageUrl} variant="outline">
                Visit Our Facebook Page
              </ButtonLink>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
