"use server" // This directive applies to all exported functions in this file.

import { z } from "zod"
import { getServerClient } from "@/lib/supabase-server" // Ensure this path is correct

// Sales Inquiry Schema
const SalesLeadSchema = z.object({
  name: z.string().min(1, "Full name is required."),
  email: z.string().email("Invalid email address."),
  phone: z.string().optional().or(z.literal("")), // Allow empty string for optional phone
  product_interest: z.string().min(1, "Product interest is required."),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1."),
  notes: z.string().optional().or(z.literal("")), // Allow empty string for optional notes
})

export interface SalesInquiryState {
  message: string
  success: boolean
  fieldErrors?: Record<string, string[] | undefined> // Make sure field names match SalesLeadSchema keys
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
    const supabase = getServerClient()
    const { data, error } = await supabase
      .from("sales_inquiries") // Make sure this table exists in your Supabase project
      .insert([
        {
          customer_name: name,
          customer_email: email,
          customer_phone: phone || null, // Store null if phone is empty
          product_interest: product_interest,
          quantity: quantity,
          notes: notes || null, // Store null if notes are empty
          status: "new", // Default status
        },
      ])
      .select()

    if (error) {
      console.error("Supabase error inserting sales inquiry:", error)
      return { message: `Database error: ${error.message}`, success: false }
    }

    console.log("Sales inquiry submitted:", data)
    // Optionally, send an email notification here (e.g., using Resend)

    return { message: "Thank you for your inquiry! We will get back to you soon.", success: true }
  } catch (e: any) {
    console.error("Error submitting sales inquiry:", e)
    return { message: `An unexpected error occurred: ${e.message}`, success: false }
  }
}

// This action is defined here but not currently used in BuyPageClient.tsx.
// It's correctly a server action due to the module-level "use server".
export async function handleAddToCart(prevState: any, formData: FormData) {
  const productId = formData.get("productId") as string
  const quantity = Number.parseInt(formData.get("quantity") as string, 10)

  if (!productId || isNaN(quantity) || quantity < 1) {
    return { success: false, message: "Invalid product data." }
  }

  console.log(`Attempting to add to cart: Product ID ${productId}, Quantity ${quantity}`)

  // Placeholder for actual cart logic
  try {
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate async operation

    return {
      success: true,
      message: `Product ${productId} (Qty: ${quantity}) added to cart successfully! (Simulated)`,
    }
  } catch (error) {
    console.error("Error adding to cart:", error)
    return { success: false, message: "Failed to add item to cart." }
  }
}
