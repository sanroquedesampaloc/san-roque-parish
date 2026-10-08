if (!process.env.NEXT_PUBLIC_SITE_URL && typeof window === "undefined") {
  // Runs once per server process. sitemap.xml, canonical URLs, OpenGraph,
  // and structured data all derive from SITE_URL — if the real domain
  // isn't confirmed and set before a production deploy, these will
  // silently point at the placeholder fallback below instead.
  console.warn(
    "[config] NEXT_PUBLIC_SITE_URL is not set — falling back to a placeholder domain. " +
      "Set it to the confirmed production domain before deploying (see docs/LAUNCH-CHECKLIST.md)."
  );
}

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://sanroqueparish.ph";

export const categoryLabels: Record<string, string> = {
  general: "General",
  liturgical: "Liturgical",
  community: "Community",
  youth: "Youth",
  outreach: "Outreach",
};
