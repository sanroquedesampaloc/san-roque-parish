"use client";

import { useConsent } from "./ConsentProvider";

/**
 * Gates a single optional third-party embed (Google Maps, Facebook Live)
 * behind the site's "External Media" consent category. Renders a quiet
 * placeholder — with a one-click "load it anyway" action and a plain link
 * that doesn't require granting consent — until that category is granted.
 * Server components build the actual embed markup and pass it as children;
 * it's simply never mounted until this gate decides to render it.
 */
export function ExternalMediaGate({
  title,
  description,
  primaryLabel,
  secondaryLabel,
  secondaryHref,
  variant = "box",
  className = "",
  children,
}: {
  title: string;
  description: string;
  primaryLabel: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  variant?: "box" | "video";
  className?: string;
  children: React.ReactNode;
}) {
  const { externalMediaConsent, allowExternalMedia } = useConsent();

  if (externalMediaConsent === "granted") {
    return <>{children}</>;
  }

  const sizeClasses =
    variant === "video" ? "aspect-video" : "min-h-[280px] md:min-h-0 h-full";

  return (
    <div
      className={`bg-parchment flex flex-col items-center justify-center text-center p-8 md:p-10 gap-4 ${sizeClasses} ${className}`}
    >
      <svg
        className="w-10 h-10 text-charcoal-muted/30"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l2.5 2.5" />
      </svg>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-charcoal-muted mb-1.5">
          {title}
        </p>
        <p className="text-sm text-charcoal-light leading-relaxed max-w-xs">
          {description}
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3 mt-1">
        <button
          type="button"
          onClick={allowExternalMedia}
          className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-medium tracking-wide uppercase bg-burgundy text-white hover:bg-burgundy-light transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
        >
          {primaryLabel}
        </button>
        {secondaryHref && secondaryLabel && (
          <a
            href={secondaryHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-medium tracking-wide uppercase border border-burgundy text-burgundy hover:bg-burgundy hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
          >
            {secondaryLabel}
          </a>
        )}
      </div>
    </div>
  );
}
