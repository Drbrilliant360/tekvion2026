import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().trim().email("Invalid email").max(255, "Email too long"),
  phone: z.string().trim().max(20, "Phone too long").optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message too long"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// Simple rate limiter for form submissions
const submissions = new Map<string, number[]>();

export function checkRateLimit(key: string, maxPerMinute = 3): boolean {
  const now = Date.now();
  const windowMs = 60_000;
  const timestamps = (submissions.get(key) || []).filter((t) => now - t < windowMs);

  if (timestamps.length >= maxPerMinute) return false;

  timestamps.push(now);
  submissions.set(key, timestamps);
  return true;
}

// Sanitize text input to prevent XSS
export function sanitize(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}
