import type { Metadata } from "next";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { MINISTRIES_LIST_QUERY } from "@/sanity/lib/queries/parish";
import { urlFor } from "@/sanity/lib/image";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PortableTextRenderer } from "@/components/ui/PortableTextRenderer";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = {
  title: "Ministries",
  description:
    "Explore the ministries and organizations of San Roque de Sampaloc Parish.",
};

export default async function MinistriesPage() {
  const { data: ministries } = await sanityFetch({
    query: MINISTRIES_LIST_QUERY,
  });

  return (
    <>
      <PageHero
        title="Ministries"
        subtitle="Our parish community serves through various ministries and organizations."
      />

      <Section bg="default">
        <Container>
          {ministries.length === 0 ? (
            <EmptyState
              message="Ministry information will be available soon. Please contact the parish office for details."
              cta={{ href: "/contact", label: "Contact Us" }}
            />
          ) : (
            <div className="max-w-4xl mx-auto">
              <SectionHeading
                eyebrow="Our Community"
                title="Parish Ministries"
                subtitle="Get involved in the life of our parish."
              />

              <div className="space-y-16">
                {ministries.map((ministry, index) => {
                  const hasImage = ministry.image?.asset;
                  const isEven = index % 2 === 0;

                  return (
                    <article
                      key={ministry._id}
                      className="scroll-mt-24"
                      id={ministry.slug}
                    >
                      <div className={`md:flex gap-10 items-start ${!isEven ? "md:flex-row-reverse" : ""}`}>
                        {/* Image */}
                        {hasImage && (
                          <div className="md:w-2/5 flex-shrink-0 mb-6 md:mb-0">
                            <div className="border border-border overflow-hidden">
                              <Image
                                src={urlFor(ministry.image!).width(480).height(320).url()}
                                alt={ministry.image!.alt ?? ministry.name}
                                width={480}
                                height={320}
                                className="w-full h-auto"
                              />
                            </div>
                          </div>
                        )}

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-parchment rounded-full flex items-center justify-center flex-shrink-0">
                              <svg
                                className="w-5 h-5 text-burgundy"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                aria-hidden="true"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                                />
                              </svg>
                            </div>
                            <h2 className="text-xl md:text-2xl font-semibold text-charcoal">
                              {ministry.name}
                            </h2>
                          </div>

                          {ministry.description && (
                            <div className="mb-4">
                              <PortableTextRenderer value={ministry.description} />
                            </div>
                          )}

                          <div className="space-y-2">
                            {ministry.coordinator && (
                              <div className="flex items-baseline gap-2">
                                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-dark">
                                  Coordinator
                                </span>
                                <span className="text-sm text-charcoal">
                                  {ministry.coordinator}
                                </span>
                              </div>
                            )}
                            {ministry.contactInfo && (
                              <div className="flex items-baseline gap-2">
                                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-dark">
                                  Contact
                                </span>
                                <span className="text-sm text-charcoal-light">
                                  {ministry.contactInfo}
                                </span>
                              </div>
                            )}
                            {ministry.meetingSchedule && (
                              <div className="flex items-baseline gap-2">
                                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-dark">
                                  Schedule
                                </span>
                                <span className="text-sm text-charcoal-light">
                                  {ministry.meetingSchedule}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mt-10 h-px bg-border" aria-hidden="true" />
                    </article>
                  );
                })}
              </div>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
