import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { Truck, Package, Globe } from "lucide-react"

export default function ShippingPolicyPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center p-4">
      <Image
        src="/order-confirmation-background.png" // Reusing a similar background
        alt="Shipping Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0 opacity-30"
      />
      <div className="absolute inset-0 bg-black/50 z-10" />

      <Card className="relative z-20 w-full max-w-4xl p-6 md:p-8 shadow-lg my-8">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary-foreground">Shipping Policy</CardTitle>
          <p className="text-muted-foreground">Last Updated: July 25, 2024</p>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            At NUMO Oracle, we are committed to delivering your sacred tools and resources with care and efficiency.
            This Shipping Policy outlines our shipping procedures, delivery times, and related information.
          </p>

          <Separator className="my-6" />

          <h2>
            <Truck className="inline-block mr-2 h-6 w-6" /> Shipping Destinations
          </h2>
          <p>
            We currently ship to addresses within the United States, Canada, and select international destinations.
            Please check the availability for your country during checkout.
          </p>

          <h2>
            <Package className="inline-block mr-2 h-6 w-6" /> Processing Time
          </h2>
          <p>
            Orders are typically processed within <strong>1-3 business days</strong> (Monday-Friday, excluding holidays)
            after payment verification. During peak seasons or promotional periods, processing times may be slightly
            longer.
          </p>

          <h2>
            <Globe className="inline-block mr-2 h-6 w-6" /> Estimated Delivery Times
          </h2>
          <p>Delivery times vary depending on your location and the shipping method selected at checkout.</p>
          <ul>
            <li>
              <strong>Domestic (USA):</strong> 3-7 business days
            </li>
            <li>
              <strong>Canada:</strong> 7-14 business days
            </li>
            <li>
              <strong>International:</strong> 10-21 business days (may vary significantly due to customs)
            </li>
          </ul>
          <p>
            Please note that these are estimated delivery times and are not guaranteed. Delays may occur due to
            unforeseen circumstances such as weather, customs processing, or carrier issues.
          </p>

          <h2>Shipping Costs</h2>
          <p>
            Shipping costs are calculated at checkout based on the weight of your order, shipping destination, and
            selected shipping method. We occasionally offer free shipping promotions, which will be clearly advertised.
          </p>

          <h2>Order Tracking</h2>
          <p>
            Once your order has shipped, you will receive a shipping confirmation email containing your tracking number.
            You can use this number to track the status of your package through the carrier&apos;s website.
          </p>

          <h2>Customs, Duties, and Taxes (International Orders)</h2>
          <p>
            For international orders, please be aware that customs duties, taxes, and fees may be levied by the
            destination country. These charges are the responsibility of the recipient and are not included in the item
            price or shipping cost. We recommend checking with your local customs office for more information.
          </p>

          <h2>Lost or Damaged Packages</h2>
          <p>
            If your package is lost in transit or arrives damaged, please contact us immediately at{" "}
            <a href="mailto:support@numoracle.com" className="text-primary hover:underline">
              support@numoracle.com
            </a>
            . We will work with the shipping carrier to resolve the issue and ensure you receive your order.
          </p>

          <h2>Incorrect Shipping Address</h2>
          <p>
            It is the customer&apos;s responsibility to ensure the shipping address is correct. If an incorrect address
            is provided and the package is returned to us, you will be responsible for the re-shipping fees.
          </p>

          <Separator className="my-6" />

          <h2>Contact Us</h2>
          <p>If you have any questions about our Shipping Policy, please contact us:</p>
          <p>
            Email:{" "}
            <a href="mailto:shipping@numoracle.com" className="text-primary hover:underline">
              shipping@numoracle.com
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
