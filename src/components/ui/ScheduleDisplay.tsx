import type { ScheduleEntry } from "../../../sanity.types";
import { isRedundantScheduleLabel } from "@/lib/schedule";

export function ScheduleDisplay({
  schedules,
  title,
  redundantWith,
}: {
  schedules: Array<{ _key: string } & ScheduleEntry> | null;
  title: string;
  /** Category to compare labels against for redundancy; defaults to `title`. */
  redundantWith?: string;
}) {
  if (!schedules || schedules.length === 0) return null;

  const category = redundantWith ?? title;

  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-charcoal-muted mb-3">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {schedules.map((entry) => {
          const showLabel = !isRedundantScheduleLabel(entry.label, category);
          return (
            <li
              key={entry._key}
              className="flex flex-col sm:flex-row sm:items-start sm:gap-3 border-b border-border-light pb-2.5 last:border-0 last:pb-0"
            >
              {showLabel && (
                <span className="font-semibold text-sm text-burgundy sm:min-w-[120px] sm:flex-shrink-0">
                  {entry.label}
                </span>
              )}
              <div className="min-w-0">
                <span
                  className={
                    showLabel
                      ? "text-sm text-charcoal-light"
                      : "text-base font-semibold text-charcoal"
                  }
                >
                  {entry.time}
                </span>
                {entry.note && (
                  <p className="mt-0.5 text-xs text-charcoal-muted italic leading-relaxed">
                    {entry.note}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
