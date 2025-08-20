"use client"

import * as React from "react"
import { CheckIcon, ClipboardIcon } from "lucide-react"

import { cn } from "@/shared/utils"
import { Button } from "@/components/registry-client"
import { Tooltip, TooltipTrigger } from "@/components/registry-client"

export function copyToClipboardWithMeta(value: string) {
  navigator.clipboard.writeText(value)
}

export function CopyButton({
  value,
  className,
  variant = "tertiary",
  ...props
}: React.ComponentProps<typeof Button> & {
  value: string
  src?: string
}) {
  const [hasCopied, setHasCopied] = React.useState(false)
  const [tooltipText, setTooltipText] = React.useState("Copy to Clipboard")

  React.useEffect(() => {
    if (hasCopied) {
      // Immediately change to "Copied" when copied
      setTooltipText("Copied")

      // Start closing tooltip after 2 seconds
      const timer = setTimeout(() => setHasCopied(false), 2000)
      return () => clearTimeout(timer)
    } else {
      // Add delay before changing text back to let tooltip fade out
      const textTimer = setTimeout(() => {
        setTooltipText("Copy to Clipboard")
      }, 200)
      return () => clearTimeout(textTimer)
    }
  }, [hasCopied])

  if (!value) {
    return null
  }

  return (
    <TooltipTrigger
      delay={100}
      isOpen={hasCopied ? true : undefined}
      onOpenChange={(open: boolean) => {
        // Only prevent closing if we're showing the copied state
        if (hasCopied && !open) {
          return // Prevent closing while showing "Copied"
        }
      }}
    >
      <Button
        data-slot="copy-button"
        size="icon"
        variant={variant}
        className={cn(
          "bg-code absolute top-3 right-2 z-10 size-7 hover:opacity-100 focus-visible:opacity-100 text-muted-foreground",
          className
        )}
        onClick={() => {
          copyToClipboardWithMeta(value)
          setHasCopied(true)
        }}
        {...props}
      >
        <span className="sr-only">Copy</span>
        {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
      </Button>
      <Tooltip>{tooltipText}</Tooltip>
    </TooltipTrigger>
  )
}
