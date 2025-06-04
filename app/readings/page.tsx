import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, MessageCircle, Star, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "NUMO ORACLE | Book a Reading",
  description: "Book a personal oracle card reading session",
}

// Helper function to ensure we never pass an empty string to src
const getImageWithFallback = (src: string | null | undefined, fallback: string): string => {
  if (!src || src === "") {
    return fallback
  }
  return src
}

const readingOptions = [
  {
    id: 1,
    name: "Essential Guidance",
    image: "/celestial-weave.png",
    description:
      "A focused 30-minute reading addressing a specific question or area of your life. Includes a 5-card spread with detailed interpretation.",
    duration: "30 minutes",
    price: "$45",
    popular: false,
  },
  {
    id: 2,
    name: "Deep Insight Journey",
    image: "/amethyst-veil.png",
    description:
      "A comprehensive 60-minute reading exploring multiple aspects of your situation. Includes multiple spreads and numerological insights tailored to your needs.",
    duration: "60 minutes",
    price: "$85",
    popular: true,
  },
  {
    id: 3,
    name: "Spiritual Alignment",
    image: "/glowing-celtic-oracle.png",
    description:
      "A profound 90-minute session combining oracle readings with spiritual guidance. Includes custom spreads, numerology, and personalized practices for your journey.",
    duration: "90 minutes",
    price: "$120",
    popular: false,
  },
]

const testimonials = [
  {
    name: "Sarah K.",
    text: "The reading was incredibly insightful and accurate. I received guidance that helped me make an important life decision with confidence.",
    date: "October 2023",
  },
  {
    name: "Michael T.",
    text: "I was skeptical at first, but the depth and accuracy of my reading was astonishing. The numerology insights were particularly revealing.",
    date: "December 2023",
  },
  {
    name: "Elena R.",
    text: "The spiritual alignment session was transformative. I gained clarity on my path and practical steps to move forward. Highly recommended!",
    date: "February 2024",
  },
]

export default function BookReadingPage() {
  const defaultPlaceholder = "/placeholder.svg?key=oes41"

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          <span className="text-white">Book a Personal </span>
          <span className="text-purple-400">NUMO ORACLE Reading</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Experience the profound wisdom of the NUMO ORACLE cards through a personalized reading session. Gain clarity,
          insight, and guidance tailored specifically to your journey.
        </p>
      </div>

      {/* Hero Section */}
      <div className="mb-16 bg-gradient-to-br from-purple-900/30 to-black rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose a Personal Reading?</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Star className="h-6 w-6 text-purple-400 mr-2 flex-shrink-0 mt-1" />
                <p className="text-gray-300">
                  Receive guidance tailored specifically to your unique situation and energy
                </p>
              </li>
              <li className="flex items-start">
                <Star className="h-6 w-6 text-purple-400 mr-2 flex-shrink-0 mt-1" />
                <p className="text-gray-300">
                  Benefit from expert interpretation of the cards' meanings in your context
                </p>
              </li>
              <li className="flex items-start">
                <Star className="h-6 w-6 text-purple-400 mr-2 flex-shrink-0 mt-1" />
                <p className="text-gray-300">Explore the deeper numerological connections relevant to your life path</p>
              </li>
              <li className="flex items-start">
                <Star className="h-6 w-6 text-purple-400 mr-2 flex-shrink-0 mt-1" />
                <p className="text-gray-300">Ask questions and receive immediate clarification during your session</p>
              </li>
            </ul>
            <Button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white w-full md:w-auto">
              <Link href="#booking-options">View Reading Options</Link>
            </Button>
          </div>
          <div className="relative h-64 md:h-auto">
            <Image
              src={getImageWithFallback("/mystical-oracle.png", defaultPlaceholder) || "/placeholder.svg"}
              alt="Personal Oracle Reading"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Reading Options */}
      <div id="booking-options" className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-white text-center">Reading Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {readingOptions.map((option) => (
            <Card
              key={option.id}
              className={`bg-gray-800 border-gray-700 overflow-hidden ${option.popular ? "ring-2 ring-purple-500" : ""}`}
            >
              <div className="relative h-48">
                <Image
                  src={getImageWithFallback(option.image, defaultPlaceholder) || "/placeholder.svg"}
                  alt={option.name}
                  fill
                  className="object-cover"
                />
                {option.popular && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-purple-600">Most Popular</Badge>
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-purple-400">{option.name}</CardTitle>
                <CardDescription className="text-gray-400 flex items-center">
                  <Clock className="h-4 w-4 mr-1" /> {option.duration}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">{option.description}</p>
                <p className="text-2xl font-bold text-white">{option.price}</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                  <Link href="#contact-form">Book This Reading</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="mb-16 bg-gray-800 border border-gray-700 rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-8 text-white text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-purple-900/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarDays className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-medium text-purple-400 mb-2">1. Book Your Session</h3>
            <p className="text-gray-300">
              Choose your preferred reading type and submit the booking form. I'll contact you within 24 hours to
              confirm your appointment.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-900/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-medium text-purple-400 mb-2">2. Pre-Reading Consultation</h3>
            <p className="text-gray-300">
              Share your questions or areas of focus before our session so I can prepare the most relevant spreads for
              your needs.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-900/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-medium text-purple-400 mb-2">3. Attend Your Reading</h3>
            <p className="text-gray-300">
              Join our video call at the scheduled time. Readings are conducted via Zoom and include a recording for you
              to keep.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-white text-center">Client Experiences</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-300 italic mb-4">"{testimonial.text}"</p>
                <div className="flex justify-between items-center">
                  <p className="font-medium text-purple-400">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.date}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Booking Form */}
      <div id="contact-form" className="bg-gray-800 border border-gray-700 rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-white text-center">Book Your Reading</h2>
        <form className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="reading-type" className="block text-sm font-medium text-gray-300 mb-1">
              Reading Type
            </label>
            <select
              id="reading-type"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="">Select a reading type</option>
              {readingOptions.map((option) => (
                <option key={option.id} value={option.name}>
                  {option.name} ({option.duration} - {option.price})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
              Your Questions or Areas of Focus
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Share what you'd like to focus on in your reading..."
            ></textarea>
          </div>

          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
            Request Reading
          </Button>

          <p className="text-sm text-gray-400 mt-4 text-center">
            After submitting, you'll receive a confirmation email with payment instructions and available time slots.
          </p>
        </form>
      </div>

      {/* Reviews Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-white text-center">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-300 italic mb-4">"{testimonial.text}"</p>
                <div className="flex justify-between items-center">
                  <p className="font-medium text-purple-400">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.date}</p>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Link href="/reviews" className="text-sm text-purple-400 hover:text-purple-300">
                  View all reviews →
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-white text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg text-purple-400">What should I prepare before my reading?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Take some time to reflect on what you'd like guidance on. Having clear questions helps, but it's also
                fine if you're seeking general guidance. Find a quiet space for your session and come with an open mind.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg text-purple-400">How are readings conducted?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                All readings are conducted via Zoom video call. You'll receive a recording afterward. I use physical
                NUMO ORACLE cards during our session, and you'll be able to see the cards drawn for you.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg text-purple-400">What's your cancellation policy?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                If you need to reschedule, please provide at least 24 hours notice. Cancellations with less than 24
                hours notice may be subject to a 50% fee. Full refunds are available if canceled 48+ hours in advance.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg text-purple-400">How often should I get a reading?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                This varies by individual. Some find value in monthly readings, while others prefer quarterly or during
                significant life transitions. I recommend allowing time to integrate insights between readings.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
