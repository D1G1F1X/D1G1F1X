"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ServiceCard from "@/components/service-card"
import ProjectPreview from "@/components/project-preview"
import BlogPostCard from "@/components/blog-post-card"
import DevelopmentStack from "@/components/development-stack" // Import the new component
import { services } from "@/lib/data"
import { featuredProjects } from "@/lib/projects"
import { featuredPosts } from "@/lib/blog"

export default function Home() {
  const [heroTextStyle, setHeroTextStyle] = useState({})
  const [subTextStyle, setSubTextStyle] = useState({})
  const [buttonPrimaryStyle, setButtonPrimaryStyle] = useState({})
  const [buttonOutlineStyle, setButtonOutlineStyle] = useState({})
  const [chevronStyle, setChevronStyle] = useState({})
  const [timeOfDay, setTimeOfDay] = useState(0)

  useEffect(() => {
    // Update text styles based on animation cycle
    const updateTextStyles = () => {
      const cycleDuration = 240000 // 4 minutes for a full day cycle
      const startTime = (window as any).animationStartTime || Date.now()
      // Set animation start time if not already set
      if (!(window as any).animationStartTime) {
        ;(window as any).animationStartTime = startTime
      }
      const elapsed = (Date.now() - startTime) % cycleDuration
      const timeOfDayCalc = (elapsed / cycleDuration) * 24
      setTimeOfDay(timeOfDayCalc)

      // Calculate the color transition based on time of day
      // Night (0-5 and 20-24): White text
      // Day (7-17): Black text
      // Dawn (5-7) and Dusk (17-20): Smooth transition between white and black

      let headingColor, subheadingColor, headingShadow, subheadingShadow
      let primaryBtnBg, primaryBtnText, outlineBtnBorder, outlineBtnText, chevronColor

      // Night (0-5 and 20-24): White text
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
      }
      // Dawn transition (5-7): White to Black
      else if (timeOfDayCalc >= 5 && timeOfDayCalc < 7) {
        const progress = (timeOfDayCalc - 5) / 2 // 0 to 1 over 2 hours
        // Use cubic bezier easing for smoother transition
        const smoothProgress = progress * progress * (3 - 2 * progress)

        // RGB values transition from white (255,255,255) to black (0,0,0)
        const r = Math.round(255 - smoothProgress * 255)
        const g = Math.round(255 - smoothProgress * 255)
        const b = Math.round(255 - smoothProgress * 255)

        // Subheading slightly lighter/darker than heading
        const sr = Math.min(255, Math.round(r - 25 + smoothProgress * 50))
        const sg = Math.min(255, Math.round(g - 25 + smoothProgress * 50))
        const sb = Math.min(255, Math.round(b - 25 + smoothProgress * 50))

        headingColor = `rgba(${r}, ${g}, ${b}, 0.95)`
        subheadingColor = `rgba(${sr}, ${sg}, ${sb}, 0.9)`

        // Shadow transitions from dark to light
        const shadowOpacity = 0.8 - smoothProgress * 0.5
        const subShadowOpacity = 0.7 - smoothProgress * 0.4

        headingShadow = `0 2px 6px rgba(${smoothProgress > 0.5 ? 255 : 0}, ${smoothProgress > 0.5 ? 255 : 0}, ${
          smoothProgress > 0.5 ? 255 : 0
        }, ${shadowOpacity})`
        subheadingShadow = `0 1px 4px rgba(${smoothProgress > 0.5 ? 255 : 0}, ${smoothProgress > 0.5 ? 255 : 0}, ${
          smoothProgress > 0.5 ? 255 : 0
        }, ${subShadowOpacity})`

        // Button colors transition
        primaryBtnBg = `rgba(${20 + smoothProgress * 20}, ${184 - smoothProgress * 40}, ${
          166 - smoothProgress * 40
        }, 0.9)`
        primaryBtnText = "white"
        outlineBtnBorder = `rgba(${r}, ${g}, ${b}, 0.8)`
        outlineBtnText = `rgba(${r}, ${g}, ${b}, 0.95)`
        chevronColor = `rgba(${r}, ${g}, ${b}, 0.7)`
      }
      // Day (7-17): Black text
      else if (timeOfDayCalc >= 7 && timeOfDayCalc < 17) {
        headingColor = "rgba(0, 0, 0, 0.95)"
        subheadingColor = "rgba(25, 25, 25, 0.9)"
        headingShadow = "0 2px 6px rgba(255, 255, 255, 0.7), 0 0 12px rgba(255, 255, 255, 0.4)"
        subheadingShadow = "0 1px 4px rgba(255, 255, 255, 0.6), 0 0 8px rgba(255, 255, 255, 0.3)"
        primaryBtnBg = "rgba(40, 144, 126, 0.9)"
        primaryBtnText = "white"
        outlineBtnBorder = "rgba(0, 0, 0, 0.8)"
        outlineBtnText = "rgba(0, 0, 0, 0.95)"
        chevronColor = "rgba(0, 0, 0, 0.7)"
      }
      // Dusk transition (17-20): Black to White
      else if (timeOfDayCalc >= 17 && timeOfDayCalc < 20) {
        const progress = (timeOfDayCalc - 17) / 3 // 0 to 1 over 3 hours
        // Use cubic bezier easing for smoother transition
        const smoothProgress = progress * progress * (3 - 2 * progress)

        // RGB values transition from black (0,0,0) to white (255,255,255)
        const r = Math.round(smoothProgress * 255)
        const g = Math.round(smoothProgress * 255)
        const b = Math.round(smoothProgress * 255)

        // Subheading slightly lighter/darker than heading
        const sr = Math.min(255, Math.round(r + 25 - smoothProgress * 50))
        const sg = Math.min(255, Math.round(g + 25 - smoothProgress * 50))
        const sb = Math.min(255, Math.round(b + 25 - smoothProgress * 50))

        headingColor = `rgba(${r}, ${g}, ${b}, 0.95)`
        subheadingColor = `rgba(${sr}, ${sg}, ${sb}, 0.9)`

        // Shadow transitions from light to dark
        const shadowOpacity = 0.3 + smoothProgress * 0.5
        const subShadowOpacity = 0.2 + smoothProgress * 0.5

        headingShadow = `0 2px 6px rgba(${smoothProgress < 0.5 ? 255 : 0}, ${smoothProgress < 0.5 ? 255 : 0}, ${
          smoothProgress < 0.5 ? 255 : 0
        }, ${shadowOpacity})`
        subheadingShadow = `0 1px 4px rgba(${smoothProgress < 0.5 ? 255 : 0}, ${smoothProgress < 0.5 ? 255 : 0}, ${
          smoothProgress < 0.5 ? 255 : 0
        }, ${subShadowOpacity})`

        // Button colors transition
        primaryBtnBg = `rgba(${40 - smoothProgress * 20}, ${144 + smoothProgress * 40}, ${
          126 + smoothProgress * 40
        }, 0.9)`
        primaryBtnText = "white"
        outlineBtnBorder = `rgba(${r}, ${g}, ${b}, 0.8)`
        outlineBtnText = `rgba(${r}, ${g}, ${b}, 0.95)`
        chevronColor = `rgba(${r}, ${g}, ${b}, 0.7)`
      }

      setHeroTextStyle({
        color: headingColor,
        textShadow: headingShadow,
        transition: "all 0.5s ease",
      })

      setSubTextStyle({
        color: subheadingColor,
        textShadow: subheadingShadow,
        transition: "all 0.5s ease",
      })

      setButtonPrimaryStyle({
        backgroundColor: primaryBtnBg,
        color: primaryBtnText,
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
        transition: "all 0.5s ease",
      })

      setButtonOutlineStyle({
        borderColor: outlineBtnBorder,
        color: outlineBtnText,
        transition: "all 0.5s ease",
      })

      setChevronStyle({
        color: chevronColor,
        transition: "all 0.5s ease",
      })
    }

    const timeInterval = setInterval(updateTextStyles, 100) // More frequent updates for smoother transitions
    updateTextStyles() // Initial call

    return () => clearInterval(timeInterval)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hero Section with added mt-20 to lower the text */}
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center mt-20">
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
              <Button size="lg" variant="outline" asChild className="hover:opacity-90" style={buttonOutlineStyle}>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-8 w-8" style={chevronStyle} />
          </div>
        </div>

        {/* Glowing orbs for visual consistency */}
      </section>

      {/* Enhanced Services Section */}
      <section id="services" className="py-24 bg-gray-900 relative overflow-hidden">
        {/* Improved tech background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gridGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <pattern id="grid2" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="url(#gridGradient2)" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid2)" />
          </svg>
        </div>

        {/* Enhanced glowing orbs */}
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
              Comprehensive services that work together seamlessly to drive innovation and growth for your business. Our
              integrated approach ensures that each service complements and enhances the others, creating a cohesive
              strategy for your business transformation.
            </p>
          </div>

          {/* Improved services grid with enhanced cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>

          {/* Added CTA button */}
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

      {/* Enhanced About Section */}
      <section id="about" className="py-24 bg-gray-800 relative overflow-hidden">
        {/* Improved circuit board pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="circuitGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <pattern id="circuit-board2" width="200" height="200" patternUnits="userSpaceOnUse">
              <path
                d="M50,5 L50,195 M5,50 L195,50 M50,50 m3,0 a3,3 0 1,0 -6,0 a3,3 0 1,0 6,0 M100,50 m3,0 a3,3 0 1,0 -6,0 a3,3 0 1,0 6,0 M150,50 m3,0 a3,3 0 1,0 -6,0 a3,3 0 1,0 6,0 M50,100 m3,0 a3,3 0 1,0 -6,0 a3,3 0 1,0 6,0 M100,100 m3,0 a3,3 0 1,0 -6,0 a3,3 0 1,0 6,0 M150,100 m3,0 a3,3 0 1,0 -6,0 a3,3 0 1,0 6,0 M50,150 m3,0 a3,3 0 1,0 -6,0 a3,3 0 1,0 6,0 M100,150 m3,0 a3,3 0 1,0 -6,0 a3,3 0 1,0 6,0 M150,150 m3,0 a3,3 0 1,0 -6,0 a3,3 0 1,0 6,0"
                stroke="url(#circuitGradient3)"
                strokeWidth="0.5"
                fill="none"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#circuit-board2)" />
          </svg>
        </div>

        {/* Enhanced glowing elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500 rounded-full filter blur-[120px] opacity-10 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary-500 rounded-full filter blur-[120px] opacity-10 animate-pulse-slow"></div>

        <div className="container px-4 mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <div className="relative">
                {/* Enhanced glowing accents */}
                <div className="absolute -top-8 -left-8 w-32 h-32 bg-primary-500 opacity-20 rounded-full animate-pulse-slow"></div>
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-secondary-500 opacity-20 rounded-full animate-pulse-slow"></div>

                {/* Enhanced card with digital elements */}
                <div className="relative bg-gray-900/90 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-700/50 hover:border-primary-500/30 transition-all duration-500 group">
                  {/* Digital circuit pattern overlay */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden rounded-xl">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
                        </linearGradient>
                      </defs>
                      <pattern id="cardCircuit" width="200" height="200" patternUnits="userSpaceOnUse">
                        <path
                          d="M20,0 L20,200 M0,20 L200,20 M40,0 L40,200 M0,40 L200,40 M60,0 L60,200 M0,60 L200,60 M80,0 L80,200 M0,80 L200,80 M100,0 L100,200 M0,100 L200,100 M120,0 L120,200 M0,120 L200,120 M140,0 L140,200 M0,140 L200,140 M160,0 L160,200 M0,160 L200,160 M180,0 L180,200 M0,180 L200,180"
                          stroke="url(#cardGradient)"
                          strokeWidth="0.5"
                          strokeDasharray="5,5"
                          fill="none"
                        />
                      </pattern>
                      <rect width="100%" height="100%" fill="url(#cardCircuit)" />
                    </svg>
                  </div>

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

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800/90 backdrop-blur-sm p-5 rounded-lg border border-gray-700/50 hover:border-primary-500/30 transition-all duration-300 group/card hover:shadow-lg hover:shadow-primary-500/5">
                      <h4 className="font-semibold text-primary-400 mb-2 text-lg">Innovation</h4>
                      <p className="text-gray-300">Cutting-edge solutions that keep you ahead of the competition</p>
                    </div>
                    <div className="bg-gray-800/90 backdrop-blur-sm p-5 rounded-lg border border-gray-700/50 hover:border-secondary-500/30 transition-all duration-300 group/card hover:shadow-lg hover:shadow-secondary-500/5">
                      <h4 className="font-semibold text-secondary-400 mb-2 text-lg">Precision</h4>
                      <p className="text-gray-300">Meticulous attention to every detail in our implementation</p>
                    </div>
                    <div className="bg-gray-800/90 backdrop-blur-sm p-5 rounded-lg border border-gray-700/50 hover:border-accent-500/30 transition-all duration-300 group/card hover:shadow-lg hover:shadow-accent-500/5">
                      <h4 className="font-semibold text-accent-400 mb-2 text-lg">Integration</h4>
                      <p className="text-gray-300">Seamless connection between all services and systems</p>
                    </div>
                    <div className="bg-gray-800/90 backdrop-blur-sm p-5 rounded-lg border border-gray-700/50 hover:border-primary-500/30 transition-all duration-300 group/card hover:shadow-lg hover:shadow-primary-500/5">
                      <h4 className="font-semibold text-primary-400 mb-2 text-lg">Growth</h4>
                      <p className="text-gray-300">Focused on your long-term success and scalability</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2">
              <Badge className="mb-4 bg-secondary-500/20 text-secondary-300 border-secondary-500/30 px-4 py-1 text-sm">
                Our Philosophy
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Clarity in Complexity</h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                At Lumen Helix, we don't just implement technology—we architect transformation. We empower businesses by
                fusing cutting-edge AI strategy with expert project management, innovative web development, captivating
                design, and data-driven marketing strategies.
              </p>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Our approach combines strategic insight with practical implementation, ensuring that every solution we
                deliver is both innovative and effective. We believe in creating clarity from complexity, turning
                digital challenges into competitive advantages.
              </p>
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="w-10 h-10 flex items-center justify-center bg-primary-500/20 rounded-full mr-4 border border-primary-500/30 mt-1">
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Strategic Vision</h3>
                    <p className="text-gray-300">
                      We develop comprehensive roadmaps that align technology with your business objectives.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 flex items-center justify-center bg-secondary-500/20 rounded-full mr-4 border border-secondary-500/30 mt-1">
                    <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Technical Excellence</h3>
                    <p className="text-gray-300">
                      Our solutions are built with precision, scalability, and future adaptability in mind.
                    </p>
                  </div>
                </div>
              </div>
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
          </div>
        </div>
      </section>

      {/* Enhanced Project Portfolio Preview */}
      <section
        id="portfolio"
        className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden"
      >
        {/* Digital grid background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="portfolioGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <pattern id="portfolioGrid" width="50" height="50" patternUnits="userSpaceOnUse">
              <rect width="50" height="50" fill="none" stroke="url(#portfolioGradient)" strokeWidth="0.5" />
              <circle cx="25" cy="25" r="1" fill="url(#portfolioGradient)" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#portfolioGrid)" />
          </svg>
        </div>

        {/* Enhanced glowing orbs */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>

        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge className="mb-4 bg-accent-500/20 text-accent-300 border-accent-500/30 px-4 py-1 text-sm">
              Our Work
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Project Portfolio</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore our diverse range of innovative projects that showcase our expertise and creative problem-solving
            </p>
          </div>

          {/* Enhanced project grid with improved cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <ProjectPreview key={index} project={project} />
            ))}
          </div>

          {/* Enhanced CTA */}
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

      {/* Enhanced Blog Preview */}
      <section id="blog" className="py-24 bg-gray-900 relative overflow-hidden">
        {/* Digital pattern background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="blogGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <pattern id="blogPattern" width="100" height="100" patternUnits="userSpaceOnUse">
              <text x="0" y="10" className="text-xs" fill="url(#blogGradient)">
                10110101
              </text>
              <text x="0" y="20" className="text-xs" fill="url(#blogGradient)">
                01101001
              </text>
              <text x="0" y="30" className="text-xs" fill="url(#blogGradient)">
                11010110
              </text>
              <text x="0" y="40" className="text-xs" fill="url(#blogGradient)">
                00101101
              </text>
              <text x="0" y="50" className="text-xs" fill="url(#blogGradient)">
                10110010
              </text>
              <text x="0" y="60" className="text-xs" fill="url(#blogGradient)">
                01011010
              </text>
              <text x="0" y="70" className="text-xs" fill="url(#blogGradient)">
                11001010
              </text>
              <text x="0" y="80" className="text-xs" fill="url(#blogGradient)">
                01101001
              </text>
              <text x="0" y="90" className="text-xs" fill="url(#blogGradient)">
                10101100
              </text>
              <text x="0" y="100" className="text-xs" fill="url(#blogGradient)">
                01010011
              </text>
            </pattern>
            <rect width="100%" height="100%" fill="url(#blogPattern)" />
          </svg>
        </div>

        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge className="mb-4 bg-primary-500/20 text-primary-300 border-primary-500/30 px-4 py-1 text-sm">
              Knowledge Hub
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Latest Insights</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Expert articles and thought leadership from our team of specialists to keep you informed and inspired
            </p>
          </div>

          {/* Enhanced blog grid with improved cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.slice(0, 3).map((post, index) => (
              <BlogPostCard key={index} post={post} />
            ))}
          </div>

          {/* Enhanced CTA */}
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

      {/* Development Stack Section */}
      <DevelopmentStack />

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-24 bg-gray-900 relative overflow-hidden">
        {/* Improved tech grid background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="contactGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <pattern id="contactGrid" width="50" height="50" patternUnits="userSpaceOnUse">
              <rect width="50" height="50" fill="none" stroke="url(#contactGradient)" strokeWidth="0.5" />
              <circle cx="25" cy="25" r="8" fill="none" stroke="url(#contactGradient)" strokeWidth="0.5" />
              <circle cx="25" cy="25" r="16" fill="none" stroke="url(#contactGradient)" strokeWidth="0.5" />
              <line
                x1="0"
                y1="25"
                x2="50"
                y2="25"
                stroke="url(#contactGradient)"
                strokeWidth="0.5"
                strokeDasharray="5,5"
              />
              <line
                x1="25"
                y1="0"
                x2="25"
                y2="50"
                stroke="url(#contactGradient)"
                strokeWidth="0.5"
                strokeDasharray="5,5"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#contactGrid)" />
          </svg>
        </div>

        {/* Enhanced glowing accent */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>

        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-16">
              <div className="lg:w-1/2">
                <Badge className="mb-4 bg-secondary-500/20 text-secondary-300 border-secondary-500/30 px-4 py-1 text-sm">
                  Get In Touch
                </Badge>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Let's Work Together</h2>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Ready to transform your business with our integrated solutions? Connect with our team of experts
                  today.
                </p>

                <div className="space-y-8">
                  <div className="flex items-start group">
                    <div className="bg-gray-800/90 p-4 rounded-xl mr-5 border border-gray-700/50 group-hover:border-primary-500/30 transition-all duration-300 shadow-lg group-hover:shadow-primary-500/10">
                      <svg className="h-6 w-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-primary-400 transition-colors">
                        Email Us
                      </h3>
                      <p className="text-gray-300 mb-1">For general inquiries:</p>
                      <a
                        href="mailto:info@lumenhelix.com"
                        className="text-primary-400 hover:text-primary-300 transition-colors"
                      >
                        info@lumenhelix.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="bg-gray-800/90 p-4 rounded-xl mr-5 border border-gray-700/50 group-hover:border-primary-500/30 transition-all duration-300 shadow-lg group-hover:shadow-primary-500/10">
                      <svg className="h-6 w-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-primary-400 transition-colors">
                        Call Us
                      </h3>
                      <p className="text-gray-300 mb-1">Monday-Friday, 9am-5pm:</p>
                      <a href="tel:+15551234567" className="text-primary-400 hover:text-primary-300 transition-colors">
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="bg-gray-800/90 p-4 rounded-xl mr-5 border border-gray-700/50 group-hover:border-primary-500/30 transition-all duration-300 shadow-lg group-hover:shadow-primary-500/10">
                      <svg className="h-6 w-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-primary-400 transition-colors">
                        Visit Us
                      </h3>
                      <p className="text-gray-300 mb-1">Our headquarters:</p>
                      <address className="text-primary-400 not-italic">
                        123 Innovation Drive
                        <br />
                        Tech City, TC 12345
                      </address>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2">
                <div className="bg-gray-800/90 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-700/50 hover:border-primary-500/30 transition-all duration-500 relative overflow-hidden group">
                  {/* Enhanced digital circuit accent */}
                  <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
                    <svg width="100%" height="100%" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="formGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,0 L800,0 L800,600 L0,600 Z M400,50 A350,350 0 1,0 400,550 A350,350 0 1,0 400,50 Z M400,150 A250,250 0 1,1 400,450 A250,250 0 1,1 400,150 Z"
                        fill="none"
                        stroke="url(#formGradient)"
                        strokeWidth="0.5"
                      />
                      <path
                        d="M50,300 L350,300 M450,300 L750,300 M400,50 L400,250 M400,350 L400,550"
                        fill="none"
                        stroke="url(#formGradient)"
                        strokeWidth="0.5"
                        strokeDasharray="5,5"
                      />
                    </svg>
                  </div>

                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 flex items-center justify-center bg-primary-500/20 rounded-full mr-4 border border-primary-500/30">
                      <div className="w-3 h-3 bg-primary-400 rounded-full animate-pulse"></div>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Send Us a Message</h3>
                  </div>

                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white transition-all duration-300"
                          placeholder="Your name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white transition-all duration-300"
                          placeholder="Your email"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-300">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white transition-all duration-300"
                        placeholder="Subject"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white transition-all duration-300"
                        placeholder="Your message"
                      ></textarea>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white shadow-lg hover:shadow-primary-500/20 transition-all duration-300">
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
