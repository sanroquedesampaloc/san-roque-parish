export function SectionDivider({ bg = "ivory" }: { bg?: "ivory" | "ivory-warm" | "white" }) {
  const bgClass = {
    ivory: "bg-ivory",
    "ivory-warm": "bg-ivory-warm",
    white: "bg-white",
  }[bg];

  return (
    <div className={`${bgClass} py-2`} aria-hidden="true">
      <div className="section-ornament">
        <svg
          className="w-3 h-3 text-gold/50 flex-shrink-0"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
        >
          <path d="M6 1v10M1 6h10" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
