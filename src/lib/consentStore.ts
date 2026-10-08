// Tiny client-only external store for the consent cookie, read via
// useSyncExternalStore from ConsentProvider.
//
// Deliberately NOT read server-side (e.g. via next/headers in RootLayout):
// that would force the entire site into dynamic rendering on every request,
// which earlier work on this project explicitly ruled out (see
// docs/DECISIONS.md, ADR-012) — only the homepage and /live are allowed to
// opt into per-request freshness, and only for the Live Mass data. A brief
// one-frame correction after hydration for a returning visitor is the
// accepted trade-off for keeping the rest of the site statically rendered.
import {
  buildConsentCookie,
  parseConsentCookie,
  type ExternalMediaConsent,
} from "./consent";

type Listener = () => void;

const listeners = new Set<Listener>();
let cached: ExternalMediaConsent | null | undefined;

function readFromCookie(): ExternalMediaConsent | null {
  const record = parseConsentCookie(document.cookie);
  return record ? record.externalMedia : null;
}

export function subscribeConsent(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getConsentSnapshot(): ExternalMediaConsent | null {
  if (cached === undefined) {
    cached = readFromCookie();
  }
  return cached;
}

/** SSR/pre-hydration snapshot — always "no decision yet" since there's no browser cookie jar on the server. */
export function getConsentServerSnapshot(): ExternalMediaConsent | null {
  return null;
}

export function setConsent(value: ExternalMediaConsent): void {
  document.cookie = buildConsentCookie(value, {
    secure: window.location.protocol === "https:",
  });
  cached = value;
  listeners.forEach((listener) => listener());
}
