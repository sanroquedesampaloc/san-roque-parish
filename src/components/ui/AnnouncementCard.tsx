import Link from "next/link";
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

export function AnnouncementCard({
  announcement,
}: {
  announcement: Announcement;
}) {
  return (
    <article className="bg-white border border-border p-6 hover:shadow-md transition-shadow group">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-burgundy">
          {categoryLabels[announcement.category] ?? announcement.category}
        </span>
        <span className="text-charcoal-muted text-[11px]" aria-hidden="true">&middot;</span>
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
      <h3 className="text-lg font-semibold text-charcoal mb-2 leading-snug">
        <Link
          href={`/announcements/${announcement.slug}`}
          className="hover:text-burgundy transition-colors"
        >
          {announcement.title}
        </Link>
      </h3>
      {announcement.excerpt && (
        <p className="text-charcoal-light text-sm leading-relaxed line-clamp-3">
          {announcement.excerpt}
        </p>
      )}
    </article>
  );
}
