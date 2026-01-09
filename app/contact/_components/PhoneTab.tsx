import { Phone, Clock, Calendar } from "lucide-react"

export default function PhoneTab() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">Call Us Directly</h3>
        <p className="text-gray-300 mb-6">
          Prefer to talk to someone? Give us a call during business hours for immediate assistance.
        </p>
      </div>

      <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-8">
        <div className="flex items-start gap-4 mb-6">
          <Phone className="w-6 h-6 text-primary-400 mt-1 flex-shrink-0" />
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Main Line</h4>
            <a
              href="tel:+14842020272"
              className="text-2xl font-bold text-primary-400 hover:text-primary-300 transition-colors"
            >
              (484) 202-0272
            </a>
            <p className="text-gray-400 text-sm mt-1">Click to call or use your phone</p>
          </div>
        </div>

        <hr className="border-gray-600 my-6" />

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-secondary-400 flex-shrink-0" />
            <div>
              <p className="text-white font-medium">Business Hours</p>
              <p className="text-gray-400 text-sm">Monday - Friday, 9:00 AM - 5:00 PM EST</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-secondary-400 flex-shrink-0" />
            <div>
              <p className="text-white font-medium">Response Time</p>
              <p className="text-gray-400 text-sm">Calls answered within 24 business hours</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary-500/10 border border-primary-500/30 rounded-lg p-4">
        <p className="text-gray-100 text-sm">
          <span className="font-semibold text-primary-400">Tip:</span> For faster responses outside business hours, try
          our live chat or email form.
        </p>
      </div>
    </div>
  )
}
