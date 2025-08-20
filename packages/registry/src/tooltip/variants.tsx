import { cva } from "class-variance-authority"

export const tooltipContentVariants = cva(
  [
    // Base styles - adapted from shadcn/ui
    "z-50 origin-[--origin] rounded-md px-3 py-1.5 text-xs",
    "bg-primary text-primary-foreground",
    "shadow-md",
    // Animation classes
    "animate-in fade-in-0 zoom-in-95",
    "data-[exiting]:animate-out data-[exiting]:fade-out-0 data-[exiting]:zoom-out-95",
    // Directional slide animations
    "data-[placement=bottom]:slide-in-from-top-2",
    "data-[placement=left]:slide-in-from-right-2",
    "data-[placement=right]:slide-in-from-left-2",
    "data-[placement=top]:slide-in-from-bottom-2",
    // Text balance for better text wrapping
    "text-balance",
    // Placement-specific margins to close gaps
    "data-[placement=top]:mb-2",
    "data-[placement=bottom]:mt-2",
    "data-[placement=left]:mr-2",
    "data-[placement=right]:ml-2",
    // Arrow rotation based on placement
    "data-[placement=bottom]:*:rotate-180",
    "data-[placement=left]:*:-rotate-90",
    "data-[placement=right]:*:rotate-90",
  ],
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "bg-background border border-border text-foreground shadow-sm",
      },
      size: {
        default: "px-3 py-1.5 text-xs",
        sm: "px-2 py-1 text-xs",
        lg: "px-4 py-2 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export const tooltipArrowVariants = cva(["block"], {
  variants: {
    variant: {
      default: "fill-primary",
      secondary: "fill-secondary",
      destructive: "fill-destructive",
      outline: "fill-background stroke-border stroke-1",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})
