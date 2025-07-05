import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge Tailwind CSS classes with proper conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Utility function to create variant classes for components
 */
export function createVariants<T extends Record<string, string>>(
  base: string,
  variants: T
) {
  return (variant: keyof T) => `${base} ${variants[variant]}`
}

/**
 * Utility function to create size variants
 */
export function createSizeVariants(
  base: string,
  sizes: Record<string, string>
) {
  return (size: keyof typeof sizes) => `${base} ${sizes[size]}`
}

/**
 * Utility function to create responsive variants
 */
export function createResponsiveVariants(
  base: string,
  variants: Record<string, string>
) {
  return (variant: keyof typeof variants) => `${base} ${variants[variant]}`
}

/**
 * Utility function to create compound variants
 */
export function createCompoundVariants<T extends Record<string, any>>(
  base: string,
  variants: T
) {
  return (props: Partial<T>) => {
    const classes = [base]
    Object.entries(props).forEach(([key, value]) => {
      if (value && variants[key]?.[value]) {
        classes.push(variants[key][value])
      }
    })
    return classes.join(" ")
  }
}

/**
 * Utility function to create CSS custom properties for design tokens
 */
export function createCSSVariables(tokens: Record<string, string>) {
  return Object.entries(tokens)
    .map(([key, value]) => `--${key}: ${value};`)
    .join("\n")
}

/**
 * Utility function to create spacing scale
 */
export function createSpacingScale(
  scale: number[] = [
    0, 0.25, 0.5, 1, 1.5, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64,
  ]
) {
  return scale.reduce((acc, value, index) => {
    acc[index] = `${value}rem`
    return acc
  }, {} as Record<number, string>)
}

/**
 * Utility function to create color palette
 */
export function createColorPalette(colors: Record<string, string>) {
  return Object.entries(colors).reduce((acc, [name, value]) => {
    acc[name] = value
    return acc
  }, {} as Record<string, string>)
}

// Component metadata types
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
