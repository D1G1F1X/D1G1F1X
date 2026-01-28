import PageHero from "@/components/page-hero"
import ContactTabsContainer from "./_components/ContactTabsContainer"

export const metadata = {
  title: "Contact Us | Lumen Helix Solutions",
  description:
    "Get in touch with Lumen Helix Solutions. Choose your preferred contact method: email form, live AI chat, direct contact, or phone.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <PageHero
        badge="Get In Touch"
        badgeVariant="primary"
        title="Multiple Ways to Connect"
        subtitle="Choose your preferred method to reach us. Whether you prefer email, live chat, or direct contact, we're here to help."
      />

      <div className="container px-4 mx-auto py-12 sm:py-16 md:py-20 relative z-10">
        <div className="max-w-5xl mx-auto">
          <ContactTabsContainer />
        </div>
      </div>

      <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-primary-500/10 rounded-full filter blur-[100px] sm:blur-[150px] opacity-30 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-secondary-500/10 rounded-full filter blur-[100px] sm:blur-[150px] opacity-30 animate-pulse-slow delay-300"></div>
    </div>
  )
}
