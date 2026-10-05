import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnnouncementCard } from "@/components/ui/AnnouncementCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { parseDateString } from "@/lib/dates";

type Announcement = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string;
  publishedAt: string;
};

const categoryLabels: Record<string, string> = {
  general: "General",
  liturgical: "Liturgical",
  community: "Community",
  youth: "Youth",
  outreach: "Outreach",
};

function FeaturedCard({ announcement }: { announcement: Announcement }) {
  return (
    <article className="bg-white rounded-xl border border-border p-8 md:p-10 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-white bg-burgundy px-3 py-1 rounded-full">
          {categoryLabels[announcement.category] ?? announcement.category}
        </span>
        <time
          dateTime={announcement.publishedAt}
          className="text-sm text-charcoal-muted"
        >
          {parseDateString(announcement.publishedAt).toLocaleDateString("en-PH", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </time>
      </div>
      <h3 className="text-2xl md:text-3xl font-bold text-charcoal mb-3">
        <Link
          href={`/announcements/${announcement.slug}`}
          className="hover:text-burgundy transition-colors"
        >
          {announcement.title}
        </Link>
      </h3>
      {announcement.excerpt && (
        <p className="text-charcoal-light text-base leading-relaxed line-clamp-4 max-w-2xl">
          {announcement.excerpt}
        </p>
      )}
    </article>
  );
}

export function FeaturedAnnouncementSection({
  featuredAnnouncement,
  announcements,
}: {
  featuredAnnouncement: Announcement | null;
  announcements: Announcement[];
}) {
  const featured = featuredAnnouncement ?? announcements[0] ?? null;
  if (!featured) return null;

  const rest = announcements
    .filter((a) => a._id !== featured._id)
    .slice(0, 2);

  return (
    <Section bg="default">
      <Container>
        <SectionHeading
          title="Announcements"
          subtitle="Stay updated with the latest parish news"
        />
        <div className="max-w-5xl mx-auto space-y-6">
          <FeaturedCard announcement={featured} />
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rest.map((item) => (
                <AnnouncementCard key={item._id} announcement={item} />
              ))}
            </div>
          )}
        </div>
        {announcements.length > 3 && (
          <div className="text-center mt-10">
            <ButtonLink href="/announcements" variant="outline">
              View All Announcements
            </ButtonLink>
          </div>
        )}
      </Container>
    </Section>
  );
}
