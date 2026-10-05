import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EventCard } from "@/components/ui/EventCard";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function UpcomingEventsSection({
  events,
}: {
  events: Array<{
    _id: string;
    title: string;
    slug: string;
    startDate: string;
    startTime: string | null;
    endTime: string | null;
    location: string | null;
  }>;
}) {
  if (events.length === 0) return null;

  const display = events.slice(0, 4);

  return (
    <Section bg="warm">
      <Container>
        <SectionHeading
          title="Upcoming Events"
          subtitle="Join our parish community activities"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {display.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
        {events.length > 4 && (
          <div className="text-center mt-10">
            <ButtonLink href="/events" variant="outline">
              View All Events
            </ButtonLink>
          </div>
        )}
      </Container>
    </Section>
  );
}
