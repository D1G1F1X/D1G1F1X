import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "NUMO ORACLE | Ethical Responsibilities of a Reader",
  description: "Understand the ethical responsibilities and best practices for NUMO Oracle readers.",
}

export default function EthicsPage() {
  return (
    <main className="container mx-auto px-4 py-12 font-body">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 font-heading">
          <span className="text-white">The Ethical Responsibilities </span>
          <span className="text-purple-400">of a Reader</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Your role extends beyond interpreting cards. You carry a significant ethical responsibility toward those
          seeking your insight.
        </p>
      </div>

      <div className="flex justify-between items-center mb-8">
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-gray-700 text-text-main border-border-color hover:bg-gray-600 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <Link href="/guidebook/compound-numbers">Interpreting Compound Numbers</Link>
        </Button>
        {/* No next button for the last page */}
      </div>

      <Card className="bg-gray-800 border-gray-700 mb-8">
        <CardContent className="p-8 prose prose-invert max-w-none">
          <ol className="list-decimal pl-6 text-text-main space-y-4">
            <li>
              <strong className="text-text-heading">Empower the Querent:</strong> Your goal is to foster agency, not
              dependency. Frame messages around choices and potentials, not immutable fate.
            </li>
            <li>
              <strong className="text-text-heading">Maintain Boundaries:</strong> Confidentiality is sacred. Gently but
              firmly decline questions about a third party's private life, or those seeking medical, legal, or financial
              advice.
            </li>
            <li>
              <strong className="text-text-heading">Honesty and Integrity:</strong> Deliver all messages, even difficult
              ones, with compassion and a constructive focus on how to navigate the challenge.
            </li>
            <li>
              <strong className="text-text-heading">Know When to Refer:</strong> Recognizing the limits of your role is
              a sign of professionalism. Guide querents toward licensed professionals for issues outside the scope of
              spiritual guidance.
            </li>
            <li>
              <strong className="text-text-heading">Self-Care:</strong> You cannot pour from an empty cup. Ground
              yourself before and after readings to clear your energy field and maintain your own clarity.
            </li>
          </ol>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-gray-700 text-text-main border-border-color hover:bg-gray-600 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <Link href="/guidebook/compound-numbers">Interpreting Compound Numbers</Link>
        </Button>
        {/* No next button for the last page */}
      </div>
    </main>
  )
}
