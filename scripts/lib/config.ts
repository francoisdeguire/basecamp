import path from "path"

/**
 * Central configuration for all directory paths used throughout the build process.
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
