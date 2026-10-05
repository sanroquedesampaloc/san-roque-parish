# Design System

Design tokens and UI conventions for the San Roque de Sampaloc Parish website.

## Typography

- Headings: Playfair Display (serif, elegant, timeless)
- Body: Inter (sans-serif, readable, clean)
- Loaded via `next/font/google` with CSS variables `--font-playfair` and `--font-inter`

## Colors

### Primary Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `ivory` | `#FDF8F0` | Page background |
| `ivory-warm` | `#F5F0E8` | Section backgrounds, subtle surfaces |
| `burgundy` | `#722F37` | Primary brand, buttons, headings accent |
| `burgundy-light` | `#8B3A42` | Hover states |
| `burgundy-dark` | `#5C2730` | Active states, dark accents |
| `gold` | `#C9A84C` | Accent, decorative elements |
| `gold-light` | `#D4B55E` | Gold hover states |
| `gold-dark` | `#A8893D` | Gold active states |

### Neutral Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `charcoal` | `#2D2D2D` | Primary text |
| `charcoal-light` | `#5A5A5A` | Secondary text |
| `charcoal-muted` | `#6B6B6B` | Muted text, captions (WCAG AA compliant on ivory) |
| `border` | `#E8E0D4` | Card/section borders |
| `border-light` | `#F0EBE3` | Subtle borders |

## Layout

- Mobile-first using Tailwind CSS v4
- Custom `container-parish` utility: max-width 80rem, responsive padding
- Breakpoints: Tailwind defaults (sm 640px, md 768px, lg 1024px, xl 1280px)
- Section vertical padding: `py-16 md:py-24`

## Accessibility

- Target: WCAG 2.1 AA
- Semantic HTML
- Keyboard navigation
- Sufficient color contrast
- Alt text on all images (enforced in CMS schema)
- Visible focus states with `focus-visible:outline-2`
- Reduced motion: `prefers-reduced-motion: reduce` globally disables transitions, animations, and scroll-behavior

## Components

- `Container` — centered content wrapper
- `Section` — vertical rhythm section with background variants
- `SectionHeading` — title, subtitle, gold underline accent
- `ButtonLink` — primary, secondary, outline, gold variants
- `ScheduleDisplay` — renders CMS schedule entries
- `PortableTextRenderer` — Portable Text rendering with parish styling
- `AnnouncementCard` — announcement preview card
- `EventCard` — event with date badge
- `HomilyCard` — homily preview
- `MinistryCard` — ministry summary
- `Header` — sticky top nav with logo and desktop links
- `MobileNav` — slide-out mobile menu with overlay
- `Footer` — four-column footer with CMS data
