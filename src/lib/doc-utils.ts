import { ValidationError, ValidationResult } from "@/types/component"

export function formatComponentName(name: string): string {
  return name
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim()
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

// Validation utilities
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
