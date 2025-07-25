"use server"

import { createServerClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { sendReadingEmail } from "@/lib/services/brevo-email-service"
import { getReadingById } from "@/lib/services/reading-service"
import { getProductById } from "@/lib/services/product-service"
import { getProfileById } from "@/lib/services/profile-service"
import { createOrder } from "@/lib/services/order-service"

export async function submitPaidOrder(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const userId = formData.get("userId") as string
  const productId = formData.get("productId") as string
  const readingId = formData.get("readingId") as string
  const paymentStatus = formData.get("paymentStatus") as string
  const transactionId = formData.get("transactionId") as string
  const amount = Number.parseFloat(formData.get("amount") as string)
  const currency = formData.get("currency") as string

  if (!userId || !productId || !readingId || !paymentStatus || !transactionId || isNaN(amount) || !currency) {
    return { success: false, message: "Missing required order fields." }
  }

  try {
    const newOrder = await createOrder({
      userId,
      productId,
      readingId,
      paymentStatus,
      transactionId,
      amount,
      currency,
      orderType: "paid",
    })

    if (!newOrder) {
      throw new Error("Failed to create order.")
    }

    // Fetch reading and product details for email
    const reading = await getReadingById(readingId)
    const product = await getProductById(productId)
    const userProfile = await getProfileById(userId)

    if (reading && product && userProfile?.email) {
      await sendReadingEmail(userProfile.email, reading, product)
    }

    revalidatePath("/user/dashboard")
    revalidatePath("/admin/orders")

    return { success: true, message: "Paid order submitted successfully!", order: newOrder }
  } catch (error) {
    console.error("Error submitting paid order:", error)
    return { success: false, message: `Failed to submit paid order: ${error.message}` }
  }
}

export async function submitManualOrder(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const userId = formData.get("userId") as string
  const productId = formData.get("productId") as string
  const readingId = formData.get("readingId") as string
  const notes = formData.get("notes") as string

  if (!userId || !productId || !readingId) {
    return { success: false, message: "Missing required manual order fields." }
  }

  try {
    const newOrder = await createOrder({
      userId,
      productId,
      readingId,
      paymentStatus: "manual", // Default for manual orders
      transactionId: `MANUAL-${Date.now()}`, // Generate a unique ID
      amount: 0, // Manual orders typically have 0 amount
      currency: "USD", // Default currency
      orderType: "manual",
      notes: notes,
    })

    if (!newOrder) {
      throw new Error("Failed to create manual order.")
    }

    // Fetch reading and product details for email (optional for manual)
    const reading = await getReadingById(readingId)
    const product = await getProductById(productId)
    const userProfile = await getProfileById(userId)

    if (reading && product && userProfile?.email) {
      // Optionally send an email for manual orders
      // await sendReadingEmail(userProfile.email, reading, product, "manual_order_confirmation");
    }

    revalidatePath("/user/dashboard")
    revalidatePath("/admin/orders")

    return { success: true, message: "Manual order submitted successfully!", order: newOrder }
  } catch (error) {
    console.error("Error submitting manual order:", error)
    return { success: false, message: `Failed to submit manual order: ${error.message}` }
  }
}
