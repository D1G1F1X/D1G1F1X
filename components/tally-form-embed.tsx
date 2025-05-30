"use client"

import { Lightbulb, HexagonIcon as Helix, Sparkle } from "lucide-react"

interface TallyFormEmbedProps {
  formId: string // e.g., "mYForm1d" from https://tally.so/r/mYForm1d
  className?: string
  title?: string
  showIcon?: boolean
}

export default function TallyFormEmbed({
  formId,
  className = "",
  title = "Tell us about your idea...",
  showIcon = true,
}: TallyFormEmbedProps) {
  const tallyEmbedUrl = `https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`
  // Note:
  // alignLeft=1: Aligns form to the left
  // hideTitle=1: Hides Tally's default title (we're adding our own)
  // transparentBackground=1: Makes Tally form background transparent to blend with our page
  // dynamicHeight=1: Allows Tally to adjust iframe height (important!)

  return (
    <div
      className={`bg-slate-800/70 dark:bg-gray-900/80 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl border border-slate-700/50 dark:border-gray-700/50 transition-all duration-500 relative overflow-hidden group ${className}`}
    >
      {/* Optional decorative background elements */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary-500/10 rounded-full filter blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500 animate-pulse-slow"></div>
      <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-secondary-500/10 rounded-full filter blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500 animate-pulse-slow delay-200"></div>

      {showIcon && (
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center bg-primary-500/10 dark:bg-primary-500/20 p-3 rounded-full border border-primary-500/30 shadow-lg">
            <Lightbulb className="w-10 h-10 sm:w-12 sm:h-12 text-primary-400 dark:text-primary-300 z-10" />
            <Helix className="w-6 h-6 sm:w-7 sm:h-7 text-secondary-400 dark:text-secondary-300 absolute opacity-70 transform rotate-12 translate-x-1 translate-y-1" />
            <Sparkle className="w-4 h-4 text-yellow-400 absolute top-2 right-2 animate-ping opacity-75" />
          </div>
        </div>
      )}

      {title && (
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-slate-100 dark:text-white mb-6 sm:mb-8">
          {title}
        </h2>
      )}

      <iframe
        src={tallyEmbedUrl}
        width="100%"
        height="600" // Initial height, Tally's dynamicHeight should adjust this
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title="Contact Form"
        className="rounded-md min-h-[550px] sm:min-h-[600px]" // Ensure enough min-height
        // style={{ minHeight: '600px' }} // Alternative for min-height
      ></iframe>
      {/* The "Made with Tally" badge is usually part of the Tally embed itself if not disabled in Tally settings */}
    </div>
  )
}

// Default props for easy import
TallyFormEmbed.defaultProps = {
  className: "",
  title: "Tell us about your idea...",
  showIcon: true,
}
