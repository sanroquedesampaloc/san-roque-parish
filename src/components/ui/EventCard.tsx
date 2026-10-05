import Link from "next/link";
import { parseDateString } from "@/lib/dates";

type Event = {
  _id: string;
  title: string;
  slug: string;
  startDate: string;
  startTime: string | null;
  endTime: string | null;
  location: string | null;
};

export function EventCard({ event }: { event: Event }) {
  const startDate = parseDateString(event.startDate);

  return (
    <article className="bg-white border border-border overflow-hidden hover:shadow-md transition-shadow group">
      <div className="flex">
        <div className="flex-shrink-0 w-20 md:w-24 bg-burgundy-dark text-white flex flex-col items-center justify-center p-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-light">
            {startDate.toLocaleDateString("en-PH", { month: "short" })}
          </span>
          <span className="text-3xl md:text-4xl font-semibold leading-none mt-1 font-serif">
            {startDate.getDate()}
          </span>
        </div>
        <div className="p-5 md:p-6 flex-1 min-w-0">
          <h3 className="text-base md:text-lg font-semibold text-charcoal mb-2 leading-snug">
            <Link
              href={`/events/${event.slug}`}
              className="hover:text-burgundy transition-colors"
            >
              {event.title}
            </Link>
          </h3>
          <div className="space-y-1">
            {event.startTime && (
              <p className="text-sm text-charcoal-light flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-charcoal-muted flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {event.startTime}
                {event.endTime && ` – ${event.endTime}`}
              </p>
            )}
            {event.location && (
              <p className="text-sm text-charcoal-muted flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className="truncate">{event.location}</span>
              </p>
            )}
          </div>
          <Link
            href={`/events/${event.slug}`}
            className="inline-block mt-3 text-xs font-semibold uppercase tracking-wider text-burgundy hover:text-burgundy-light transition-colors"
          >
            View Details &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}
