"use client"

import { Button } from "@/components/ui/button"
import { Download, Copy, FileCode } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { downloadBlob } from "@/lib/utils"

interface ExportOptionsProps {
  html: string
  css: string
  onDownloadZip: () => void
}

export default function ExportOptions({ html, css, onDownloadZip }: ExportOptionsProps) {
  const { toast } = useToast()

  const copyHtml = () => {
    navigator.clipboard.writeText(html)
    toast({
      title: "HTML copied to clipboard",
    })
  }

  const copyCss = () => {
    navigator.clipboard.writeText(css)
    toast({
      title: "CSS copied to clipboard",
    })
  }

  const downloadHtml = () => {
    const blob = new Blob([html], { type: "text/html" })
    downloadBlob(blob, "index.html")
    toast({
      title: "HTML file downloaded",
    })
  }

  const downloadCss = () => {
    const blob = new Blob([css], { type: "text/css" })
    downloadBlob(blob, "styles.css")
    toast({
      title: "CSS file downloaded",
    })
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={copyHtml} className="flex items-center gap-1">
        <Copy className="h-4 w-4" />
        <span className="hidden sm:inline">Copy</span> HTML
      </Button>

      <Button variant="outline" onClick={copyCss} className="flex items-center gap-1">
        <Copy className="h-4 w-4" />
        <span className="hidden sm:inline">Copy</span> CSS
      </Button>

      <Button variant="outline" onClick={downloadHtml} className="flex items-center gap-1">
        <FileCode className="h-4 w-4" />
        <span className="hidden sm:inline">Download</span> HTML
      </Button>

      <Button variant="outline" onClick={downloadCss} className="flex items-center gap-1">
        <FileCode className="h-4 w-4" />
        <span className="hidden sm:inline">Download</span> CSS
      </Button>

      <Button onClick={onDownloadZip} className="flex items-center gap-1">
        <Download className="h-4 w-4" />
        Download ZIP
      </Button>
    </div>
  )
}
