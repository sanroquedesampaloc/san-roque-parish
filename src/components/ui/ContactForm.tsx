"use client";

import { useActionState, useRef, useEffect } from "react";
import {
  submitContactForm,
  contactInitialState,
} from "@/lib/actions/contact";
import { TurnstileWidget, type TurnstileHandle } from "@/components/ui/TurnstileWidget";

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

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    contactInitialState
  );
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const turnstileRef = useRef<TurnstileHandle>(null);

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
              htmlFor="contact-name"
              className="block text-sm font-medium text-charcoal mb-1.5"
            >
              Name
            </label>
            <input
              type="text"
              id="contact-name"
              name="name"
              autoComplete="name"
              required
              aria-required="true"
              aria-describedby={
                state.fieldErrors?.name ? "contact-name-error" : undefined
              }
              className={inputClasses}
            />
            <FieldError id="contact-name-error" errors={state.fieldErrors?.name} />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="contact-email"
              className="block text-sm font-medium text-charcoal mb-1.5"
            >
              Email
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              autoComplete="email"
              required
              aria-required="true"
              aria-describedby={
                state.fieldErrors?.email ? "contact-email-error" : undefined
              }
              className={inputClasses}
            />
            <FieldError id="contact-email-error" errors={state.fieldErrors?.email} />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="contact-phone"
              className="block text-sm font-medium text-charcoal mb-1.5"
            >
              Phone{" "}
              <span className="text-charcoal-muted font-normal">(optional)</span>
            </label>
            <input
              type="tel"
              id="contact-phone"
              name="phone"
              autoComplete="tel"
              aria-describedby={
                state.fieldErrors?.phone ? "contact-phone-error" : undefined
              }
              className={inputClasses}
            />
            <FieldError id="contact-phone-error" errors={state.fieldErrors?.phone} />
          </div>

          {/* Subject */}
          <div>
            <label
              htmlFor="contact-subject"
              className="block text-sm font-medium text-charcoal mb-1.5"
            >
              Subject
            </label>
            <input
              type="text"
              id="contact-subject"
              name="subject"
              required
              aria-required="true"
              aria-describedby={
                state.fieldErrors?.subject ? "contact-subject-error" : undefined
              }
              className={inputClasses}
            />
            <FieldError id="contact-subject-error" errors={state.fieldErrors?.subject} />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="contact-message"
              className="block text-sm font-medium text-charcoal mb-1.5"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={6}
              required
              aria-required="true"
              aria-describedby={
                state.fieldErrors?.message ? "contact-message-error" : undefined
              }
              className={`${inputClasses} min-h-[160px] resize-y`}
            />
            <FieldError id="contact-message-error" errors={state.fieldErrors?.message} />
          </div>

          {/* Turnstile */}
          <div>
            <TurnstileWidget ref={turnstileRef} />
            <FieldError id="contact-turnstile-error" errors={state.fieldErrors?.turnstileToken} />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={pending}
              aria-disabled={pending}
              className="inline-flex items-center justify-center px-7 py-3 text-sm font-medium tracking-wide uppercase transition-colors bg-burgundy text-white hover:bg-burgundy-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {pending ? "Sending…" : "Send Message"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
