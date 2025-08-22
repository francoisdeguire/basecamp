import type {
  ValidationError,
  ValidationResult,
  ComponentFrontmatter,
  RegistryData,
} from "@/lib/types"

/**
 * Centralized validation logic for components, frontmatter, and registry data
 */

// Frontmatter validation (moved from doc-utils.ts)
export function validateFrontmatter(
  componentName: string,
  frontmatter: Record<string, unknown>
): ValidationResult {
  const errors: ValidationError[] = []

  if (!frontmatter.title || typeof frontmatter.title !== "string") {
    errors.push({
      component: componentName,
      field: "title",
      message: "Title is required and must be a string",
    })
  }

  if (!frontmatter.description || typeof frontmatter.description !== "string") {
    errors.push({
      component: componentName,
      field: "description",
      message: "Description is required and must be a string",
    })
  }

  // Only validate props for component pages
  // (Skip validation if this field is not present, as it's optional for docs pages)
  if (
    frontmatter.props !== undefined &&
    (typeof frontmatter.props !== "object" || frontmatter.props === null)
  ) {
    errors.push({
      component: componentName,
      field: "props",
      message: "Props must be an object",
    })
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Registry validation (moved from registry.ts)
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

// Component data validation
export function validateComponent(
  name: string,
  type: "ui" | "primitive",
  frontmatter: ComponentFrontmatter
): ValidationResult {
  const errors: ValidationError[] = []

  // Basic name validation
  if (!name || typeof name !== "string") {
    errors.push({
      component: name || "unknown",
      field: "name",
      message: "Component name is required and must be a string",
    })
  }

  // Type validation
  if (!["ui", "primitive"].includes(type)) {
    errors.push({
      component: name,
      field: "type",
      message: "Component type must be either 'ui' or 'primitive'",
    })
  }

  // Frontmatter validation
  const frontmatterValidation = validateFrontmatter(
    name,
    frontmatter as unknown as Record<string, unknown>
  )
  errors.push(...frontmatterValidation.errors)

  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Utility for collecting all validation errors
export function validateAll(registry: RegistryData): {
  isValid: boolean
  registryErrors: string[]
  componentErrors: ValidationError[]
} {
  const registryValidation = validateRegistry(registry)
  const componentErrors: ValidationError[] = []

  // Validate each component individually
  for (const component of [...registry.components, ...registry.primitives]) {
    const validation = validateComponent(
      component.name,
      component.type,
      component.frontmatter
    )
    componentErrors.push(...validation.errors)
  }

  return {
    isValid: registryValidation.isValid && componentErrors.length === 0,
    registryErrors: registryValidation.errors,
    componentErrors,
  }
}
