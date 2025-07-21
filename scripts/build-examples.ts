import { promises as fs, watch } from "fs"
import path from "path"
import { CONFIG } from "../src/lib/config"
import { highlightCode } from "../src/lib/highlight-code"

// Cache for file modification times to avoid re-processing unchanged files
interface FileCache {
  [filePath: string]: {
    mtime: number
    rawCode: string
    highlightedCode: string
  }
}

const fileCache: FileCache = {}

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

/**
 * Check if a file needs to be reprocessed based on modification time
 */
async function needsReprocessing(filePath: string): Promise<boolean> {
  try {
    const stats = await fs.stat(filePath)
    const currentMtime = stats.mtime.getTime()
    const cached = fileCache[filePath]

    return !cached || cached.mtime !== currentMtime
  } catch {
    return true // File doesn't exist or error, needs processing
  }
}

/**
 * Process a single file with caching
 */
async function processFile(
  filePath: string,
  language: string
): Promise<{ rawCode: string; highlightedCode: string }> {
  const fullPath = path.join(CONFIG.ROOT_DIR, filePath)

  // Check if we need to reprocess this file
  if (!(await needsReprocessing(fullPath))) {
    const cached = fileCache[fullPath]
    return {
      rawCode: cached.rawCode,
      highlightedCode: cached.highlightedCode,
    }
  }

  try {
    const rawContent = await fs.readFile(fullPath, "utf-8")
    const processedContent = processCodeForDisplay(rawContent)
    const rawCode = trimCodeForDisplay(processedContent)

    // Highlight the code
    const highlightedCode = await highlightCode(rawCode, language)

    // Cache the results with current modification time
    const stats = await fs.stat(fullPath)
    fileCache[fullPath] = {
      mtime: stats.mtime.getTime(),
      rawCode,
      highlightedCode,
    }

    return { rawCode, highlightedCode }
  } catch (error) {
    console.warn(`⚠️  Could not process ${filePath}:`, error)
    const errorCode = `// Error loading code from ${filePath}`
    const errorHighlighted = `<pre><code>${errorCode}</code></pre>`

    return {
      rawCode: errorCode,
      highlightedCode: errorHighlighted,
    }
  }
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
          // Skip examples directory (handled separately)
          if (item.name === "examples") {
            continue
          }
          // Recursively scan subdirectories
          await scanDirectory(itemPath, itemKey)
        } else if (
          item.isFile() &&
          (item.name.endsWith(".tsx") ||
            item.name.endsWith(".ts") ||
            item.name.endsWith(".css"))
        ) {
          // Generate key: path without .tsx/.ts/.css extension
          const key = itemKey.replace(/\.(tsx?|css)$/, "")

          // Store relative path from project root
          const relativePath = path.relative(CONFIG.ROOT_DIR, itemPath)
          registryFileMap[key] = relativePath
        }
      }
    } catch (error) {
      console.error(`Error scanning directory ${dirPath}:`, error)
    }
  }

  await scanDirectory(CONFIG.REGISTRY_DIR)
  return registryFileMap
}

/**
 * Process all example files and return combined maps
 */
async function processExamples(exampleFileMap: Record<string, string>) {
  const combinedCodeMap: Record<string, string> = {}
  const combinedHighlightedMap: Record<string, string> = {}

  console.log("✨ Processing example files...")
  for (const [key, filePath] of Object.entries(exampleFileMap)) {
    const { rawCode, highlightedCode } = await processFile(filePath, "tsx")

    // Use "example:" prefix to distinguish from registry files
    const prefixedKey = `example:${key}`
    combinedCodeMap[prefixedKey] = rawCode
    combinedHighlightedMap[prefixedKey] = highlightedCode
  }

  return { combinedCodeMap, combinedHighlightedMap }
}

/**
 * Process all registry files and add to combined maps
 */
async function processRegistry(
  registryFileMap: Record<string, string>,
  combinedCodeMap: Record<string, string>,
  combinedHighlightedMap: Record<string, string>
) {
  console.log("✨ Processing registry files...")
  for (const [key, filePath] of Object.entries(registryFileMap)) {
    // Determine language from file extension
    let language = "tsx"
    if (filePath.endsWith(".ts")) {
      language = "typescript"
    } else if (filePath.endsWith(".css")) {
      language = "css"
    }

    const { rawCode, highlightedCode } = await processFile(filePath, language)

    // Use "registry:" prefix to distinguish from example files
    const prefixedKey = `registry:${key}`
    combinedCodeMap[prefixedKey] = rawCode
    combinedHighlightedMap[prefixedKey] = highlightedCode
  }
}

/**
 * Generate the combined code map files
 */
function generateCombinedMapFiles(
  combinedCodeMap: Record<string, string>,
  combinedHighlightedMap: Record<string, string>
) {
  const codeMapFile = `// This file is auto-generated by scripts/build-examples.ts
// Do not edit this file directly - edit the source files instead

export const codeMap: Record<string, string> = {
${Object.entries(combinedCodeMap)
  .map(([key, code]) => `  "${key}": ${JSON.stringify(code)},`)
  .join("\n")}
}
`

  const highlightedMapFile = `// This file is auto-generated by scripts/build-examples.ts
// Do not edit this file directly - edit the source files instead

export const highlightedMap: Record<string, string> = {
${Object.entries(combinedHighlightedMap)
  .map(([key, html]) => `  "${key}": ${JSON.stringify(html)},`)
  .join("\n")}
}
`

  return { codeMapFile, highlightedMapFile }
}

/**
 * Generate the updated code-extractor.ts file
 */
function generateCodeExtractorFile() {
  return `// This file is auto-generated by scripts/build-examples.ts
// Do not edit this file directly - edit the source files instead

import { codeMap } from "@/generated/code-map"
import { highlightedMap } from "@/generated/highlighted-map"

export function getExampleCode(
  componentName: string,
  exampleName: string
): string {
  const key = \`example:\${componentName}-\${exampleName}\`
  return (
    codeMap[key] ||
    \`// No code available for \${componentName}/\${exampleName}\`
  )
}

export function getExampleHighlightedCode(
  componentName: string,
  exampleName: string
): string {
  const key = \`example:\${componentName}-\${exampleName}\`
  return (
    highlightedMap[key] ||
    \`<pre><code>// No code available for \${componentName}/\${exampleName}</code></pre>\`
  )
}

export function getRegistryCode(src: string): string {
  const key = \`registry:\${src}\`
  return (
    codeMap[key] ||
    \`// No code available for \${src}\`
  )
}

export function getRegistryHighlightedCode(src: string): string {
  const key = \`registry:\${src}\`
  return (
    highlightedMap[key] ||
    \`<pre><code>// No code available for \${src}</code></pre>\`
  )
}
`
}

async function buildExamples() {
  console.log("🔨 Building example code registry...")

  // Discover all examples and registry files
  const exampleFileMap = await discoverExamples()
  const registryFileMap = await discoverRegistryFiles()

  console.log(`🔍 Discovered ${Object.keys(exampleFileMap).length} examples`)
  console.log(
    `🔍 Discovered ${Object.keys(registryFileMap).length} registry files`
  )

  // Process examples to get initial combined maps
  const { combinedCodeMap, combinedHighlightedMap } = await processExamples(
    exampleFileMap
  )

  // Process registry files and add to combined maps
  await processRegistry(
    registryFileMap,
    combinedCodeMap,
    combinedHighlightedMap
  )

  // Generate file contents
  const { codeMapFile, highlightedMapFile } = generateCombinedMapFiles(
    combinedCodeMap,
    combinedHighlightedMap
  )
  const codeExtractorFile = generateCodeExtractorFile()

  // Generate the dynamic import map file (unchanged)
  const importMapFile = `// This file is auto-generated by scripts/build-examples.ts
// Do not edit this file directly - edit the example files instead

import type { ComponentType } from "react"

export const dynamicImportMap: Record<
  string,
  () => Promise<Record<string, ComponentType>>
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
  const generatedDir = path.join(CONFIG.ROOT_DIR, "src/generated")
  await fs.mkdir(generatedDir, { recursive: true })

  await fs.writeFile(
    path.join(generatedDir, "code-map.ts"),
    codeMapFile,
    "utf-8"
  )
  await fs.writeFile(
    path.join(generatedDir, "highlighted-map.ts"),
    highlightedMapFile,
    "utf-8"
  )
  await fs.writeFile(CONFIG.CODE_EXTRACTOR_FILE, codeExtractorFile, "utf-8")
  await fs.writeFile(CONFIG.DYNAMIC_IMPORTS_FILE, importMapFile, "utf-8")

  console.log("✅ Example code registry built successfully!")
  console.log(
    `📝 Generated ${Object.keys(combinedCodeMap).length} total entries`
  )
  console.log(`🗂️  Created 2 combined map files (down from 4 separate files)`)
  console.log("🚀 Added file caching for improved build performance")

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

    // Watch the registry directory for changes
    watch(
      CONFIG.REGISTRY_DIR,
      { recursive: true },
      async (eventType, filename) => {
        if (
          filename &&
          (filename.endsWith(".tsx") ||
            filename.endsWith(".ts") ||
            filename.endsWith(".css"))
        ) {
          console.log(`📝 Registry file changed: ${filename}`)
          await rebuildAndUpdateWatchers()
        }
      }
    )
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
