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
    <section className="relative bg-burgundy text-white overflow-hidden">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,168,76,0.15)_0%,_transparent_50%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(92,39,48,0.8)_0%,_transparent_60%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0v60M0 30h60' stroke='%23ffffff' stroke-width='0.5' fill='none'/%3E%3C/svg%3E\")",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />
      <div className="container-parish relative py-24 md:py-36 lg:py-44">
        <div className="max-w-3xl">
          <p className="text-gold font-semibold tracking-[0.2em] uppercase text-sm mb-5">
            Welcome to
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6">
            {settings?.parishName ?? "San Roque de Sampaloc Parish"}
          </h1>
          {settings?.shortDescription && (
            <p className="text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed mb-10 max-w-2xl">
              {settings.shortDescription}
            </p>
          )}
          <div className="flex flex-wrap gap-4">
            <ButtonLink href="#mass-schedule" variant="gold">
              Mass Schedule
            </ButtonLink>
            <ButtonLink
              href="/announcements"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10 hover:text-white"
            >
              Latest Announcements
            </ButtonLink>
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-ivory to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
