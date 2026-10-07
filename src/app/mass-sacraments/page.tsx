import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { PARISH_SETTINGS_QUERY, SACRAMENTS_LIST_QUERY } from "@/sanity/lib/queries/parish";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScheduleDisplay } from "@/components/ui/ScheduleDisplay";
import { PortableTextRenderer } from "@/components/ui/PortableTextRenderer";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getFileUrl } from "@/sanity/lib/file";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Mass & Sacraments",
  description:
    "View Mass schedules, confession times, and sacrament information at San Roque de Sampaloc Parish.",
};

export default async function MassSacramentsPage() {
  const [{ data: settings }, { data: sacraments }] = await Promise.all([
    sanityFetch({ query: PARISH_SETTINGS_QUERY }),
    sanityFetch({ query: SACRAMENTS_LIST_QUERY }),
  ]);

  const hasSunday = settings?.sundayMassSchedule && settings.sundayMassSchedule.length > 0;
  const hasWeekday = settings?.weekdayMassSchedule && settings.weekdayMassSchedule.length > 0;
  const hasConfession = settings?.confessionSchedule && settings.confessionSchedule.length > 0;
  const hasSchedules = hasSunday || hasWeekday || hasConfession;

  return (
    <>
      <Breadcrumbs items={[{ name: "Mass & Sacraments" }]} />
      <PageHero
        title="Mass & Sacraments"
        subtitle="Join us in worship and encounter the grace of the sacraments."
      />

      {/* Mass & Confession Schedules */}
      <Section bg="warm" id="mass-schedule">
        <Container>
          <SectionHeading
            eyebrow="Holy Mass"
            title="Mass & Confession Schedule"
          />

          {hasSchedules ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {hasSunday && (
                <div className="bg-burgundy-dark text-white p-8">
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-light mb-5">
                    Sunday Mass
                  </h3>
                  <ul className="space-y-3">
                    {settings!.sundayMassSchedule!.map((entry) => (
                      <li key={entry._key} className="border-b border-white/10 pb-3 last:border-0 last:pb-0">
                        <span className="block font-semibold text-white text-sm">
                          {entry.label}
                        </span>
                        <span className="block text-white/70 text-sm">{entry.time}</span>
                        {entry.note && (
                          <span className="block text-white/50 text-xs italic mt-1">
                            {entry.note}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {hasWeekday && (
                <div className="bg-white border border-border p-8">
                  <ScheduleDisplay
                    schedules={settings!.weekdayMassSchedule}
                    title="Weekday Mass"
                  />
                </div>
              )}

              {hasConfession && (
                <div className="bg-white border border-border p-8">
                  <ScheduleDisplay
                    schedules={settings!.confessionSchedule}
                    title="Confession"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-charcoal-muted">
                Mass and confession schedules will be posted here. Please contact the parish office for current times.
              </p>
            </div>
          )}
        </Container>
      </Section>

      {/* Sacraments */}
      {sacraments.length > 0 && (
        <Section bg="default">
          <Container>
            <SectionHeading
              eyebrow="Sacred Rites"
              title="The Sacraments"
              subtitle="Learn about the sacraments celebrated at our parish."
            />

            <div className="max-w-4xl mx-auto space-y-16">
              {sacraments.map((sac) => (
                <article
                  key={sac._id}
                  id={sac.slug}
                  className="scroll-mt-24"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-full bg-parchment flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                      </svg>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-semibold text-charcoal">
                      {sac.name}
                    </h2>
                  </div>

                  <div className="pl-14 space-y-8">
                    {sac.introduction && (
                      <div>
                        <PortableTextRenderer value={sac.introduction} />
                      </div>
                    )}

                    {sac.requirements && (
                      <div>
                        <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-dark mb-4">
                          Requirements
                        </h3>
                        <div className="bg-ivory-warm border border-border-light p-6">
                          <PortableTextRenderer value={sac.requirements} />
                        </div>
                      </div>
                    )}

                    {sac.schedule && sac.schedule.length > 0 && (
                      <div>
                        <ScheduleDisplay schedules={sac.schedule} title="Schedule" />
                      </div>
                    )}

                    {sac.contactGuidance && (
                      <div>
                        <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-dark mb-3">
                          Contact & Guidance
                        </h3>
                        <p className="text-charcoal-light text-sm leading-relaxed">
                          {sac.contactGuidance}
                        </p>
                      </div>
                    )}

                    {sac.documents && sac.documents.length > 0 && (
                      <div>
                        <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-dark mb-3">
                          Downloadable Documents
                        </h3>
                        <ul className="space-y-2">
                          {sac.documents.map((doc) => (
                            <li key={doc._key}>
                              {doc.asset?._ref ? (
                                <a
                                  href={getFileUrl(doc.asset._ref)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-sm text-burgundy hover:text-burgundy-light transition-colors"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                  </svg>
                                  {doc.title}
                                </a>
                              ) : (
                                <span className="text-sm text-charcoal-muted">{doc.title}</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 h-px bg-border" aria-hidden="true" />
                </article>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Parish Office */}
      <Section bg="warm" spacing="compact">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl font-semibold text-charcoal mb-3">
              Parish Office
            </h2>
            <p className="text-charcoal-light text-sm leading-relaxed mb-6">
              For questions about Mass schedules, sacrament preparation, or parish services,
              please contact the parish office.
            </p>
            {(settings?.phone || settings?.email) && (
              <div className="flex flex-wrap justify-center gap-6 text-sm">
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
            <div className="mt-6">
              <ButtonLink href="/contact" variant="outline">
                Contact Us
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
