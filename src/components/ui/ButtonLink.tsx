import Link from "next/link";

const base =
  "inline-flex items-center justify-center px-7 py-3 text-sm font-medium tracking-wide uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2";

const variants = {
  primary:
    "bg-burgundy text-white hover:bg-burgundy-light focus-visible:outline-burgundy",
  secondary:
    "bg-ivory-warm text-charcoal hover:bg-border focus-visible:outline-charcoal",
  outline:
    "border border-burgundy text-burgundy hover:bg-burgundy hover:text-white focus-visible:outline-burgundy",
  gold: "bg-gold text-charcoal hover:bg-gold-light focus-visible:outline-gold",
  "outline-light":
    "border border-ivory/40 text-ivory hover:bg-ivory/10 focus-visible:outline-ivory",
};

function isExternal(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "gold" | "outline-light";
  className?: string;
}) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
