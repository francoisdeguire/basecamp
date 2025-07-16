"use client"

import * as React from "react"
import { forwardRef } from "react"
import { Button as AriaButton } from "react-aria-components"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./variants"
import { type ButtonProps } from "./types"

/**
 * Basecamp Component Library - Button
 *
 * Supports multiple visual variants, sizes, and can be used as a regular button or
 * merged with any child element using the `asChild` pattern.
 *
 * @see http://localhost:3000/docs/components/button
 *
 * @example
 * ```tsx
 * // Standard button
 * <Button variant="default" size="lg">Click me</Button>
 *
 * // asChild pattern - merge props with child element
 * <Button asChild variant="outline">
 *   <a href="/home">Navigate home</a>
 * </Button>
 * ```
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size }), className)

    if (asChild && React.isValidElement(children)) {
      const { onPress, ...otherProps } = props

      return React.cloneElement(children, {
        ...otherProps,
        className: cn(
          classes,
          (children.props as Record<string, unknown>).className as string
        ),
        ref,
        onClick: (event: React.MouseEvent) => {
          const originalOnClick = (children.props as Record<string, unknown>)
            .onClick as ((event: React.MouseEvent) => void) | undefined
          originalOnClick?.(event)
          onPress?.(
            event as unknown as Parameters<NonNullable<typeof onPress>>[0]
          )
        },
      } as Record<string, unknown>)
    }

    return (
      <AriaButton className={classes} ref={ref} {...props}>
        {children}
      </AriaButton>
    )
  }
)

Button.displayName = "Button"

export { Button, type ButtonProps }
