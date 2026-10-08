// Single first-party consent cookie covering the one optional category this
// site actually has: "external media" (Google Maps + Facebook Live embeds).
// No analytics/advertising categories exist here because no such technology
// is present — see docs/DECISIONS.md for the audit this is based on.
export const CONSENT_COOKIE_NAME = "parish_consent";
export const CONSENT_VERSION = 1;
const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 180; // 180 days

export type ExternalMediaConsent = "granted" | "denied";

export interface ConsentRecord {
  externalMedia: ExternalMediaConsent;
  version: number;
  ts: number;
}

function isConsentRecord(value: unknown): value is ConsentRecord {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return (
    (record.externalMedia === "granted" || record.externalMedia === "denied") &&
    typeof record.version === "number" &&
    typeof record.ts === "number"
  );
}

export function serializeConsent(record: ConsentRecord): string {
  return encodeURIComponent(JSON.stringify(record));
}

/** Parses a single cookie's raw (still percent-encoded) value. */
export function parseConsentValue(
  rawValue: string | undefined | null
): ConsentRecord | null {
  if (!rawValue) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(rawValue));
    if (isConsentRecord(parsed)) return parsed;
  } catch {
    // malformed cookie — treat as no decision yet
  }
  return null;
}

/**
 * Parses our consent cookie out of a raw `document.cookie`-style string
 * (semicolon-separated `key=value` pairs). Returns null for a missing or
 * malformed cookie — callers should treat that the same as "no decision yet".
 */
export function parseConsentCookie(cookieString: string): ConsentRecord | null {
  for (const pair of cookieString.split(";")) {
    const separatorIndex = pair.indexOf("=");
    if (separatorIndex === -1) continue;
    const key = pair.slice(0, separatorIndex).trim();
    if (key !== CONSENT_COOKIE_NAME) continue;
    return parseConsentValue(pair.slice(separatorIndex + 1).trim());
  }
  return null;
}

export function buildConsentCookie(
  externalMedia: ExternalMediaConsent,
  options?: { secure?: boolean }
): string {
  const record: ConsentRecord = {
    externalMedia,
    version: CONSENT_VERSION,
    ts: Date.now(),
  };
  const secureFlag = options?.secure ? "; Secure" : "";
  return `${CONSENT_COOKIE_NAME}=${serializeConsent(record)}; Max-Age=${CONSENT_MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secureFlag}`;
}
