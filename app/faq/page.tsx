import { Suspense } from "react"
import type { Metadata } from "next"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import StandardizedHero from "@/components/standardized-hero"

export const metadata: Metadata = {
  title: "FAQ | NUMO Oracle",
  description: "Find answers to frequently asked questions about NUMO Oracle cards, numerology, and our services.",
}

const faqData = [
  {
    question: "What is the NUMO Oracle Deck?",
    answer:
      "The NUMO Oracle Deck is a unique divination system that combines numerology, elemental wisdom, and archetypal symbolism to provide deep insights and guidance.",
  },
  {
    question: "How do I use the NUMO Oracle cards?",
    answer:
      "Each card comes with a detailed interpretation. You can draw cards for daily guidance, specific questions, or use them in spreads for more complex readings. Our guidebook provides various methods.",
  },
  {
    question: "What is numerology?",
    answer:
      "Numerology is the study of the mystical relationship between numbers and coinciding events. It's an ancient science that reveals insights into personality, life path, and future events.",
  },
  {
    question: "Are the readings personalized?",
    answer:
      "Yes, our AI-powered readings integrate your personal numerological data with the card interpretations to provide highly personalized and relevant insights.",
  },
  {
    question: "How can I purchase the NUMO Oracle Deck?",
    answer:
      "The NUMO Oracle Deck is available for purchase directly from our 'Buy Now' page. We offer various editions and bundles.",
  },
]

export default function FAQPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <StandardizedHero
        title="Frequently Asked"
        subtitle="Questions"
        description="Find answers to common questions about NUMO Oracle, numerology, and our services"
        backgroundImage="/images/hero/ancient-knowledge-faq.png"
        badge={{
          text: "❓ Knowledge Base",
          icon: "",
        }}
        features={[
          { icon: "🎴", text: "Oracle Cards", color: "violet" },
          { icon: "🔢", text: "Numerology", color: "indigo" },
          { icon: "📖", text: "Readings", color: "purple" },
          { icon: "🛒", text: "Purchasing", color: "blue" },
        ]}
        gradient="from-violet-900/20 via-indigo-900/20 to-black"
      />
      <div className="container mx-auto py-8">
        <Suspense fallback={<div className="text-center py-20 text-white">Loading FAQs...</div>}>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg text-white hover:no-underline">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-300">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Suspense>
      </div>
    </div>
  )
}
