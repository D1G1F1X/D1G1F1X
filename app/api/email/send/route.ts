import { type NextRequest, NextResponse } from "next/server"
import { brevoEmailService } from "@/lib/services/brevo-email-service"
import { redis } from "@/lib/redis" // Import the Redis client
import { z } from "zod" // Import zod for validation

// Define schemas for different email types
const welcomeEmailSchema = z.object({
  type: z.literal("welcome"),
  email: z.string().email(),
  userName: z.string(),
})

const passwordResetEmailSchema = z.object({
  type: z.literal("password-reset"),
  email: z.string().email(),
  userName: z.string(),
  resetToken: z.string(),
})

const contactFormEmailSchema = z.object({
  type: z.literal("contact-form"),
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string(),
})

// Union type for all valid email request payloads
const emailRequestSchema = z.discriminatedUnion("type", [
  welcomeEmailSchema,
  passwordResetEmailSchema,
  contactFormEmailSchema,
])

// Rate limiting configuration
const RATE_LIMIT_WINDOW_SECONDS = 60 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5 // Max 5 requests per minute per IP

export async function POST(req: NextRequest) {
  // Rate Limiting Logic
  const ip = req.ip || req.headers.get("x-forwarded-for") || "127.0.0.1"
  const key = `ratelimit:${ip}`

  if (redis) {
    try {
      const [count, ttl] = await redis.pipeline().incr(key).expire(key, RATE_LIMIT_WINDOW_SECONDS, { nx: true }).exec()

      if (count && count > MAX_REQUESTS_PER_WINDOW) {
        console.warn(`Rate limit exceeded for IP: ${ip}. Remaining TTL: ${ttl}s`)
        return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
      }
    } catch (redisError) {
      console.error("Redis rate limiting error:", redisError)
      // Continue without rate limiting if Redis fails, but log the error
    }
  } else {
    console.warn("Redis not initialized. Rate limiting is disabled.")
  }

  try {
    const body = await req.json()
    const validation = emailRequestSchema.safeParse(body)

    if (!validation.success) {
      console.error("Invalid email request data:", validation.error.flatten())
      return NextResponse.json(
        { error: "Invalid email request data.", details: validation.error.flatten() },
        { status: 400 },
      )
    }

    const emailData = validation.data
    let emailResult: { success: boolean; error?: string }

    switch (emailData.type) {
      case "welcome":
        emailResult = await brevoEmailService.sendWelcomeEmail(emailData.email, emailData.userName)
        break
      case "password-reset":
        emailResult = await brevoEmailService.sendPasswordResetEmail(
          emailData.email,
          emailData.userName,
          emailData.resetToken,
        )
        break
      case "contact-form":
        emailResult = await brevoEmailService.sendContactFormEmail(emailData)
        break
      default:
        // This case should ideally not be reached due to discriminatedUnion, but as a fallback
        return NextResponse.json({ error: "Unknown email type." }, { status: 400 })
    }

    if (!emailResult.success) {
      console.error(`Failed to send ${emailData.type} email:`, emailResult.error)
      return NextResponse.json(
        { error: emailResult.error || `Failed to send ${emailData.type} email.` },
        { status: 500 },
      )
    }

    return NextResponse.json({ success: true, message: `${emailData.type} email sent successfully!` }, { status: 200 })
  } catch (error) {
    console.error("Error processing email send request:", error)
    let errorMessage = "An unexpected error occurred while processing your email request."
    if (error instanceof Error) {
      errorMessage = error.message
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
