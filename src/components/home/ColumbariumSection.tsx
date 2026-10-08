import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PortableTextRenderer } from "@/components/ui/PortableTextRenderer";
import Link from "next/link";
import type { COLUMBARIUM_TEASER_QUERY_RESULT } from "../../../sanity.types";

const INQUIRY_HREF = "/contact?subject=Columbarium%20Inquiry";

export function ColumbariumSection({
  columbarium,
}: {
  columbarium: COLUMBARIUM_TEASER_QUERY_RESULT;
}) {
  if (!columbarium?.title) return null;

  const hasImage = Boolean(columbarium.heroImage?.asset);

  if (!hasImage) {
    return (
      <Section bg="warm">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-shimmer mb-3">
              {columbarium.eyebrow || "Columbarium"}
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-charcoal leading-tight">
              {columbarium.title}
            </h2>
            <div className="mt-5 h-px w-12 mx-auto bg-gold/60" aria-hidden="true" />
            {columbarium.introduction && (
              <div className="mt-6 text-charcoal-light leading-relaxed [&_p]:mb-0">
                <PortableTextRenderer value={columbarium.introduction} />
              </div>
            )}
            {columbarium.locationDescription && (
              <p className="mt-3 text-sm text-charcoal-muted">
                {columbarium.locationDescription}
              </p>
            )}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              <ButtonLink href="/columbarium" variant="outline">
                Learn About the Columbarium
              </ButtonLink>
              <Link
                href={INQUIRY_HREF}
                className="text-sm text-burgundy hover:text-burgundy-light transition-colors"
              >
                Make an Inquiry
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section bg="warm">
      <Container>
        <div className="lg:grid lg:grid-cols-5 lg:gap-12 lg:items-center">
          <div className="lg:col-span-3 border border-border overflow-hidden">
            <div className="relative aspect-[4/3] lg:aspect-[4/5]">
              <Image
                src={urlFor(columbarium.heroImage!).width(1200).height(1500).url()}
                alt={columbarium.heroImage!.alt ?? ""}
                fill
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-8 lg:mt-0 lg:col-span-2 text-center lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-shimmer mb-3">
              {columbarium.eyebrow || "Columbarium"}
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-charcoal leading-tight">
              {columbarium.title}
            </h2>
            <div className="mt-5 h-px w-12 bg-gold/60 mx-auto lg:mx-0" aria-hidden="true" />
            {columbarium.introduction && (
              <div className="mt-6 text-charcoal-light leading-relaxed [&_p]:mb-0">
                <PortableTextRenderer value={columbarium.introduction} />
              </div>
            )}
            {columbarium.locationDescription && (
              <p className="mt-3 text-sm text-charcoal-muted">
                {columbarium.locationDescription}
              </p>
            )}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-3">
              <ButtonLink href="/columbarium" variant="outline">
                Learn About the Columbarium
              </ButtonLink>
              <Link
                href={INQUIRY_HREF}
                className="text-sm text-burgundy hover:text-burgundy-light transition-colors"
              >
                Make an Inquiry
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
