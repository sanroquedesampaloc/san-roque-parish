"use server";

import { headers } from "next/headers";
import { prayerRequestSchema } from "@/lib/validation";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendPrayerRequestEmail } from "@/lib/email";

export type PrayerRequestFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Record<string, string[]>;
};

export async function submitPrayerRequest(
  _prev: PrayerRequestFormState,
  formData: FormData
): Promise<PrayerRequestFormState> {
  const headerStore = await headers();
  const ip =
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const rateCheck = checkRateLimit(`prayer:${ip}`);
  if (!rateCheck.allowed) {
    return {
      status: "error",
      message: `Too many submissions. Please try again in ${rateCheck.retryAfterSeconds} seconds.`,
    };
  }

  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    intention: formData.get("intention"),
    wantsContact: formData.get("wantsContact") === "on",
    turnstileToken: formData.get("cf-turnstile-response"),
  };

  const parsed = prayerRequestSchema.safeParse(raw);
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
    await sendPrayerRequestEmail({
      name: parsed.data.name ?? "",
      email: parsed.data.email ?? "",
      intention: parsed.data.intention,
      wantsContact: parsed.data.wantsContact,
    });
  } catch {
    return {
      status: "error",
      message:
        "We could not submit your prayer request right now. Please try again later.",
    };
  }

  return {
    status: "success",
    message:
      "Thank you for sharing your prayer intention. The parish community will keep you in our prayers.",
  };
}
