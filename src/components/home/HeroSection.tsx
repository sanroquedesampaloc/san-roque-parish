import { ButtonLink } from "@/components/ui/ButtonLink";
import { HeroBackgroundMedia } from "@/components/home/HeroBackgroundMedia";

export function HeroSection({
  settings,
}: {
  settings: {
    parishName: string | null;
    shortDescription: string | null;
  } | null;
}) {
  return (
    <section
      className="relative flex min-h-[85svh] items-center overflow-hidden bg-charcoal text-ivory md:min-h-[calc(100svh-4.625rem)]"
    >
      {/* Full-bleed background: looping video on tablet/desktop with no
          motion-reduction preference, static poster image otherwise
          (mobile widths, prefers-reduced-motion: reduce, or no JS). See
          HeroBackgroundMedia for why this needs to be a client component. */}
      <HeroBackgroundMedia />

      {/* Text-legibility scrim only, no global color wash over the footage.
          Desktop (lg+, 1024px), where the layout splits into the
          asymmetric text-left/reliquary-right composition: neutral,
          horizontal, concentrated behind the left text column and fully
          transparent by the time it reaches the reliquary on the right.
          Below lg (mobile through tablet/portrait widths) the text column
          stacks full-width over the full-bleed image/video, so a top/bottom
          vignette protects the eyebrow/headline and the CTAs instead — the
          two-column split was tried down to 768px, but at tall/narrow
          tablet ratios object-cover has to crop so tightly that the
          reliquary fills nearly the entire visible frame no matter the
          object-position, leaving no clean negative space beside it; the
          full-width stacked treatment reads far more composed at that
          range. */}
      <div
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.37) 20%, rgba(0,0,0,0.18) 45%, rgba(0,0,0,0.06) 65%, transparent 80%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 lg:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.42) 30%, rgba(0,0,0,0.40) 55%, rgba(0,0,0,0.52) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="container-parish relative w-full py-14 lg:py-0">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
          <div className="hero-content lg:col-span-3">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-gold/70" aria-hidden="true" />
              {/* Solid (non-transparent) label chip rather than text laid
                  directly over the scrim: measured against real video
                  frames, antique-gold text at this small size cannot reach
                  WCAG AA (4.5:1) over this footage without darkening the
                  shared scrim far beyond the brief's "barely-there" bound —
                  an opaque backing guarantees reliable contrast in every
                  frame instead of depending on video content. */}
              <span className="bg-charcoal/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-gold-light">
                Welcome to
              </span>
            </div>
            <h1 className="mb-6 max-w-2xl text-4xl font-medium leading-[1.08] tracking-tight text-ivory md:text-5xl lg:text-[3.5rem] xl:text-6xl">
              {settings?.parishName ?? "San Roque de Sampaloc Parish"}
            </h1>
            {settings?.shortDescription ? (
              <p className="mb-10 max-w-md text-lg leading-relaxed text-ivory/80 md:text-xl">
                {settings.shortDescription}
              </p>
            ) : (
              <p className="mb-10 max-w-md text-lg leading-relaxed text-ivory/80 md:text-xl">
                A Catholic community of faith, worship, and service in the heart
                of Sampaloc, Manila.
              </p>
            )}
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <ButtonLink
                href="#mass-schedule"
                variant="gold"
                className="w-full sm:w-auto"
              >
                Mass Schedule
              </ButtonLink>
              <ButtonLink
                href="/contact"
                variant="outline-light"
                className="w-full sm:w-auto"
              >
                Plan Your Visit
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>

      {/* Short, crisp seam into the ivory Mass & Confession Schedule section
          below — the footage should stay visually clear almost to the very
          bottom of the hero. */}
      <div
        className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-ivory to-transparent md:h-12"
        aria-hidden="true"
      />
    </section>
  );
}
