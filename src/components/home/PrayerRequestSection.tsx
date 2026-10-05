import { ButtonLink } from "@/components/ui/ButtonLink";

export function PrayerRequestSection() {
  return (
    <section className="relative bg-burgundy-dark text-white overflow-hidden py-20 md:py-28">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0v60M0 30h60' stroke='%23ffffff' stroke-width='0.3' fill='none'/%3E%3C/svg%3E\")",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="container-parish relative">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-px h-10 bg-gold/40 mx-auto mb-8" aria-hidden="true" />

          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-light mb-6">
            We Are Here for You
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6 leading-tight">
            Need Prayers?
          </h2>

          <p className="text-base md:text-lg text-white/70 mb-10 leading-relaxed max-w-xl mx-auto">
            Our parish community is here for you. Reach out and let us lift your
            intentions in prayer.
          </p>

          <ButtonLink href="/prayer-request" variant="gold">
            Send a Prayer Request
          </ButtonLink>

          <div className="w-px h-10 bg-gold/40 mx-auto mt-10" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
