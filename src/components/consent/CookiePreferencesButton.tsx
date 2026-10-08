"use client";

import { useConsent } from "./ConsentProvider";

export function CookiePreferencesButton() {
  const { openPreferences } = useConsent();
  return (
    <button type="button" onClick={openPreferences} className="hover:text-white transition-colors">
      Cookie Preferences
    </button>
  );
}
