import * as React from "react"
import { forwardRef } from "react"
import {
  Tooltip as AriaTooltip,
  TooltipTrigger as AriaTooltipTrigger,
  OverlayArrow,
} from "react-aria-components"
import { cn } from "../../lib/utils"
import { tooltipContentVariants, tooltipArrowVariants } from "./variants"
import {
  type TooltipProps,
  type TooltipTriggerProps,
  type TooltipArrowProps,
} from "./types"

/**
 * Basecamp Component Library - Tooltip
 *
 * A floating tooltip that displays additional information when hovering or focusing
 * on an element. Built with React Aria for accessibility and supports multiple
 * visual variants and sizes.
 *
 * @see http://localhost:3000/docs/components/tooltip
 *
 * @example
 * ```tsx
 * <TooltipTrigger delay={300} closeDelay={0}>
 *   <Button>Hover me</Button>
 *   <Tooltip>This is a helpful tooltip</Tooltip>
 * </TooltipTrigger>
 * ```
 */

const TooltipTrigger: React.FC<TooltipTriggerProps> = ({
  delay = 700,
  closeDelay = 0,
  ...props
}) => {
  return <AriaTooltipTrigger delay={delay} closeDelay={closeDelay} {...props} />
}

TooltipTrigger.displayName = "TooltipTrigger"

/**
 * Tooltip component that displays styled content with variants and optional arrow.
 */
const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      className,
      variant,
      size,
      showArrow = true,
      arrowClassName,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <AriaTooltip
        ref={ref}
        className={cn(tooltipContentVariants({ variant, size }), className)}
        {...props}
      >
        {children}
        {showArrow && (
          <TooltipArrow variant={variant} className={arrowClassName} />
        )}
      </AriaTooltip>
    )
  }
)

Tooltip.displayName = "Tooltip"

const TooltipArrow = forwardRef<SVGSVGElement, TooltipArrowProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <OverlayArrow>
        <svg
          ref={ref}
          width={8}
          height={8}
          viewBox="0 0 8 8"
          className={cn(tooltipArrowVariants({ variant }), className)}
          {...props}
        >
          <path d="M0 0 L4 4 L8 0" />
        </svg>
      </OverlayArrow>
    )
  }
)

TooltipArrow.displayName = "TooltipArrow"

export {
  Tooltip,
  TooltipTrigger,
  TooltipArrow,
  type TooltipProps,
  type TooltipTriggerProps,
  type TooltipArrowProps,
}
