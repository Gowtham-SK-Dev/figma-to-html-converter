"use client"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Asset {
  name: string
  type: string
  size: string
  url: string
}

interface AssetGridProps {
  assets: Asset[]
  onDownload?: (asset: Asset) => void
}

export default function AssetGrid({ assets, onDownload }: AssetGridProps) {
  if (assets.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No assets found</p>
      </div>
    )
  }

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = "/placeholder.svg"
    event.currentTarget.alt = "Placeholder image"
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {assets.map((asset, index) => (
        <div key={index} className="border rounded-lg p-2 group relative">
          <div className="aspect-square bg-muted rounded-md mb-2 overflow-hidden">
            <img
              src={asset.url || "/placeholder.svg"}
              alt={asset.name}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          </div>
          <p className="text-sm font-medium truncate" title={asset.name}>{asset.name}</p>
          <p className="text-xs text-muted-foreground">{asset.size}</p>

          {onDownload && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="outline" size="sm" onClick={() => onDownload(asset)}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
