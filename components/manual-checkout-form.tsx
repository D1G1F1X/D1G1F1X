"use client"

import type React from "react"
import { useState, useTransition } from "react"

interface ManualCheckoutFormProps {
  submitManualOrder: (state: any, formData: FormData) => Promise<any>
  initialState?: any
}

const ManualCheckoutForm: React.FC<ManualCheckoutFormProps> = ({ submitManualOrder, initialState = {} }) => {
  const [state, setState] = useState(initialState)
  const [isPending, startTransition] = useTransition()

  const formAction = async (formData: FormData) => {
    startTransition(async () => {
      const result = await submitManualOrder(state, formData)
      setState(result)
    })
  }

  return (
    <form action={formAction}>
      {/* Add your form fields here */}
      <label htmlFor="customerName">Customer Name:</label>
      <input type="text" id="customerName" name="customerName" />

      <label htmlFor="customerEmail">Customer Email:</label>
      <input type="email" id="customerEmail" name="customerEmail" />

      {/* Display any state/result information */}
      {state && (
        <div>
          <p>Order Status: {state.status}</p>
          {state.message && <p>Message: {state.message}</p>}
        </div>
      )}

      <button type="submit" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit Order"}
      </button>
    </form>
  )
}

export default ManualCheckoutForm
