import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { PARISH_SETTINGS_QUERY } from "@/sanity/lib/queries/parish";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PortableTextRenderer } from "@/components/ui/PortableTextRenderer";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Support the Parish",
  description:
    "Learn how you can support San Roque de Sampaloc Parish through your generosity.",
};

export default async function GivePage() {
  const { data: settings } = await sanityFetch({
    query: PARISH_SETTINGS_QUERY,
  });

  return (
    <>
      <PageHero
        title="Support the Parish"
        subtitle="Your generosity sustains our community of faith and service."
      />

      {/* Stewardship Introduction */}
      <Section bg="default">
        <Container>
          <SectionHeading
            eyebrow="Stewardship"
            title="Giving Back"
            subtitle="As members of a parish family, we are called to share our time, talent, and treasure in service of God and one another."
          />
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-charcoal-light leading-relaxed">
              Stewardship is a way of life rooted in gratitude. Through our
              offerings, we sustain the life of the parish and extend its mission
              to all who seek the faith. Every contribution, no matter its form,
              helps our community worship, serve, and grow together.
            </p>
          </div>
        </Container>
      </Section>

      {/* Giving Information from CMS */}
      <Section bg="warm">
        <Container>
          <SectionHeading
            eyebrow="How to Give"
            title="Giving Information"
          />
          <div className="max-w-3xl mx-auto">
            {settings?.givingInfo ? (
              <div className="bg-white border border-border p-6 md:p-8">
                <PortableTextRenderer value={settings.givingInfo} />
              </div>
            ) : (
              <div className="bg-white border border-border p-6 md:p-8">
                <p className="text-charcoal-light leading-relaxed text-center">
                  Giving information will be available here once confirmed by the
                  parish.
                </p>
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* Other Ways to Support */}
      <Section bg="default">
        <Container>
          <SectionHeading
            eyebrow="Beyond Financial Giving"
            title="Other Ways to Support"
            subtitle="There are many meaningful ways to contribute to the life of the parish."
          />
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
              {/* Volunteering */}
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-parchment flex items-center justify-center">
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
                      d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-charcoal mb-2">
                  Volunteer Your Time
                </h3>
                <p className="text-sm text-charcoal-light leading-relaxed">
                  Share your time and talent by serving in parish liturgies,
                  programs, and community outreach.
                </p>
              </div>

              {/* Parish Activities */}
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-parchment flex items-center justify-center">
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
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                    />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-charcoal mb-2">
                  Join Parish Activities
                </h3>
                <p className="text-sm text-charcoal-light leading-relaxed">
                  Participate in parish celebrations, devotions, and fellowship
                  events throughout the year.
                </p>
              </div>

              {/* Ministries */}
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-parchment flex items-center justify-center">
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
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-charcoal mb-2">
                  Support Ministries
                </h3>
                <p className="text-sm text-charcoal-light leading-relaxed">
                  Help strengthen the parish by joining or supporting one of our
                  ministries and organizations.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact CTA */}
      <Section bg="warm" spacing="compact">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <div
              className="w-px h-8 bg-gold/40 mx-auto mb-6"
              aria-hidden="true"
            />
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-dark mb-4">
              Get in Touch
            </h2>
            <p className="text-lg md:text-xl font-serif text-charcoal leading-relaxed">
              For confirmed giving details or to discuss how you can support the
              parish, please contact us.
            </p>
            <div className="mt-6">
              <ButtonLink href="/contact" variant="outline">
                Contact the Parish Office
              </ButtonLink>
            </div>
            <div
              className="w-px h-8 bg-gold/40 mx-auto mt-6"
              aria-hidden="true"
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
