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
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0v80M0 40h80' stroke='%23ffffff' stroke-width='0.3' fill='none'/%3E%3C/svg%3E\")",
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      <div className="container-parish relative">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center py-20 md:py-28 lg:py-36">
          <div className="lg:col-span-3">
            <p className="text-gold font-medium tracking-[0.25em] uppercase text-xs mb-6">
              Welcome to
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] mb-6">
              {settings?.parishName ?? "San Roque de Sampaloc Parish"}
            </h1>
            {settings?.shortDescription ? (
              <p className="text-lg md:text-xl text-white/75 leading-relaxed mb-10 max-w-xl">
                {settings.shortDescription}
              </p>
            ) : (
              <p className="text-lg md:text-xl text-white/75 leading-relaxed mb-10 max-w-xl">
                A Catholic community of faith, worship, and service in the heart of Sampaloc, Manila.
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

          <div className="lg:col-span-2 flex justify-center lg:justify-end" aria-hidden="true">
            <div className="relative w-64 md:w-72 lg:w-80">
              <div
                className="aspect-[3/4] bg-burgundy rounded-t-full border border-white/10 overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-gold/8 to-transparent" />
                <div className="absolute inset-4 rounded-t-full border border-gold/15" />
                <div className="absolute inset-8 rounded-t-full border border-gold/8" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-20 h-20 text-gold/20" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="0.75">
                    <path d="M40 5v70M15 30h50M20 20h40M25 45h30" strokeLinecap="round" />
                    <circle cx="40" cy="30" r="8" />
                  </svg>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-burgundy-dark/60 to-transparent" />
              </div>

              <div className="mt-3 text-center">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">Parish Photo</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-ivory to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
