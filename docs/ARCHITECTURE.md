# Architecture

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| CMS | Sanity v5 (embedded studio) |
| Deployment | Vercel |

## Directory Structure

```
san-roque-parish/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   └── studio/           # Embedded Sanity Studio route
│   └── sanity/
│       ├── env.ts            # Sanity environment config
│       ├── lib/              # Client, image helper, live API
│       ├── schemaTypes/
│       │   ├── documents/    # Document type schemas
│       │   ├── objects/      # Reusable object type schemas
│       │   └── index.ts      # Schema registry
│       └── structure.ts      # Studio desk structure
├── docs/                     # Project documentation
├── sanity.config.ts          # Sanity Studio configuration
├── sanity.cli.ts             # Sanity CLI configuration
└── .env.local                # Environment variables (gitignored)
```

## Data Flow

1. Parish staff create/edit content in Sanity Studio at `/studio`
2. Content is stored in Sanity's hosted dataset (`production`)
3. Next.js fetches content via `sanityFetch` (GROQ queries through `next-sanity`)
4. Pages render as Server Components with live content updates via `SanityLive`
5. Static pages are generated at build time where possible

## Key Patterns

- **Singleton**: `parishSettings` uses a fixed document ID — edited as a single settings page, never a list
- **Rich text**: Portable Text (`blockContent` type) for body fields — renders to React components on the frontend
- **Images**: Sanity CDN with hotspot/crop support via `@sanity/image-url`
- **Icons**: Imported from `@sanity/icons` subpaths (e.g., `@sanity/icons/Cog`)

## Form Submission (Phase 3)

### Architecture

Contact and prayer request forms use **Server Actions** (`useActionState`) with the following pipeline:

1. Client submits form → Server Action receives `FormData`
2. Rate limiting check (in-memory, keyed by IP)
3. Zod schema validation
4. Cloudflare Turnstile server-side verification
5. Email delivery via Resend
6. Return typed state (`success` | `error` + field errors)

### Key Files

```
src/lib/
├── validation.ts         # Zod schemas for contact + prayer request
├── email.ts              # Resend email templates (plain-text + HTML)
├── turnstile.ts          # Cloudflare Turnstile server verification
├── rate-limit.ts         # In-memory sliding-window rate limiter
└── actions/
    ├── contact.ts        # Contact form server action
    └── prayer-request.ts # Prayer request server action

src/components/ui/
├── ContactForm.tsx       # Contact form (Client Component)
├── PrayerRequestForm.tsx # Prayer request form (Client Component)
└── TurnstileWidget.tsx   # Cloudflare Turnstile widget
```

### Email Delivery

- Provider: [Resend](https://resend.com)
- Emails include plain-text and simple HTML variants
- All user-supplied content is HTML-escaped before inclusion
- Recipient addresses are configured via environment variables, never hardcoded

### Spam Protection

- **Turnstile**: Cloudflare Turnstile widget on both forms; tokens verified server-side
- **Rate limiting**: In-memory fixed window — 5 submissions per 15-minute window per IP per form type. Resets on cold start (serverless limitation). For stricter enforcement, use Vercel KV or Upstash Redis.

### Environment Variables

| Variable | Server/Client | Source |
|----------|--------------|--------|
| `RESEND_API_KEY` | Server | Resend dashboard |
| `CONTACT_TO_EMAIL` | Server | Parish recipient for contact form |
| `PRAYER_TO_EMAIL` | Server | Parish recipient for prayer requests |
| `EMAIL_FROM` | Server | Verified sender address in Resend |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Client | Cloudflare Turnstile dashboard |
| `TURNSTILE_SECRET_KEY` | Server | Cloudflare Turnstile dashboard |
