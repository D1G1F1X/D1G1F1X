"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { useEmailService } from "@/hooks/use-email-service" // Import the hook

type EmailType = "welcome" | "password-reset" | "contact-form" | "order-confirmation" | "admin-notification"

export default function EmailTestForm() {
  const [emailType, setEmailType] = useState<EmailType>("welcome")
  const [recipientEmail, setRecipientEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [resetToken, setResetToken] = useState("")
  const [contactName, setContactName] = useState("")
  const [contactSubject, setContactSubject] = useState("")
  const [contactMessage, setContactMessage] = useState("")
  const [orderId, setOrderId] = useState("ORDER123")
  const [customerName, setCustomerName] = useState("Test Customer")
  const [customerEmail, setCustomerEmail] = useState("customer@example.com")
  const [productName, setProductName] = useState("Numoracle Deck")
  const [productPrice, setProductPrice] = useState("29.99")
  const [productQuantity, setProductQuantity] = useState("1")

  const { sendWelcomeEmail, sendPasswordResetEmail, sendContactFormEmail, isLoading, error } = useEmailService()

  const handleSendTestEmail = async () => {
    if (isLoading) return

    let result: { success: boolean; message?: string; error?: string; details?: any } | undefined

    try {
      switch (emailType) {
        case "welcome":
          result = await sendWelcomeEmail(recipientEmail, userName)
          break
        case "password-reset":
          result = await sendPasswordResetEmail(recipientEmail, userName, resetToken)
          break
        case "contact-form":
          result = await sendContactFormEmail({
            name: contactName,
            email: recipientEmail, // Use recipientEmail as the sender's email for contact form
            subject: contactSubject,
            message: contactMessage,
          })
          break
        case "order-confirmation":
        case "admin-notification":
          // For order-related emails, we need to call the manual-checkout API route
          // as it handles the order data structure and then dispatches emails.
          // This is a simplified mock for testing purposes.
          const orderData = {
            id: orderId,
            customer_name: customerName,
            customer_email: customerEmail,
            customer_phone: null,
            shipping_address: {
              street: "123 Test St",
              city: "Testville",
              state: "TS",
              zip: "12345",
              country: "USA",
            },
            order_items: [
              {
                productId: "prod1",
                productName: productName,
                quantity: Number.parseInt(productQuantity),
                price: Number.parseFloat(productPrice),
                image: null,
              },
            ],
            notes: "Test order notes.",
            status: "completed",
            created_at: new Date().toISOString(),
          }

          const apiEndpoint = "/api/submit-manual-order" // This API route handles sending both customer and admin emails

          const response = await fetch(apiEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
          })

          let responseData: any
          try {
            responseData = await response.json()
          } catch (jsonError) {
            const rawText = await response.text()
            console.error("Order API returned non-JSON response:", rawText)
            result = {
              success: false,
              error: "Order API returned unexpected response. Check server logs.",
              details: rawText.slice(0, 200) + "...",
            }
            break
          }

          if (!response.ok) {
            result = {
              success: false,
              error: responseData.error || "Failed to process order and send emails.",
              details: responseData,
            }
          } else {
            result = {
              success: true,
              message: "Order processed and emails dispatched (check customer and admin inboxes).",
              details: responseData,
            }
          }
          break
        default:
          toast({
            title: "Error",
            description: "Invalid email type selected.",
            variant: "destructive",
          })
          return
      }

      if (result?.success) {
        toast({
          title: "Success!",
          description: result.message || "Test email sent successfully.",
          variant: "default",
        })
      } else {
        toast({
          title: "Error!",
          description: result?.error || "Failed to send test email. Check console for details.",
          variant: "destructive",
        })
        console.error("Email test error details:", result?.details || result?.error)
      }
    } catch (err: any) {
      toast({
        title: "Network Error!",
        description: err.message || "An unexpected network error occurred.",
        variant: "destructive",
      })
      console.error("Unhandled error during email test:", err)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Test Brevo Email Service</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="email-type">Email Type</Label>
          <Select value={emailType} onValueChange={(value: EmailType) => setEmailType(value)}>
            <SelectTrigger id="email-type">
              <SelectValue placeholder="Select email type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="welcome">Welcome Email</SelectItem>
              <SelectItem value="password-reset">Password Reset Email</SelectItem>
              <SelectItem value="contact-form">Contact Form Confirmation (to Admin)</SelectItem>
              <SelectItem value="order-confirmation">Order Confirmation (to Customer)</SelectItem>
              <SelectItem value="admin-notification">Order Notification (to Admin)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {(emailType === "welcome" || emailType === "password-reset" || emailType === "contact-form") && (
          <div>
            <Label htmlFor="recipient-email">Recipient Email</Label>
            <Input
              id="recipient-email"
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              placeholder="e.g., test@example.com"
              required
            />
          </div>
        )}

        {(emailType === "welcome" || emailType === "password-reset") && (
          <div>
            <Label htmlFor="user-name">User Name</Label>
            <Input
              id="user-name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="e.g., John Doe"
              required
            />
          </div>
        )}

        {emailType === "password-reset" && (
          <div>
            <Label htmlFor="reset-token">Reset Token (mock)</Label>
            <Input
              id="reset-token"
              value={resetToken}
              onChange={(e) => setResetToken(e.target.value)}
              placeholder="e.g., abc123xyz456"
              required
            />
          </div>
        )}

        {emailType === "contact-form" && (
          <>
            <div>
              <Label htmlFor="contact-name">Your Name</Label>
              <Input
                id="contact-name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="e.g., Jane Smith"
                required
              />
            </div>
            <div>
              <Label htmlFor="contact-subject">Subject</Label>
              <Input
                id="contact-subject"
                value={contactSubject}
                onChange={(e) => setContactSubject(e.target.value)}
                placeholder="e.g., Inquiry about services"
                required
              />
            </div>
            <div>
              <Label htmlFor="contact-message">Message</Label>
              <Textarea
                id="contact-message"
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Your message here..."
                rows={4}
                required
              />
            </div>
          </>
        )}

        {(emailType === "order-confirmation" || emailType === "admin-notification") && (
          <div className="space-y-4 border p-4 rounded-md">
            <h3 className="text-lg font-semibold">Mock Order Details</h3>
            <div>
              <Label htmlFor="order-id">Order ID</Label>
              <Input id="order-id" value={orderId} onChange={(e) => setOrderId(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="customer-name">Customer Name</Label>
              <Input id="customer-name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="customer-email">Customer Email</Label>
              <Input
                id="customer-email"
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="product-name">Product Name</Label>
              <Input id="product-name" value={productName} onChange={(e) => setProductName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="product-price">Product Price</Label>
              <Input
                id="product-price"
                type="number"
                step="0.01"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="product-quantity">Product Quantity</Label>
              <Input
                id="product-quantity"
                type="number"
                value={productQuantity}
                onChange={(e) => setProductQuantity(e.target.value)}
              />
            </div>
            <p className="text-sm text-gray-500">
              Note: Sending order-related emails will trigger a call to `/api/submit-manual-order`, which also creates a
              record in your Supabase `manual_orders` table.
            </p>
          </div>
        )}

        <Button onClick={handleSendTestEmail} className="w-full" disabled={isLoading}>
          {isLoading ? "Sending Test Email..." : "Send Test Email"}
        </Button>
        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
      </CardContent>
    </Card>
  )
}
