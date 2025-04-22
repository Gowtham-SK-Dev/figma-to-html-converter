"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

interface ConversionSettingsProps {
  exportFormat: string
  setExportFormat: (format: string) => void
  optimizeAssets: boolean
  setOptimizeAssets: (optimize: boolean) => void
  responsiveBreakpoints: number[]
  setResponsiveBreakpoints: (breakpoints: number[]) => void
}

export default function ConversionSettings({
  exportFormat,
  setExportFormat,
  optimizeAssets,
  setOptimizeAssets,
  responsiveBreakpoints,
  setResponsiveBreakpoints,
}: ConversionSettingsProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="flex w-full justify-between p-0 h-auto">
          <span className="font-medium">Advanced Settings</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "transform rotate-180" : ""}`} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="export-format">Export Format</Label>
          <Select value={exportFormat} onValueChange={setExportFormat}>
            <SelectTrigger id="export-format">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="html-tailwind">HTML + Tailwind CSS</SelectItem>
              <SelectItem value="react-tailwind">React JSX + Tailwind CSS</SelectItem>
              <SelectItem value="html-css">HTML + Plain CSS</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="optimize-assets" className="cursor-pointer">
            Optimize Assets
          </Label>
          <Switch id="optimize-assets" checked={optimizeAssets} onCheckedChange={setOptimizeAssets} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Responsive Breakpoints</Label>
            <span className="text-sm text-muted-foreground">{responsiveBreakpoints.join(", ")}px</span>
          </div>
          <Slider
            defaultValue={[640, 768, 1024, 1280]}
            min={320}
            max={1920}
            step={1}
            value={responsiveBreakpoints}
            onValueChange={setResponsiveBreakpoints}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
