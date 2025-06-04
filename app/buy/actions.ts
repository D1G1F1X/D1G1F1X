"use server"

import { z } from "zod"
import { getServerClient } from "@/lib/supabase-server"

// Sales Inquiry Schema (if not already defined or imported from lib/validations)
const SalesLeadSchema = z.object({
  name: z.string().min(1, "Full name is required."),
  email: z.string().email("Invalid email address."),
  phone: z.string().optional(),
  product_interest: z.string().min(1, "Product interest is required."),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1."),
  notes: z.string().optional(),
  // Add other fields from your SalesInquiryForm if necessary
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
    const supabase = getServerClient()
    const { data, error } = await supabase
      .from("sales_inquiries") // Make sure this table exists
      .insert([
        {
          customer_name: name,
          customer_email: email,
          customer_phone: phone,
          product_interest: product_interest,
          quantity: quantity,
          notes: notes,
          status: "new", // Default status
        },
      ])
      .select()

    if (error) {
      console.error("Supabase error inserting sales inquiry:", error)
      return { message: `Database error: ${error.message}`, success: false }
    }

    console.log("Sales inquiry submitted:", data)
    // Optionally, send an email notification here

    return { message: "Thank you for your inquiry! We will get back to you soon.", success: true }
  } catch (e: any) {
    console.error("Error submitting sales inquiry:", e)
    return { message: `An unexpected error occurred: ${e.message}`, success: false }
  }
}

// New/Moved Server Action
export async function handleAddToCart(prevState: any, formData: FormData) {
  const productId = formData.get("productId") as string
  const quantity = Number.parseInt(formData.get("quantity") as string, 10)

  if (!productId || isNaN(quantity) || quantity < 1) {
    return { success: false, message: "Invalid product data." }
  }

  console.log(`Attempting to add to cart: Product ID ${productId}, Quantity ${quantity}`)

  // Placeholder for actual cart logic (e.g., update database, session, or state management)
  // For now, just simulate success
  try {
    // Example: await addToCartInDatabase(productId, quantity, userId);
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
