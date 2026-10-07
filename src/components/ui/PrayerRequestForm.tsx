"use client";

import { useActionState, useState, useRef, useEffect, useCallback } from "react";
import {
  submitPrayerRequest,
  type PrayerRequestFormState,
} from "@/lib/actions/prayer-request";
import { TurnstileWidget, type TurnstileHandle } from "@/components/ui/TurnstileWidget";

const prayerRequestInitialState: PrayerRequestFormState = {
  status: "idle",
  message: "",
};

const inputClasses =
  "w-full bg-white border border-border px-4 py-3 text-charcoal text-sm placeholder:text-charcoal-muted/60 focus:border-burgundy focus:ring-1 focus:ring-burgundy/20 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy transition-colors";

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <p id={id} className="mt-1.5 text-xs text-red-600" role="alert">
      {errors[0]}
    </p>
  );
}

export function PrayerRequestForm() {
  const [state, formAction, pending] = useActionState(
    submitPrayerRequest,
    prayerRequestInitialState
  );
  const [wantsContact, setWantsContact] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const turnstileRef = useRef<TurnstileHandle>(null);

  const handleCheckbox = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setWantsContact(e.target.checked);
  }, []);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
    if (state.status === "error") {
      turnstileRef.current?.reset();
    }
    if (state.status !== "idle") {
      statusRef.current?.focus();
    }
  }, [state]);

  return (
    <div className="max-w-2xl mx-auto">
      {state.status !== "idle" && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role={state.status === "error" ? "alert" : "status"}
          aria-live={state.status === "error" ? "assertive" : "polite"}
          className={`mb-6 px-4 py-3 text-sm border ${
            state.status === "success"
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {state.message}
        </div>
      )}

      {state.status !== "success" && (
        <form
          ref={formRef}
          action={formAction}
          className="space-y-6"
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
              aria-describedby={
                state.fieldErrors?.name ? "prayer-name-error" : undefined
              }
              className={inputClasses}
            />
            <FieldError id="prayer-name-error" errors={state.fieldErrors?.name} />
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
                <span className="text-charcoal-muted font-normal">
                  (optional)
                </span>
              )}
            </label>
            <input
              type="email"
              id="prayer-email"
              name="email"
              autoComplete="email"
              aria-required={wantsContact}
              required={wantsContact}
              aria-describedby={
                state.fieldErrors?.email
                  ? "prayer-email-error"
                  : wantsContact
                    ? "prayer-email-hint"
                    : undefined
              }
              className={inputClasses}
            />
            {wantsContact && !state.fieldErrors?.email && (
              <p id="prayer-email-hint" className="mt-1.5 text-xs text-burgundy">
                Please provide your email above so we can reach you.
              </p>
            )}
            <FieldError id="prayer-email-error" errors={state.fieldErrors?.email} />
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
              aria-describedby={
                state.fieldErrors?.intention ? "prayer-intention-error" : undefined
              }
              className={`${inputClasses} min-h-[160px] resize-y`}
            />
            <FieldError id="prayer-intention-error" errors={state.fieldErrors?.intention} />
          </div>

          {/* Contact checkbox */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="prayer-contact"
              name="wantsContact"
              checked={wantsContact}
              onChange={handleCheckbox}
              className="mt-0.5 h-4 w-4 border-border text-burgundy focus:ring-burgundy/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
            />
            <label
              htmlFor="prayer-contact"
              className="text-sm text-charcoal leading-snug select-none"
            >
              I would like someone from the parish to contact me
            </label>
          </div>

          {/* Turnstile */}
          <div>
            <TurnstileWidget ref={turnstileRef} />
            <FieldError id="prayer-turnstile-error" errors={state.fieldErrors?.turnstileToken} />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={pending}
              aria-disabled={pending}
              className="inline-flex items-center justify-center px-7 py-3 text-sm font-medium tracking-wide uppercase transition-colors bg-burgundy text-white hover:bg-burgundy-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {pending ? "Submitting…" : "Submit Prayer Request"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
