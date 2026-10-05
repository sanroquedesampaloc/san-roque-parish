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
