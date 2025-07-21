import { promises as fs, watch } from "fs"
import path from "path"
import { CONFIG } from "../src/lib/config"
import { highlightCode } from "../src/lib/highlight-code"

/**
 * Removes trailing whitespace and empty lines from code
 */
function trimCodeForDisplay(code: string): string {
  return code.replace(/\s+$/, "")
}

/**
 * Processes code by replacing registry imports for display purposes
 */
function processCodeForDisplay(code: string): string {
  return code.replace(/@\/registry\/ui\//g, "@/components/ui/")
}

// Dynamic example discovery
async function discoverExamples(): Promise<Record<string, string>> {
  const exampleFileMap: Record<string, string> = {}

  try {
    // Get all categories (components, primitives, etc.)
    const categories = await fs.readdir(CONFIG.EXAMPLES_DIR, {
      withFileTypes: true,
    })

    for (const category of categories) {
      if (!category.isDirectory()) continue

      const categoryPath = path.join(CONFIG.EXAMPLES_DIR, category.name)

      // Get all components in this category
      const components = await fs.readdir(categoryPath, { withFileTypes: true })

      for (const component of components) {
        if (!component.isDirectory()) continue

        const componentPath = path.join(categoryPath, component.name)

        // Get all example files for this component
        const examples = await fs.readdir(componentPath, {
          withFileTypes: true,
        })

        for (const example of examples) {
          if (!example.isFile() || !example.name.endsWith(".tsx")) continue

          // Generate key: component-example (without .tsx extension)
          const exampleName = example.name.replace(".tsx", "")
          const key = `${component.name}-${exampleName}`

          // Store relative path from project root
          const relativePath = path.relative(
            CONFIG.ROOT_DIR,
            path.join(componentPath, example.name)
          )

          exampleFileMap[key] = relativePath
        }
      }
    }
  } catch (error) {
    console.error("Error discovering examples:", error)
  }

  return exampleFileMap
}

// Dynamic registry UI file discovery
async function discoverRegistryFiles(): Promise<Record<string, string>> {
  const registryFileMap: Record<string, string> = {}

  async function scanDirectory(
    dirPath: string,
    prefix: string = ""
  ): Promise<void> {
    try {
      const items = await fs.readdir(dirPath, { withFileTypes: true })

      for (const item of items) {
        const itemPath = path.join(dirPath, item.name)
        const itemKey = prefix ? `${prefix}/${item.name}` : item.name

        if (item.isDirectory()) {
          // Recursively scan subdirectories
          await scanDirectory(itemPath, itemKey)
        } else if (item.isFile() && item.name.endsWith(".tsx")) {
          // Generate key: path without .tsx extension
          const key = itemKey.replace(".tsx", "")

          // Store relative path from project root
          const relativePath = path.relative(CONFIG.ROOT_DIR, itemPath)
          registryFileMap[key] = relativePath
        }
      }
    } catch (error) {
      console.error(`Error scanning directory ${dirPath}:`, error)
    }
  }

  await scanDirectory(CONFIG.UI_DIR)
  return registryFileMap
}

async function buildExamples() {
  console.log("🔨 Building example code registry...")

  // Discover all examples dynamically
  const exampleFileMap = await discoverExamples()

  console.log(`🔍 Discovered ${Object.keys(exampleFileMap).length} examples:`)
  for (const [key, filePath] of Object.entries(exampleFileMap)) {
    console.log(`  - ${key}: ${filePath}`)
  }

  // Discover all registry UI files
  const registryFileMap = await discoverRegistryFiles()

  console.log(
    `🔍 Discovered ${Object.keys(registryFileMap).length} registry files:`
  )
  for (const [key, filePath] of Object.entries(registryFileMap)) {
    console.log(`  - ${key}: ${filePath}`)
  }

  const exampleCodeMap: Record<string, string> = {}
  const exampleHighlightedMap: Record<string, string> = {}
  const registryCodeMap: Record<string, string> = {}
  const registryHighlightedMap: Record<string, string> = {}

  // Read and highlight each example file
  console.log("✨ Highlighting code examples...")
  for (const [key, filePath] of Object.entries(exampleFileMap)) {
    try {
      const fullPath = path.join(CONFIG.ROOT_DIR, filePath)
      const rawContent = await fs.readFile(fullPath, "utf-8")

      // Trim trailing whitespace for cleaner display
      const content = trimCodeForDisplay(rawContent)
      exampleCodeMap[key] = content

      // Pre-highlight the code
      const highlighted = await highlightCode(content, "tsx")
      exampleHighlightedMap[key] = highlighted
    } catch (error) {
      console.warn(`⚠️  Could not read ${filePath}:`, error)
      exampleCodeMap[key] = `// Error loading code for ${key}`
      exampleHighlightedMap[
        key
      ] = `<pre><code>// Error loading code for ${key}</code></pre>`
    }
  }

  // Read and highlight each registry file
  console.log("✨ Highlighting registry files...")
  for (const [key, filePath] of Object.entries(registryFileMap)) {
    try {
      const fullPath = path.join(CONFIG.ROOT_DIR, filePath)
      const rawContent = await fs.readFile(fullPath, "utf-8")

      // Process and trim content for display
      const processedContent = processCodeForDisplay(rawContent)
      const content = trimCodeForDisplay(processedContent)
      registryCodeMap[key] = content

      // Pre-highlight the code
      const highlighted = await highlightCode(content, "tsx")
      registryHighlightedMap[key] = highlighted
    } catch (error) {
      console.warn(`⚠️  Could not read ${filePath}:`, error)
      registryCodeMap[key] = `// Error loading code for ${key}`
      registryHighlightedMap[
        key
      ] = `<pre><code>// Error loading code for ${key}</code></pre>`
    }
  }

  // Generate the raw code map file
  const rawCodeMapFile = `// This file is auto-generated by scripts/build-examples.ts
// Do not edit this file directly - edit the example files instead

export const exampleCodeMap: Record<string, string> = {
${Object.entries(exampleCodeMap)
  .map(([key, code]) => `  "${key}": ${JSON.stringify(code)},`)
  .join("\n")}
}
`

  // Generate the highlighted code map file
  const highlightedCodeMapFile = `// This file is auto-generated by scripts/build-examples.ts
// Do not edit this file directly - edit the example files instead

export const exampleHighlightedMap: Record<string, string> = {
${Object.entries(exampleHighlightedMap)
  .map(([key, html]) => `  "${key}": ${JSON.stringify(html)},`)
  .join("\n")}
}
`

  // Generate the registry code map file
  const registryCodeMapFile = `// This file is auto-generated by scripts/build-examples.ts
// Do not edit this file directly - edit the registry files instead

export const registryCodeMap: Record<string, string> = {
${Object.entries(registryCodeMap)
  .map(([key, code]) => `  "${key}": ${JSON.stringify(code)},`)
  .join("\n")}
}
`

  // Generate the registry highlighted code map file
  const registryHighlightedCodeMapFile = `// This file is auto-generated by scripts/build-examples.ts
// Do not edit this file directly - edit the registry files instead

export const registryHighlightedMap: Record<string, string> = {
${Object.entries(registryHighlightedMap)
  .map(([key, html]) => `  "${key}": ${JSON.stringify(html)},`)
  .join("\n")}
}
`

  // Generate the updated code-extractor.ts file
  const codeExtractorFile = `// This file is auto-generated by scripts/build-examples.ts
// Do not edit this file directly - edit the example files instead

import { exampleCodeMap } from "@/registry/example-code-map"
import { exampleHighlightedMap } from "@/registry/example-highlighted-map"
import { registryCodeMap } from "@/registry/registry-code-map"
import { registryHighlightedMap } from "@/registry/registry-highlighted-map"

export function getExampleCode(
  componentName: string,
  exampleName: string
): string {
  const key = \`\${componentName}-\${exampleName}\`
  return (
    exampleCodeMap[key] ||
    \`// No code available for \${componentName}/\${exampleName}\`
  )
}

export function getExampleHighlightedCode(
  componentName: string,
  exampleName: string
): string {
  const key = \`\${componentName}-\${exampleName}\`
  return (
    exampleHighlightedMap[key] ||
    \`<pre><code>// No code available for \${componentName}/\${exampleName}</code></pre>\`
  )
}

export function getRegistryCode(src: string): string {
  return (
    registryCodeMap[src] ||
    \`// No code available for \${src}\`
  )
}

export function getRegistryHighlightedCode(src: string): string {
  return (
    registryHighlightedMap[src] ||
    \`<pre><code>// No code available for \${src}</code></pre>\`
  )
}
`

  // Generate the dynamic import map file
  const importMapFile = `// This file is auto-generated by scripts/build-examples.ts
// Do not edit this file directly - edit the example files instead

import type { ComponentType } from "react"

export const dynamicImportMap: Record<
  string,
  () => Promise<{ default: ComponentType }>
> = {
${Object.entries(exampleFileMap)
  .map(([key, filePath]) => {
    // Convert relative path to module import path
    const importPath = filePath.replace("src/", "@/").replace(".tsx", "")
    return `  "${key}": () => import("${importPath}"),`
  })
  .join("\n")}
}

// Generate component examples map from discovered files
export const componentExamplesMap: Record<string, string[]> = {
${(() => {
  const componentMap: Record<string, string[]> = {}

  // Group examples by component
  for (const key of Object.keys(exampleFileMap)) {
    const parts = key.split("-")
    const componentName = parts[0]
    const exampleName = parts.slice(1).join("-") // Handle multi-part example names like "as-element"
    if (!componentMap[componentName]) {
      componentMap[componentName] = []
    }
    componentMap[componentName].push(exampleName)
  }

  return Object.entries(componentMap)
    .map(
      ([component, examples]) =>
        `  "${component}": ${JSON.stringify(examples)},`
    )
    .join("\n")
})()}
}
`

  // Write the generated files
  await fs.writeFile(
    path.join(CONFIG.ROOT_DIR, "src/registry/example-code-map.ts"),
    rawCodeMapFile,
    "utf-8"
  )
  await fs.writeFile(
    path.join(CONFIG.ROOT_DIR, "src/registry/example-highlighted-map.ts"),
    highlightedCodeMapFile,
    "utf-8"
  )
  await fs.writeFile(
    path.join(CONFIG.ROOT_DIR, "src/registry/registry-code-map.ts"),
    registryCodeMapFile,
    "utf-8"
  )
  await fs.writeFile(
    path.join(CONFIG.ROOT_DIR, "src/registry/registry-highlighted-map.ts"),
    registryHighlightedCodeMapFile,
    "utf-8"
  )
  await fs.writeFile(CONFIG.CODE_EXTRACTOR_FILE, codeExtractorFile, "utf-8")
  await fs.writeFile(CONFIG.DYNAMIC_IMPORTS_FILE, importMapFile, "utf-8")

  console.log("✅ Example code registry built successfully!")
  console.log(`📝 Generated ${Object.keys(exampleCodeMap).length} examples`)
  console.log(
    `📝 Generated ${Object.keys(registryCodeMap).length} registry files`
  )
  console.log("📦 Generated dynamic import map")
  console.log("🗂️  Generated separate code map files in registry folder")

  return { exampleFileMap, registryFileMap }
}

// Handle CLI arguments
const isWatchMode = process.argv.includes("--watch")

if (isWatchMode) {
  console.log("👀 Watching for changes in example and registry files...")

  // Build initially and get the file paths
  let currentExampleFileMap: Record<string, string> = {}
  let currentRegistryFileMap: Record<string, string> = {}

  buildExamples()
    .then(({ exampleFileMap, registryFileMap }) => {
      currentExampleFileMap = exampleFileMap
      currentRegistryFileMap = registryFileMap
      setupWatchers()
    })
    .catch(console.error)

  async function setupWatchers() {
    // Watch the examples directory for new files/folders
    watch(
      CONFIG.EXAMPLES_DIR,
      { recursive: true },
      async (eventType, filename) => {
        if (filename && filename.endsWith(".tsx")) {
          console.log(`📝 Example file changed: ${filename}`)
          await rebuildAndUpdateWatchers()
        }
      }
    )

    // Watch the registry/ui directory for changes
    watch(CONFIG.UI_DIR, { recursive: true }, async (eventType, filename) => {
      if (filename && filename.endsWith(".tsx")) {
        console.log(`📝 Registry file changed: ${filename}`)
        await rebuildAndUpdateWatchers()
      }
    })
  }

  async function rebuildAndUpdateWatchers() {
    const { exampleFileMap, registryFileMap } = await buildExamples()

    // Check if we have new files that need watching
    const newExampleFiles = Object.keys(exampleFileMap).filter(
      (key) => !Object.keys(currentExampleFileMap).includes(key)
    )
    const newRegistryFiles = Object.keys(registryFileMap).filter(
      (key) => !Object.keys(currentRegistryFileMap).includes(key)
    )

    if (newExampleFiles.length > 0) {
      console.log(`🆕 Discovered ${newExampleFiles.length} new example(s)`)
    }
    if (newRegistryFiles.length > 0) {
      console.log(
        `🆕 Discovered ${newRegistryFiles.length} new registry file(s)`
      )
    }

    currentExampleFileMap = exampleFileMap
    currentRegistryFileMap = registryFileMap
  }
} else {
  // Run once
  buildExamples().catch(console.error)
}
