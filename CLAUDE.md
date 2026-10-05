@AGENTS.md

# San Roque de Sampaloc Parish Website

Developer: NEXFORA Digital Innovation

## Stack

- Next.js (App Router, TypeScript, Tailwind CSS v4)
- Sanity CMS v5 (embedded studio at `/studio`)
- Vercel (deployment)
- Resend, Cloudflare Turnstile, Sentry, Playwright — approved but not yet added

## Do Not Introduce

WordPress, Supabase, Firebase, Express, separate backend, custom CMS, public user accounts, payment gateway, membership system — none without explicit approval.

## Engineering Rules

- Read existing files before modifying them
- Server Components by default; Client Components only when needed
- TypeScript strict mode; avoid `any`
- No unnecessary packages
- No hardcoded CMS content — all public content comes from Sanity
- Validate external input; protect secrets
- Mobile-first, accessibility-conscious, SEO-conscious, performance-conscious
- Do not redesign approved UI without permission
- Do not expand scope beyond the current phase

## Environment

- Windows 11 (PowerShell, no WSL)
- Use `npm.cmd` / `npx.cmd` instead of bare `npm` / `npx`
- Sanity Studio is embedded at `src/app/studio/[[...tool]]/page.tsx`
- Sanity schemas live in `src/sanity/schemaTypes/`
- Environment variables go in `.env.local` (gitignored); document in `.env.example`

## CMS

- Sanity project ID and dataset configured in `.env.local`
- `parishSettings` is a singleton document (ID: `parishSettings`)
- All content queries use `next-sanity` client from `src/sanity/lib/client.ts`
- Live content via `sanityFetch` / `SanityLive` from `src/sanity/lib/live.ts`
- Import icons from root: `import { CogIcon } from '@sanity/icons'`

## Docs

- `docs/PROJECT-BRIEF.md` — scope, audience, phases
- `docs/ARCHITECTURE.md` — stack, folder structure, data flow
- `docs/CMS-SCHEMA.md` — content model reference
- `docs/DESIGN-SYSTEM.md` — design tokens (Phase 2)
- `docs/DECISIONS.md` — architecture decision records
