"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ServiceCard from "@/components/service-card"
import ProjectPreview from "@/components/project-preview"
import BlogPostCard from "@/components/blog-post-card"
import { services } from "@/lib/data"
import { featuredProjects } from "@/lib/projects"
import { featuredPosts } from "@/lib/blog"
import TallyFormEmbed from "@/components/tally-form-embed"

// Using the new Tally form ID for the homepage
const YOUR_TALLY_FORM_ID_HOMEPAGE = "m6G65e"

export default function Home() {
  const [heroTextStyle, setHeroTextStyle] = useState({})
  const [subTextStyle, setSubTextStyle] = useState({})
  const [buttonPrimaryStyle, setButtonPrimaryStyle] = useState({})
  const [buttonOutlineStyle, setButtonOutlineStyle] = useState({})
  const [chevronStyle, setChevronStyle] = useState({})

  useEffect(() => {
    const updateTextStyles = () => {
      const cycleDuration = 240000
      const startTime = (window as any).animationStartTime || Date.now()
      if (!(window as any).animationStartTime) {
        ;(window as any).animationStartTime = startTime
      }
      const elapsed = (Date.now() - startTime) % cycleDuration
      const timeOfDayCalc = (elapsed / cycleDuration) * 24

      let headingColor, subheadingColor, headingShadow, subheadingShadow
      let primaryBtnBg, primaryBtnText, outlineBtnBorder, outlineBtnText, chevronColor

      if (timeOfDayCalc < 5 || timeOfDayCalc >= 20) {
        headingColor = "rgba(255, 255, 255, 0.95)"
        subheadingColor = "rgba(230, 230, 230, 0.9)"
        headingShadow = "0 4px 8px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.4)"
        subheadingShadow = "0 2px 4px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 0, 0, 0.3)"
        primaryBtnBg = "rgba(20, 184, 166, 0.9)"
        primaryBtnText = "white"
        outlineBtnBorder = "rgba(255, 255, 255, 0.8)"
        outlineBtnText = "rgba(255, 255, 255, 0.95)"
        chevronColor = "rgba(255, 255, 255, 0.7)"
      } else if (timeOfDayCalc >= 5 && timeOfDayCalc < 7) {
        const progress = (timeOfDayCalc - 5) / 2
        const smoothProgress = progress * progress * (3 - 2 * progress)
        const r = Math.round(255 - smoothProgress * 255)
        const g = Math.round(255 - smoothProgress * 255)
        const b = Math.round(255 - smoothProgress * 255)
        const sr = Math.min(255, Math.round(r - 25 + smoothProgress * 50))
        const sg = Math.min(255, Math.round(g - 25 + smoothProgress * 50))
        const sb = Math.min(255, Math.round(b - 25 + smoothProgress * 50))
        headingColor = `rgba(${r}, ${g}, ${b}, 0.95)`
        subheadingColor = `rgba(${sr}, ${sg}, ${sb}, 0.9)`
        const shadowOpacity = 0.8 - smoothProgress * 0.5
        const subShadowOpacity = 0.7 - smoothProgress * 0.4
        headingShadow = `0 2px 6px rgba(${smoothProgress > 0.5 ? 255 : 0}, ${smoothProgress > 0.5 ? 255 : 0}, ${
          smoothProgress > 0.5 ? 255 : 0
        }, ${shadowOpacity})`
        subheadingShadow = `0 1px 4px rgba(${smoothProgress > 0.5 ? 255 : 0}, ${smoothProgress > 0.5 ? 255 : 0}, ${
          smoothProgress > 0.5 ? 255 : 0
        }, ${subShadowOpacity})`
        primaryBtnBg = `rgba(${20 + smoothProgress * 20}, ${184 - smoothProgress * 40}, ${
          166 - smoothProgress * 40
        }, 0.9)`
        primaryBtnText = "white"
        outlineBtnBorder = `rgba(${r}, ${g}, ${b}, 0.8)`
        outlineBtnText = `rgba(${r}, ${g}, ${b}, 0.95)`
        chevronColor = `rgba(${r}, ${g}, ${b}, 0.7)`
      } else if (timeOfDayCalc >= 7 && timeOfDayCalc < 17) {
        headingColor = "rgba(0, 0, 0, 0.95)"
        subheadingColor = "rgba(25, 25, 25, 0.9)"
        headingShadow = "0 2px 6px rgba(255, 255, 255, 0.7), 0 0 12px rgba(255, 255, 255, 0.4)"
        subheadingShadow = "0 1px 4px rgba(255, 255, 255, 0.6), 0 0 8px rgba(255, 255, 255, 0.3)"
        primaryBtnBg = "rgba(40, 144, 126, 0.9)"
        primaryBtnText = "white"
        outlineBtnBorder = "rgba(0, 0, 0, 0.8)"
        outlineBtnText = "rgba(0, 0, 0, 0.95)"
        chevronColor = "rgba(0, 0, 0, 0.7)"
      } else if (timeOfDayCalc >= 17 && timeOfDayCalc < 20) {
        const progress = (timeOfDayCalc - 17) / 3
        const smoothProgress = progress * progress * (3 - 2 * progress)
        const r = Math.round(smoothProgress * 255)
        const g = Math.round(smoothProgress * 255)
        const b = Math.round(smoothProgress * 255)
        const sr = Math.min(255, Math.round(r + 25 - smoothProgress * 50))
        const sg = Math.min(255, Math.round(g + 25 - smoothProgress * 50))
        const sb = Math.min(255, Math.round(b + 25 - smoothProgress * 50))
        headingColor = `rgba(${r}, ${g}, ${b}, 0.95)`
        subheadingColor = `rgba(${sr}, ${sg}, ${sb}, 0.9)`
        const shadowOpacity = 0.3 + smoothProgress * 0.5
        const subShadowOpacity = 0.2 + smoothProgress * 0.5
        headingShadow = `0 2px 6px rgba(${smoothProgress < 0.5 ? 255 : 0}, ${smoothProgress < 0.5 ? 255 : 0}, ${
          smoothProgress < 0.5 ? 255 : 0
        }, ${shadowOpacity})`
        subheadingShadow = `0 1px 4px rgba(${smoothProgress < 0.5 ? 255 : 0}, ${smoothProgress < 0.5 ? 255 : 0}, ${
          smoothProgress < 0.5 ? 255 : 0
        }, ${subShadowOpacity})`
        primaryBtnBg = `rgba(${40 - smoothProgress * 20}, ${144 + smoothProgress * 40}, ${
          126 + smoothProgress * 40
        }, 0.9)`
        primaryBtnText = "white"
        outlineBtnBorder = `rgba(${r}, ${g}, ${b}, 0.8)`
        outlineBtnText = `rgba(${r}, ${g}, ${b}, 0.95)`
        chevronColor = `rgba(${r}, ${g}, ${b}, 0.7)`
      }

      setHeroTextStyle({ color: headingColor, textShadow: headingShadow, transition: "all 0.5s ease" })
      setSubTextStyle({ color: subheadingColor, textShadow: subheadingShadow, transition: "all 0.5s ease" })
      setButtonPrimaryStyle({
        backgroundColor: primaryBtnBg,
        color: primaryBtnText,
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
        transition: "all 0.5s ease",
      })
      setButtonOutlineStyle({ borderColor: outlineBtnBorder, color: outlineBtnText, transition: "all 0.5s ease" })
      setChevronStyle({ color: chevronColor, transition: "all 0.5s ease" })
    }
    const timeInterval = setInterval(updateTextStyles, 100)
    updateTextStyles()
    return () => clearInterval(timeInterval)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden">
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-primary-500/20 text-primary-300 border-primary-500/30 px-4 py-1 text-sm">
              Welcome to Lumen Helix
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={heroTextStyle}>
              Strategic Vision, Flawless Execution
            </h1>
            <p className="text-xl md:text-2xl mb-10 leading-relaxed max-w-3xl mx-auto" style={subTextStyle}>
              Elevating businesses through integrated technology solutions and expert project management
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="hover:opacity-90" style={buttonPrimaryStyle}>
                <Link href="/services">Explore Our Services</Link>
              </Button>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-8 w-8" style={chevronStyle} />
          </div>
        </div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>
      </section>

      <section id="services" className="py-24 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">{/* SVG background pattern */}</div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge className="mb-4 bg-primary-500/20 text-primary-300 border-primary-500/30 px-4 py-1 text-sm">
              Our Expertise
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Integrated Digital Solutions
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Comprehensive services that work together seamlessly to drive innovation and growth for your business.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
          <div className="mt-16 text-center">
            <Button
              asChild
              className="bg-primary-500/90 hover:bg-primary-600 text-white group transition-all duration-300 shadow-lg hover:shadow-primary-500/20"
            >
              <Link href="/services" className="flex items-center gap-2">
                View All Services
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="about" className="py-24 bg-gray-800 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500 rounded-full filter blur-[120px] opacity-10 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary-500 rounded-full filter blur-[120px] opacity-10 animate-pulse-slow"></div>
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge className="mb-4 bg-secondary-500/20 text-secondary-300 border-secondary-500/30 px-4 py-1 text-sm">
              Our Philosophy
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Clarity in Complexity</h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              At Lumen Helix, we don't just implement technology—we architect transformation. We empower businesses by
              fusing cutting-edge AI strategy with expert project management, innovative web development, captivating
              design, and data-driven marketing strategies.
            </p>
            <Button
              asChild
              className="group bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white shadow-lg hover:shadow-primary-500/20 transition-all duration-300"
            >
              <Link href="/about" className="flex items-center gap-2">
                Learn more about our philosophy
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -top-8 -left-8 w-32 h-32 bg-primary-500 opacity-20 rounded-full animate-pulse-slow"></div>
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-secondary-500 opacity-20 rounded-full animate-pulse-slow"></div>
                <div className="relative bg-gray-900/90 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-700/50 hover:border-primary-500/30 transition-all duration-500 group">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 flex items-center justify-center bg-primary-500/20 rounded-full mr-4 border border-primary-500/30">
                      <Sparkles className="h-6 w-6 text-primary-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Our Approach</h3>
                  </div>
                  <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                    At Lumen Helix Solutions, we believe in the power of integrated expertise. Our approach combines
                    strategic insight with practical implementation, ensuring that every solution we deliver is both
                    innovative and effective.
                  </p>
                  <div className="grid grid-cols-2 gap-4">{/* Approach items */}</div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2">{/* About content - keeping for brevity */}</div>
          </div>
        </div>
      </section>

      <section
        id="portfolio"
        className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5 pointer-events-none">{/* SVG background pattern */}</div>
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge className="mb-4 bg-accent-500/20 text-accent-300 border-accent-500/30 px-4 py-1 text-sm">
              Our Work
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Project Portfolio</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore our diverse range of innovative projects that showcase our expertise.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <ProjectPreview key={index} project={project} />
            ))}
          </div>
          <div className="mt-16 text-center">
            <Button
              asChild
              variant="outline"
              className="border-primary-500/50 text-primary-400 hover:bg-primary-500/10 hover:border-primary-400 group transition-all duration-300 shadow-lg hover:shadow-primary-500/10"
            >
              <Link href="/portfolio" className="flex items-center gap-2">
                View All Projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="blog" className="py-24 bg-gray-900 relative overflow-hidden">
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge className="mb-4 bg-primary-500/20 text-primary-300 border-primary-500/30 px-4 py-1 text-sm">
              Knowledge Hub
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Latest Insights</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Expert articles and thought leadership from our team.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.slice(0, 3).map((post, index) => (
              <BlogPostCard key={index} post={post} />
            ))}
          </div>
          <div className="mt-16 text-center">
            <Button
              asChild
              variant="outline"
              className="border-primary-500/50 text-primary-400 hover:bg-primary-500/10 hover:border-primary-400 group transition-all duration-300 shadow-lg hover:shadow-primary-500/10"
            >
              <Link href="/blog" className="flex items-center gap-2">
                View All Articles
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">{/* SVG background pattern */}</div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto">
            {/* The Tally form will be embedded here */}
            <TallyFormEmbed formId={YOUR_TALLY_FORM_ID_HOMEPAGE} className="max-w-2xl mx-auto" />

            <div className="mt-12 text-center text-gray-400">
              <p>Or, reach out directly:</p>
              <a href="mailto:info@lumenhelix.com" className="text-primary-400 hover:text-primary-300">
                info@lumenhelix.com
              </a>
              <span className="mx-2">|</span>
              <a href="tel:+14842020272" className="text-primary-400 hover:text-primary-300">
                (484) 202-0272
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-800/50 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="statsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <pattern id="statsPattern" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="40" fill="none" stroke="url(#statsGradient)" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="20" fill="none" stroke="url(#statsGradient)" strokeWidth="0.5" />
              <line
                x1="0"
                y1="50"
                x2="100"
                y2="50"
                stroke="url(#statsGradient)"
                strokeWidth="0.5"
                strokeDasharray="5,5"
              />
              <line
                x1="50"
                y1="0"
                x2="50"
                y2="100"
                stroke="url(#statsGradient)"
                strokeWidth="0.5"
                strokeDasharray="5,5"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#statsPattern)" />
          </svg>
        </div>

        <div className="container px-4 mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"></div>
        </div>
      </section>
    </div>
  )
}
