"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { ArrowRight, Copy, Download, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { fetchFigmaFile, generateCodeFromFigmaNodes } from "@/lib/figma-api"
import CodePreview from "@/components/code-preview"
import { saveToLocalStorage } from "@/lib/storage"
import { isValidFigmaUrl } from "@/lib/utils"

export default function AdvancedPage() {
  const [figmaUrl, setFigmaUrl] = useState("")
  const [figmaToken, setFigmaToken] = useState("")
  const [exportFormat, setExportFormat] = useState("html-tailwind")
  const [isLoading, setIsLoading] = useState(false)
  const [generatedCode, setGeneratedCode] = useState<ConversionResult | null>(null)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!figmaUrl || !figmaToken) {
      toast({
        title: "Please enter both Figma URL and Access Token",
        variant: "destructive",
      })
      return
    }

    if (!isValidFigmaUrl(figmaUrl)) {
      toast({
        title: "Invalid Figma URL",
        description: "Please enter a valid Figma URL (e.g., https://www.figma.com/file/...)",
        variant: "destructive",
      })
      return
    }

    if (figmaToken.length < 10) {
      toast({
        title: "Invalid Access Token",
        description: "Please enter a valid Figma access token",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const fileId = figmaUrl.split("/").pop() || "unknown"
      const figmaData = await fetchFigmaFile(fileId, figmaToken)
      const nodes = figmaData.document.children || []
      const result = await generateCodeFromFigmaNodes(nodes, exportFormat)

      setGeneratedCode(result)

      saveToLocalStorage({
        id: Date.now().toString(),
        figmaUrl,
        timestamp: new Date().toISOString(),
        preview: figmaData.thumbnailUrl || "/placeholder.svg",
        name: `Advanced Project - ${fileId}`,
      })

      toast({
        title: "Conversion complete",
        description: "Your Figma design has been converted to code",
      })
    } catch (error) {
      console.error("Error converting Figma design:", error)
      toast({
        title: "Error converting Figma design",
        description: "Please check your Figma URL and access token",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyCode = () => {
    if (!generatedCode) return

    navigator.clipboard.writeText(generatedCode.html)
    toast({
      title: "Code copied to clipboard",
    })
  }

  const downloadZip = () => {
    toast({
      title: "Download started",
      description: "Your code and assets are being prepared for download",
    })
    // In a real implementation, this would generate and download a ZIP file
  }

  return (
    <div className="container py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold mb-6">Advanced Mode</h1>
        <p className="text-muted-foreground mb-8">
          Use your Figma Access Token to convert designs with more control and options.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mb-10">
          <div className="space-y-2">
            <Label htmlFor="figma-token">Figma Access Token</Label>
            <Input
              id="figma-token"
              type="password"
              placeholder="Your Figma personal access token"
              value={figmaToken}
              onChange={(e) => setFigmaToken(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              You can generate a personal access token in your Figma account settings.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="figma-url">Figma File URL</Label>
            <Input
              id="figma-url"
              placeholder="https://www.figma.com/file/..."
              value={figmaUrl}
              onChange={(e) => setFigmaUrl(e.target.value)}
            />
          </div>

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

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Converting...
              </>
            ) : (
              <>
                Convert Design
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </motion.div>

      {generatedCode && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <h2 className="text-2xl font-bold">Generated Code</h2>
            <div className="flex gap-2">
              <Button variant="outline" onClick={copyCode}>
                <Copy className="mr-2 h-4 w-4" />
                Copy Code
              </Button>
              <Button onClick={downloadZip}>
                <Download className="mr-2 h-4 w-4" />
                Download ZIP
              </Button>
            </div>
          </div>

          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
              <TabsTrigger value="assets">Assets</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="p-4 border rounded-lg bg-white dark:bg-gray-900">
              <div className="preview-container" dangerouslySetInnerHTML={{ __html: generatedCode.html }} />
            </TabsContent>
            <TabsContent value="code">
              <CodePreview code={generatedCode.html} language="html" />
            </TabsContent>
            <TabsContent value="assets" className="p-4 border rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {generatedCode.assets.map((asset, index) => (
                  <div key={index} className="border rounded-lg p-2">
                    <div className="aspect-square bg-muted rounded-md mb-2 overflow-hidden">
                      <img
                        src={asset.url || "/placeholder.svg"}
                        alt={asset.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm font-medium truncate">{asset.name}</p>
                    <p className="text-xs text-muted-foreground">{asset.size}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      )}
    </div>
  )
}
