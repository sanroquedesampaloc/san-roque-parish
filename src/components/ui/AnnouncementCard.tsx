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
    <article className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-all hover:-translate-y-0.5">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-burgundy bg-burgundy/10 px-2.5 py-1 rounded-full">
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
      <h3 className="text-lg font-bold text-charcoal mb-2">
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
