"use client";

import { useState } from "react";

export function PrayerRequestForm() {
  const [wantsContact, setWantsContact] = useState(false);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="max-w-2xl mx-auto space-y-6"
      noValidate
    >
      {/* Name */}
      <div>
        <label
          htmlFor="prayer-name"
          className="block text-sm font-medium text-charcoal mb-1.5"
        >
          Name{" "}
          <span className="text-charcoal-muted font-normal">(optional)</span>
        </label>
        <input
          type="text"
          id="prayer-name"
          name="name"
          autoComplete="name"
          className="w-full bg-white border border-border px-4 py-3 text-charcoal text-sm placeholder:text-charcoal-muted/60 focus:border-burgundy focus:ring-1 focus:ring-burgundy/20 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy transition-colors"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="prayer-email"
          className="block text-sm font-medium text-charcoal mb-1.5"
        >
          Email{" "}
          {wantsContact ? (
            <span className="text-burgundy font-normal">(required)</span>
          ) : (
            <span className="text-charcoal-muted font-normal">(optional)</span>
          )}
        </label>
        <input
          type="email"
          id="prayer-email"
          name="email"
          autoComplete="email"
          aria-required={wantsContact}
          required={wantsContact}
          className="w-full bg-white border border-border px-4 py-3 text-charcoal text-sm placeholder:text-charcoal-muted/60 focus:border-burgundy focus:ring-1 focus:ring-burgundy/20 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy transition-colors"
        />
        {wantsContact && (
          <p className="mt-1.5 text-xs text-burgundy">
            Please provide your email above so we can reach you.
          </p>
        )}
      </div>

      {/* Prayer Intention */}
      <div>
        <label
          htmlFor="prayer-intention"
          className="block text-sm font-medium text-charcoal mb-1.5"
        >
          Prayer intention
        </label>
        <textarea
          id="prayer-intention"
          name="intention"
          rows={6}
          aria-required="true"
          required
          className="w-full bg-white border border-border px-4 py-3 text-charcoal text-sm placeholder:text-charcoal-muted/60 min-h-[160px] resize-y focus:border-burgundy focus:ring-1 focus:ring-burgundy/20 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy transition-colors"
        />
      </div>

      {/* Contact checkbox */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="prayer-contact"
          name="wantsContact"
          checked={wantsContact}
          onChange={(e) => setWantsContact(e.target.checked)}
          className="mt-0.5 h-4 w-4 border-border text-burgundy focus:ring-burgundy/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
        />
        <label
          htmlFor="prayer-contact"
          className="text-sm text-charcoal leading-snug select-none"
        >
          I would like someone from the parish to contact me
        </label>
      </div>

      {/* Submit area */}
      <div className="pt-2">
        <button
          type="submit"
          disabled
          aria-disabled="true"
          className="inline-flex items-center justify-center px-7 py-3 text-sm font-medium tracking-wide uppercase bg-burgundy/50 text-white/70 cursor-not-allowed transition-colors"
        >
          Submit Prayer Request
        </button>
        <p className="mt-3 text-sm text-charcoal-light leading-relaxed">
          Online prayer requests will be available soon. In the meantime, please
          contact the parish office.
        </p>
      </div>
    </form>
  );
}
