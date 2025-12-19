import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image 
                src="/numoracle-full-logo.png" 
                alt="NUMO ORACLE" 
                width={180} 
                height={30}
                className="w-auto h-auto"
                suppressHydrationWarning
              />
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Discover the ancient wisdom of numerology combined with elemental oracle cards for profound spiritual
              guidance.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-gray-400 hover:text-purple-400 transition" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-gray-400 hover:text-purple-400 transition" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-gray-400 hover:text-purple-400 transition" />
              </a>
              <a
                href="https://www.youtube.com/@numoracle1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5 text-gray-400 hover:text-purple-400 transition" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-purple-400 transition">
                  About NUMO
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-gray-400 hover:text-purple-400 transition">
                  Tools
                </Link>
              </li>
              <li>
                <Link href="/library" className="text-gray-400 hover:text-purple-400 transition">
                  Library
                </Link>
              </li>
              <li>
                <Link href="/buy" className="text-gray-400 hover:text-purple-400 transition">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-gray-400 hover:text-purple-400 transition">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="text-gray-400 hover:text-purple-400 transition">
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/guidebook" className="text-gray-400 hover:text-purple-400 transition">
                  Guidebook
                </Link>
              </li>
              <li>
                <Link href="/tools/numerology-calculator" className="text-gray-400 hover:text-purple-400 transition">
                  Numerology Calculator
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-purple-400 transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/tools/card-simulator" className="text-gray-400 hover:text-purple-400 transition">
                  Free Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Legal & Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-gray-400 hover:text-purple-400 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-400 hover:text-purple-400 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="mailto:support@numoracle.com" className="text-gray-400 hover:text-purple-400 transition">
                  Contact Support
                </a>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-purple-400 transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-400 hover:text-purple-400 transition">
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>
            &copy; {currentYear} NUMO Oracle by{" "}
            <a
              href="https://www.kraftwerked.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition"
            >
              Kraftwerk Numerology
            </a>
            . All rights reserved.
          </p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link href="/privacy-policy" className="hover:text-purple-400 transition">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link href="/terms-of-service" className="hover:text-purple-400 transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
