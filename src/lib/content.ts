// Static content data - replaces runtime fs calls for much faster performance
import contentData from "@/generated/content.json"
import type { RegistryData } from "./registry"
import type { ComponentInfo } from "@/types/component"

export interface RootPageData {
  slug: string
  path: string
  frontmatter: Record<string, any>
  content: string
}

export interface StaticContentData {
  registry: RegistryData
  rootPages: RootPageData[]
  buildTime: string
}

// Type-safe access to generated content
export const content: StaticContentData = contentData

// Convenience exports
export const { registry, rootPages } = content

// Helper functions that match the old API
export async function getStaticRegistry(): Promise<RegistryData> {
  return registry
}

export async function getComponentBySlug(
  slug: string,
  type: "ui" | "primitive"
): Promise<ComponentInfo | null> {
  const components = type === "ui" ? registry.components : registry.primitives
  return components.find((component) => component.slug === slug) || null
}

export function getStaticRootPages(): RootPageData[] {
  return rootPages
}

export function getRootPageBySlug(slug: string): RootPageData | null {
  return rootPages.find((page) => page.slug === slug) || null
}

