import "server-only";
import { client } from "@/sanity/lib/client";
import { LIVE_STREAM_QUERY } from "@/sanity/lib/queries/parish";
import type { LIVE_STREAM_QUERY_RESULT } from "../../sanity.types";

/**
 * The rest of the site reads Sanity through `sanityFetch` (the Live Content
 * API), which revalidates on-demand — a connected browser has to observe a
 * mutation event to push a `revalidateTag()`, and the underlying fetch pins
 * itself to `revalidate: false`. That's fine for ordinary content, but it
 * means a cold server (no one browsing at the moment the parish toggles
 * Live Mass) can keep serving stale state indefinitely. Proven empirically
 * during the pre-launch audit — see docs/DECISIONS.md.
 *
 * Live Mass needs to flip within roughly 30–60s with no redeploy, so this
 * query bypasses the Live API for just this one small field set and uses a
 * plain time-based `fetch` revalidate instead — the standard, hosting-
 * portable Next.js ISR mechanism (works identically on Vercel and on
 * Cloudflare's Next.js runtime). `useCdn: false` skips Sanity's own CDN
 * cache layer so this 30s window is the only staleness in the pipeline.
 */
export async function fetchLiveStreamData(): Promise<LIVE_STREAM_QUERY_RESULT> {
  return client.fetch(
    LIVE_STREAM_QUERY,
    {},
    {
      useCdn: false,
      next: { revalidate: 30 },
    }
  );
}
