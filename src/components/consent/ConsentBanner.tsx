"use client";

import { useEffect, useRef } from "react";
import { useConsent } from "./ConsentProvider";

export function ConsentBanner() {
  const {
    hasDecided,
    preferencesOpen,
    allowExternalMedia,
    denyExternalMedia,
    openPreferences,
  } = useConsent();
  const bannerRef = useRef<HTMLDivElement>(null);
  const visible = !hasDecided && !preferencesOpen;

  // Being fixed to the viewport bottom, the banner would otherwise sit on
  // top of (and block clicks on) whatever happens to scroll to that same
  // spot — including the footer's own "Cookie Preferences" link. Reserving
  // the banner's height as body padding keeps all page content reachable.
  useEffect(() => {
    if (!visible) return;
    const el = bannerRef.current;
    if (!el) return;

    const applyPadding = () => {
      document.body.style.paddingBottom = `${el.offsetHeight}px`;
    };
    applyPadding();

    const observer = new ResizeObserver(applyPadding);
    observer.observe(el);

    return () => {
      observer.disconnect();
      document.body.style.paddingBottom = "";
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={bannerRef}
      role="region"
      aria-label="Cookie and privacy preferences"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/40 bg-ivory shadow-premium"
    >
      <div className="container-parish py-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-charcoal-light leading-relaxed max-w-2xl">
          We use necessary technologies to operate and protect this website.
          Optional external media from Google and Facebook may connect to
          third-party services.
        </p>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={openPreferences}
            className="text-sm font-medium text-charcoal-light underline hover:text-burgundy transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
          >
            Preferences
          </button>
          <button
            type="button"
            onClick={denyExternalMedia}
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium tracking-wide uppercase border border-charcoal/30 text-charcoal hover:border-charcoal transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
          >
            Necessary Only
          </button>
          <button
            type="button"
            onClick={allowExternalMedia}
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium tracking-wide uppercase bg-burgundy text-white hover:bg-burgundy-light transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
          >
            Allow External Media
          </button>
        </div>
      </div>
    </div>
  );
}
