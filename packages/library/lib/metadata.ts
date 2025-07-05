export interface ComponentExample {
  name: string
  description?: string
  file: string // Path to the example file
  preview?: React.ReactNode
}

export interface CustomSection {
  title: string
  content: string // Markdown content
  order?: number // Optional ordering
}

export interface ComponentProp {
  name: string
  type: string
  default?: string
  description: string
  required?: boolean
}

export interface ComponentMetadata {
  name: string
  description: string
  category: "components" | "primitives"
  examples: ComponentExample[]
  props: Record<string, ComponentProp>
  dependencies?: string[]
  imports?: string[]
  customSections?: CustomSection[] // New: custom sections
}

export interface NavigationItem {
  title: string
  href: string
  description?: string
  items?: NavigationItem[]
}

export interface NavigationSection {
  title: string
  items: NavigationItem[]
}
