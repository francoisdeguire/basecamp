import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { ValidationError, ValidationResult } from "@/types/component"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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

  if (!Array.isArray(frontmatter.examples)) {
    errors.push({
      component: componentName,
      field: "examples",
      message: "Examples must be an array",
    })
  }

  if (!frontmatter.props || typeof frontmatter.props !== "object") {
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

// Error handling utilities
export function createErrorBoundary(componentName: string) {
  return {
    logError: (error: Error, context?: string) => {
      console.error(`[${componentName}] ${context || "Error"}:`, error)
    },
    createFallback: (message: string) => {
      return {
        componentName,
        message,
        className: "p-4 border border-red-200 bg-red-50 rounded-md",
      }
    },
  }
}
