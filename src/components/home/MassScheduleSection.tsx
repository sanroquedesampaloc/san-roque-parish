import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScheduleDisplay } from "@/components/ui/ScheduleDisplay";
import type { ScheduleEntry } from "../../../sanity.types";

type ScheduleArray = Array<{ _key: string } & ScheduleEntry> | null;

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
    <Section id="mass-schedule" bg="white" spacing="loose">
      <Container>
        <SectionHeading
          title="Mass & Confession Schedule"
          subtitle="Join us in worship and prayer"
          size="large"
        />
        <div className="max-w-5xl mx-auto">
          {settings.sundayMassSchedule?.length ? (
            <div className="mb-8">
              <ScheduleDisplay
                schedules={settings.sundayMassSchedule}
                title="Sunday Mass"
                variant="featured"
              />
            </div>
          ) : null}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScheduleDisplay
              schedules={settings.weekdayMassSchedule}
              title="Weekday Mass"
            />
            <ScheduleDisplay
              schedules={settings.confessionSchedule}
              title="Confession"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
