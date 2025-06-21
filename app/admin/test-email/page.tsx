"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, AlertCircle, Mail, Send } from "lucide-react"

export default function TestEmailPage() {
  const [emailType, setEmailType] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string; error?: string } | null>(null)

  const handleSendTestEmail = async () => {
    if (!emailType) {
      setResult({ success: false, message: "Please select an email type" })
      return
    }

    if (emailType === "customer-confirmation" && (!customerEmail || !customerName)) {
      setResult({ success: false, message: "Please provide customer email and name for confirmation emails" })
      return
    }

    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/test-order-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: emailType,
          customerEmail,
          customerName,
        }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        message: "Failed to send test email",
        error: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Email Testing Dashboard</h1>
          <p className="text-gray-600">Test the Brevo email integration for order confirmations and notifications.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Send Test Email
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="emailType">Email Type</Label>
              <Select value={emailType} onValueChange={setEmailType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select email type to test" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer-confirmation">Customer Order Confirmation</SelectItem>
                  <SelectItem value="admin-notification">Admin Order Notification</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {emailType === "customer-confirmation" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter customer name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customerEmail">Customer Email</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="Enter customer email address"
                  />
                </div>
              </>
            )}

            <Button onClick={handleSendTestEmail} disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Test Email
                </>
              )}
            </Button>

            {result && (
              <Alert className={result.success ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}>
                {result.success ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertDescription className={result.success ? "text-green-800" : "text-red-800"}>
                  <div className="font-medium">{result.message}</div>
                  {result.error && <div className="text-sm mt-1">Error: {result.error}</div>}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Test Email Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium">Customer Confirmation Email</h4>
                <p className="text-gray-600">
                  Sends a detailed order confirmation to the customer with order details, shipping address, and next
                  steps.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Admin Notification Email</h4>
                <p className="text-gray-600">
                  Sends an alert to the admin team with order details and action items for processing the order.
                </p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                <p className="text-yellow-800 text-xs">
                  <strong>Note:</strong> Test emails use sample order data. The actual order form will use real customer
                  data and order details.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
