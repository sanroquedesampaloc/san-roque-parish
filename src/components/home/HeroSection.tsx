import { ButtonLink } from "@/components/ui/ButtonLink";

export function HeroSection({
  settings,
}: {
  settings: {
    parishName: string | null;
    shortDescription: string | null;
  } | null;
}) {
  return (
    <section className="relative bg-burgundy-dark text-white overflow-hidden">
      {/* Layered gradient atmosphere */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(107,29,42,0.6) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(184,148,62,0.08) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0v80M0 40h80' stroke='%23ffffff' stroke-width='0.3' fill='none'/%3E%3C/svg%3E\")",
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      {/* Floating decorative elements */}
      <div
        className="absolute top-20 left-[10%] w-1 h-1 rounded-full bg-gold/30"
        style={{ animation: "gentleFloat 6s ease-in-out infinite" }}
        aria-hidden="true"
      />
      <div
        className="absolute top-32 right-[15%] w-1.5 h-1.5 rounded-full bg-gold/20"
        style={{ animation: "gentleFloat 8s ease-in-out infinite 1s" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-28 left-[25%] w-1 h-1 rounded-full bg-gold/25"
        style={{ animation: "gentleFloat 7s ease-in-out infinite 2s" }}
        aria-hidden="true"
      />

      <div className="container-parish relative">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center py-20 md:py-28 lg:py-36">
          <div className="lg:col-span-3 hero-content">
            <p className="text-gold-shimmer font-semibold tracking-[0.3em] uppercase text-xs mb-6">
              Welcome to
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-semibold leading-[1.08] mb-6 tracking-tight">
              {settings?.parishName ?? "San Roque de Sampaloc Parish"}
            </h1>
            {settings?.shortDescription ? (
              <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-xl">
                {settings.shortDescription}
              </p>
            ) : (
              <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-xl">
                A Catholic community of faith, worship, and service in the heart
                of Sampaloc, Manila.
              </p>
            )}
            <div className="flex flex-wrap gap-4">
              <ButtonLink href="#mass-schedule" variant="gold">
                Mass Schedule
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline-light">
                Plan Your Visit
              </ButtonLink>
            </div>
          </div>

          <div
            className="lg:col-span-2 flex justify-center lg:justify-end hero-visual"
            aria-hidden="true"
          >
            <div className="relative w-64 md:w-72 lg:w-80">
              <div className="aspect-[3/4] bg-burgundy rounded-t-full border border-white/10 overflow-hidden relative">
                {/* Premium gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(170deg, rgba(184,148,62,0.12) 0%, transparent 40%, rgba(83,23,34,0.3) 100%)",
                  }}
                />

                {/* Refined concentric arches */}
                <div className="absolute inset-3 rounded-t-full border border-gold/12" />
                <div className="absolute inset-6 rounded-t-full border border-gold/8" />
                <div className="absolute inset-10 rounded-t-full border border-gold/5" />

                {/* Cross icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-20 h-20 text-gold/15"
                    viewBox="0 0 80 80"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.75"
                  >
                    <path
                      d="M40 5v70M15 30h50M20 20h40M25 45h30"
                      strokeLinecap="round"
                    />
                    <circle cx="40" cy="30" r="8" />
                  </svg>
                </div>

                {/* Bottom vignette */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-burgundy-dark/80 to-transparent" />
              </div>

              <div className="mt-3 text-center">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/25">
                  Parish Photo
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-ivory to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
