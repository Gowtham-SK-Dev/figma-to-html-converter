"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Clock, Eye, RefreshCw, Trash2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { deleteFromLocalStorage, getFromLocalStorage, clearLocalStorage, type HistoryItem } from "@/lib/storage"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { formatDate } from "@/lib/utils"

export default function HistoryPage() {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const items = getFromLocalStorage()
    setHistoryItems(items)
  }, [])

  const handleDelete = (id: string) => {
    deleteFromLocalStorage(id)
    setHistoryItems(historyItems.filter((item) => item.id !== id))
    toast({
      title: "Project deleted",
    })
  }

  const handleClearAll = () => {
    clearLocalStorage()
    setHistoryItems([])
    setIsDialogOpen(false)
    toast({
      title: "All projects deleted",
    })
  }

  const confirmDelete = (id: string) => {
    setSelectedItemId(id)
  }

  return (
    <div className="container py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Conversion History</h1>
            <p className="text-muted-foreground">View and manage your recent Figma to HTML conversions.</p>
          </div>

          {historyItems.length > 0 && (
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="mt-4 sm:mt-0">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear All
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear all history</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete all conversion history? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearAll}>Delete All</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>

        {historyItems.length === 0 ? (
          <div className="text-center py-12 bg-muted/20 rounded-lg">
            <h2 className="text-xl font-medium mb-2">No conversion history yet</h2>
            <p className="text-muted-foreground mb-6">Convert your first Figma design to see it here.</p>
            <Button asChild>
              <Link href="/demo">Try Demo Mode</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {historyItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="aspect-video bg-muted rounded-md mb-4 overflow-hidden">
                      <img
                        src={item.preview || "/placeholder.svg?height=200&width=300"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4" />
                      {formatDate(item.timestamp)}
                    </div>
                    {item.format && (
                      <div className="mt-1 text-sm">
                        <span className="px-2 py-1 bg-muted rounded-full text-xs">{item.format}</span>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/demo?url=${encodeURIComponent(item.figmaUrl)}`}>
                        <Eye className="mr-1 h-4 w-4" />
                        View
                      </Link>
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/demo?url=${encodeURIComponent(item.figmaUrl)}`}>
                          <RefreshCw className="mr-1 h-4 w-4" />
                          Reconvert
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete project</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this project? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(item.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
