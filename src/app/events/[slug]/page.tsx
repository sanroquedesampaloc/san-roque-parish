import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { EVENT_BY_SLUG_QUERY } from "@/sanity/lib/queries/events";
import { urlFor } from "@/sanity/lib/image";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { PortableTextRenderer } from "@/components/ui/PortableTextRenderer";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { parseDateString } from "@/lib/dates";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: event } = await sanityFetch({
    query: EVENT_BY_SLUG_QUERY,
    params: { slug },
  });

  if (!event) {
    return { title: "Event Not Found" };
  }

  return {
    title: event.title,
    description: `${event.title} — ${event.startDate}${event.location ? ` at ${event.location}` : ""}`,
  };
}

function formatDateRange(startDate: string, endDate: string | null): string {
  const start = parseDateString(startDate);
  const opts: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const startStr = start.toLocaleDateString("en-PH", opts);

  if (!endDate || endDate === startDate) return startStr;

  const end = parseDateString(endDate);
  const endStr = end.toLocaleDateString("en-PH", opts);
  return `${startStr} – ${endStr}`;
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const { data: event } = await sanityFetch({
    query: EVENT_BY_SLUG_QUERY,
    params: { slug },
  });

  if (!event) {
    notFound();
  }

  const hasPoster = event.poster?.asset;
  const statusLabel: Record<string, string> = {
    upcoming: "Upcoming",
    ongoing: "Ongoing",
    completed: "Completed",
    cancelled: "Cancelled",
  };

  return (
    <>
      <Breadcrumbs items={[{ name: "Events", href: "/events" }, { name: event.title }]} />
      <PageHero
        title={event.title}
        backLink={{ href: "/events", label: "Back to Events" }}
      />

      <Section bg="default">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {hasPoster && (
                  <div className="mb-8 border border-border overflow-hidden">
                    <Image
                      src={urlFor(event.poster!).width(800).height(450).url()}
                      alt={event.poster!.alt ?? event.title}
                      width={800}
                      height={450}
                      className="w-full h-auto"
                      priority
                    />
                  </div>
                )}

                {event.description && (
                  <div className="prose-parish">
                    <PortableTextRenderer value={event.description} />
                  </div>
                )}

                {!event.description && !hasPoster && (
                  <p className="text-charcoal-muted">
                    More details about this event will be available soon.
                  </p>
                )}
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="bg-ivory-warm border border-border p-6 space-y-5">
                  <div>
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-dark mb-2">
                      Date
                    </h3>
                    <p className="text-sm text-charcoal font-medium">
                      {formatDateRange(event.startDate, event.endDate)}
                    </p>
                  </div>

                  {(event.startTime || event.endTime) && (
                    <div>
                      <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-dark mb-2">
                        Time
                      </h3>
                      <p className="text-sm text-charcoal">
                        {event.startTime}
                        {event.endTime && ` – ${event.endTime}`}
                      </p>
                    </div>
                  )}

                  {event.location && (
                    <div>
                      <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-dark mb-2">
                        Location
                      </h3>
                      <p className="text-sm text-charcoal">{event.location}</p>
                    </div>
                  )}

                  <div>
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-dark mb-2">
                      Status
                    </h3>
                    <span
                      className={`inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 ${
                        String(event.status) === "upcoming" || String(event.status) === "ongoing"
                          ? "bg-burgundy text-white"
                          : String(event.status) === "cancelled"
                          ? "bg-charcoal-muted text-white"
                          : "bg-border text-charcoal-light"
                      }`}
                    >
                      {statusLabel[String(event.status)] ?? event.status}
                    </span>
                  </div>

                  {event.registrationUrl && (
                    <div className="pt-2">
                      <ButtonLink
                        href={event.registrationUrl}
                        variant="primary"
                        className="w-full text-center"
                      >
                        Register
                      </ButtonLink>
                    </div>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
