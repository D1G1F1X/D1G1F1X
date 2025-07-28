import { SignUpForm } from "@/components/auth/sign-up-form"
import Image from "next/image"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      {/* Background image */}
      <Image
        src="/abstract-login-background.png"
        alt="Register Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0 opacity-30"
      />

      {/* Overlay to dim background */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      <div className="relative z-20 w-full max-w-md">
        <SignUpForm />
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  )
}
