// Ensure this service only runs on the server
if (typeof window !== "undefined") {
  throw new Error("BrevoEmailService should only be used on the server side")
}

// Safe environment variable access for server-side only
const BREVO_API_KEY = process.env.BREVO_API_KEY
const BREVO_SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || "noreply@numoracle.com"
const BREVO_SENDER_NAME = process.env.BREVO_SENDER_NAME || "Numoracle"

export class BrevoEmailService {
  // … existing implementation stays exactly the same …
}

// --- singleton instance ----------------------------------------------------
export const brevoEmailService = new BrevoEmailService()
