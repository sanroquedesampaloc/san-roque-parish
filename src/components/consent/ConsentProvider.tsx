"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import {
  getConsentServerSnapshot,
  getConsentSnapshot,
  setConsent,
  subscribeConsent,
} from "@/lib/consentStore";
import type { ExternalMediaConsent } from "@/lib/consent";

interface ConsentContextValue {
  externalMediaConsent: ExternalMediaConsent | null;
  hasDecided: boolean;
  preferencesOpen: boolean;
  allowExternalMedia: () => void;
  denyExternalMedia: () => void;
  openPreferences: () => void;
  closePreferences: () => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const externalMediaConsent = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getConsentServerSnapshot
  );
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  const allowExternalMedia = useCallback(() => {
    setConsent("granted");
    setPreferencesOpen(false);
  }, []);

  const denyExternalMedia = useCallback(() => {
    setConsent("denied");
    setPreferencesOpen(false);
  }, []);

  const openPreferences = useCallback(() => setPreferencesOpen(true), []);
  const closePreferences = useCallback(() => setPreferencesOpen(false), []);

  const value = useMemo<ConsentContextValue>(
    () => ({
      externalMediaConsent,
      hasDecided: externalMediaConsent !== null,
      preferencesOpen,
      allowExternalMedia,
      denyExternalMedia,
      openPreferences,
      closePreferences,
    }),
    [
      externalMediaConsent,
      preferencesOpen,
      allowExternalMedia,
      denyExternalMedia,
      openPreferences,
      closePreferences,
    ]
  );

  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  );
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useConsent must be used within a ConsentProvider");
  }
  return ctx;
}
