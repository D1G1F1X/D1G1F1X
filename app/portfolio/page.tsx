import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { projects } from "@/lib/projects"
import PageHero from "@/components/page-hero"
import ProjectCard from "@/components/project-card"

export default function PortfolioPage() {
  const stageColors = {
    concept: "bg-secondary-500",
    building: "bg-primary-500",
    beta: "bg-secondary-600",
    deployed: "bg-accent-500",
  }

  const categoryColors = {
    "in-house": "bg-primary-600",
    client: "bg-accent-600",
  }

  const inHouseProjects = projects.filter((project) => project.category === "in-house")
  const clientProjects = projects.filter((project) => project.category === "client")

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <PageHero
        badge="Our Work"
        badgeVariant="accent"
        title="Our Project Portfolio"
        subtitle="Explore our diverse range of projects across various development stages"
      />

      <div className="container px-4 mx-auto py-12 relative z-10">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-primary-500/20 data-[state=active]:text-primary-400"
              >
                All Projects
              </TabsTrigger>
              <TabsTrigger
                value="in-house"
                className="data-[state=active]:bg-primary-500/20 data-[state=active]:text-primary-400"
              >
                In-House
              </TabsTrigger>
              <TabsTrigger
                value="client"
                className="data-[state=active]:bg-primary-500/20 data-[state=active]:text-primary-400"
              >
                Client
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  stageColors={stageColors}
                  categoryColors={categoryColors}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="in-house">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {inHouseProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  stageColors={stageColors}
                  categoryColors={categoryColors}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="client">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {clientProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  stageColors={stageColors}
                  categoryColors={categoryColors}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Project Stages Explained</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-gray-700/50 hover:border-secondary-500/30 transition-all duration-300 relative overflow-hidden group">
              {/* Tech corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="0" cy="0" r="32" stroke="url(#techGridGradient)" strokeWidth="1" />
                </svg>
              </div>
              <div className="flex items-center mb-4">
                <div className="w-4 h-4 rounded-full bg-secondary-500 mr-2"></div>
                <h3 className="text-lg font-semibold text-white">Concept</h3>
              </div>
              <p className="text-gray-300">
                Projects in the ideation and planning phase. These are being researched and designed but not yet in
                active development.
              </p>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-gray-700/50 hover:border-primary-500/30 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="0" cy="0" r="32" stroke="url(#techGridGradient)" strokeWidth="1" />
                </svg>
              </div>
              <div className="flex items-center mb-4">
                <div className="w-4 h-4 rounded-full bg-primary-500 mr-2"></div>
                <h3 className="text-lg font-semibold text-white">Building</h3>
              </div>
              <p className="text-gray-300">
                Projects currently in active development. The core functionality is being implemented and tested.
              </p>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-gray-700/50 hover:border-secondary-600/30 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="0" cy="0" r="32" stroke="url(#techGridGradient)" strokeWidth="1" />
                </svg>
              </div>
              <div className="flex items-center mb-4">
                <div className="w-4 h-4 rounded-full bg-secondary-600 mr-2"></div>
                <h3 className="text-lg font-semibold text-white">Beta</h3>
              </div>
              <p className="text-gray-300">
                Projects that are feature complete and undergoing user testing. These are nearly ready for full
                deployment.
              </p>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-gray-700/50 hover:border-accent-500/30 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="0" cy="0" r="32" stroke="url(#techGridGradient)" strokeWidth="1" />
                </svg>
              </div>
              <div className="flex items-center mb-4">
                <div className="w-4 h-4 rounded-full bg-accent-500 mr-2"></div>
                <h3 className="text-lg font-semibold text-white">Deployed</h3>
              </div>
              <p className="text-gray-300">
                Projects that are fully deployed and in production. These are actively maintained and may receive
                updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
