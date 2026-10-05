"use client";

import { useState, useRef } from "react";
import { MobileNav } from "./MobileNav";

export function MobileMenuTrigger({
  links,
}: {
  links: Array<{ href: string; label: string }>;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setMobileOpen(true)}
        className="lg:hidden p-2 -mr-2 text-charcoal hover:text-burgundy transition-colors"
        aria-label="Open menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={links}
        triggerRef={triggerRef}
      />
    </>
  );
}
