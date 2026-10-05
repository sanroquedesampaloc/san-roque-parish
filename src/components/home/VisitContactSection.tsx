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
          title="Visit Us"
          subtitle="We welcome you to our parish"
          size="large"
        />
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 md:p-8 border border-border">
              <div className="w-12 h-12 rounded-full bg-burgundy/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-charcoal mb-4">
                Location
              </h3>
              {settings.address && (
                <p className="text-charcoal-light leading-relaxed mb-4">{settings.address}</p>
              )}
              {settings.googleMapsUrl && (
                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-burgundy hover:text-burgundy-light transition-colors"
                >
                  View on Google Maps
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              )}
            </div>

            <div className="bg-white rounded-xl p-6 md:p-8 border border-border">
              <div className="w-12 h-12 rounded-full bg-burgundy/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-charcoal mb-4">
                Contact
              </h3>
              {settings.phone && (
                <div className="mb-3">
                  <p className="text-sm font-semibold text-charcoal-muted uppercase tracking-wider mb-1">Phone</p>
                  <p className="text-charcoal-light">{settings.phone}</p>
                </div>
              )}
              {settings.email && (
                <div>
                  <p className="text-sm font-semibold text-charcoal-muted uppercase tracking-wider mb-1">Email</p>
                  <p className="text-charcoal-light">{settings.email}</p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl p-6 md:p-8 border border-border">
              <ScheduleDisplay
                schedules={settings.officeHours}
                title="Office Hours"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
