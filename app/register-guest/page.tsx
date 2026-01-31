import { getSession } from '@/lib/auth-session'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Guest Registration | Lumen Helix',
  description: 'Register as a guest to access projects and tickets',
}

export default async function GuestRegisterPage() {
  const session = await getSession()

  // Redirect if already logged in
  if (session) {
    redirect('/dashboard')
  }

  // Dynamic import to avoid hydration issues
  const { default: GuestRegistrationForm } = await import(
    '@/components/auth/guest-registration-form'
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center px-4 pt-20">
      <GuestRegistrationForm />
    </div>
  )
}
