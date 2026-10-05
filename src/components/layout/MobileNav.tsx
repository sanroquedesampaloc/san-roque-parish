"use client";

import { useEffect, useRef, useCallback, type RefObject } from "react";
import Link from "next/link";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function MobileNav({
  open,
  onClose,
  links,
  triggerRef,
}: {
  open: boolean;
  onClose: () => void;
  links: Array<{ href: string; label: string }>;
  triggerRef: RefObject<HTMLButtonElement | null>;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      closeRef.current?.focus();
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, handleKeyDown]);

  useEffect(() => {
    if (open) {
      wasOpenRef.current = true;
    } else if (wasOpenRef.current) {
      triggerRef.current?.focus();
      wasOpenRef.current = false;
    }
  }, [open, triggerRef]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
      <div className="fixed inset-0 bg-charcoal/50" onClick={onClose} aria-hidden="true" />
      <div ref={panelRef} className="fixed inset-y-0 right-0 w-full max-w-xs bg-ivory shadow-2xl flex flex-col">
        <div className="h-0.5 bg-gold" aria-hidden="true" />
        <div className="flex items-center justify-between px-5 h-16 border-b border-border">
          <span className="text-base font-semibold font-serif text-burgundy">Menu</span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="p-2 -mr-2 text-charcoal-light hover:text-burgundy transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-6" aria-label="Mobile navigation">
          <ul className="space-y-0.5 px-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block px-4 py-3 text-sm font-medium uppercase tracking-wider text-charcoal hover:text-burgundy hover:bg-burgundy/5 rounded transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-5 py-4 border-t border-border">
          <p className="text-xs text-charcoal-muted tracking-wide uppercase">San Roque de Sampaloc Parish</p>
        </div>
      </div>
    </div>
  );
}
