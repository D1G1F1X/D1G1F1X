import { LoginForm } from "@/components/auth/login-form"
import Image from "next/image"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      {/* Background image */}
      <Image
        src="/abstract-login-background.png"
        alt="Login Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0 opacity-30"
      />

      {/* Overlay to dim background */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      <div className="relative z-20 w-full max-w-md">
        <LoginForm />
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </div>
        <div className="mt-2 text-center text-sm text-muted-foreground">
          <Link href="/admin/login" className="font-medium text-primary hover:underline">
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  )
}
