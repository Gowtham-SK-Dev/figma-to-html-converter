export interface HistoryItem {
  id: string
  figmaUrl: string
  timestamp: string
  preview: string
  name: string
  format?: string
  lastAccessed?: string
}

const STORAGE_KEY = "figma-to-html-history"

export function saveToLocalStorage(item: HistoryItem): void {
  if (typeof window === "undefined") return

  const existingItems = getFromLocalStorage()

  // Update the item if it already exists (based on figmaUrl)
  const existingItemIndex = existingItems.findIndex((i) => i.figmaUrl === item.figmaUrl)

  if (existingItemIndex !== -1) {
    // Update the existing item
    existingItems[existingItemIndex] = {
      ...existingItems[existingItemIndex],
      ...item,
      lastAccessed: new Date().toISOString(),
    }
  } else {
    // Add the new item
    existingItems.unshift({
      ...item,
      lastAccessed: new Date().toISOString(),
    })
  }

  // Keep only the last 10 items
  const newItems = existingItems.slice(0, 10)

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems))
}

export function getFromLocalStorage(): HistoryItem[] {
  if (typeof window === "undefined") return []

  const items = localStorage.getItem(STORAGE_KEY)

  if (!items) return []

  try {
    return JSON.parse(items)
  } catch (error) {
    console.error("Error parsing history items from localStorage", error)
    return []
  }
}

export function deleteFromLocalStorage(id: string): void {
  if (typeof window === "undefined") return

  const existingItems = getFromLocalStorage()
  const newItems = existingItems.filter((item) => item.id !== id)

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems))
}

export function clearLocalStorage(): void {
  if (typeof window === "undefined") return

  localStorage.removeItem(STORAGE_KEY)
}

export function updateLocalStorageItem(id: string, updates: Partial<HistoryItem>): void {
  if (typeof window === "undefined") return

  const existingItems = getFromLocalStorage()
  const itemIndex = existingItems.findIndex((item) => item.id === id)

  if (itemIndex !== -1) {
    existingItems[itemIndex] = {
      ...existingItems[itemIndex],
      ...updates,
      lastAccessed: new Date().toISOString(),
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingItems))
  }
}
