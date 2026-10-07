export function parseDateString(dateStr: string): Date {
  // Full ISO datetime (e.g. announcement.publishedAt) — native parsing
  // handles the timezone offset correctly.
  if (dateStr.includes("T")) {
    return new Date(dateStr);
  }

  // Date-only "YYYY-MM-DD" (e.g. homily.date, event.startDate) — construct
  // in local time directly so the date doesn't shift a day in timezones
  // behind UTC, which `new Date("YYYY-MM-DD")` would do.
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}
