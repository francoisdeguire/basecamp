import path from "path"
import { findMDXFiles, parseMDXFile } from "./mdx"
import { ComponentInfo } from "@/types/component"

export interface RegistryData {
  components: ComponentInfo[]
  primitives: ComponentInfo[]
  totalCount: number
  lastUpdated: string
}

export async function buildRegistry(): Promise<RegistryData> {
  const componentsDir = path.join(process.cwd(), "src/components")
  const uiDir = path.join(componentsDir, "ui")
  const primitivesDir = path.join(componentsDir, "primitives")

  const uiFiles = findMDXFiles(uiDir)
  const primitiveFiles = findMDXFiles(primitivesDir)

  // Parse all UI components
  const components: ComponentInfo[] = []
  for (const filePath of uiFiles) {
    const mdxContent = await parseMDXFile(filePath)
    if (mdxContent) {
      const componentName = path.basename(filePath, ".mdx")
      components.push({
        name: componentName,
        type: "ui",
        path: filePath,
        frontmatter: mdxContent.frontmatter,
        examples: mdxContent.frontmatter.examples,
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
        examples: mdxContent.frontmatter.examples,
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

export async function getComponentBySlug(
  slug: string,
  type: "ui" | "primitive"
): Promise<ComponentInfo | null> {
  const registry = await buildRegistry()
  const components = type === "ui" ? registry.components : registry.primitives
  return components.find((component) => component.slug === slug) || null
}

export function validateRegistry(registry: RegistryData): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  // Check for duplicate slugs
  const allSlugs = [
    ...registry.components.map((c) => c.slug),
    ...registry.primitives.map((c) => c.slug),
  ]

  const duplicateSlugs = allSlugs.filter(
    (slug, index) => allSlugs.indexOf(slug) !== index
  )
  if (duplicateSlugs.length > 0) {
    errors.push(`Duplicate slugs found: ${duplicateSlugs.join(", ")}`)
  }

  // Check for missing required fields
  const allComponents = [...registry.components, ...registry.primitives]
  for (const component of allComponents) {
    if (!component.frontmatter.title) {
      errors.push(`Missing title for component: ${component.name}`)
    }
    if (!component.frontmatter.description) {
      errors.push(`Missing description for component: ${component.name}`)
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
