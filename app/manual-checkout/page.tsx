"use client"

import { useEffect, useRef } from "react"
import { useFormState } from "react-dom"

import { createOrder } from "@/lib/actions/order.actions"
import { manualCheckoutSchema } from "@/lib/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"

interface ManualCheckoutProps {
  searchParams: {
    planId: string
    planName: string
    planPrice: string
  }
}

type FormState = {
  message: string | null
}

const initialState: FormState = {
  message: null,
}

const ManualCheckout = ({ searchParams }: ManualCheckoutProps) => {
  const { planId, planName, planPrice } = searchParams

  const formRef = useRef<HTMLFormElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof manualCheckoutSchema>>({
    resolver: zodResolver(manualCheckoutSchema),
  })

  async function submitManualOrder(prevState: FormState, formData: FormData): Promise<FormState> {
    try {
      const name = formData.get("name") as string
      const email = formData.get("email") as string

      await createOrder({
        planId,
        planName,
        planPrice: Number.parseFloat(planPrice),
        name,
        email,
        isManualCheckout: true,
      })

      formRef.current?.reset()

      return {
        message: `Order placed successfully for ${name} (${email})!`,
      }
    } catch (error: any) {
      return {
        message: error?.message || "Something went wrong.",
      }
    }
  }

  const [state, formAction] = useFormState(submitManualOrder, initialState)

  useEffect(() => {
    if (state?.message) {
      alert(state.message)
    }
  }, [state?.message])

  return (
    <section className="flexCenter flex-col">
      <h3 className="bold-24 mt-8">
        Manually Checkout {planName} - ${planPrice}
      </h3>

      <form ref={formRef} action={formAction} className="mt-9 flex flex-col gap-5 glassmorphism">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Your name" className="small-input" {...register("name")} />
          {errors.name && <p className="mt-1 text-red-500 font-medium">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Your email" className="small-input" {...register("email")} />
          {errors.email && <p className="mt-1 text-red-500 font-medium">{errors.email.message}</p>}
        </div>

        <button type="submit" className="small-btn">
          Submit
        </button>
      </form>
    </section>
  )
}

export default ManualCheckout
