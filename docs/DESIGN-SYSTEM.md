# Design System

Design tokens and UI conventions for the San Roque de Sampaloc Parish website.

## Typography

- Headings: EB Garamond (classical serif, ecclesiastical, editorial)
- Body: Inter (sans-serif, readable, clean)
- Loaded via `next/font/google` with CSS variables `--font-eb-garamond` and `--font-inter`
- Headings use `font-semibold` for refined weight
- Small labels use uppercase tracking for liturgical/institutional tone

## Colors

### Primary Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `ivory` | `#FAF6EE` | Page background (parchment) |
| `ivory-warm` | `#F0EAD6` | Section backgrounds, cream surfaces |
| `parchment` | `#F5EFE0` | Icon backgrounds, decorative surfaces |
| `burgundy` | `#6B1D2A` | Primary brand, buttons, headings accent |
| `burgundy-light` | `#7E2535` | Hover states |
| `burgundy-dark` | `#531722` | Hero, prayer section, deep accents |
| `gold` | `#B8943E` | Accent, decorative rules, dividers |
| `gold-light` | `#C9A84C` | Gold hover states, eyebrow text on dark |
| `gold-dark` | `#9A7B33` | Gold active states, eyebrow text on light |

### Neutral Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `charcoal` | `#2A2523` | Primary text (warm dark brown-black) |
| `charcoal-light` | `#5A524A` | Secondary text (warm medium) |
| `charcoal-muted` | `#6B6360` | Muted text, captions (WCAG AA: 5.42:1 on ivory) |
| `border` | `#DDD5C8` | Card/section borders |
| `border-light` | `#EAE4D9` | Subtle borders |

## Layout

- Mobile-first using Tailwind CSS v4
- Custom `container-parish` utility: max-width 80rem, responsive padding
- Breakpoints: Tailwind defaults (sm 640px, md 768px, lg 1024px, xl 1280px)
- Section vertical padding varies by spacing prop: compact, default, loose
- Sharp corners (no rounded-xl) for editorial feel; minimal rounded elements

## Visual Language

- Thin gold rules as dividers and decorative accents
- Subtle cross-pattern texture on dark sections (SVG data URI at low opacity)
- Arch-shaped framing for image/photo areas
- Small liturgical-style eyebrow labels (uppercase, tracking-wider, gold)
- Section rhythm varies: split layouts, full-width colored sections, editorial grids
- No SaaS-style gradients or glossy effects

## Accessibility

- Target: WCAG 2.1 AA
- Semantic HTML
- Keyboard navigation
- Sufficient color contrast (all text tokens verified)
- Alt text on all images (enforced in CMS schema)
- Visible focus states with `focus-visible:outline-2`
- Reduced motion: `prefers-reduced-motion: reduce` globally disables transitions, animations, and scroll-behavior
- Skip-to-content link as first focusable element
- Mobile nav focus trap with focus restoration

## Components

- `Container` — centered content wrapper
- `Section` — vertical rhythm section with background variants (default, warm, burgundy, white)
- `SectionHeading` — title, subtitle, eyebrow, gold underline; supports centered and left-aligned
- `ButtonLink` — primary, secondary, outline, gold, outline-light variants
- `ScheduleDisplay` — renders CMS schedule entries
- `PortableTextRenderer` — Portable Text rendering with parish styling
- `AnnouncementCard` — editorial announcement card
- `EventCard` — event with burgundy date block
- `HomilyCard` — homily preview
- `MinistryCard` — ministry summary with icon
- `Header` — sticky top nav with gold top accent, cross motif, Server Component
- `MobileMenuTrigger` — Client Component for mobile menu state
- `MobileNav` — slide-out mobile menu with focus trap
- `Footer` — four-column institutional footer with CMS data
