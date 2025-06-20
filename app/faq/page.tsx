import { Suspense } from "react"
import type { Metadata } from "next"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

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
      {/* Unique FAQ Hero Section */}
      <div className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-indigo-900/20 to-black"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: "url('/images/hero/ancient-knowledge-faq.png')" }}
        ></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-violet-600/20 text-violet-300 rounded-full text-sm font-medium border border-violet-500/30">
              ❓ Knowledge Base
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            Frequently Asked <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
              Questions
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
            Find answers to common questions about NUMO Oracle, numerology, and our services
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-center max-w-2xl mx-auto">
            <div className="text-violet-300">🎴 Oracle Cards</div>
            <div className="text-indigo-300">🔢 Numerology</div>
            <div className="text-purple-300">📖 Readings</div>
            <div className="text-blue-300">🛒 Purchasing</div>
          </div>
        </div>
      </div>
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
