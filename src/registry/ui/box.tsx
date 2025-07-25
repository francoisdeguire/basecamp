import React from "react"
import { cn } from "@/lib/utils"

interface BoxProps {
  children: React.ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export function Box({ children, className, as: Component = "div" }: BoxProps) {
  return <Component className={cn(className)}>{children}</Component>
}
