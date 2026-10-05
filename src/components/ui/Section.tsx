export function Section({
  children,
  className = "",
  id,
  bg = "default",
  spacing = "default",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  bg?: "default" | "warm" | "burgundy" | "white";
  spacing?: "compact" | "default" | "loose";
}) {
  const bgClasses = {
    default: "bg-ivory",
    warm: "bg-ivory-warm",
    burgundy: "bg-burgundy text-white",
    white: "bg-white",
  };

  const spacingClasses = {
    compact: "py-12 md:py-16",
    default: "py-16 md:py-24",
    loose: "py-20 md:py-32",
  };

  return (
    <section id={id} className={`${spacingClasses[spacing]} ${bgClasses[bg]} ${className}`}>
      {children}
    </section>
  );
}
