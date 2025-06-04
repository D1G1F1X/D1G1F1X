"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { calculateCompatibility } from "@/lib/numerology"

interface NumerologyCompatibilityProps {
  savedProfiles: any[]
}

export function NumerologyCompatibility({ savedProfiles }: NumerologyCompatibilityProps) {
  const [profile1, setProfile1] = useState("")
  const [profile2, setProfile2] = useState("")
  const [compatibility, setCompatibility] = useState<any>(null)

  const checkCompatibility = () => {
    const p1 = savedProfiles.find((p) => p.name === profile1)
    const p2 = savedProfiles.find((p) => p.name === profile2)

    if (p1 && p2) {
      // Calculate compatibility score using the function from the numerology library
      const score = calculateCompatibility(p1, p2)

      setCompatibility({
        score,
        profile1: p1,
        profile2: p2,
        details: {
          lifePathCompatibility: Math.min(9, Math.abs(9 - Math.abs(p1.lifePathNumber - p2.lifePathNumber))),
          destinyCompatibility: Math.min(9, Math.abs(9 - Math.abs(p1.destinyNumber - p2.destinyNumber))),
          personalityCompatibility: Math.min(9, Math.abs(9 - Math.abs(p1.personalityNumber - p2.personalityNumber))),
          soulUrgeCompatibility: Math.min(9, Math.abs(9 - Math.abs(p1.soulUrgeNumber - p2.soulUrgeNumber))),
        },
      })
    }
  }

  if (savedProfiles.length < 2) {
    return (
      <div className="text-center p-8">
        <h3 className="text-lg font-medium mb-2">Compatibility Checker</h3>
        <p className="text-muted-foreground">Save at least two profiles to check their numerological compatibility.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">First Person</label>
          <Select value={profile1} onValueChange={setProfile1}>
            <SelectTrigger>
              <SelectValue placeholder="Select a profile" />
            </SelectTrigger>
            <SelectContent>
              {savedProfiles.map((profile) => (
                <SelectItem key={profile.name} value={profile.name}>
                  {profile.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Second Person</label>
          <Select value={profile2} onValueChange={setProfile2}>
            <SelectTrigger>
              <SelectValue placeholder="Select a profile" />
            </SelectTrigger>
            <SelectContent>
              {savedProfiles.map((profile) => (
                <SelectItem key={profile.name} value={profile.name}>
                  {profile.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        onClick={checkCompatibility}
        className="w-full"
        disabled={!profile1 || !profile2 || profile1 === profile2}
      >
        Check Compatibility
      </Button>

      {compatibility && (
        <Card className="mt-6 border-purple-200">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
            <CardTitle className="text-center">Compatibility Score: {compatibility.score}/9</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Life Path Compatibility:</span>
                <div className="flex items-center">
                  <div className="w-32 h-2 bg-gray-200 rounded-full mr-2">
                    <div
                      className="h-full bg-purple-600 rounded-full"
                      style={{ width: `${(compatibility.details.lifePathCompatibility / 9) * 100}%` }}
                    />
                  </div>
                  <span>{compatibility.details.lifePathCompatibility}/9</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span>Destiny Compatibility:</span>
                <div className="flex items-center">
                  <div className="w-32 h-2 bg-gray-200 rounded-full mr-2">
                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{ width: `${(compatibility.details.destinyCompatibility / 9) * 100}%` }}
                    />
                  </div>
                  <span>{compatibility.details.destinyCompatibility}/9</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span>Personality Compatibility:</span>
                <div className="flex items-center">
                  <div className="w-32 h-2 bg-gray-200 rounded-full mr-2">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${(compatibility.details.personalityCompatibility / 9) * 100}%` }}
                    />
                  </div>
                  <span>{compatibility.details.personalityCompatibility}/9</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span>Soul Urge Compatibility:</span>
                <div className="flex items-center">
                  <div className="w-32 h-2 bg-gray-200 rounded-full mr-2">
                    <div
                      className="h-full bg-violet-600 rounded-full"
                      style={{ width: `${(compatibility.details.soulUrgeCompatibility / 9) * 100}%` }}
                    />
                  </div>
                  <span>{compatibility.details.soulUrgeCompatibility}/9</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-medium mb-2">Compatibility Insights</h4>
              <p className="text-sm">
                {compatibility.score >= 7
                  ? "You have excellent numerological compatibility! Your numbers complement each other well, suggesting a harmonious relationship with strong potential for growth and mutual understanding."
                  : compatibility.score >= 5
                    ? "You have good numerological compatibility. While there may be some challenges, your numbers suggest a balanced relationship with potential for meaningful connection."
                    : "Your numerological compatibility suggests some challenges. This doesn't mean a relationship won't work, but you may need to be more conscious of your differences and work to understand each other's perspectives."}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
