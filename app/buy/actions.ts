"use server"

import { z } from "zod"
import { createServerClient } from "@/lib/supabase-server" // Corrected import
import type { SalesLead, SalesLeadActionState } from "@/types/sales-leads"

const salesInquirySchema = z.object({
  customer_name: z.string().min(1, "Full name is required."),
  customer_email: z.string().email("Invalid email address."),
  customer_phone: z.string().optional(),
  deck_type: z.string().min(1, "Deck type is required."),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1."),
  deck_specifications_notes: z.string().optional(),
  shipping_address_street: z.string().min(1, "Street address is required."),
  shipping_address_city: z.string().min(1, "City is required."),
  shipping_address_state: z.string().min(1, "State/Province is required."),
  shipping_address_zip: z.string().min(1, "ZIP/Postal code is required."),
  shipping_address_country: z.string().min(1, "Country is required."),
})

export async function submitSalesInquiry(
  prevState: SalesLeadActionState | null,
  formData: FormData,
): Promise<SalesLeadActionState> {
  const supabase = await createServerClient() // Corrected function call

  const rawFormData = {
    customer_name: formData.get("customer_name"),
    customer_email: formData.get("customer_email"),
    customer_phone: formData.get("customer_phone"),
    deck_type: formData.get("deck_type"),
    quantity: formData.get("quantity"),
    deck_specifications_notes: formData.get("deck_specifications_notes"),
    shipping_address_street: formData.get("shipping_address_street"),
    shipping_address_city: formData.get("shipping_address_city"),
    shipping_address_state: formData.get("shipping_address_state"),
    shipping_address_zip: formData.get("shipping_address_zip"),
    shipping_address_country: formData.get("shipping_address_country"),
  }

  const validation = salesInquirySchema.safeParse(rawFormData)

  if (!validation.success) {
    return {
      success: false,
      message: "Validation failed. Please check the form for errors.",
      errors: validation.error.flatten().fieldErrors,
    }
  }

  const dataToInsert: Omit<SalesLead, "id" | "created_at" | "status" | "admin_notes"> = validation.data

  try {
    const { data, error } = await supabase
      .from("sales_leads")
      .insert([
        {
          ...dataToInsert,
          quantity: Number(dataToInsert.quantity) || 1, // Ensure quantity is a number
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Supabase insert error:", error)
      return {
        success: false,
        message: `Failed to submit inquiry: ${error.message}`,
      }
    }

    // Simulate sending email (replace with actual email service integration)
    console.log("Simulating email to numooracle@gmail.com with data:", dataToInsert)
    console.log("Sales lead submitted to Supabase with ID:", data?.id)

    return {
      success: true,
      message: "Thank you! Your inquiry has been submitted successfully. We will contact you shortly.",
      leadId: data?.id,
    }
  } catch (e) {
    const error = e as Error
    console.error("Unexpected error submitting sales inquiry:", error)
    return {
      success: false,
      message: `An unexpected error occurred: ${error.message}`,
    }
  }
}
