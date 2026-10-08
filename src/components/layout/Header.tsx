import Link from "next/link";
import { MobileMenuTrigger } from "./MobileMenuTrigger";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/mass-sacraments", label: "Sacraments" },
  { href: "/ministries", label: "Ministries" },
  { href: "/news", label: "News" },
  { href: "/events", label: "Events" },
  { href: "/homilies", label: "Homilies" },
  { href: "/contact", label: "Contact" },
];

// The mobile drawer has room for one more item than the desktop bar, which
// is already near its practical width limit at the 1024px breakpoint where
// it first appears (see docs/DECISIONS.md). Columbarium is reachable here
// and from the footer's Quick Links instead of forcing a 9th desktop item.
const mobileNavLinks = [
  ...navLinks.slice(0, 3),
  { href: "/columbarium", label: "Columbarium" },
  ...navLinks.slice(3),
];

export function Header() {
  return (
    <header className="sticky top-0 z-50">
      <div
        className="h-0.5"
        style={{ background: "linear-gradient(90deg, var(--color-gold-dark), var(--color-gold), var(--color-gold-light), var(--color-gold), var(--color-gold-dark))" }}
        aria-hidden="true"
      />
      <div className="bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="container-parish flex items-center justify-between h-16 md:h-[4.5rem]">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-burgundy/20 flex items-center justify-center flex-shrink-0" aria-hidden="true">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-burgundy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M12 2v20M7 7h10M9 12h6" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-base md:text-lg font-semibold font-serif text-burgundy leading-tight group-hover:text-burgundy-light transition-colors">
                San Roque Parish
              </span>
              <span className="text-[10px] uppercase tracking-[0.15em] text-charcoal-muted hidden sm:block leading-none">
                Sampaloc, Manila
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-[13px] font-medium uppercase tracking-wider text-charcoal-light hover:text-burgundy transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/give"
              className="ml-3 inline-flex items-center justify-center px-5 py-2.5 text-[13px] font-semibold uppercase tracking-wider bg-gold text-charcoal hover:bg-gold-light transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              Donate
            </Link>
          </nav>

          <MobileMenuTrigger links={mobileNavLinks} />
        </div>
      </div>
    </header>
  );
}
