import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnnouncementCard } from "@/components/ui/AnnouncementCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { parseDateString } from "@/lib/dates";
import { categoryLabels } from "@/lib/constants";

type Announcement = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string;
  publishedAt: string;
};

function FeaturedCard({ announcement }: { announcement: Announcement }) {
  return (
    <article className="bg-white border border-border overflow-hidden md:flex card-premium group">
      <div className="md:w-2 bg-burgundy flex-shrink-0" aria-hidden="true" />
      <div className="p-8 md:p-10 flex-1">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white bg-burgundy px-3 py-1">
            {categoryLabels[announcement.category] ?? announcement.category}
          </span>
          <time
            dateTime={announcement.publishedAt}
            className="text-[11px] text-charcoal-muted tracking-wide"
          >
            {parseDateString(announcement.publishedAt).toLocaleDateString("en-PH", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </div>
        <h3 className="text-2xl md:text-3xl font-semibold text-charcoal mb-3 leading-snug">
          <Link
            href={`/news/${announcement.slug}`}
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
      </div>
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
          eyebrow="Parish News"
          title="Announcements"
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
            <ButtonLink href="/news" variant="outline">
              View All News
            </ButtonLink>
          </div>
        )}
      </Container>
    </Section>
  );
}
