import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ScheduleEntry } from "../../../sanity.types";

type ScheduleArray = Array<{ _key: string } & ScheduleEntry> | null;

function ScheduleCard({
  title,
  schedules,
  accent = false,
}: {
  title: string;
  schedules: ScheduleArray;
  accent?: boolean;
}) {
  const hasData = schedules && schedules.length > 0;

  return (
    <div
      className={`rounded-sm p-6 md:p-8 card-premium ${
        accent
          ? "bg-burgundy text-white"
          : "bg-white border border-border"
      }`}
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className={`w-2 h-2 rounded-full flex-shrink-0 ${
            accent ? "bg-gold" : "bg-burgundy"
          }`}
          aria-hidden="true"
        />
        <h3 className={`text-lg font-semibold uppercase tracking-wider ${accent ? "text-white" : "text-charcoal"}`}>
          {title}
        </h3>
      </div>
      {hasData ? (
        <ul className="space-y-3">
          {schedules.map((entry) => (
            <li
              key={entry._key}
              className={`flex flex-col sm:flex-row sm:items-baseline sm:gap-3 md:flex-col md:items-start md:gap-0 lg:flex-row lg:items-baseline lg:gap-3 pb-3 last:pb-0 border-b last:border-0 ${
                accent ? "border-white/10" : "border-border-light"
              }`}
            >
              <span className={`font-semibold min-w-[140px] ${accent ? "text-gold" : "text-burgundy"}`}>
                {entry.label}
              </span>
              <span className={`min-w-0 ${accent ? "text-white/85" : "text-charcoal-light"}`}>
                {entry.time}
              </span>
              {entry.note && (
                <span className={`min-w-0 text-sm italic ${accent ? "text-white/50" : "text-charcoal-muted"}`}>
                  ({entry.note})
                </span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className={`text-sm italic ${accent ? "text-white/60" : "text-charcoal-muted"}`}>
          Schedule to be confirmed
        </p>
      )}
    </div>
  );
}

export function MassScheduleSection({
  settings,
}: {
  settings: {
    sundayMassSchedule: ScheduleArray;
    weekdayMassSchedule: ScheduleArray;
    confessionSchedule: ScheduleArray;
  } | null;
}) {
  if (!settings) return null;

  const hasSchedules =
    settings.sundayMassSchedule?.length ||
    settings.weekdayMassSchedule?.length ||
    settings.confessionSchedule?.length;

  if (!hasSchedules) return null;

  return (
    <Section id="mass-schedule" bg="warm" spacing="default">
      <Container>
        <SectionHeading
          eyebrow="Worship With Us"
          title="Mass & Confession Schedule"
          size="large"
        />
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScheduleCard
            title="Sunday Mass"
            schedules={settings.sundayMassSchedule}
            accent
          />
          <ScheduleCard
            title="Weekday Mass"
            schedules={settings.weekdayMassSchedule}
          />
          <ScheduleCard
            title="Confession"
            schedules={settings.confessionSchedule}
          />
        </div>
      </Container>
    </Section>
  );
}
