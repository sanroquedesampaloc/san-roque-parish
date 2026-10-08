# Architecture Decisions

## ADR-001: Embedded Sanity Studio

Embed Sanity Studio within the Next.js app at `/studio` using `next-sanity`.

**Rationale**: Single deployment to Vercel. Parish staff access the studio through the same domain. No additional hosting needed.

## ADR-002: Singleton for Parish Settings

Use a single `parishSettings` document with a fixed ID instead of multiple configuration documents.

**Rationale**: Parish has one set of contact details, schedules, and social links. A singleton prevents duplicate or conflicting settings. Queried by `_id` for efficiency.

## ADR-003: Portable Text for Rich Content

Use Sanity Portable Text (`blockContent` object type) for all rich text fields.

**Rationale**: Structured, queryable, renders to React components. Safer than raw HTML. Supports embedded images and links.

## ADR-004: Server Components by Default

React Server Components for all pages. Client Components only for interactive elements requiring browser APIs or state.

**Rationale**: Less client JS, direct data fetching, SEO benefits. Aligns with Next.js App Router conventions.

## ADR-005: No Separate Backend

No Express server, API layer, or database beyond Sanity.

**Rationale**: Parish website is content-driven with no authenticated user features, transactions, or real-time data. Sanity handles content storage, CDN, and media hosting.

## ADR-006: Schedule Entries as Structured Objects

Mass times, confession schedules, and office hours stored as arrays of `scheduleEntry` objects (label + time + optional note) rather than free-text.

**Rationale**: Enables consistent rendering and future features (e.g., "next Mass" calculations) without parsing free-form text.

## ADR-007: Server Actions for Form Submission

Use React Server Actions (via `useActionState`) instead of API Route Handlers for contact and prayer request forms.

**Rationale**: Server Actions integrate naturally with React's form handling, provide built-in pending states, work with progressive enhancement, and avoid maintaining separate API routes. The `useActionState` hook gives typed state transitions (idle → pending → success/error) without extra client-side state management.

## ADR-008: In-Memory Rate Limiting

Use an in-memory `Map` for rate limiting form submissions instead of an external store.

**Rationale**: No paid dependency required. Provides baseline protection against rapid repeated submissions within a single serverless instance lifetime. The primary spam defense is Cloudflare Turnstile — rate limiting is a secondary layer. For production-grade rate limiting that survives cold starts, upgrade to Vercel KV or Upstash Redis.

## ADR-009: No Database Storage for Form Submissions

Contact messages and prayer requests are emailed directly to parish staff and not stored in any database.

**Rationale**: Reduces data liability — no sensitive prayer content or personal data is persisted. Parish staff manage messages through their email inbox. If archival is needed later, Resend provides delivery logs, or a database can be added as a future enhancement.

## ADR-010: Cloudflare Turnstile over reCAPTCHA

Use Cloudflare Turnstile for form spam protection instead of Google reCAPTCHA.

**Rationale**: Privacy-focused (no tracking cookies), free, simpler integration, and does not require users to solve visual challenges. Server-side verification via a single POST request to Cloudflare's API.

## ADR-011: Columbarium Not Added to the Desktop Top-Level Nav

The `/columbarium` page is linked from the mobile nav drawer and the footer's Quick Links, but not added as a 9th item in the desktop header bar.

**Rationale**: The desktop nav (8 items + Donate button) is already near its practical width limit at the `lg:` (1024px) breakpoint where it first appears. A 9th item risks wrapping/cramping on smaller laptop screens. The mobile drawer has no such constraint (vertical, scrollable list), so Columbarium is fully reachable there and via the footer on every screen size without redesigning the primary nav. Revisit if the desktop nav is ever restructured (e.g., a "More" menu).
