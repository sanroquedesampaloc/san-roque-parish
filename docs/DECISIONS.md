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
