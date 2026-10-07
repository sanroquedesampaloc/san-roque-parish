import Link from "next/link";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  backLink,
  motif = "none",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  backLink?: { href: string; label: string };
  motif?: "none" | "cross";
}) {
  const compact = Boolean(backLink);

  return (
    <section
      className={`relative bg-burgundy-dark text-white overflow-hidden ${
        compact ? "" : "lg:flex lg:items-center lg:min-h-[48svh]"
      }`}
    >
      {/* Atmospheric wash, echoing the homepage hero at a calmer intensity */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 15% 30%, rgba(107,29,42,0.5) 0%, transparent 55%), radial-gradient(ellipse at 85% 70%, rgba(184,148,62,0.07) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0v80M0 40h80' stroke='%23ffffff' stroke-width='0.3' fill='none'/%3E%3C/svg%3E\")",
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      {motif === "cross" && (
        <svg
          className="absolute right-[6%] top-1/2 -translate-y-1/2 w-40 h-40 md:w-56 md:h-56 text-gold/[0.07] hidden sm:block"
          viewBox="0 0 80 80"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
          aria-hidden="true"
        >
          <path d="M40 5v70M15 30h50" strokeLinecap="round" />
        </svg>
      )}

      <div
        className={`container-parish relative hero-content ${
          compact ? "py-12 md:py-16" : "py-16 md:py-24"
        }`}
      >
        {backLink && (
          <Link
            href={backLink.href}
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            {backLink.label}
          </Link>
        )}

        {eyebrow && (
          <p className="text-gold-light font-semibold tracking-[0.25em] uppercase text-xs mb-4">
            {eyebrow}
          </p>
        )}

        <h1
          className={`font-semibold leading-tight max-w-3xl ${
            compact ? "text-3xl md:text-4xl" : "text-3xl md:text-4xl lg:text-5xl"
          }`}
        >
          {title}
        </h1>

        {subtitle && (
          <p className="mt-4 text-base md:text-lg text-white/70 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}

        <div className="mt-6 h-px w-12 bg-gold/60" aria-hidden="true" />
      </div>
    </section>
  );
}
