import { promises as fs } from "fs"
import path from "path"

// Registry root directory (now running from within registry package)
const REGISTRY_ROOT = path.join(process.cwd(), "src")

interface ComponentExport {
  path: string
  exports: string[]
  types: string[]
}

/**
 * Extract exports from a component's index.ts file
 */
async function extractComponentExports(
  componentPath: string
): Promise<ComponentExport> {
  try {
    const indexFile = path.join(componentPath, "index.tsx")
    let content = ""

    // Try index.tsx first, then index.ts
    try {
      content = await fs.readFile(indexFile, "utf-8")
    } catch {
      const tsIndexFile = path.join(componentPath, "index.ts")
      content = await fs.readFile(tsIndexFile, "utf-8")
    }

    const exports: string[] = []
    const types: string[] = []

    // Parse export statements - improved to catch all patterns
    const reExportMatches =
      content.match(/export\s+(?:{[^}]+}|\*|\w+|.*?)\s+from\s+['"]/g) || []
    const directExportMatches =
      content.match(
        /export\s+(?:const|function|class|interface|type)\s+(\w+)/g
      ) || []
    const namedExportMatches =
      content.match(/export\s+(?:type\s+)?{\s*([^}]+)\s*}/g) || []

    // Extract re-exports (export { X } from "./file")
    reExportMatches.forEach((match) => {
      const reExportMatch = match.match(/export\s+{([^}]+)}\s+from/)
      if (reExportMatch) {
        const exportNames = reExportMatch[1]
          .split(",")
          .map((name) => name.trim())
          .filter((name) => name)

        exportNames.forEach((name) => {
          if (name.startsWith("type ")) {
            types.push(name)
          } else {
            exports.push(name)
          }
        })
      }
    })

    // Extract named exports (export { Button, type ButtonProps } or export type { BoxProps })
    namedExportMatches.forEach((match) => {
      const namedMatch = match.match(/export\s+(?:type\s+)?{\s*([^}]+)\s*}/)
      if (namedMatch) {
        const exportNames = namedMatch[1]
          .split(",")
          .map((name) => name.trim())
          .filter((name) => name)

        exportNames.forEach((name) => {
          if (name.startsWith("type ")) {
            types.push(name)
          } else {
            exports.push(name)
          }
        })
      }
    })

    // Extract direct exports
    directExportMatches.forEach((match) => {
      const directMatch = match.match(
        /export\s+(?:const|function|class|interface|type)\s+(\w+)/
      )
      if (directMatch) {
        const exportName = directMatch[1]
        if (match.includes("interface") || match.includes("type")) {
          types.push(`type ${exportName}`)
        } else {
          exports.push(exportName)
        }
      }
    })

    // Get relative path from src root
    const relativePath = `./${path.relative(REGISTRY_ROOT, componentPath)}`

    return {
      path: relativePath,
      exports: [...new Set(exports)], // Remove duplicates
      types: [...new Set(types)],
    }
  } catch (error) {
    console.warn(`⚠️ Failed to extract exports from ${componentPath}:`, error)
    return { path: "", exports: [], types: [] }
  }
}

/**
 * Discover all UI components
 */
async function discoverUIComponents(): Promise<ComponentExport[]> {
  const uiDir = path.join(REGISTRY_ROOT, "ui")
  const components: ComponentExport[] = []

  try {
    const items = await fs.readdir(uiDir, { withFileTypes: true })

    for (const item of items) {
      if (item.isDirectory()) {
        const componentPath = path.join(uiDir, item.name)
        const componentExport = await extractComponentExports(componentPath)
        if (
          componentExport.exports.length > 0 ||
          componentExport.types.length > 0
        ) {
          components.push(componentExport)
        }
      } else if (
        item.isFile() &&
        (item.name.endsWith(".tsx") || item.name.endsWith(".ts"))
      ) {
        // Handle single-file components like box.tsx
        const componentName = item.name.replace(/\.(tsx?|css)$/, "")
        const filePath = path.join(uiDir, item.name)
        const content = await fs.readFile(filePath, "utf-8")

        const exports: string[] = []
        const types: string[] = []

        // Extract exports from single file
        const directExportMatches =
          content.match(
            /export\s+(?:const|function|class|interface|type)\s+(\w+)/g
          ) || []
        const namedExportMatches =
          content.match(/export\s+(?:type\s+)?{\s*([^}]+)\s*}/g) || []

        // Extract direct exports
        directExportMatches.forEach((match) => {
          const exportMatch = match.match(
            /export\s+(?:const|function|class|interface|type)\s+(\w+)/
          )
          if (exportMatch) {
            const exportName = exportMatch[1]
            if (match.includes("interface") || match.includes("type")) {
              types.push(`type ${exportName}`)
            } else {
              exports.push(exportName)
            }
          }
        })

        // Extract named exports (including type exports)
        namedExportMatches.forEach((match) => {
          const namedMatch = match.match(/export\s+(?:type\s+)?{\s*([^}]+)\s*}/)
          if (namedMatch) {
            // If it's a type export (export type { ... }), mark all as types
            const isTypeExport = match.includes("export type")

            if (isTypeExport) {
              const exportNames = namedMatch[1]
                .split(",")
                .map((name) => name.trim())
                .filter((name) => name)

              exportNames.forEach((name) => {
                types.push(`type ${name}`)
              })
              return
            }
            const exportNames = namedMatch[1]
              .split(",")
              .map((name) => name.trim())
              .filter((name) => name)

            exportNames.forEach((name) => {
              if (name.startsWith("type ")) {
                types.push(name)
              } else {
                exports.push(name)
              }
            })
          }
        })

        if (exports.length > 0 || types.length > 0) {
          components.push({
            path: `./ui/${componentName}`,
            exports,
            types,
          })
        }
      }
    }
  } catch (error) {
    console.error("❌ Failed to discover UI components:", error)
    throw error
  }

  return components.sort((a, b) => a.path.localeCompare(b.path))
}

/**
 * Discover all examples for static index generation
 */
async function discoverExamples(): Promise<Record<string, string>> {
  const exampleFileMap: Record<string, string> = {}

  try {
    const examplesDir = path.join(REGISTRY_ROOT, "examples")
    const components = await fs.readdir(examplesDir, { withFileTypes: true })

    for (const component of components) {
      if (!component.isDirectory()) continue

      const componentPath = path.join(examplesDir, component.name)
      const examples = await fs.readdir(componentPath, { withFileTypes: true })

      for (const example of examples) {
        if (!example.isFile() || !example.name.endsWith(".tsx")) continue

        const exampleName = example.name.replace(".tsx", "")
        const key = `${component.name}-${exampleName}`
        const relativePath = path.relative(
          REGISTRY_ROOT,
          path.join(componentPath, example.name)
        )

        exampleFileMap[key] = relativePath
      }
    }
  } catch (error) {
    console.error("❌ Failed to discover examples:", error)
    throw error
  }

  return exampleFileMap
}

/**
 * Convert kebab-case to PascalCase for import names
 */
function toPascalCase(str: string): string {
  return str
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("")
}

/**
 * Generate static registry index file for zero-layout-shift component previews
 */
async function generateStaticIndexFile(
  exampleFileMap: Record<string, string>
): Promise<string> {
  const imports: string[] = []
  const indexEntries: string[] = []

  for (const [key, filePath] of Object.entries(exampleFileMap)) {
    const parts = key.split("-")
    const componentName = parts[0]
    const exampleName = parts.slice(1).join("-")

    // Convert file path to import path and generate import name
    // Remove 'examples/' prefix since __index__.tsx is now inside examples/
    const relativePath = filePath.replace(/^examples\//, "")
    const importPath = `./${relativePath.replace(".tsx", "")}`
    const cleanExampleName = exampleName.replace(/^_/, "")
    const importName = toPascalCase(`${componentName}_${cleanExampleName}`)

    // Read the file to detect export pattern
    const absolutePath = path.join(REGISTRY_ROOT, filePath)
    const fileContent = await fs.readFile(absolutePath, "utf-8")

    // Check if it has a default export or named export
    const hasDefaultExport = /export\s+default\s/.test(fileContent)
    const namedExportMatch = fileContent.match(
      /export\s+(?:function|const)\s+(\w+)/
    )

    if (hasDefaultExport) {
      imports.push(`import ${importName} from "${importPath}"`)
    } else if (namedExportMatch) {
      const exportedName = namedExportMatch[1]
      imports.push(
        `import { ${exportedName} as ${importName} } from "${importPath}"`
      )
    } else {
      imports.push(`import ${importName} from "${importPath}"`)
    }

    indexEntries.push(`  "${key}": ${importName},`)
  }

  return `// Auto-generated static registry index for zero-layout-shift component previews
// Generated by registry build system - DO NOT EDIT MANUALLY

${imports.join("\n")}

// Static registry for immediate component rendering (no layout shift)
export const Index = {
${indexEntries.join("\n")}
} as const

export type RegistryKey = keyof typeof Index
`
}

/**
 * Generate the registry index.ts file
 */
export async function generateRegistryIndex(): Promise<void> {
  try {
    console.log("🔨 Generating registry component index...")

    const components = await discoverUIComponents()

    // Generate the index content
    const indexContent = `// Auto-generated by build system - DO NOT EDIT MANUALLY
// This file is generated from the UI components in src/ui/

// Utility functions
export { cn } from "./lib/utils"

// Components
${components
  .map((component) => {
    const allExports = [...component.exports, ...component.types]
    if (allExports.length === 0) return ""

    // Always use braces for consistency, even with single exports
    const exportString = `{ ${allExports.join(", ")} }`

    return `export ${exportString} from "${component.path}"`
  })
  .filter((line) => line)
  .join("\n")}
`

    // Write the file
    const indexPath = path.join(REGISTRY_ROOT, "index.ts")
    await fs.writeFile(indexPath, indexContent, "utf-8")

    console.log(
      `✅ Generated registry index.ts with ${components.length} components`
    )

    // Also generate the static __index__ for examples
    const exampleFileMap = await discoverExamples()
    const staticIndexContent = await generateStaticIndexFile(exampleFileMap)
    const staticIndexPath = path.join(
      REGISTRY_ROOT,
      "examples",
      "__index__.tsx"
    )
    await fs.writeFile(staticIndexPath, staticIndexContent, "utf-8")

    console.log(
      `✅ Generated registry examples index with ${Object.keys(exampleFileMap).length} examples`
    )
  } catch (error) {
    console.error("❌ Failed to generate registry files:", error)
    throw error
  }
}

/**
 * CLI support
 */
if (require.main === module) {
  generateRegistryIndex().catch(console.error)
}
