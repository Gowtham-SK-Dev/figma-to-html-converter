"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface CodePreviewProps {
  code: string
  language: string
}

export default function CodePreview({ code, language }: CodePreviewProps) {
  const preRef = useRef<HTMLPreElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    // In a real implementation, you would use a syntax highlighting library like Prism.js or highlight.js
    // For this demo, we'll just display the raw code
    // This is where you would add the syntax highlighting logic
  }, [code, language])

  const copyCode = () => {
    if (!code) return

    navigator.clipboard.writeText(code)
    toast({
      title: "Code copied to clipboard",
      description: "The code has been copied to your clipboard",
    })
  }

  return (
    <Card className="overflow-hidden">
      <div className="p-4 bg-muted/50 border-b flex justify-between items-center">
        <span className="text-sm font-medium">{language.toUpperCase()}</span>
        <Button variant="ghost" size="sm" onClick={copyCode} className="h-8 gap-1">
          <Copy className="h-4 w-4" />
          Copy
        </Button>
      </div>
      <pre ref={preRef} className="p-4 overflow-auto text-sm code-preview" style={{ maxHeight: "500px" }}>
        <code>{code}</code>
      </pre>
    </Card>
  )
}
