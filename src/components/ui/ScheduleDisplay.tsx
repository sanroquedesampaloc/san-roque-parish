import type { ScheduleEntry } from "../../../sanity.types";

export function ScheduleDisplay({
  schedules,
  title,
}: {
  schedules: Array<{ _key: string } & ScheduleEntry> | null;
  title: string;
}) {
  if (!schedules || schedules.length === 0) return null;

  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-charcoal-muted mb-3">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {schedules.map((entry) => (
          <li key={entry._key} className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3 border-b border-border-light pb-2.5 last:border-0 last:pb-0">
            <span className="font-semibold text-sm text-burgundy min-w-[120px]">
              {entry.label}
            </span>
            <span className="text-sm text-charcoal-light">{entry.time}</span>
            {entry.note && (
              <span className="text-charcoal-muted text-xs italic">
                ({entry.note})
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
