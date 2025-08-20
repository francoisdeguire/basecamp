import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function mergeRefs<T>(
  ...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> {
  return (value: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value)
      } else if (ref && typeof ref === "object" && "current" in ref) {
        ;(ref as { current: T | null }).current = value
      }
    })
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
