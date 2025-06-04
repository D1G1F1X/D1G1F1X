"use client"

import { useFormStatus, useFormState } from "react-dom" // Corrected: useFormState from react-dom
import { Star, Mail, Phone, User, Home, Globe, Hash, Edit3, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { submitSalesInquiry } from "@/app/buy/actions"
import type { SalesLeadActionState } from "@/types/sales-leads" // Ensure this type is correctly defined
import { useEffect, useRef } from "react"

const initialProductsData = [
  {
    id: 1,
    name: "NUMO Oracle Novice Deck",
  },
  {
    id: 2,
    name: "NUMO Oracle Adept Deck",
  },
  // Add other products as needed
]

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white" disabled={pending}>
      {pending ? (
        <>
          <Send className="mr-2 h-4 w-4 animate-pulse" /> Sending Inquiry...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" /> Submit Inquiry
        </>
      )}
    </Button>
  )
}

export function SalesInquiryForm() {
  // Corrected: Named export
  const initialState: SalesLeadActionState = {
    // Provide a non-null initial state if your type expects it
    success: false,
    message: null,
    errors: null,
    leadId: null,
  }
  const [state, formAction] = useFormState(submitSalesInquiry, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset()
      // Optionally, display a toast message here using your useToast hook
    }
  }, [state])

  return (
    <div className="max-w-2xl mx-auto bg-gray-800 border border-gray-700 rounded-lg p-6 md:p-8 shadow-xl">
      <h2 className="text-2xl font-semibold text-white mb-6 text-center">Custom Deck Inquiry</h2>
      <p className="text-center text-gray-300 mb-6">
        For special requests, bulk orders, or if you have specific requirements not covered by our standard products,
        please fill out the form below.
      </p>

      {state?.message && (
        <div
          className={`mb-4 p-3 rounded-md text-sm ${state.success ? "bg-green-700 text-green-100" : "bg-red-700 text-red-100"}`}
          role="alert"
        >
          {state.message}
        </div>
      )}

      <form action={formAction} ref={formRef} className="space-y-6">
        {/* Contact Information */}
        <fieldset className="space-y-4 border border-gray-600 p-4 rounded-md">
          <legend className="text-lg font-medium text-purple-400 px-2">Your Contact Information</legend>
          <div>
            <Label htmlFor="customer_name_inquiry" className="flex items-center text-gray-300">
              <User className="mr-2 h-4 w-4 text-gray-400" />
              Full Name
            </Label>
            <Input
              id="customer_name_inquiry"
              name="customer_name"
              required
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
            {state?.errors?.customer_name && <p className="text-red-400 text-xs mt-1">{state.errors.customer_name}</p>}
          </div>
          <div>
            <Label htmlFor="customer_email_inquiry" className="flex items-center text-gray-300">
              <Mail className="mr-2 h-4 w-4 text-gray-400" />
              Email Address
            </Label>
            <Input
              id="customer_email_inquiry"
              name="customer_email"
              type="email"
              required
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
            {state?.errors?.customer_email && (
              <p className="text-red-400 text-xs mt-1">{state.errors.customer_email}</p>
            )}
          </div>
          <div>
            <Label htmlFor="customer_phone_inquiry" className="flex items-center text-gray-300">
              <Phone className="mr-2 h-4 w-4 text-gray-400" />
              Phone Number (Optional)
            </Label>
            <Input
              id="customer_phone_inquiry"
              name="customer_phone"
              type="tel"
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
        </fieldset>

        {/* Inquiry Details */}
        <fieldset className="space-y-4 border border-gray-600 p-4 rounded-md">
          <legend className="text-lg font-medium text-purple-400 px-2">Inquiry Details</legend>
          <div>
            <Label htmlFor="deck_type_inquiry" className="flex items-center text-gray-300">
              <Star className="mr-2 h-4 w-4 text-gray-400" />
              Deck Type of Interest
            </Label>
            <Select name="deck_type" required>
              <SelectTrigger id="deck_type_inquiry" className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Select primary deck of interest" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600 text-white">
                {initialProductsData.map((deck) => (
                  <SelectItem key={deck.id} value={deck.name} className="hover:bg-gray-600">
                    {deck.name}
                  </SelectItem>
                ))}
                <SelectItem value="Custom Request" className="hover:bg-gray-600">
                  Custom Request
                </SelectItem>
                <SelectItem value="Bulk Order" className="hover:bg-gray-600">
                  Bulk Order
                </SelectItem>
                <SelectItem value="Other" className="hover:bg-gray-600">
                  Other (Specify Below)
                </SelectItem>
              </SelectContent>
            </Select>
            {state?.errors?.deck_type && <p className="text-red-400 text-xs mt-1">{state.errors.deck_type}</p>}
          </div>
          <div>
            <Label htmlFor="quantity_inquiry" className="flex items-center text-gray-300">
              <Hash className="mr-2 h-4 w-4 text-gray-400" />
              Estimated Quantity (if applicable)
            </Label>
            <Input
              id="quantity_inquiry"
              name="quantity"
              type="number"
              defaultValue="1"
              min="1"
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          <div>
            <Label htmlFor="deck_specifications_notes_inquiry" className="flex items-center text-gray-300">
              <Edit3 className="mr-2 h-4 w-4 text-gray-400" />
              Details of Your Inquiry / Notes
            </Label>
            <Textarea
              id="deck_specifications_notes_inquiry"
              name="deck_specifications_notes"
              placeholder="Please describe your needs, custom specifications, or questions."
              required
              rows={4}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
            {state?.errors?.deck_specifications_notes && (
              <p className="text-red-400 text-xs mt-1">{state.errors.deck_specifications_notes}</p>
            )}
          </div>
        </fieldset>

        {/* Shipping Information (Optional for initial inquiry, but good to have) */}
        <fieldset className="space-y-4 border border-gray-600 p-4 rounded-md">
          <legend className="text-lg font-medium text-purple-400 px-2">Shipping Information (if known)</legend>
          <div>
            <Label htmlFor="shipping_address_street_inquiry" className="flex items-center text-gray-300">
              <Home className="mr-2 h-4 w-4 text-gray-400" />
              Street Address
            </Label>
            <Input
              id="shipping_address_street_inquiry"
              name="shipping_address_street"
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="shipping_address_city_inquiry" className="text-gray-300">
                City
              </Label>
              <Input
                id="shipping_address_city_inquiry"
                name="shipping_address_city"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            <div>
              <Label htmlFor="shipping_address_state_inquiry" className="text-gray-300">
                State/Province
              </Label>
              <Input
                id="shipping_address_state_inquiry"
                name="shipping_address_state"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="shipping_address_zip_inquiry" className="text-gray-300">
                ZIP/Postal Code
              </Label>
              <Input
                id="shipping_address_zip_inquiry"
                name="shipping_address_zip"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            <div>
              <Label htmlFor="shipping_address_country_inquiry" className="flex items-center text-gray-300">
                <Globe className="mr-2 h-4 w-4 text-gray-400" />
                Country
              </Label>
              <Input
                id="shipping_address_country_inquiry"
                name="shipping_address_country"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          </div>
        </fieldset>

        <SubmitButton />
      </form>
    </div>
  )
}
