"use client";

import { useEffect } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-ivory py-24 md:py-32 lg:py-40">
      <div className="container-parish">
        <div className="max-w-lg mx-auto text-center">
          {/* Decorative cross */}
          <div className="mb-8" aria-hidden="true">
            <svg
              className="w-16 h-16 mx-auto text-burgundy/20"
              viewBox="0 0 80 80"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
            >
              <path d="M40 10v60M20 35h40" strokeLinecap="round" />
              <circle cx="40" cy="35" r="6" />
            </svg>
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark mb-4">
            Error
          </p>

          <h1 className="text-3xl md:text-4xl font-semibold font-serif text-charcoal leading-tight">
            Something Went Wrong
          </h1>

          <p className="mt-4 text-charcoal-light leading-relaxed">
            An unexpected error occurred. Please try again, or return to the
            homepage.
          </p>

          <div className="mt-4 h-px w-12 bg-gold mx-auto" aria-hidden="true" />

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => retry()}
              className="inline-flex items-center justify-center px-7 py-3 text-sm font-medium tracking-wide uppercase transition-colors bg-burgundy text-white hover:bg-burgundy-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
            >
              Try Again
            </button>
            <ButtonLink href="/" variant="outline">
              Return Home
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
