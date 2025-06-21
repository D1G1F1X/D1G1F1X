import type { Metadata } from "next"
import BrevoTestSuite from "@/components/admin/brevo-test-suite"

export const metadata: Metadata = {
  title: "Email Testing | Admin Dashboard",
  description: "Test Brevo email integration and functionality",
}

export default function EmailTestingPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Email Service Testing</h1>
        <p className="text-gray-600 mt-2">Comprehensive testing suite for Brevo email integration</p>
      </div>

      <BrevoTestSuite />
    </div>
  )
}
