"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CacheService } from "@/lib/services/cache-service"
import { useToast } from "@/components/ui/use-toast"

interface UserPreferences {
  theme: "light" | "dark" | "system"
  soundEnabled: boolean
  animationsEnabled: boolean
  cardDisplayStyle: "standard" | "detailed" | "minimal"
  readingLanguageStyle: "mystical" | "straightforward" | "detailed"
}

const defaultPreferences: UserPreferences = {
  theme: "system",
  soundEnabled: true,
  animationsEnabled: true,
  cardDisplayStyle: "standard",
  readingLanguageStyle: "mystical",
}

export function UserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences)
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Get user ID from cookie or generate a temporary one
    const storedUserId = document.cookie
      .split("; ")
      .find((row) => row.startsWith("userId="))
      ?.split("=")[1]

    const currentUserId = storedUserId || `temp_${Math.random().toString(36).substring(2, 9)}`
    setUserId(currentUserId)

    // If no stored user ID, set a cookie
    if (!storedUserId) {
      document.cookie = `userId=${currentUserId}; path=/; max-age=${60 * 60 * 24 * 365}`
    }

    // Load preferences
    async function loadPreferences() {
      try {
        const userPrefs = await CacheService.getUserPreferences(currentUserId)
        if (userPrefs) {
          setPreferences(userPrefs)
        }
      } catch (error) {
        console.error("Error loading preferences:", error)
      } finally {
        setLoading(false)
      }
    }

    loadPreferences()
  }, [])

  // Save preferences when they change
  useEffect(() => {
    if (!loading && userId) {
      CacheService.cacheUserPreferences(userId, preferences).catch((error) =>
        console.error("Error saving preferences:", error),
      )
    }
  }, [preferences, loading, userId])

  const handleSave = async () => {
    if (userId) {
      try {
        await CacheService.cacheUserPreferences(userId, preferences)
        toast({
          title: "Preferences saved",
          description: "Your preferences have been saved successfully.",
          variant: "default",
        })
      } catch (error) {
        console.error("Error saving preferences:", error)
        toast({
          title: "Error saving preferences",
          description: "There was an error saving your preferences.",
          variant: "destructive",
        })
      }
    }
  }

  if (loading) {
    return <div>Loading preferences...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Preferences</CardTitle>
        <CardDescription>Customize your Numoracle experience</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="theme">Theme</Label>
          <Select
            value={preferences.theme}
            onValueChange={(value) => setPreferences({ ...preferences, theme: value as "light" | "dark" | "system" })}
          >
            <SelectTrigger id="theme">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="sound">Sound Effects</Label>
          <Switch
            id="sound"
            checked={preferences.soundEnabled}
            onCheckedChange={(checked) => setPreferences({ ...preferences, soundEnabled: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="animations">Animations</Label>
          <Switch
            id="animations"
            checked={preferences.animationsEnabled}
            onCheckedChange={(checked) => setPreferences({ ...preferences, animationsEnabled: checked })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cardStyle">Card Display Style</Label>
          <Select
            value={preferences.cardDisplayStyle}
            onValueChange={(value) =>
              setPreferences({ ...preferences, cardDisplayStyle: value as "standard" | "detailed" | "minimal" })
            }
          >
            <SelectTrigger id="cardStyle">
              <SelectValue placeholder="Select card style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="detailed">Detailed</SelectItem>
              <SelectItem value="minimal">Minimal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="readingStyle">Reading Language Style</Label>
          <Select
            value={preferences.readingLanguageStyle}
            onValueChange={(value) =>
              setPreferences({
                ...preferences,
                readingLanguageStyle: value as "mystical" | "straightforward" | "detailed",
              })
            }
          >
            <SelectTrigger id="readingStyle">
              <SelectValue placeholder="Select reading style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mystical">Mystical</SelectItem>
              <SelectItem value="straightforward">Straightforward</SelectItem>
              <SelectItem value="detailed">Detailed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave}>Save Preferences</Button>
      </CardFooter>
    </Card>
  )
}
