import { z } from "zod"

// Example: Basic User Schema
export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email("Invalid email address."),
  name: z.string().min(2, "Name must be at least 2 characters."),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

// Example: Product Schema
export const productSchema = z.object({
  id: z.string().min(1, "Product ID cannot be empty."),
  name: z.string().min(3, "Product name must be at least 3 characters."),
  description: z.string().optional(),
  price: z.coerce.number().positive("Price must be a positive number."),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative."),
})

// Example: Sales Lead Schema (similar to the one in app/buy/actions.ts but can be shared)
export const salesLeadSchema = z.object({
  customer_name: z.string().min(1, "Full name is required."),
  customer_email: z.string().email("Invalid email address."),
  customer_phone: z.string().optional(),
  deck_type: z.string().min(1, "Deck type is required."), // Consider making this an enum or more specific
  quantity: z.coerce.number().min(1, "Quantity must be at least 1."),
  deck_specifications_notes: z.string().optional(),
  shipping_address_street: z.string().min(1, "Street address is required."),
  shipping_address_city: z.string().min(1, "City is required."),
  shipping_address_state: z.string().min(1, "State/Province is required."),
  shipping_address_zip: z.string().min(1, "ZIP/Postal code is required."),
  shipping_address_country: z.string().min(1, "Country is required."),
})

// You can add more shared Zod schemas here as your application grows.
// For instance, if you have common address schemas, payment schemas, etc.

export const addressSchema = z.object({
  street: z.string().min(1, "Street is required."),
  city: z.string().min(1, "City is required."),
  state: z.string().min(1, "State is required."),
  zipCode: z.string().min(5, "ZIP code must be at least 5 digits.").max(10),
  country: z.string().min(1, "Country is required."),
})
