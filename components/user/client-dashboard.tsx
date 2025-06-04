"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getUserReadings } from "@/lib/services/reading-service"
import { getUserCardCollections } from "@/lib/services/card-collection-service"
import { getUserProfile } from "@/lib/services/user-service"
import { Loader2 } from "lucide-react"

export default function ClientDashboard() {
  const { user, isLoading: authLoading } = useAuth()
  const [profile, setProfile] = useState<any>(null)
  const [readings, setReadings] = useState<any[]>([])
  const [collections, setCollections] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function loadUserData() {
      if (!user) {
        return
      }

      setIsLoading(true)
      try {
        const [profileData, userReadings, userCollections] = await Promise.all([
          getUserProfile(user.id),
          getUserReadings(user.id),
          getUserCardCollections(user.id),
        ])

        setProfile(profileData)
        setReadings(userReadings)
        setCollections(userCollections)
      } catch (error) {
        console.error("Error loading user data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (!authLoading) {
      if (user) {
        loadUserData()
      } else {
        // Redirect to login if not authenticated
        router.push("/login")
      }
    }
  }, [user, authLoading, router])

  // Handle loading state
  if (authLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading your dashboard...</span>
      </div>
    )
  }

  // Ensure user is authenticated
  if (!user) {
    return null // Router will redirect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome, {profile?.full_name || user.email}</h1>
        <p className="text-gray-500">Manage your readings and collections</p>
      </div>

      <Tabs defaultValue="readings">
        <TabsList className="mb-8">
          <TabsTrigger value="readings">My Readings</TabsTrigger>
          <TabsTrigger value="collections">Card Collections</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="readings">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-primary-50 border-dashed border-primary-200 cursor-pointer hover:border-primary transition-colors">
              <CardContent className="flex flex-col items-center justify-center h-60">
                <div className="text-primary text-4xl mb-4">+</div>
                <Button variant="outline" onClick={() => router.push("/tools/card-simulator")}>
                  New Reading
                </Button>
              </CardContent>
            </Card>

            {readings.length > 0 ? (
              readings.map((reading) => (
                <Card key={reading.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{reading.title}</CardTitle>
                    <CardDescription className="truncate">{reading.question}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3 text-gray-500">{new Date(reading.created_at).toLocaleDateString()}</p>
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm" onClick={() => router.push(`/user/readings/${reading.id}`)}>
                        View
                      </Button>
                      {reading.is_public ? (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Public</span>
                      ) : (
                        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">Private</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center p-6 bg-gray-50 rounded-lg">
                <p className="text-gray-500">You haven't saved any readings yet.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="collections">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-primary-50 border-dashed border-primary-200 cursor-pointer hover:border-primary transition-colors">
              <CardContent className="flex flex-col items-center justify-center h-60">
                <div className="text-primary text-4xl mb-4">+</div>
                <Button variant="outline" onClick={() => router.push("/user/collections/new")}>
                  New Collection
                </Button>
              </CardContent>
            </Card>

            {collections.length > 0 ? (
              collections.map((collection) => (
                <Card key={collection.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{collection.name}</CardTitle>
                    <CardDescription className="truncate">{collection.description || "No description"}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3 text-gray-500">
                      {collection.cards.length} cards • Created {new Date(collection.created_at).toLocaleDateString()}
                    </p>
                    <div className="flex justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/user/collections/${collection.id}`)}
                      >
                        View
                      </Button>
                      {collection.is_public ? (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Public</span>
                      ) : (
                        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">Private</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center p-6 bg-gray-50 rounded-lg">
                <p className="text-gray-500">You haven't created any collections yet.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="profile">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Personal Details</h3>
                    <div className="grid grid-cols-1 gap-4 mt-3 md:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Name</p>
                        <p>{profile?.full_name || "Not provided"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p>{profile?.email || user.email}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Username</p>
                        <p>{profile?.username || "Not set"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Birth Date</p>
                        <p>
                          {profile?.birth_date ? new Date(profile.birth_date).toLocaleDateString() : "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button onClick={() => router.push("/user/profile/edit")}>Edit Profile</Button>
                    <Button variant="outline" onClick={() => router.push("/user/preferences")}>
                      Preferences
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
