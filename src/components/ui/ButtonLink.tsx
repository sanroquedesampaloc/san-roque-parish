import Link from "next/link";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "gold";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center px-6 py-3 rounded-md text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2";

  const variants = {
    primary:
      "bg-burgundy text-white hover:bg-burgundy-light focus-visible:outline-burgundy",
    secondary:
      "bg-ivory-warm text-charcoal hover:bg-border focus-visible:outline-charcoal",
    outline:
      "border-2 border-burgundy text-burgundy hover:bg-burgundy hover:text-white focus-visible:outline-burgundy",
    gold: "bg-gold text-charcoal hover:bg-gold-light focus-visible:outline-gold",
  };

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
