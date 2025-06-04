"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Lock, Settings, RotateCcw } from "lucide-react"
import type { ReportSettings as ReportSettingsType } from "./numerology-report-generator"

interface ReportSettingsProps {
  settings: ReportSettingsType
  updateSettings: (settings: Partial<ReportSettingsType>) => void
  isPremium: boolean
}

export function ReportSettings({ settings, updateSettings, isPremium }: ReportSettingsProps) {
  const handleReset = () => {
    updateSettings({
      detailLevel: isPremium ? 3 : 1,
      includePersonalInsights: isPremium,
      includeFutureProjections: isPremium,
      includeCompatibilityInfo: false,
      includeCharts: true,
      theme: "classic",
      fontSize: "medium",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center">
          <Settings className="h-5 w-5 mr-2 text-gray-500" />
          Report Settings
        </h2>
        <Button variant="outline" size="sm" onClick={handleReset}>
          <RotateCcw className="h-4 w-4 mr-1" />
          Reset to Default
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Content Settings</CardTitle>
          <CardDescription>Customize what information is included in your numerology reports</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="detailLevel">Report Detail Level</Label>
              <span className="text-sm text-gray-500">
                {settings.detailLevel === 1 ? "Basic" : settings.detailLevel === 2 ? "Standard" : "Comprehensive"}
              </span>
            </div>
            <Slider
              id="detailLevel"
              min={1}
              max={isPremium ? 3 : 2}
              step={1}
              value={[settings.detailLevel]}
              onValueChange={(value) => updateSettings({ detailLevel: value[0] })}
              className="py-4"
            />
            {!isPremium && settings.detailLevel === 2 && (
              <p className="text-sm text-amber-600 dark:text-amber-400 flex items-center">
                <Lock className="h-3 w-3 mr-1" />
                Comprehensive reports are available for premium members
              </p>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="personalInsights">Personal Insights</Label>
                <p className="text-sm text-gray-500">Include personalized insights based on your number combinations</p>
              </div>
              <div className="flex items-center">
                {!isPremium && <Lock className="h-3 w-3 mr-2 text-amber-500" />}
                <Switch
                  id="personalInsights"
                  checked={settings.includePersonalInsights}
                  onCheckedChange={(checked) => updateSettings({ includePersonalInsights: checked })}
                  disabled={!isPremium}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="futureProjections">Future Projections</Label>
                <p className="text-sm text-gray-500">Include future projections and life cycle analysis</p>
              </div>
              <div className="flex items-center">
                {!isPremium && <Lock className="h-3 w-3 mr-2 text-amber-500" />}
                <Switch
                  id="futureProjections"
                  checked={settings.includeFutureProjections}
                  onCheckedChange={(checked) => updateSettings({ includeFutureProjections: checked })}
                  disabled={!isPremium}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="compatibilityInfo">Compatibility Information</Label>
                <p className="text-sm text-gray-500">Include relationship compatibility insights</p>
              </div>
              <div className="flex items-center">
                {!isPremium && <Lock className="h-3 w-3 mr-2 text-amber-500" />}
                <Switch
                  id="compatibilityInfo"
                  checked={settings.includeCompatibilityInfo}
                  onCheckedChange={(checked) => updateSettings({ includeCompatibilityInfo: checked })}
                  disabled={!isPremium}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="includeCharts">Visual Charts</Label>
                <p className="text-sm text-gray-500">Include visual charts and diagrams in reports</p>
              </div>
              <Switch
                id="includeCharts"
                checked={settings.includeCharts}
                onCheckedChange={(checked) => updateSettings({ includeCharts: checked })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Display Settings</CardTitle>
          <CardDescription>Customize the appearance of your numerology reports</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>Report Theme</Label>
            <RadioGroup
              value={settings.theme}
              onValueChange={(value) => updateSettings({ theme: value as "classic" | "modern" | "mystical" })}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="classic" id="theme-classic" />
                <Label htmlFor="theme-classic">Classic (Print-friendly)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="modern" id="theme-modern" />
                <Label htmlFor="theme-modern">Modern</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mystical" id="theme-mystical" />
                <Label htmlFor="theme-mystical">Mystical</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>Font Size</Label>
            <RadioGroup
              value={settings.fontSize}
              onValueChange={(value) => updateSettings({ fontSize: value as "small" | "medium" | "large" })}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="small" id="font-small" />
                <Label htmlFor="font-small" className="text-sm">
                  Small
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="font-medium" />
                <Label htmlFor="font-medium">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="large" id="font-large" />
                <Label htmlFor="font-large" className="text-lg">
                  Large
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
