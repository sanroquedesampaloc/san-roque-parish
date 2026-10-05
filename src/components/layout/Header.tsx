import Link from "next/link";
import { MobileMenuTrigger } from "./MobileMenuTrigger";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/sacraments", label: "Sacraments" },
  { href: "/ministries", label: "Ministries" },
  { href: "/announcements", label: "Announcements" },
  { href: "/events", label: "Events" },
  { href: "/homilies", label: "Homilies" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container-parish flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-lg md:text-xl font-bold font-serif text-burgundy group-hover:text-burgundy-light transition-colors">
            San Roque Parish
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-charcoal-light hover:text-burgundy transition-colors rounded-md hover:bg-burgundy/5"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <MobileMenuTrigger links={navLinks} />
      </div>
    </header>
  );
}
