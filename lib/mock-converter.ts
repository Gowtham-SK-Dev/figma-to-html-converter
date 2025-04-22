// Enhance the mock converter to provide more realistic output and prepare for real API integration

export interface ConversionResult {
  html: string
  css: string
  assets: Asset[]
}

export interface Asset {
  name: string
  type: string
  size: string
  url: string
}

export function mockConvertFigmaToHtml(): ConversionResult {
  // This is a mock function that returns hardcoded HTML and CSS
  // In a real implementation, this would parse the Figma design and generate code

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Figma to HTML</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
  <header class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <img class="h-8 w-auto" src="./images/logo.png" alt="Logo">
          </div>
          <nav class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <a href="#" class="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
              Dashboard
            </a>
            <a href="#" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
              Team
            </a>
            <a href="#" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
              Projects
            </a>
            <a href="#" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
              Calendar
            </a>
          </nav>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <button type="button" class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span class="sr-only">View notifications</span>
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <div class="ml-3 relative">
            <div>
              <button type="button" class="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                <span class="sr-only">Open user menu</span>
                <img class="h-8 w-8 rounded-full" src="./images/avatar.png" alt="">
              </button>
            </div>
          </div>
        </div>
        <div class="flex items-center sm:hidden">
          <button type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-controls="mobile-menu" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>

  <main>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4 flex items-center justify-center">
          <p class="text-gray-500 text-lg">Your content goes here</p>
        </div>
      </div>
    </div>
  </main>
</body>
</html>
  `

  const css = `
/* This would be the generated CSS if not using Tailwind */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

header {
  background-color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* ... more CSS ... */
  `

  // Mock assets that would be extracted from Figma
  const assets: Asset[] = [
    {
      name: "logo.png",
      type: "image/png",
      size: "12KB",
      url: "/placeholder.svg?height=32&width=32",
    },
    {
      name: "avatar.png",
      type: "image/png",
      size: "24KB",
      url: "/placeholder.svg?height=64&width=64",
    },
    {
      name: "hero-image.jpg",
      type: "image/jpeg",
      size: "128KB",
      url: "/placeholder.svg?height=400&width=800",
    },
    {
      name: "icon-dashboard.svg",
      type: "image/svg+xml",
      size: "4KB",
      url: "/placeholder.svg?height=24&width=24",
    },
    {
      name: "icon-team.svg",
      type: "image/svg+xml",
      size: "3KB",
      url: "/placeholder.svg?height=24&width=24",
    },
    {
      name: "icon-projects.svg",
      type: "image/svg+xml",
      size: "5KB",
      url: "/placeholder.svg?height=24&width=24",
    },
  ]

  return { html, css, assets }
}

// This function will be implemented to connect to the Figma API
export async function fetchFigmaFile(fileId: string, accessToken: string) {
  // This is a placeholder for the real implementation
  // In a real implementation, this would fetch the Figma file using the Figma API
  console.log("Fetching Figma file:", fileId, "with token:", accessToken)

  // Return mock data for now
  return {
    document: {
      children: [],
    },
    name: "Figma Design",
    lastModified: new Date().toISOString(),
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    version: "1",
  }
}

// This function will be implemented to extract assets from Figma
export async function extractFigmaAssets(fileId: string, accessToken: string) {
  // This is a placeholder for the real implementation
  console.log("Extracting assets from Figma file:", fileId)

  // Return mock assets for now
  return mockConvertFigmaToHtml().assets
}

// This function will be implemented to generate code from Figma nodes
export async function generateCodeFromFigmaNodes(nodes: any[], format: string) {
  // This is a placeholder for the real implementation
  console.log("Generating code from Figma nodes with format:", format)

  // Return mock code for now
  const { html, css } = mockConvertFigmaToHtml()
  return { html, css }
}
