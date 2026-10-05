import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScheduleDisplay } from "@/components/ui/ScheduleDisplay";
import type { ScheduleEntry } from "../../../sanity.types";

export function VisitContactSection({
  settings,
}: {
  settings: {
    address: string | null;
    phone: string | null;
    email: string | null;
    googleMapsUrl: string | null;
    officeHours: Array<{ _key: string } & ScheduleEntry> | null;
  } | null;
}) {
  if (!settings) return null;

  return (
    <Section id="contact" bg="default" spacing="loose">
      <Container>
        <SectionHeading
          eyebrow="Come Visit"
          title="Find Us"
          size="large"
        />
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border overflow-hidden bg-white">
            <div className="p-8 md:p-10 space-y-8">
              {settings.address && (
                <div>
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-charcoal-muted mb-2">
                    Location
                  </h3>
                  <p className="text-charcoal leading-relaxed">{settings.address}</p>
                  {settings.googleMapsUrl && (
                    <a
                      href={settings.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold uppercase tracking-wider text-burgundy hover:text-burgundy-light transition-colors"
                    >
                      Get Directions
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  )}
                </div>
              )}

              {(settings.phone || settings.email) && (
                <div>
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-charcoal-muted mb-2">
                    Contact
                  </h3>
                  {settings.phone && (
                    <p className="text-charcoal mb-1">{settings.phone}</p>
                  )}
                  {settings.email && (
                    <p className="text-charcoal">{settings.email}</p>
                  )}
                </div>
              )}

              {settings.officeHours && settings.officeHours.length > 0 && (
                <ScheduleDisplay
                  schedules={settings.officeHours}
                  title="Office Hours"
                />
              )}
            </div>

            <div className="bg-parchment flex items-center justify-center p-8 md:p-10 min-h-[280px] md:min-h-0 relative">
              <div className="text-center">
                <svg className="w-12 h-12 text-charcoal-muted/30 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <p className="text-xs text-charcoal-muted uppercase tracking-wider">
                  Map coming soon
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
