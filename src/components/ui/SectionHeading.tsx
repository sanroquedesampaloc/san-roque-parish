export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  centered = true,
  light = false,
  size = "default",
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  centered?: boolean;
  light?: boolean;
  size?: "default" | "large";
}) {
  return (
    <div className={`mb-10 md:mb-14 ${centered ? "text-center" : ""}`}>
      {eyebrow && (
        <p
          className={`text-xs font-semibold uppercase tracking-[0.2em] mb-3 ${
            light ? "text-gold-light" : "text-gold-shimmer"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-semibold tracking-tight leading-tight ${
          size === "large"
            ? "text-3xl md:text-4xl lg:text-5xl"
            : "text-2xl md:text-3xl lg:text-4xl"
        } ${light ? "text-white" : "text-charcoal"}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 ${
            size === "large" ? "text-base md:text-lg" : "text-base"
          } ${light ? "text-white/70" : "text-charcoal-light"}`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`mt-5 h-px w-12 accent-line-animated ${
          centered ? "mx-auto" : ""
        }`}
        style={{
          background: light
            ? "linear-gradient(90deg, transparent, var(--color-gold-light), transparent)"
            : "linear-gradient(90deg, var(--color-gold-dark), var(--color-gold), var(--color-gold-dark))",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
