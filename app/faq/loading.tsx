import { Skeleton } from "@/components/ui/skeleton"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export default function Loading() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center py-12"
      style={{ backgroundImage: "url('/images/hero/ancient-knowledge-faq.png')" }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Skeleton className="mx-auto h-12 w-64 mb-4" />
          <Skeleton className="mx-auto h-6 w-96" />
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {Array.from({ length: 5 }).map((_, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>
                  <Skeleton className="h-6 w-full" />
                </AccordionTrigger>
                <AccordionContent>
                  <Skeleton className="h-20 w-full" />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}
