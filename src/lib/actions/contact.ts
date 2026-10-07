"use server";

import { headers } from "next/headers";
import { contactSchema } from "@/lib/validation";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendContactEmail } from "@/lib/email";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Record<string, string[]>;
};

const INITIAL_STATE: ContactFormState = { status: "idle", message: "" };

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const headerStore = await headers();
  const ip =
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const rateCheck = checkRateLimit(`contact:${ip}`);
  if (!rateCheck.allowed) {
    return {
      status: "error",
      message: `Too many submissions. Please try again in ${rateCheck.retryAfterSeconds} seconds.`,
    };
  }

  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    turnstileToken: formData.get("cf-turnstile-response"),
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please correct the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const tokenValid = await verifyTurnstileToken(parsed.data.turnstileToken);
  if (!tokenValid) {
    return {
      status: "error",
      message: "Verification failed. Please try again.",
    };
  }

  try {
    await sendContactEmail({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone ?? "",
      subject: parsed.data.subject,
      message: parsed.data.message,
    });
  } catch {
    return {
      status: "error",
      message: "We could not send your message right now. Please try again later.",
    };
  }

  return {
    status: "success",
    message:
      "Thank you for reaching out. We will get back to you as soon as possible.",
  };
}

export { INITIAL_STATE as contactInitialState };
