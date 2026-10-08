# Backup & Recovery

How to get a local copy of the codebase and content, and how to restore from one. No secrets are included in this file — see `.env.example` for variable names and keep actual values out of version control.

## Code

### Repository

- GitHub: `https://github.com/sanroquedesampaloc/san-roque-parish`
- Main branch: `main` — this is what Vercel deploys from

### Clone

```
git clone https://github.com/sanroquedesampaloc/san-roque-parish.git
cd san-roque-parish
```

### Run Locally

Requires Node.js and (on Windows) `npm.cmd`/`npx.cmd` instead of bare `npm`/`npx`.

```
npm install
```

Copy `.env.example` to `.env.local` and fill in the values (see the Environment Variables section below), then:

```
npm run dev
```

The site runs at `http://localhost:3000`, and the Studio at `http://localhost:3000/studio`.

To type-check, lint, and build for production:

```
npx tsc --noEmit
npm run lint
npm run build
```

## Sanity Content

Content lives in Sanity's hosted datasets (`production` and `preview`), not in this repository. The schema (the structure of the content) lives in code, under `src/sanity/schemaTypes/`, and is version-controlled normally.

### Export the Production Dataset

Requires the Sanity CLI (already a project dependency) and being logged in (`npx sanity login`):

```
npx sanity dataset export production ./backup-production.tar.gz
```

This downloads a complete, timestamped snapshot of all documents and asset references in the `production` dataset to a single file.

### Export the Preview Dataset

```
npx sanity dataset export preview ./backup-preview.tar.gz
```

Preview holds realistic *fabricated* content used for design QA — never real parish data. Back it up only if it's worth keeping around for future design work; it's not part of the parish's actual records.

### Restore / Import

To import a previously exported dataset (e.g., into a fresh project, or to recover from a mistake):

```
npx sanity dataset import ./backup-production.tar.gz production
```

**This is a destructive operation on the target dataset if documents overlap** — review the Sanity CLI's prompts carefully, and when in doubt, import into a new/empty dataset first to verify the contents before pointing production traffic at it.

### Recommended Cadence

Export `production` periodically (e.g., monthly, and always before a major schema change or bulk content edit) and keep the `.tar.gz` file somewhere safe outside the repository (it is not meant to be committed to GitHub).

## Environment Variables

Names only — see `.env.example` for the full list with comments. **Never commit actual values** (`.env.local` is gitignored for this reason).

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project identifier |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` or `preview` — production deployments must always use `production` |
| `NEXT_PUBLIC_SITE_URL` | The canonical production domain — used for sitemap, canonical URLs, OpenGraph, structured data |
| `RESEND_API_KEY` | Email delivery for the Contact and Prayer Request forms |
| `CONTACT_TO_EMAIL` | Inbox that receives Contact form submissions |
| `PRAYER_TO_EMAIL` | Inbox that receives Prayer Request submissions |
| `EMAIL_FROM` | Verified sending address for outgoing form emails |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile (spam protection), public key |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile, server-side secret |
| `GOOGLE_PLACES_API_KEY` | Powers the homepage Google Reviews section |
| `GOOGLE_PLACE_ID` | Identifies the parish's Google Business listing |

### What Must Never Be Committed

- `.env.local` (already gitignored)
- Any API key, secret, or token value, in any file, commit message, or code comment
- Sanity dataset export files (`.tar.gz`) — these contain real parish data and should be stored outside version control
- Any Sanity auth token (`npx sanity login` stores a session token locally, outside the repo — never paste it into code)

## Who Holds What

Record this separately (not in version control) and keep it current as staff change:

- GitHub repository ownership/admin access
- Sanity project ownership and member list
- Vercel project ownership and environment variable access
- Domain registrar and DNS access
- Resend and Cloudflare Turnstile account access
