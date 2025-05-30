import PageHero from "@/components/page-hero"
import TallyFormEmbed from "@/components/tally-form-embed" // Import the new Tally embed component

// IMPORTANT: Replace with your actual Tally form ID
const YOUR_TALLY_FORM_ID = "YOUR_TALLY_FORM_ID_HERE" // e.g., "mYForm1d"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <PageHero
        badge="Get In Touch"
        badgeVariant="primary"
        title="Let's Discuss Your Project"
        subtitle="We're excited to hear about your ideas. Fill out the form below or reach out via our other contact methods."
      />

      <div className="container px-4 mx-auto py-12 sm:py-16 md:py-20 relative z-10">
        <div className="max-w-3xl mx-auto">
          {YOUR_TALLY_FORM_ID === "YOUR_TALLY_FORM_ID_HERE" ? (
            <div className="bg-yellow-900/30 border border-yellow-500/50 text-yellow-300 p-6 rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-2">Tally Form Not Configured</h3>
              <p>
                Please update the `YOUR_TALLY_FORM_ID` in `app/contact/page.tsx` with your actual Tally form ID to
                display the contact form.
              </p>
            </div>
          ) : (
            <TallyFormEmbed formId={YOUR_TALLY_FORM_ID} />
          )}
        </div>

        {/* You can keep other contact info if needed */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold text-white mb-6">Other Ways to Reach Us</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-lg">
            <div className="bg-slate-800/60 dark:bg-gray-800/70 p-6 rounded-lg border border-slate-700/50 dark:border-gray-700/50">
              <h4 className="text-xl font-semibold text-primary-400 mb-2">Email Us</h4>
              <p className="text-slate-300 dark:text-gray-300">For general inquiries or project discussions:</p>
              <a
                href="mailto:info@lumenhelix.com"
                className="text-secondary-400 hover:text-secondary-300 transition-colors"
              >
                info@lumenhelix.com
              </a>
            </div>
            <div className="bg-slate-800/60 dark:bg-gray-800/70 p-6 rounded-lg border border-slate-700/50 dark:border-gray-700/50">
              <h4 className="text-xl font-semibold text-primary-400 mb-2">Call Us</h4>
              <p className="text-slate-300 dark:text-gray-300">Monday-Friday, 9am-5pm EST:</p>
              <a href="tel:+14842020272" className="text-secondary-400 hover:text-secondary-300 transition-colors">
                (484) 202-0272
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-primary-500/10 rounded-full filter blur-[100px] sm:blur-[150px] opacity-30 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-secondary-500/10 rounded-full filter blur-[100px] sm:blur-[150px] opacity-30 animate-pulse-slow delay-300"></div>
    </div>
  )
}
