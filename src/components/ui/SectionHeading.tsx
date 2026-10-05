export function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = false,
  size = "default",
}: {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  size?: "default" | "large";
}) {
  return (
    <div className={`mb-10 md:mb-14 ${centered ? "text-center" : ""}`}>
      <h2
        className={`font-bold tracking-tight ${
          size === "large"
            ? "text-3xl md:text-4xl lg:text-5xl"
            : "text-3xl md:text-4xl"
        } ${light ? "text-white" : "text-charcoal"}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 ${
            size === "large" ? "text-lg md:text-xl" : "text-lg"
          } ${light ? "text-white/80" : "text-charcoal-light"}`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`mt-4 mx-auto h-0.5 w-16 ${
          centered ? "" : "mx-0"
        } ${light ? "bg-gold-light" : "bg-gold"}`}
        aria-hidden="true"
      />
    </div>
  );
}
