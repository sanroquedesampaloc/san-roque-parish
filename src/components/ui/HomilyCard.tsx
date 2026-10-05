import Link from "next/link";
import { parseDateString } from "@/lib/dates";

type Homily = {
  _id: string;
  title: string;
  slug: string;
  date: string;
  celebrant: string | null;
  description: string | null;
  liturgicalOccasion: string | null;
};

export function HomilyCard({ homily }: { homily: Homily }) {
  return (
    <article className="bg-white border border-border p-6 hover:shadow-md transition-shadow group">
      <div className="flex items-center gap-3 mb-3">
        {homily.liturgicalOccasion && (
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-burgundy bg-gold/15 px-2 py-1">
            {homily.liturgicalOccasion}
          </span>
        )}
        <time
          dateTime={homily.date}
          className="text-[11px] text-charcoal-muted tracking-wide"
        >
          {parseDateString(homily.date).toLocaleDateString("en-PH", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </time>
      </div>
      <h3 className="text-lg font-semibold text-charcoal mb-2 leading-snug">
        <Link
          href={`/homilies/${homily.slug}`}
          className="hover:text-burgundy transition-colors"
        >
          {homily.title}
        </Link>
      </h3>
      {homily.celebrant && (
        <p className="text-sm text-charcoal-light mb-2">by {homily.celebrant}</p>
      )}
      {homily.description && (
        <p className="text-charcoal-light text-sm leading-relaxed line-clamp-3">
          {homily.description}
        </p>
      )}
    </article>
  );
}
