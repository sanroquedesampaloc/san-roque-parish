import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { EVENTS_LIST_QUERY } from "@/sanity/lib/queries/events";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { EventCard } from "@/components/ui/EventCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionDivider } from "@/components/ui/SectionDivider";

export const metadata: Metadata = {
  title: "Parish Events",
  description:
    "Browse upcoming and past events at San Roque de Sampaloc Parish.",
};

export default async function EventsPage() {
  const { data: events } = await sanityFetch({ query: EVENTS_LIST_QUERY });

  const upcoming = events.filter(
    (e) => String(e.status) === "upcoming" || String(e.status) === "ongoing"
  );
  const past = events.filter(
    (e) => String(e.status) === "completed"
  );

  return (
    <>
      <Breadcrumbs items={[{ name: "Events" }]} />
      <PageHero
        eyebrow="Community Gatherings"
        title="Parish Events"
        subtitle="Gatherings, celebrations, and community activities."
      />

      <Section bg="default">
        <Container>
          {events.length === 0 ? (
            <EmptyState
              message="No events scheduled at this time. Check back soon for upcoming activities."
              cta={{ href: "/", label: "Return Home" }}
            />
          ) : (
            <div className="max-w-5xl mx-auto">
              {/* Upcoming Events */}
              {upcoming.length > 0 && (
                <ScrollReveal className={past.length > 0 ? "mb-10" : ""}>
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-dark mb-6">
                    Upcoming Events
                  </h2>
                  <div
                    className={`grid grid-cols-1 gap-6 ${
                      upcoming.length === 1 ? "max-w-xl" : "md:grid-cols-2"
                    }`}
                  >
                    {upcoming.map((event) => (
                      <EventCard key={event._id} event={event} />
                    ))}
                  </div>
                </ScrollReveal>
              )}

              {upcoming.length > 0 && past.length > 0 && <SectionDivider bg="ivory" />}

              {/* Past Events */}
              {past.length > 0 && (
                <ScrollReveal delay={80} className={upcoming.length > 0 ? "mt-10" : ""}>
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-charcoal-muted mb-6">
                    Past Events
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {past.map((event) => (
                      <div key={event._id} className="opacity-75">
                        <EventCard event={event} interactive={false} />
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              )}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
