import type { Metadata } from "next";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { PARISH_SETTINGS_QUERY, CLERGY_LIST_QUERY } from "@/sanity/lib/queries/parish";
import { urlFor } from "@/sanity/lib/image";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PortableTextRenderer } from "@/components/ui/PortableTextRenderer";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ScheduleDisplay } from "@/components/ui/ScheduleDisplay";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about San Roque de Sampaloc Parish — our community, leadership, and mission.",
};

export default async function AboutPage() {
  const [{ data: settings }, { data: clergy }] = await Promise.all([
    sanityFetch({ query: PARISH_SETTINGS_QUERY }),
    sanityFetch({ query: CLERGY_LIST_QUERY }),
  ]);

  return (
    <>
      <PageHero
        title="About Our Parish"
        subtitle="A Catholic community of faith, worship, and service in Sampaloc, Manila."
      />

      {/* Welcome / Introduction */}
      <Section bg="default">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="md:flex gap-12 items-start">
              <div className="md:w-3/5">
                <SectionHeading
                  eyebrow="Our Community"
                  title="Welcome to San Roque Parish"
                  centered={false}
                />
                <div className="space-y-4 text-charcoal-light leading-relaxed">
                  <p>
                    {settings?.shortDescription ??
                      "San Roque de Sampaloc Parish is a Catholic community of faith, worship, and service."}
                  </p>
                </div>
                <div className="mt-8">
                  <ButtonLink href="/mass-sacraments" variant="outline">
                    View Mass Schedule
                  </ButtonLink>
                </div>
              </div>

              {/* Decorative arch placeholder */}
              <div className="md:w-2/5 mt-10 md:mt-0 flex justify-center" aria-hidden="true">
                <div className="w-56 md:w-64">
                  <div className="aspect-[3/4] bg-parchment rounded-t-full border border-border overflow-hidden relative">
                    <div className="absolute inset-4 rounded-t-full border border-gold/15" />
                    <div className="absolute inset-8 rounded-t-full border border-gold/8" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="w-16 h-16 text-burgundy/15"
                        viewBox="0 0 80 80"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.75"
                      >
                        <path d="M40 5v70M15 30h50M20 20h40M25 45h30" strokeLinecap="round" />
                        <circle cx="40" cy="30" r="8" />
                      </svg>
                    </div>
                  </div>
                  <p className="mt-2 text-center text-[10px] uppercase tracking-[0.2em] text-charcoal-muted">
                    Parish Photo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Clergy / Leadership */}
      {clergy.length > 0 && (
        <Section bg="warm">
          <Container>
            <SectionHeading
              eyebrow="Leadership"
              title="Our Clergy"
              subtitle="The priests and leaders who serve our parish community."
            />

            <div className="max-w-4xl mx-auto space-y-12">
              {clergy.map((member) => {
                const hasPhoto = member.photo?.asset;

                return (
                  <article
                    key={member._id}
                    className="bg-white border border-border overflow-hidden"
                  >
                    <div className="md:flex">
                      {hasPhoto ? (
                        <div className="md:w-1/3 flex-shrink-0">
                          <Image
                            src={urlFor(member.photo!).width(400).height(500).url()}
                            alt={member.photo!.alt ?? member.name}
                            width={400}
                            height={500}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="md:w-1/3 flex-shrink-0 bg-parchment flex items-center justify-center min-h-[200px]" aria-hidden="true">
                          <svg
                            className="w-16 h-16 text-burgundy/20"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={1}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                            />
                          </svg>
                        </div>
                      )}

                      <div className="p-8 md:p-10 flex-1">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-dark mb-2">
                          {member.position}
                        </p>
                        <h3 className="text-xl md:text-2xl font-semibold text-charcoal mb-4">
                          {member.name}
                        </h3>
                        {member.biography && (
                          <div className="text-sm">
                            <PortableTextRenderer value={member.biography} />
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </Container>
        </Section>
      )}

      {/* Call to Action */}
      <Section bg="default" spacing="compact">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-px h-8 bg-gold/40 mx-auto mb-6" aria-hidden="true" />
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-dark mb-4">
              Join Our Community
            </h2>
            <p className="text-lg md:text-xl font-serif text-charcoal leading-relaxed">
              All are welcome to worship with us, participate in parish life,
              and grow in faith together.
            </p>
            <div className="mt-6">
              <ButtonLink href="/mass-sacraments" variant="outline">
                View Mass Schedule
              </ButtonLink>
            </div>
            <div className="w-px h-8 bg-gold/40 mx-auto mt-6" aria-hidden="true" />
          </div>
        </Container>
      </Section>

      {/* Parish Information */}
      {(settings?.address || settings?.phone || settings?.email || settings?.officeHours) && (
        <Section bg="warm">
          <Container>
            <SectionHeading
              eyebrow="Visit Us"
              title="Parish Information"
            />

            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {(settings.address || settings.phone || settings.email) && (
                  <div className="bg-white border border-border p-8">
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-dark mb-5">
                      Contact Details
                    </h3>
                    <div className="space-y-3">
                      {settings.address && (
                        <div>
                          <p className="text-xs text-charcoal-muted uppercase tracking-wider mb-1">Address</p>
                          <p className="text-sm text-charcoal">{settings.address}</p>
                        </div>
                      )}
                      {settings.phone && (
                        <div>
                          <p className="text-xs text-charcoal-muted uppercase tracking-wider mb-1">Phone</p>
                          <a href={`tel:${settings.phone}`} className="text-sm text-burgundy hover:text-burgundy-light transition-colors">
                            {settings.phone}
                          </a>
                        </div>
                      )}
                      {settings.email && (
                        <div>
                          <p className="text-xs text-charcoal-muted uppercase tracking-wider mb-1">Email</p>
                          <a href={`mailto:${settings.email}`} className="text-sm text-burgundy hover:text-burgundy-light transition-colors">
                            {settings.email}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {settings.officeHours && settings.officeHours.length > 0 && (
                  <div className="bg-white border border-border p-8">
                    <ScheduleDisplay schedules={settings.officeHours} title="Office Hours" />
                  </div>
                )}
              </div>

              <div className="text-center mt-10">
                <ButtonLink href="/contact" variant="outline">
                  Contact Us
                </ButtonLink>
              </div>
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
