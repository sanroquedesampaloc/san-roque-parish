import type { Metadata } from "next";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { COLUMBARIUM_PAGE_QUERY } from "@/sanity/lib/queries/columbarium";
import { PARISH_SETTINGS_QUERY } from "@/sanity/lib/queries/parish";
import { urlFor } from "@/sanity/lib/image";
import { isGoogleMapsEmbedUrl } from "@/lib/googleMaps";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PortableTextRenderer } from "@/components/ui/PortableTextRenderer";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ScheduleDisplay } from "@/components/ui/ScheduleDisplay";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionDivider } from "@/components/ui/SectionDivider";

export const metadata: Metadata = {
  title: "Columbarium",
  description:
    "A sacred place of remembrance and prayer for departed loved ones at San Roque de Sampaloc Parish.",
  alternates: { canonical: "/columbarium" },
};

const INQUIRY_HREF = "/contact?subject=Columbarium%20Inquiry";

export default async function ColumbariumPage() {
  const [{ data: columbarium }, { data: settings }] = await Promise.all([
    sanityFetch({ query: COLUMBARIUM_PAGE_QUERY }),
    sanityFetch({ query: PARISH_SETTINGS_QUERY }),
  ]);

  const hasIntroduction = Boolean(columbarium?.introduction);
  const hasInformation = Boolean(
    columbarium?.locationDescription ||
      columbarium?.generalInformation ||
      columbarium?.availabilityNote
  );
  const nicheOptions = columbarium?.nicheOptions ?? [];
  const hasNicheOptions = nicheOptions.length > 0;
  const hasPricingInfo = Boolean(columbarium?.pricingInfo);
  const reservationTerms = columbarium?.reservationTerms ?? [];
  const hasReservationTerms = reservationTerms.length > 0;
  const hasPricingSection = hasPricingInfo || hasReservationTerms;
  const inquirySteps = columbarium?.inquirySteps ?? [];
  const hasVisitingHours = (columbarium?.visitingHours?.length ?? 0) > 0;
  const hasMap = Boolean(
    settings?.googleMapsEmbedUrl && isGoogleMapsEmbedUrl(settings.googleMapsEmbedUrl)
  );
  const hasVisitingInfo =
    hasVisitingHours ||
    Boolean(columbarium?.accessibilityNotes) ||
    Boolean(settings?.address) ||
    hasMap;
  const gallery = columbarium?.gallery ?? [];
  const hasGallery = gallery.length > 0;
  const faqs = columbarium?.faqs ?? [];
  const hasFaqs = faqs.length > 0;

  return (
    <>
      <Breadcrumbs items={[{ name: "Columbarium" }]} />
      <PageHero
        eyebrow={columbarium?.eyebrow || "Columbarium"}
        title={columbarium?.title || "A Sacred Place of Remembrance"}
        subtitle={
          columbarium?.heroSubtitle ||
          "A peaceful place of prayer and remembrance for our departed loved ones."
        }
        motif="cross"
      />

      {/* Introduction — CMS-only; hidden entirely rather than publishing an
          unconfirmed claim about the parish's actual facility. */}
      {hasIntroduction && (
        <ScrollReveal>
          <Section bg="default">
            <Container>
              <div className="max-w-3xl mx-auto">
                <div className="md:flex md:gap-12 md:items-start">
                  <div className={columbarium?.introductionImage?.asset ? "md:w-3/5" : "w-full"}>
                    <div className="prose-parish text-lg md:text-xl font-serif text-charcoal leading-relaxed">
                      <PortableTextRenderer value={columbarium!.introduction} />
                    </div>
                    <div className="mt-6 h-px w-12 bg-gold/60" aria-hidden="true" />
                  </div>
                  {columbarium?.introductionImage?.asset && (
                    <div className="mt-8 md:mt-0 md:w-2/5 border border-border overflow-hidden">
                      <Image
                        src={urlFor(columbarium.introductionImage).width(640).height(800).url()}
                        alt={columbarium.introductionImage.alt ?? ""}
                        width={640}
                        height={800}
                        sizes="(min-width: 768px) 360px, 100vw"
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </div>
              </div>
            </Container>
          </Section>
        </ScrollReveal>
      )}

      {hasIntroduction && hasInformation && <SectionDivider bg="ivory-warm" />}

      {/* Columbarium Information — only parish-confirmed structured facts. */}
      {hasInformation && (
        <Section bg="warm">
          <Container>
            <SectionHeading eyebrow="Columbarium" title="Columbarium Information" centered={false} />
            <div className="max-w-3xl mx-auto space-y-8">
              {columbarium?.locationDescription && (
                <div>
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-dark mb-2">
                    Location
                  </h3>
                  <p className="text-charcoal leading-relaxed">{columbarium.locationDescription}</p>
                </div>
              )}
              {columbarium?.generalInformation && (
                <div className="text-charcoal-light leading-relaxed [&_p]:mb-4 [&_p:last-child]:mb-0">
                  <PortableTextRenderer value={columbarium.generalInformation} />
                </div>
              )}
              {columbarium?.availabilityNote && (
                <div className="border-l-2 border-gold/50 pl-5 py-1">
                  <p className="text-charcoal-light leading-relaxed italic">
                    {columbarium.availabilityNote}
                  </p>
                </div>
              )}
            </div>
          </Container>
        </Section>
      )}

      {(hasIntroduction || hasInformation) && hasNicheOptions && <SectionDivider bg="white" />}

      {/* Niche / Memorial Options — presented as respectful information,
          never as a pricing table or product grid. */}
      {hasNicheOptions && (
        <ScrollReveal>
          <Section bg="default">
            <Container>
              <SectionHeading eyebrow="Remembrance" title="Niche &amp; Memorial Options" />
              <div className="max-w-3xl mx-auto space-y-6">
                {nicheOptions.map((option) => (
                  <div
                    key={option._key}
                    className="bg-white border border-border p-6 md:p-8"
                  >
                    <div className={option.image?.asset ? "sm:flex sm:gap-6" : ""}>
                      {option.image?.asset && (
                        <div className="sm:w-40 flex-shrink-0 mb-4 sm:mb-0 border border-border-light overflow-hidden">
                          <Image
                            src={urlFor(option.image).width(320).height(320).url()}
                            alt={option.image.alt ?? option.name ?? ""}
                            width={320}
                            height={320}
                            sizes="160px"
                            className="w-full h-auto"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-charcoal mb-1">
                          {option.name}
                        </h3>
                        {option.description && (
                          <p className="text-sm text-charcoal-light leading-relaxed mb-3">
                            {option.description}
                          </p>
                        )}
                        <div className="space-y-1.5">
                          {option.type && (
                            <div className="flex items-baseline gap-2">
                              <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-dark">
                                Capacity
                              </span>
                              <span className="text-sm text-charcoal">{option.type}</span>
                            </div>
                          )}
                          {option.availabilityNote && (
                            <div className="flex items-baseline gap-2">
                              <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-dark">
                                Availability
                              </span>
                              <span className="text-sm text-charcoal-light">
                                {option.availabilityNote}
                              </span>
                            </div>
                          )}
                          {option.priceNote && (
                            <div className="flex items-baseline gap-2">
                              <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-dark">
                                Price
                              </span>
                              <span className="text-sm text-charcoal-light">{option.priceNote}</span>
                            </div>
                          )}
                        </div>
                        {option.notes && (
                          <p className="mt-3 text-xs text-charcoal-muted italic leading-relaxed">
                            {option.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </Section>
        </ScrollReveal>
      )}

      {hasPricingSection && <SectionDivider bg="white" />}

      {/* Pricing & Reservation — dignified informational presentation,
          never a price tag or table. */}
      {hasPricingSection && (
        <Section bg="white">
          <Container>
            <SectionHeading eyebrow="Information" title="Pricing &amp; Reservation" />
            <div className="max-w-2xl mx-auto">
              {hasPricingInfo && (
                <div className="text-center mb-10">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-dark mb-2">
                    {columbarium!.pricingInfo!.label}
                  </p>
                  <p className="text-3xl md:text-4xl font-serif font-semibold text-charcoal">
                    {columbarium!.pricingInfo!.value}
                  </p>
                  {columbarium!.pricingInfo!.note && (
                    <p className="mt-2 text-sm text-charcoal-light">
                      {columbarium!.pricingInfo!.note}
                    </p>
                  )}
                </div>
              )}

              {hasPricingInfo && hasReservationTerms && (
                <div className="h-px w-12 mx-auto bg-gold/60 mb-10" aria-hidden="true" />
              )}

              {hasReservationTerms && (
                <div>
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-dark mb-6 text-center">
                    Reservation &amp; Payment Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                    {reservationTerms.map((row) => (
                      <div key={row._key}>
                        <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-muted mb-1">
                          {row.label}
                        </p>
                        <p className="text-xl font-serif font-semibold text-charcoal">
                          {row.value}
                        </p>
                        {row.note && (
                          <p className="mt-1.5 text-xs text-charcoal-light leading-relaxed">
                            {row.note}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Container>
        </Section>
      )}

      <SectionDivider bg="ivory-warm" />

      {/* How to Inquire */}
      <Section bg="warm">
        <Container>
          <SectionHeading eyebrow="Next Steps" title="How to Inquire" />
          <div className="max-w-2xl mx-auto text-center">
            {inquirySteps.length > 0 ? (
              <ol className="text-left space-y-6 mb-10">
                {inquirySteps.map((step, i) => (
                  <li key={step._key} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full border border-gold/50 text-gold-dark text-sm font-semibold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-medium text-charcoal">{step.title}</p>
                      {step.description && (
                        <p className="text-sm text-charcoal-light leading-relaxed mt-1">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-charcoal-light leading-relaxed mb-8">
                {columbarium?.inquiryNote ||
                  "For current information about the Columbarium, please reach out to the parish office directly."}
              </p>
            )}
            <ButtonLink href={INQUIRY_HREF} variant="primary">
              Inquire With the Parish
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {hasVisitingInfo && <SectionDivider bg="white" />}

      {/* Visiting Information */}
      {hasVisitingInfo && (
        <Section bg="default">
          <Container>
            <SectionHeading eyebrow="Plan Your Visit" title="Visiting Information" />
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 border border-border overflow-hidden bg-white">
              <div className="p-8 md:p-10 space-y-6">
                {settings?.address && (
                  <div>
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-charcoal-muted mb-2">
                      Address
                    </h3>
                    <p className="text-charcoal leading-relaxed">{settings.address}</p>
                  </div>
                )}
                {hasVisitingHours && (
                  <ScheduleDisplay
                    schedules={columbarium!.visitingHours}
                    title="Visiting Hours"
                  />
                )}
                {columbarium?.accessibilityNotes && (
                  <div>
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-charcoal-muted mb-2">
                      Accessibility
                    </h3>
                    <p className="text-sm text-charcoal-light leading-relaxed">
                      {columbarium.accessibilityNotes}
                    </p>
                  </div>
                )}
              </div>
              {hasMap ? (
                <div className="min-h-[280px] md:min-h-0 border-t md:border-t-0 md:border-l border-border">
                  <iframe
                    src={settings!.googleMapsEmbedUrl!}
                    title="San Roque de Sampaloc Parish location on Google Maps"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: 280 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                </div>
              ) : (
                settings?.googleMapsUrl && (
                  <div className="bg-parchment flex items-center justify-center p-8 md:p-10 min-h-[200px] md:min-h-0 border-t md:border-t-0 md:border-l border-border">
                    <ButtonLink href={settings.googleMapsUrl} variant="outline">
                      Get Directions
                    </ButtonLink>
                  </div>
                )
              )}
            </div>
          </Container>
        </Section>
      )}

      {hasGallery && <SectionDivider bg="ivory-warm" />}

      {/* Gallery */}
      {hasGallery && (
        <ScrollReveal>
          <Section bg="warm">
            <Container>
              <SectionHeading eyebrow="In Photographs" title="Gallery" />
              <div
                className={`max-w-5xl mx-auto grid gap-4 md:gap-6 ${
                  gallery.length === 1
                    ? "grid-cols-1 max-w-2xl"
                    : gallery.length === 2
                      ? "grid-cols-1 sm:grid-cols-2"
                      : "grid-cols-2 md:grid-cols-3"
                }`}
              >
                {gallery.map((photo) => (
                  <div
                    key={photo._key}
                    className="border border-border overflow-hidden bg-white"
                  >
                    <Image
                      src={urlFor(photo).width(640).height(640).url()}
                      alt={photo.alt ?? ""}
                      width={640}
                      height={640}
                      sizes={
                        gallery.length === 1
                          ? "(min-width: 672px) 672px, 100vw"
                          : gallery.length === 2
                            ? "(min-width: 640px) 50vw, 100vw"
                            : "(min-width: 768px) 33vw, 50vw"
                      }
                      className="w-full h-auto aspect-square object-cover"
                    />
                  </div>
                ))}
              </div>
            </Container>
          </Section>
        </ScrollReveal>
      )}

      {hasFaqs && <SectionDivider bg="white" />}

      {/* FAQ */}
      {hasFaqs && (
        <Section bg="default">
          <Container>
            <SectionHeading eyebrow="Questions" title="Frequently Asked Questions" />
            <div className="max-w-3xl mx-auto bg-white border border-border px-6 md:px-8">
              {faqs.map((item) => (
                <details
                  key={item._key}
                  className="group border-b border-border-light py-5 first:pt-0 last:border-0 last:pb-0"
                >
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-charcoal font-medium text-base md:text-lg marker:content-none [&::-webkit-details-marker]:hidden">
                    {item.question}
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
                    <PortableTextRenderer value={item.answer} />
                  </div>
                </details>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <SectionDivider bg="ivory-warm" />

      {/* Contact / Inquiry CTA */}
      <Section bg="warm" spacing="compact">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-px h-8 bg-gold/40 mx-auto mb-6" aria-hidden="true" />
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-dark mb-4">
              Columbarium Inquiries
            </h2>
            <p className="text-lg md:text-xl font-serif text-charcoal leading-relaxed mb-2">
              For current information about the Columbarium, please reach out to
              the parish office.
            </p>
            {columbarium?.additionalNotes && (
              <p className="text-sm text-charcoal-light leading-relaxed mt-4 max-w-xl mx-auto">
                {columbarium.additionalNotes}
              </p>
            )}
            {(settings?.phone || settings?.email) && (
              <div className="flex flex-wrap justify-center gap-6 text-sm mt-6">
                {settings.phone && (
                  <a href={`tel:${settings.phone}`} className="text-burgundy hover:text-burgundy-light transition-colors">
                    {settings.phone}
                  </a>
                )}
                {settings.email && (
                  <a href={`mailto:${settings.email}`} className="text-burgundy hover:text-burgundy-light transition-colors">
                    {settings.email}
                  </a>
                )}
              </div>
            )}
            {columbarium?.contactNumbers && columbarium.contactNumbers.length > 0 && (
              <div className="mt-4">
                <p className="text-[11px] uppercase tracking-wide text-charcoal-muted mb-2">
                  Columbarium Contact Numbers
                </p>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm">
                  {columbarium.contactNumbers.map((number) => (
                    <a
                      key={number}
                      href={`tel:${number.replace(/[^0-9+]/g, "")}`}
                      className="text-burgundy hover:text-burgundy-light transition-colors"
                    >
                      {number}
                    </a>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <ButtonLink href={INQUIRY_HREF} variant="primary">
                Contact the Parish Office
              </ButtonLink>
              {settings?.googleMapsUrl && (
                <ButtonLink href={settings.googleMapsUrl} variant="outline">
                  Get Directions
                </ButtonLink>
              )}
            </div>
            <div className="w-px h-8 bg-gold/40 mx-auto mt-8" aria-hidden="true" />
          </div>
        </Container>
      </Section>
    </>
  );
}
