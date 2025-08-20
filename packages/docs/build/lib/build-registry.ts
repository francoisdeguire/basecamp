import path from "path"
import { findMDXFiles, parseMDXFile } from "./build-mdx"
import { ComponentInfo, RegistryData } from "../../src/shared/types/component"
import { CONFIG } from "./config"

/**
 * Build component registry from MDX files (BUILD TIME ONLY)
 */
export async function buildRegistry(): Promise<RegistryData> {
  const componentFiles = findMDXFiles(CONFIG.COMPONENTS_DOCS_DIR)
  const primitiveFiles = findMDXFiles(CONFIG.PRIMITIVES_DOCS_DIR)

  // Parse all components
  const components: ComponentInfo[] = []
  for (const filePath of componentFiles) {
    const mdxContent = await parseMDXFile(filePath)
    if (mdxContent) {
      const componentName = path.basename(filePath, ".mdx")
      components.push({
        name: componentName,
        type: "ui",
        path: filePath,
        frontmatter: mdxContent.frontmatter,
        slug: componentName.toLowerCase(),
      })
    }
  }

  // Parse all primitive components
  const primitives: ComponentInfo[] = []
  for (const filePath of primitiveFiles) {
    const mdxContent = await parseMDXFile(filePath)
    if (mdxContent) {
      const componentName = path.basename(filePath, ".mdx")
      primitives.push({
        name: componentName,
        type: "primitive",
        path: filePath,
        frontmatter: mdxContent.frontmatter,
        slug: componentName.toLowerCase(),
      })
    }
  }

  // Sort alphabetically
  components.sort((a, b) => a.name.localeCompare(b.name))
  primitives.sort((a, b) => a.name.localeCompare(b.name))

  return {
    components,
    primitives,
    totalCount: components.length + primitives.length,
    lastUpdated: new Date().toISOString(),
  }
}
