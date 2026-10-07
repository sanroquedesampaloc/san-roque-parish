import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(200, "Name must be under 200 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .max(30, "Phone must be under 30 characters")
    .optional()
    .default(""),
  subject: z
    .string()
    .trim()
    .min(1, "Subject is required")
    .max(300, "Subject must be under 300 characters"),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(5000, "Message must be under 5,000 characters"),
  turnstileToken: z.string().min(1, "Please complete the verification"),
});

export const prayerRequestSchema = z
  .object({
    name: z
      .string()
      .trim()
      .max(200, "Name must be under 200 characters")
      .optional()
      .default(""),
    email: z
      .string()
      .trim()
      .max(254, "Email must be under 254 characters")
      .optional()
      .default(""),
    intention: z
      .string()
      .trim()
      .min(1, "Prayer intention is required")
      .max(5000, "Intention must be under 5,000 characters"),
    wantsContact: z.boolean().default(false),
    turnstileToken: z.string().min(1, "Please complete the verification"),
  })
  .refine(
    (data) => {
      if (data.wantsContact && !data.email) return false;
      if (data.wantsContact && !z.string().email().safeParse(data.email).success)
        return false;
      return true;
    },
    {
      message: "A valid email is required when requesting contact",
      path: ["email"],
    }
  );

export type ContactFormData = z.infer<typeof contactSchema>;
export type PrayerRequestFormData = z.infer<typeof prayerRequestSchema>;
