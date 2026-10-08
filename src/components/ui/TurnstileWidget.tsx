"use client";

import { useEffect, useRef, useCallback, useImperativeHandle, forwardRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

export interface TurnstileHandle {
  reset: () => void;
}

export const TurnstileWidget = forwardRef<TurnstileHandle>(
  function TurnstileWidget(_props, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);
    const scriptLoadedRef = useRef(false);

    useImperativeHandle(ref, () => ({
      reset() {
        if (widgetIdRef.current !== null && window.turnstile) {
          window.turnstile.reset(widgetIdRef.current);
        }
      },
    }));

    const renderWidget = useCallback(() => {
      if (!window.turnstile || !containerRef.current) return;
      if (widgetIdRef.current !== null) return;

      const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
      if (!sitekey) return;

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey,
        callback: () => {},
        "expired-callback": () => {},
        "error-callback": () => {},
        theme: "light",
      });
    }, []);

    useEffect(() => {
      // Skip injecting Cloudflare's script entirely when no site key is
      // configured — renderWidget() would be a no-op anyway, so there's no
      // reason to make the request.
      if (!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) return;

      if (scriptLoadedRef.current) {
        renderWidget();
        return;
      }

      if (document.querySelector('script[src*="turnstile"]')) {
        scriptLoadedRef.current = true;
        if (window.turnstile) {
          renderWidget();
        } else {
          window.onTurnstileLoad = () => {
            renderWidget();
          };
        }
        return;
      }

      window.onTurnstileLoad = () => {
        scriptLoadedRef.current = true;
        renderWidget();
      };

      const script = document.createElement("script");
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad";
      script.async = true;
      document.head.appendChild(script);

      return () => {
        if (widgetIdRef.current !== null && window.turnstile) {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }
      };
    }, [renderWidget]);

    return <div ref={containerRef} className="mt-2" />;
  }
);
