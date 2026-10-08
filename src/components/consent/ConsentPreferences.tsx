"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { useConsent } from "./ConsentProvider";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function ConsentPreferences() {
  const { preferencesOpen, closePreferences } = useConsent();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const wasOpenRef = useRef(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePreferences();
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
    [closePreferences]
  );

  useEffect(() => {
    if (preferencesOpen) {
      triggerRef.current = document.activeElement as HTMLElement | null;
      closeRef.current?.focus();
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
      wasOpenRef.current = true;
    } else {
      document.body.style.overflow = "";
      if (wasOpenRef.current) {
        triggerRef.current?.focus();
        wasOpenRef.current = false;
      }
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [preferencesOpen, handleKeyDown]);

  if (!preferencesOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consent-preferences-title"
    >
      <div
        className="fixed inset-0 bg-charcoal/50"
        onClick={closePreferences}
        aria-hidden="true"
      />
      {/* Mounted fresh every time the panel opens, so its toggle always
          initializes from whatever is currently committed — no effect
          needed to keep it in sync. */}
      <PreferencesPanel
        panelRef={panelRef}
        closeRef={closeRef}
        onClose={closePreferences}
      />
    </div>,
    document.body
  );
}

function PreferencesPanel({
  panelRef,
  closeRef,
  onClose,
}: {
  panelRef: RefObject<HTMLDivElement | null>;
  closeRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
}) {
  const { externalMediaConsent, allowExternalMedia, denyExternalMedia } =
    useConsent();
  const [externalMediaChecked, setExternalMediaChecked] = useState(
    () => externalMediaConsent === "granted"
  );

  const handleSave = () => {
    if (externalMediaChecked) {
      allowExternalMedia();
    } else {
      denyExternalMedia();
    }
  };

  return (
    <div
      ref={panelRef}
      className="fixed inset-x-4 bottom-4 md:inset-x-auto md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md bg-ivory shadow-2xl border border-border"
    >
      <div className="h-0.5 bg-gold" aria-hidden="true" />
      <div className="flex items-center justify-between px-5 h-14 border-b border-border">
        <h2
          id="consent-preferences-title"
          className="text-base font-semibold font-serif text-burgundy"
        >
          Cookie Preferences
        </h2>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="p-2 -mr-2 text-charcoal-light hover:text-burgundy transition-colors"
          aria-label="Close preferences"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="p-5 space-y-1 max-h-[60vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-4 py-3 border-b border-border-light">
          <div>
            <p className="text-sm font-semibold text-charcoal">Necessary</p>
            <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
              Required for core website functionality, security, and form
              protection.
            </p>
          </div>
          <span className="shrink-0 mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-charcoal-muted border border-border px-2.5 py-1">
            Always On
          </span>
        </div>

        <div className="flex items-start justify-between gap-4 py-3">
          <div>
            <p className="text-sm font-semibold text-charcoal">
              External Media
            </p>
            <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
              Allows embedded content from Google Maps and Facebook Live.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={externalMediaChecked}
            aria-label="External Media"
            onClick={() => setExternalMediaChecked((v) => !v)}
            className={`shrink-0 mt-0.5 relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy ${
              externalMediaChecked ? "bg-burgundy" : "bg-border"
            }`}
          >
            <span
              aria-hidden="true"
              className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
                externalMediaChecked ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="px-5 py-4 border-t border-border flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium tracking-wide uppercase bg-burgundy text-white hover:bg-burgundy-light transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}
