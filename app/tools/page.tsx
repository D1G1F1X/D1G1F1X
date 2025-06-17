import { CardFooter } from "@/components/ui/card"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Calculator, Dice6, GraduationCap, BookOpen } from "lucide-react"

export default function ToolsPage() {
  const tools = [
    {
      title: "NUMO Card Dealer",
      description: "Draw oracle cards and receive detailed interpretations based on ancient Celtic wisdom",
      icon: <Sparkles className="h-8 w-8" />,
      href: "/tools/card-simulator",
      featured: true,
    },
    {
      title: "Numerology Calculator",
      description: "Calculate your life path number and discover your numerological insights",
      icon: <Calculator className="h-8 w-8" />,
      href: "/tools/numerology-calculator",
      featured: false,
    },
    {
      title: "Elemental Dice",
      description: "Roll the elemental dice for quick guidance and elemental insights",
      icon: <Dice6 className="h-8 w-8" />,
      href: "/tools/elemental-dice",
      featured: false,
    },
  ]

  const resourceTools = [
    {
      title: "NUMO Oracle Tutorial",
      description: "New to NUMO? Learn how to use the oracle system with our step-by-step guided tutorial.",
      icon: <GraduationCap className="h-8 w-8" />,
      href: "/tutorial",
      actionText: "Start Learning",
      buttonClass: "bg-yellow-500 hover:bg-yellow-600 text-black",
    },
    {
      title: "NUMO Guidebook",
      description:
        "Comprehensive guide to understanding the NUMO Oracle system, card meanings, and reading techniques.",
      icon: <BookOpen className="h-8 w-8" />,
      href: "/guidebook",
      actionText: "Read Guidebook",
      buttonClass: "bg-blue-500 hover:bg-blue-600 text-white",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-slate-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">NUMO Oracle Tools & Resources</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our collection of interactive tools and learning resources designed to help you connect with the
            wisdom of the NUMO Oracle system and discover insights for your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Featured Tool */}
          {tools
            .filter((tool) => tool.featured)
            .map((tool, index) => (
              <Card
                key={`featured-${index}`}
                className="md:col-span-2 lg:col-span-3 flex flex-col sm:flex-row items-center p-6 bg-slate-800/70 border-slate-700 backdrop-blur-sm hover:border-purple-500/70 transition-all duration-300 rounded-xl shadow-lg hover:shadow-purple-500/20"
              >
                <div className="text-purple-400 mb-4 sm:mb-0 sm:mr-6 shrink-0">
                  {typeof tool.icon === "function" ? <tool.icon className="h-16 w-16" /> : tool.icon}
                </div>
                <div className="flex-grow text-center sm:text-left">
                  <CardHeader className="p-0 mb-2">
                    <CardTitle className="text-2xl font-semibold text-white">{tool.title}</CardTitle>
                  </CardHeader>
                  <CardDescription className="text-slate-300 mb-4 text-base">{tool.description}</CardDescription>
                  <Link href={tool.href}>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      Try Free Demo
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}

          {/* Learning Resources */}
          {resourceTools.map((tool, index) => (
            <Card
              key={`resource-${index}`}
              className={`${
                tool.href === "/tutorial"
                  ? "bg-purple-900/50 border-purple-700 hover:border-purple-500/90 hover:shadow-purple-600/30"
                  : "bg-blue-900/50 border-blue-700 hover:border-blue-500/90 hover:shadow-blue-600/30"
              } backdrop-blur-sm transition-all duration-300 rounded-xl shadow-lg flex flex-col`}
            >
              <CardHeader className="items-center text-center">
                <div className={`${tool.href === "/tutorial" ? "text-yellow-300" : "text-blue-300"} mb-3`}>
                  {tool.icon}
                </div>
                <CardTitle className="text-xl text-white">{tool.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow text-center">
                <CardDescription className="text-slate-200">{tool.description}</CardDescription>
              </CardContent>
              <CardFooter className="mt-auto justify-center p-4">
                <Link href={tool.href} className="w-full max-w-xs">
                  <Button className={`w-full ${tool.buttonClass} font-semibold`}>{tool.actionText}</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}

          {/* Other Tools */}
          {tools
            .filter((tool) => !tool.featured)
            .map((tool, index) => (
              <Card
                key={index}
                className="bg-slate-800/70 border-slate-700 backdrop-blur-sm hover:border-purple-500/70 transition-all duration-300 rounded-xl shadow-lg hover:shadow-purple-500/20 flex flex-col"
              >
                <CardHeader className="items-center text-center">
                  <div className="text-purple-400 mb-3">
                    {typeof tool.icon === "function" ? <tool.icon /> : tool.icon}
                  </div>
                  <CardTitle className="text-xl text-white">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow text-center">
                  <CardDescription className="text-slate-300">{tool.description}</CardDescription>
                </CardContent>
                <CardFooter className="mt-auto justify-center p-4">
                  <Link href={tool.href} className="w-full max-w-xs">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Open Tool</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="bg-slate-800/70 border-slate-700 backdrop-blur-sm max-w-2xl mx-auto p-6 rounded-xl shadow-lg">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-2xl font-semibold text-white">More NUMO Resources</CardTitle>
              <CardDescription className="text-slate-300 mt-1">
                Deepen your understanding of the NUMO Oracle system.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/about" className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full border-purple-500 text-purple-300 hover:bg-purple-500/10 hover:text-purple-200 transition-colors"
                  >
                    About NUMO
                  </Button>
                </Link>
                <Link href="/library" className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full border-purple-500 text-purple-300 hover:bg-purple-500/10 hover:text-purple-200 transition-colors"
                  >
                    Library & Resources
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tools Page */}
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Tools</h1>
          <p className="text-center">Tools page</p>
        </div>
      </div>
    </div>
  )
}
