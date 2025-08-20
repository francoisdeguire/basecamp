import path from "path"
import fs from "fs"

/**
 * Central configuration for all directory paths used throughout the project.
 * This eliminates hardcoded paths scattered across multiple files.
 */
export const CONFIG = {
  // Base directories
  ROOT_DIR: process.cwd(),
  SRC_DIR: path.join(process.cwd(), "src"),

  // Content directories
  CONTENT_DIR: path.join(process.cwd(), "src/content"),
  DOCS_DIR: path.join(process.cwd(), "src/content/docs"),
  DOCS_ROOT_DIR: path.join(process.cwd(), "src/content/docs/(root)"),
  COMPONENTS_DOCS_DIR: path.join(process.cwd(), "src/content/docs/components"),
  PRIMITIVES_DOCS_DIR: path.join(process.cwd(), "src/content/docs/primitives"),

  // Registry directories
  REGISTRY_DIR: path.join(process.cwd(), "src/registry"),
  EXAMPLES_DIR: path.join(process.cwd(), "src/registry/examples"),
  UI_DIR: path.join(process.cwd(), "src/registry/ui"),

  // Generated files directory
  GENERATED_DIR: path.join(process.cwd(), "src/generated"),
  CODE_EXTRACTOR_FILE: path.join(
    process.cwd(),
    "src/generated/code-extractor.ts"
  ),
  DYNAMIC_IMPORTS_FILE: path.join(
    process.cwd(),
    "src/generated/dynamic-imports.ts"
  ),

  // Special files
  ROOT_INDEX_FILE: path.join(
    process.cwd(),
    "src/content/docs/(root)/index.mdx"
  ),
} as const

/**
 * Get a relative path from the project root
 */
export function getRelativePath(absolutePath: string): string {
  return path.relative(CONFIG.ROOT_DIR, absolutePath)
}

/**
 * Get an absolute path from a relative path (relative to project root)
 */
export function getAbsolutePath(relativePath: string): string {
  return path.join(CONFIG.ROOT_DIR, relativePath)
}

/**
 * Dynamically discover all root pages
 */
export function getRootPages(): { slug: string; path: string }[] {
  try {
    const files = fs.readdirSync(CONFIG.DOCS_ROOT_DIR)
    return files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => ({
        slug: file === "index.mdx" ? "" : path.basename(file, ".mdx"),
        path: path.join(CONFIG.DOCS_ROOT_DIR, file),
      }))
  } catch (error) {
    console.error("Error reading root pages directory:", error)
    return []
  }
}
