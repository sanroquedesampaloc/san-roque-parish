import { ButtonLink } from "@/components/ui/ButtonLink";

export function PrayerRequestSection() {
  return (
    <section className="relative bg-burgundy-dark text-white overflow-hidden py-20 md:py-28">
      {/* Atmospheric gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(184,148,62,0.1) 0%, transparent 50%), radial-gradient(ellipse at 50% 100%, rgba(184,148,62,0.06) 0%, transparent 40%)",
        }}
        aria-hidden="true"
      />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0v60M0 30h60' stroke='%23ffffff' stroke-width='0.3' fill='none'/%3E%3C/svg%3E\")",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Floating gold accents */}
      <div
        className="absolute top-16 left-[20%] w-1 h-1 rounded-full bg-gold/25"
        style={{ animation: "gentleFloat 7s ease-in-out infinite" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-20 right-[25%] w-1 h-1 rounded-full bg-gold/20"
        style={{ animation: "gentleFloat 9s ease-in-out infinite 1.5s" }}
        aria-hidden="true"
      />

      <div className="container-parish relative">
        <div className="max-w-2xl mx-auto text-center">
          {/* Animated gold accent line */}
          <div
            className="w-px h-12 mx-auto mb-8"
            style={{
              background:
                "linear-gradient(to bottom, transparent, var(--color-gold), transparent)",
              animation: "pulseGlow 3s ease-in-out infinite",
            }}
            aria-hidden="true"
          />

          <p className="text-gold-shimmer text-[11px] font-semibold uppercase tracking-[0.3em] mb-6">
            We Are Here for You
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6 leading-tight">
            Need Prayers?
          </h2>

          <p className="text-base md:text-lg text-white/65 mb-10 leading-relaxed max-w-xl mx-auto">
            Our parish community is here for you. Reach out and let us lift your
            intentions in prayer.
          </p>

          <ButtonLink href="/prayer-request" variant="gold">
            Send a Prayer Request
          </ButtonLink>

          {/* Bottom accent line */}
          <div
            className="w-px h-12 mx-auto mt-10"
            style={{
              background:
                "linear-gradient(to bottom, var(--color-gold), transparent)",
              animation: "pulseGlow 3s ease-in-out infinite 1.5s",
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
