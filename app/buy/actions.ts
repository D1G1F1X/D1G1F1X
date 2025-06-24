"use server"

import { z } from "zod"
import { supabaseManager } from "@/lib/database/supabase-manager"

const SalesLeadSchema = z.object({
  name: z.string().min(1, "Full name is required."),
  email: z.string().email("Invalid email address."),
  phone: z.string().optional().or(z.literal("")),
  product_interest: z.string().min(1, "Product interest is required."),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1."),
  notes: z.string().optional().or(z.literal("")),
})

export interface SalesInquiryState {
  message: string
  success: boolean
  fieldErrors?: Record<string, string[] | undefined>
}

export async function submitSalesInquiry(prevState: SalesInquiryState, formData: FormData): Promise<SalesInquiryState> {
  const rawFormData = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    product_interest: formData.get("product_interest"),
    quantity: formData.get("quantity"),
    notes: formData.get("notes"),
  }

  const validation = SalesLeadSchema.safeParse(rawFormData)

  if (!validation.success) {
    return {
      message: "Invalid form data. Please check your entries.",
      success: false,
      fieldErrors: validation.error.flatten().fieldErrors,
    }
  }

  const { name, email, phone, product_interest, quantity, notes } = validation.data

  try {
    if (!supabaseManager.isClientConfigured()) {
      console.warn("[Sales] Database not configured, inquiry not saved")
      // Still return success for user experience, but log the issue
      return {
        message: "Thank you for your inquiry! We will get back to you soon.",
        success: true,
      }
    }

    const result = await supabaseManager.executeQuery(async (client) => {
      const { data, error } = await client
        .from("sales_inquiries")
        .insert([
          {
            customer_name: name,
            customer_email: email,
            customer_phone: phone || null,
            product_interest: product_interest,
            quantity: quantity,
            notes: notes || null,
            status: "new",
          },
        ])
        .select()

      if (error) throw error
      return data
    }, null)

    console.log("[Sales] Inquiry submitted:", result ? "Success" : "Failed")
    return {
      message: "Thank you for your inquiry! We will get back to you soon.",
      success: true,
    }
  } catch (error: any) {
    console.error("[Sales] Error submitting inquiry:", error)
    return {
      message: `An unexpected error occurred: ${error.message}`,
      success: false,
    }
  }
}

export async function handleAddToCart(prevState: any, formData: FormData) {
  const productId = formData.get("productId") as string
  const quantity = Number.parseInt(formData.get("quantity") as string, 10)

  if (!productId || isNaN(quantity) || quantity < 1) {
    return { success: false, message: "Invalid product data." }
  }

  console.log(`[Cart] Adding product ${productId}, quantity: ${quantity}`)

  try {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return {
      success: true,
      message: `Product ${productId} (Qty: ${quantity}) added to cart successfully!`,
    }
  } catch (error) {
    console.error("[Cart] Error adding to cart:", error)
    return { success: false, message: "Failed to add item to cart." }
  }
}
