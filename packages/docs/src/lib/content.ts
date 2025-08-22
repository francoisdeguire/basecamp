// Static content data - replaces runtime fs calls for much faster performance
import contentData from "@/generated/content.json"
import type { ComponentInfo, ComponentFrontmatter } from "@/lib/types"

// Extended component info that includes the content field from generated data
export interface ComponentInfoWithContent extends ComponentInfo {
  content: string
}

export interface RegistryDataWithContent {
  components: ComponentInfoWithContent[]
  primitives: ComponentInfoWithContent[]
  totalCount: number
  lastUpdated: string
}

export interface RootPageData {
  slug: string
  path: string
  frontmatter: ComponentFrontmatter
  content: string
}

export interface StaticContentData {
  registry: RegistryDataWithContent
  rootPages: RootPageData[]
  buildTime: string
}

// Type-safe access to generated content
export const content: StaticContentData = contentData as StaticContentData

// Convenience exports
export const { registry, rootPages } = content

// Helper functions that match the old API
export async function getStaticRegistry(): Promise<RegistryDataWithContent> {
  return registry
}

export async function getComponentBySlug(
  slug: string,
  type: "ui" | "primitive"
): Promise<ComponentInfoWithContent | null> {
  const components = type === "ui" ? registry.components : registry.primitives
  return components.find((component) => component.slug === slug) || null
}

export function getStaticRootPages(): RootPageData[] {
  return rootPages
}

export function getRootPageBySlug(slug: string): RootPageData | null {
  return rootPages.find((page) => page.slug === slug) || null
}
