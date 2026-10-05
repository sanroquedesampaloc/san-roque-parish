import type { ScheduleEntry } from "../../../sanity.types";

export function ScheduleDisplay({
  schedules,
  title,
  variant = "default",
}: {
  schedules: Array<{ _key: string } & ScheduleEntry> | null;
  title: string;
  variant?: "default" | "featured";
}) {
  if (!schedules || schedules.length === 0) return null;

  if (variant === "featured") {
    return (
      <div className="bg-burgundy text-white rounded-xl p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-bold mb-5">{title}</h3>
        <ul className="space-y-3">
          {schedules.map((entry) => (
            <li key={entry._key} className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3 border-b border-white/10 pb-3 last:border-0 last:pb-0">
              <span className="font-semibold text-gold min-w-[140px]">
                {entry.label}
              </span>
              <span className="text-white/90">{entry.time}</span>
              {entry.note && (
                <span className="text-white/60 text-sm italic">
                  ({entry.note})
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="bg-ivory rounded-xl p-6 border border-border">
      <h3 className="text-lg font-bold text-charcoal mb-4">{title}</h3>
      <ul className="space-y-3">
        {schedules.map((entry) => (
          <li key={entry._key} className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3 border-b border-border-light pb-3 last:border-0 last:pb-0">
            <span className="font-semibold text-burgundy min-w-[140px]">
              {entry.label}
            </span>
            <span className="text-charcoal-light">{entry.time}</span>
            {entry.note && (
              <span className="text-charcoal-muted text-sm italic">
                ({entry.note})
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
