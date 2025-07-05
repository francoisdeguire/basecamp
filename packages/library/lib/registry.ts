import { ComponentMetadata, NavigationSection } from "./metadata"
import { buttonMetadata } from "../components/button/metadata"
import { stackMetadata } from "../primitives/stack/metadata"

// Registry of all component metadata
export const componentRegistry: ComponentMetadata[] = [
  buttonMetadata,
  stackMetadata,
]

// Auto-generate path from folder structure
export function getComponentPath(
  metadata: ComponentMetadata,
  folderName: string
): string {
  return `${metadata.category}/${folderName}`
}

// Get component metadata by path
export function getComponentMetadata(
  path: string
): ComponentMetadata | undefined {
  const [category, componentName] = path.split("/")
  return componentRegistry.find(
    (component) =>
      component.category === category &&
      // This will be enhanced to match folder names
      component.name.toLowerCase() === componentName
  )
}

// Get all components by category
export function getComponentsByCategory(
  category: "components" | "primitives"
): ComponentMetadata[] {
  return componentRegistry.filter(
    (component) => component.category === category
  )
}

// Generate navigation from metadata
export function generateNavigation(): NavigationSection[] {
  const components = getComponentsByCategory("components")
  const primitives = getComponentsByCategory("primitives")

  return [
    {
      title: "Get Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          description: "Learn about BaseCamp and how to get started",
        },
      ],
    },
    {
      title: "Components",
      items: components.map((component) => ({
        title: component.name,
        href: `/docs/components/${component.name.toLowerCase()}`,
        description: component.description,
      })),
    },
    {
      title: "Primitives",
      items: primitives.map((component) => ({
        title: component.name,
        href: `/docs/primitives/${component.name.toLowerCase()}`,
        description: component.description,
      })),
    },
  ]
}

// Get all component paths for static generation
export function getAllComponentPaths(): string[] {
  return componentRegistry.map(
    (component) => `${component.category}/${component.name.toLowerCase()}`
  )
}

// Get component paths by category
export function getComponentPathsByCategory(
  category: "components" | "primitives"
): string[] {
  return componentRegistry
    .filter((component) => component.category === category)
    .map((component) => component.name.toLowerCase())
}
