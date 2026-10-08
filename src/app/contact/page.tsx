import type { Metadata } from "next";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { PARISH_SETTINGS_QUERY } from "@/sanity/lib/queries/parish";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScheduleDisplay } from "@/components/ui/ScheduleDisplay";
import { ContactForm } from "@/components/ui/ContactForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { isGoogleMapsEmbedUrl } from "@/lib/googleMaps";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with San Roque de Sampaloc Parish — find our address, phone, email, office hours, and directions.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string }>;
}) {
  const [{ data: settings }, { subject }] = await Promise.all([
    sanityFetch({ query: PARISH_SETTINGS_QUERY }),
    searchParams,
  ]);

  const hasContactDetails =
    settings?.address || settings?.phone || settings?.email;
  const hasOfficeHours =
    settings?.officeHours && settings.officeHours.length > 0;
  const hasSocials =
    settings?.facebookUrl || settings?.youtubeUrl || settings?.messengerUrl;

  return (
    <>
      <Breadcrumbs items={[{ name: "Contact" }]} />
      <PageHero
        eyebrow="Get in Touch"
        title="Contact Us"
        subtitle="We welcome your questions, prayer intentions, and visits. Reach out to us anytime."
      />

      {/* Contact Details & Location */}
      <ScrollReveal>
      <Section bg="default">
        <Container>
          <SectionHeading
            eyebrow="Get in Touch"
            title="Parish Office"
            subtitle="Visit us or contact us through any of the channels below."
          />

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border overflow-hidden bg-white">
              {/* Contact info column */}
              <div className="p-8 md:p-10 space-y-8">
                {hasContactDetails && (
                  <div className="space-y-5">
                    {settings.address && (
                      <div>
                        <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-charcoal-muted mb-2">
                          Address
                        </h3>
                        <p className="text-charcoal leading-relaxed">
                          {settings.address}
                        </p>
                      </div>
                    )}

                    {settings.phone && (
                      <div>
                        <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-charcoal-muted mb-2">
                          Phone
                        </h3>
                        <a
                          href={`tel:${settings.phone}`}
                          className="text-burgundy hover:text-burgundy-light transition-colors"
                        >
                          {settings.phone}
                        </a>
                      </div>
                    )}

                    {settings.email && (
                      <div>
                        <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-charcoal-muted mb-2">
                          Email
                        </h3>
                        <a
                          href={`mailto:${settings.email}`}
                          className="text-burgundy hover:text-burgundy-light transition-colors break-words"
                        >
                          {settings.email}
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {hasOfficeHours && (
                  <div className="pt-2">
                    <ScheduleDisplay
                      schedules={settings!.officeHours}
                      title="Office Hours"
                    />
                  </div>
                )}

                {!hasContactDetails && !hasOfficeHours && (
                  <p className="text-charcoal-muted text-sm">
                    Contact details will be available here soon.
                  </p>
                )}
              </div>

              {/* Map / directions column */}
              {settings?.googleMapsEmbedUrl && isGoogleMapsEmbedUrl(settings.googleMapsEmbedUrl) ? (
                <div className="min-h-[280px] md:min-h-0 border-t md:border-t-0 md:border-l border-border">
                  <iframe
                    src={settings.googleMapsEmbedUrl}
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
                <div className="bg-parchment flex flex-col items-center justify-center p-8 md:p-10 min-h-[280px] md:min-h-0 border-t md:border-t-0 md:border-l border-border">
                  <svg
                    className="w-12 h-12 text-charcoal-muted/30 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  {settings?.googleMapsUrl ? (
                    <a
                      href={settings.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-7 py-3 text-sm font-medium tracking-wide uppercase transition-colors border border-burgundy text-burgundy hover:bg-burgundy hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
                    >
                      Get Directions
                    </a>
                  ) : (
                    <p className="text-xs text-charcoal-muted uppercase tracking-wider">
                      Directions coming soon
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>
      </ScrollReveal>

      {/* Social & Connect */}
      {hasSocials && (
        <>
          <SectionDivider bg="ivory-warm" />
          <Section bg="warm">
          <Container>
            <SectionHeading
              eyebrow="Stay Connected"
              title="Follow Us Online"
              subtitle="Join our parish community on social media for updates, reflections, and live-streamed Masses."
            />

            <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
              {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white border border-border p-8 text-center hover:border-burgundy/30 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
                >
                  <svg
                    className="w-8 h-8 mx-auto mb-4 text-burgundy"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-dark mb-1">
                    Facebook
                  </p>
                  <p className="text-xs text-charcoal-muted group-hover:text-charcoal-light transition-colors">
                    Parish updates & announcements
                  </p>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}

              {settings.youtubeUrl && (
                <a
                  href={settings.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white border border-border p-8 text-center hover:border-burgundy/30 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
                >
                  <svg
                    className="w-8 h-8 mx-auto mb-4 text-burgundy"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-dark mb-1">
                    YouTube
                  </p>
                  <p className="text-xs text-charcoal-muted group-hover:text-charcoal-light transition-colors">
                    Live Mass & homilies
                  </p>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}

              {settings.messengerUrl && (
                <a
                  href={settings.messengerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white border border-border p-8 text-center hover:border-burgundy/30 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
                >
                  <svg
                    className="w-8 h-8 mx-auto mb-4 text-burgundy"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.2 5.42 3.15 7.2.16.15.26.36.27.58l.05 1.82c.02.63.66 1.04 1.24.79l2.03-.82c.17-.07.36-.09.55-.05.94.26 1.94.4 2.97.4C17.64 21.62 22 17.27 22 11.7 22 6.13 17.64 2 12 2zm5.85 7.58l-2.84 4.51c-.45.72-1.42.9-2.08.39l-2.26-1.69a.6.6 0 00-.72 0l-3.05 2.31c-.41.31-.94-.18-.67-.62l2.84-4.51c.45-.72 1.42-.9 2.08-.39l2.26 1.69a.6.6 0 00.72 0l3.05-2.31c.41-.31.94.18.67.62z" />
                  </svg>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-dark mb-1">
                    Messenger
                  </p>
                  <p className="text-xs text-charcoal-muted group-hover:text-charcoal-light transition-colors">
                    Send us a message
                  </p>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
            </div>
          </Container>
          </Section>
          <SectionDivider bg="ivory" />
        </>
      )}
      {!hasSocials && <SectionDivider bg="ivory-warm" />}

      {/* Contact Form */}
      <ScrollReveal>
      <Section bg={hasSocials ? "default" : "warm"}>
        <Container>
          <SectionHeading
            eyebrow="Send a Message"
            title="Contact Form"
            subtitle="Fill out the form below and we will get back to you as soon as possible."
          />
          <ContactForm initialSubject={subject} />

          {/* Privacy guidance */}
          <div className="max-w-2xl mx-auto mt-8 pt-6 border-t border-border-light">
            <p className="text-xs text-charcoal-muted leading-relaxed">
              We use the details you provide here only to respond to your
              message. See our{" "}
              <Link href="/privacy" className="underline hover:text-charcoal-light">
                Privacy Notice
              </Link>{" "}
              for how we handle your information.
            </p>
          </div>
        </Container>
      </Section>
      </ScrollReveal>
    </>
  );
}
