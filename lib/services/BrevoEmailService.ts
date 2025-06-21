/**
 * Thin re-export wrapper so code that imports
 * `lib/services/BrevoEmailService` (PascalCase path) continues
 * to work even though the main implementation lives in
 * `brevo-email-service.ts`.
 */
export { BrevoEmailService } from "./brevo-email-service"
