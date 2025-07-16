import { type VariantProps } from "class-variance-authority"
import { type TooltipProps as AriaTooltipProps } from "react-aria-components"
import { tooltipContentVariants, tooltipArrowVariants } from "./variants"

export interface TooltipTriggerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  delay?: number
  closeDelay?: number
}

export interface TooltipProps
  extends Omit<AriaTooltipProps, "children">,
    VariantProps<typeof tooltipContentVariants> {
  children: React.ReactNode
  showArrow?: boolean
  arrowClassName?: string
}

export interface TooltipArrowProps
  extends VariantProps<typeof tooltipArrowVariants> {
  className?: string
}
