import { promises as fs, watch } from "fs"
import path from "path"
import { CONFIG } from "./lib/config"
import { highlightCode } from "./lib/highlight-code"

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
    console.warn(`⚠️ Failed to process file ${filePath}:`, error)
    const errorCode = `// Error loading code from ${filePath}`
    const errorHighlighted = `<pre><code>${errorCode}</code></pre>`

    return {
      rawCode: errorCode,
      highlightedCode: errorHighlighted,
    }
  }
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

          // Store relative path from registry root
          const relativePath = path.relative(CONFIG.REGISTRY_ROOT_DIR, itemPath)
          registryFileMap[key] = relativePath
        }
      }
    } catch (error) {
      console.error(`❌ Failed to scan directory ${dirPath}:`, error)
      throw new Error(`Directory scan failed: ${error}`)
    }
  }

  // Scan the ui/ subdirectory for components
  const uiDir = path.join(CONFIG.REGISTRY_DIR, "ui")
  await scanDirectory(uiDir, "ui")

  // Also include lib/ and theme/ directories
  const libDir = path.join(CONFIG.REGISTRY_DIR, "lib")
  const themeDir = path.join(CONFIG.REGISTRY_DIR, "theme")

  try {
    await scanDirectory(libDir, "lib")
  } catch {
    console.warn("⚠️ No lib directory found")
  }

  try {
    await scanDirectory(themeDir, "theme")
  } catch {
    console.warn("⚠️ No theme directory found")
  }

  return registryFileMap
}

/**
 * Process all registry files and add to combined maps (with parallel processing)
 */
async function processRegistry(
  registryFileMap: Record<string, string>,
  combinedCodeMap: Record<string, string>,
  combinedHighlightedMap: Record<string, string>
) {
  // Process files in parallel for better performance
  const processingPromises = Object.entries(registryFileMap).map(
    async ([key, filePath]) => {
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
      return { prefixedKey, rawCode, highlightedCode }
    }
  )

  const results = await Promise.all(processingPromises)

  // Add results to combined maps
  for (const { prefixedKey, rawCode, highlightedCode } of results) {
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

// Static registry index generation moved to registry package

async function buildExamples() {
  // Examples are now handled by the registry package
  // Only process registry files for code extraction
  const exampleFileMap: Record<string, string> = {} // Empty since examples moved to registry
  const registryFileMap = await discoverRegistryFiles()

  console.log(
    `🔨 Building ${Object.keys(registryFileMap).length} registry files (examples are handled by registry package)...`
  )

  // Initialize combined maps
  const combinedCodeMap: Record<string, string> = {}
  const combinedHighlightedMap: Record<string, string> = {}

  // Process registry files first (base components)
  await processRegistry(
    registryFileMap,
    combinedCodeMap,
    combinedHighlightedMap
  )

  // Examples are now processed by the registry package (skip processing here)

  // Generate file contents
  const { codeMapFile, highlightedMapFile } = generateCombinedMapFiles(
    combinedCodeMap,
    combinedHighlightedMap
  )
  const codeExtractorFile = generateCodeExtractorFile()

  // Dynamic imports are now handled by the registry package
  const importMapFile = `// Examples are now handled by the registry package
// Dynamic imports are generated there, not here

import type { ComponentType } from "react"

// Empty maps since examples moved to registry package
export const dynamicImportMap: Record<
  string,
  () => Promise<Record<string, ComponentType>>
> = {}

export const componentExamplesMap: Record<string, string[]> = {}
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

  // Static registry index is now generated by the registry package itself

  console.log(
    `✅ Generated ${Object.keys(combinedCodeMap).length} code entries`
  )

  return { exampleFileMap, registryFileMap }
}

// Handle CLI arguments
const isWatchMode = process.argv.includes("--watch")

if (isWatchMode) {
  console.log("👀 Watch mode enabled")

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
          console.log(`🔄 ${filename}`)
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
          console.log(`🔧 ${filename}`)
          await rebuildAndUpdateWatchers()
        }
      }
    )
  }

  async function rebuildAndUpdateWatchers() {
    const { exampleFileMap, registryFileMap } = await buildExamples()

    // Check if we have new files that need watching

    const newRegistryFiles = Object.keys(registryFileMap).filter(
      (key) => !Object.keys(currentRegistryFileMap).includes(key)
    )
    const newExampleFiles = Object.keys(exampleFileMap).filter(
      (key) => !Object.keys(currentExampleFileMap).includes(key)
    )

    if (newRegistryFiles.length > 0) {
      console.log(`📁 +${newRegistryFiles.length} registry files`)
    }
    if (newExampleFiles.length > 0) {
      console.log(`📋 +${newExampleFiles.length} examples`)
    }

    currentExampleFileMap = exampleFileMap
    currentRegistryFileMap = registryFileMap
  }
} else {
  // Run once
  buildExamples().catch(console.error)
}
