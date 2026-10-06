import Link from "next/link";

export function PageHero({
  title,
  subtitle,
  backLink,
}: {
  title: string;
  subtitle?: string;
  backLink?: { href: string; label: string };
}) {
  return (
    <section className="relative bg-burgundy-dark text-white overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0v80M0 40h80' stroke='%23ffffff' stroke-width='0.3' fill='none'/%3E%3C/svg%3E\")",
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      <div className="container-parish relative py-16 md:py-24">
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

        <p className="text-gold font-medium tracking-[0.25em] uppercase text-xs mb-4">
          San Roque de Sampaloc Parish
        </p>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
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
