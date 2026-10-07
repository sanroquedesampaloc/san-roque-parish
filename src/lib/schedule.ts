function normalizeScheduleLabel(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\s*(mass schedule|schedule|mass)$/i, "")
    .trim();
}

/**
 * A schedule entry's label is redundant when it says nothing beyond the
 * parent schedule category already shown in the card/section heading
 * (e.g. label "Sunday" or "Sunday Mass" under a "Sunday Mass" heading).
 * Tolerates case, whitespace, and a trailing "Mass"/"Schedule" suffix.
 */
export function isRedundantScheduleLabel(label: string, category: string): boolean {
  if (!label.trim() || !category.trim()) return false;
  return normalizeScheduleLabel(label) === normalizeScheduleLabel(category);
}
