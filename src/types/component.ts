export interface ComponentProp {
  type: string
  default?: string
  description: string
  required?: boolean
}

export interface ComponentFrontmatter {
  title: string
  description: string
  props?: Record<string, ComponentProp>
  dependencies?: string[]
  copyable?: boolean
}

export interface ComponentInfo {
  name: string
  type: "ui" | "primitive"
  path: string
  frontmatter: ComponentFrontmatter
  slug: string
}

export interface ExampleInfo {
  name: string
  title: string
  description?: string
  code: string
}

// Validation error types
export interface ValidationError {
  component: string
  field: string
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}
