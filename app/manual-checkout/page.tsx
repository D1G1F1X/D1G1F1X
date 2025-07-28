import { ManualCheckoutForm } from "@/components/manual-checkout-form"
import Image from "next/image"

export default function ManualCheckoutPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <Image
        src="/manual-checkout-background.png"
        alt="Manual Checkout Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0 opacity-30"
      />
      <div className="absolute inset-0 bg-black/50 z-10" />

      <div className="relative z-20 w-full max-w-2xl">
        <ManualCheckoutForm />
      </div>
    </div>
  )
}
