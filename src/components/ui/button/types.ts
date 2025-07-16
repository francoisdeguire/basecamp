import { type VariantProps } from "class-variance-authority"
import { type ButtonProps as AriaButtonProps } from "react-aria-components"
import { buttonVariants } from "./variants"

export interface ButtonProps
  extends Omit<AriaButtonProps, "className">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  className?: string
}
