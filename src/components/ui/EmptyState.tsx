import { ButtonLink } from "./ButtonLink";

export function EmptyState({
  message,
  cta,
}: {
  message: string;
  cta?: { href: string; label: string };
}) {
  return (
    <div className="text-center py-16 md:py-24">
      <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-parchment flex items-center justify-center">
        <svg className="w-5 h-5 text-charcoal-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
      </div>
      <p className="text-charcoal-muted text-base">{message}</p>
      {cta && (
        <div className="mt-6">
          <ButtonLink href={cta.href} variant="outline">
            {cta.label}
          </ButtonLink>
        </div>
      )}
    </div>
  );
}
