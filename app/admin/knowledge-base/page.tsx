import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Database, FileText, Search, Brain, FileCode, AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
  title: "NUMO ORACLE | Knowledge Base",
  description: "Internal knowledge base for AI reading features and content development",
}

export default function KnowledgeBasePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Knowledge Base</h1>
          <p className="text-gray-400">Internal repository for AI reading features and content development</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-amber-900/30 border border-amber-700/50 text-amber-400 px-3 py-1 rounded-full flex items-center">
            <AlertTriangle className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">Internal Use Only</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-lg mb-8">
        <div className="flex items-center gap-4">
          <Search className="h-5 w-5 text-gray-400" />
          <Input placeholder="Search knowledge base..." className="flex-1 bg-gray-900 border-gray-700" />
          <Button variant="secondary">Search</Button>
        </div>
      </div>

      <Tabs defaultValue="ai-data" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="ai-data" className="data-[state=active]:bg-purple-600">
            <Brain className="mr-2 h-4 w-4" /> AI Training Data
          </TabsTrigger>
          <TabsTrigger value="content" className="data-[state=active]:bg-purple-600">
            <FileText className="mr-2 h-4 w-4" /> Content Development
          </TabsTrigger>
          <TabsTrigger value="system" className="data-[state=active]:bg-purple-600">
            <FileCode className="mr-2 h-4 w-4" /> System Documentation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai-data" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-purple-400">Card Meanings Database</CardTitle>
                <CardDescription>Complete database of all card meanings and interpretations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Comprehensive database of all NUMO ORACLE cards with detailed meanings, interpretations, and
                  relationships between cards. Used for AI reading generation.
                </p>
                <div className="flex items-center text-sm text-gray-400">
                  <Database className="h-4 w-4 mr-1" />
                  <span>1,250 entries</span>
                  <span className="mx-2">•</span>
                  <span>Last updated: 2 days ago</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Access Database
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-purple-400">Reading Patterns</CardTitle>
                <CardDescription>Analysis of reading patterns and interpretations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Collection of common reading patterns, card combinations, and interpretation frameworks used to train
                  the AI reading system.
                </p>
                <div className="flex items-center text-sm text-gray-400">
                  <Database className="h-4 w-4 mr-1" />
                  <span>450 patterns</span>
                  <span className="mx-2">•</span>
                  <span>Last updated: 1 week ago</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Patterns
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-purple-400">Numerology Data</CardTitle>
                <CardDescription>Numerological correspondences and interpretations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Comprehensive database of numerological meanings, life path calculations, and relationships between
                  numbers and oracle cards.
                </p>
                <div className="flex items-center text-sm text-gray-400">
                  <Database className="h-4 w-4 mr-1" />
                  <span>780 entries</span>
                  <span className="mx-2">•</span>
                  <span>Last updated: 3 days ago</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Access Database
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card className="bg-gray-800 border-gray-700 mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-purple-400">AI Training Progress</CardTitle>
              <CardDescription>Current status of AI reading feature development</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-300">Card Recognition</span>
                    <span className="text-sm text-gray-300">95%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "95%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-300">Basic Interpretations</span>
                    <span className="text-sm text-gray-300">88%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "88%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-300">Complex Readings</span>
                    <span className="text-sm text-gray-300">72%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "72%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-300">Numerology Integration</span>
                    <span className="text-sm text-gray-300">65%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-300">Personalization</span>
                    <span className="text-sm text-gray-300">45%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Detailed Report
              </Button>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-purple-400">Recent Uploads</CardTitle>
                <CardDescription>Recently added knowledge base entries</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-purple-400 mr-2" />
                      <span className="text-gray-300">Advanced Card Combinations</span>
                    </div>
                    <span className="text-sm text-gray-400">2 hours ago</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-purple-400 mr-2" />
                      <span className="text-gray-300">Elemental Correspondences Update</span>
                    </div>
                    <span className="text-sm text-gray-400">Yesterday</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-purple-400 mr-2" />
                      <span className="text-gray-300">Numerology Algorithm v2.1</span>
                    </div>
                    <span className="text-sm text-gray-400">3 days ago</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-purple-400 mr-2" />
                      <span className="text-gray-300">Reading Response Templates</span>
                    </div>
                    <span className="text-sm text-gray-400">5 days ago</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Uploads
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-purple-400">AI Model Versions</CardTitle>
                <CardDescription>Current and previous AI model versions</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Brain className="h-4 w-4 text-green-400 mr-2" />
                      <span className="text-gray-300">NUMO-AI v1.3.2 (Current)</span>
                    </div>
                    <span className="text-sm text-green-400">Active</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Brain className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-300">NUMO-AI v1.3.1</span>
                    </div>
                    <span className="text-sm text-gray-400">Archived</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Brain className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-300">NUMO-AI v1.2.5</span>
                    </div>
                    <span className="text-sm text-gray-400">Archived</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Brain className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-300">NUMO-AI v1.0.0</span>
                    </div>
                    <span className="text-sm text-gray-400">Archived</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Model Details
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-purple-400">Content Calendar</CardTitle>
                <CardDescription>Upcoming content publication schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Editorial calendar for upcoming articles, guides, and resources to be published in the Library.
                </p>
                <div className="flex items-center text-sm text-gray-400">
                  <FileText className="h-4 w-4 mr-1" />
                  <span>12 upcoming items</span>
                  <span className="mx-2">•</span>
                  <span>Next: 3 days</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Calendar
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-purple-400">Content Templates</CardTitle>
                <CardDescription>Standardized templates for content creation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Collection of templates for articles, guides, and other content types to maintain consistent
                  formatting and style.
                </p>
                <div className="flex items-center text-sm text-gray-400">
                  <FileText className="h-4 w-4 mr-1" />
                  <span>8 templates</span>
                  <span className="mx-2">•</span>
                  <span>Last updated: 2 weeks ago</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Access Templates
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-purple-400">Image Assets</CardTitle>
                <CardDescription>Card images and visual resources</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Repository of high-resolution card images, illustrations, and other visual assets for content
                  creation.
                </p>
                <div className="flex items-center text-sm text-gray-400">
                  <Database className="h-4 w-4 mr-1" />
                  <span>350+ images</span>
                  <span className="mx-2">•</span>
                  <span>Last updated: 5 days ago</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Browse Assets
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card className="bg-gray-800 border-gray-700 mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-purple-400">Content Performance</CardTitle>
              <CardDescription>Analytics for published content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-300">Understanding the Five Elements</span>
                    <span className="text-sm text-gray-300">2,450 views</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-300">Numerology & Oracle Integration</span>
                    <span className="text-sm text-gray-300">1,820 views</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-300">Basic Card Spreads</span>
                    <span className="text-sm text-gray-300">1,340 views</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-300">Getting Started with NUMO ORACLE</span>
                    <span className="text-sm text-gray-300">980 views</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "55%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Full Analytics
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-purple-400">API Documentation</CardTitle>
                <CardDescription>Technical documentation for the NUMO ORACLE API</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Complete documentation for the NUMO ORACLE API, including endpoints, parameters, and example requests.
                </p>
                <div className="flex items-center text-sm text-gray-400">
                  <FileCode className="h-4 w-4 mr-1" />
                  <span>v2.3.1</span>
                  <span className="mx-2">•</span>
                  <span>Last updated: 1 week ago</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Documentation
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-purple-400">System Architecture</CardTitle>
                <CardDescription>Technical architecture documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Detailed documentation of the NUMO ORACLE system architecture, including databases, services, and
                  integrations.
                </p>
                <div className="flex items-center text-sm text-gray-400">
                  <FileCode className="h-4 w-4 mr-1" />
                  <span>15 documents</span>
                  <span className="mx-2">•</span>
                  <span>Last updated: 3 days ago</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Architecture
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-purple-400">Development Roadmap</CardTitle>
                <CardDescription>Upcoming features and development plans</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Roadmap for upcoming features, improvements, and development milestones for the NUMO ORACLE platform.
                </p>
                <div className="flex items-center text-sm text-gray-400">
                  <FileCode className="h-4 w-4 mr-1" />
                  <span>Q2 2023 - Q1 2024</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Roadmap
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-purple-400">System Status</CardTitle>
                <CardDescription>Current status of system components</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-gray-300">Website Frontend</span>
                    </div>
                    <span className="text-sm text-green-400">Operational</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-gray-300">API Services</span>
                    </div>
                    <span className="text-sm text-green-400">Operational</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-gray-300">Database</span>
                    </div>
                    <span className="text-sm text-green-400">Operational</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                      <span className="text-gray-300">AI Reading Service</span>
                    </div>
                    <span className="text-sm text-yellow-400">Partial Outage</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View System Status
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-purple-400">Recent Changes</CardTitle>
                <CardDescription>Recent system updates and changes</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileCode className="h-4 w-4 text-purple-400 mr-2" />
                      <span className="text-gray-300">API v2.3.1 Release</span>
                    </div>
                    <span className="text-sm text-gray-400">2 days ago</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileCode className="h-4 w-4 text-purple-400 mr-2" />
                      <span className="text-gray-300">Database Schema Update</span>
                    </div>
                    <span className="text-sm text-gray-400">5 days ago</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileCode className="h-4 w-4 text-purple-400 mr-2" />
                      <span className="text-gray-300">AI Model v1.3.2 Deployment</span>
                    </div>
                    <span className="text-sm text-gray-400">1 week ago</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileCode className="h-4 w-4 text-purple-400 mr-2" />
                      <span className="text-gray-300">Security Patch</span>
                    </div>
                    <span className="text-sm text-gray-400">2 weeks ago</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Change Log
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
