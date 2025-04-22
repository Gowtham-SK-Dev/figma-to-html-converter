"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import Prism from "prismjs" // Import Prism.js
import "prismjs/themes/prism-tomorrow.css" // Import a Prism.js theme
import "prismjs/components/prism-javascript" // Add language support (e.g., JavaScript)
import 'prismjs/components/prism-markup'; // Add language support (e.g., HTML)
import "prismjs/components/prism-css" // Add language support (e.g., CSS)

interface CodePreviewProps {
  code: string
  language: string
}

export default function CodePreview({ code, language }: CodePreviewProps) {
  const preRef = useRef<HTMLPreElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (preRef.current) {
      Prism.highlightElement(preRef.current) // Apply syntax highlighting
    }
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
      <pre
        ref={preRef}
        className={`p-4 overflow-auto text-sm code-preview language-${language}`}
        style={{ maxHeight: "500px" }}
      >
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </Card>
  )
}
