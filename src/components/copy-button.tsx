"use client"

import * as React from "react"
import { CheckIcon, ClipboardIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Tooltip, TooltipTrigger } from "@/registry/ui/tooltip"

export function copyToClipboardWithMeta(value: string) {
  navigator.clipboard.writeText(value)
}

export function CopyButton({
  value,
  className,
  variant = "ghost",
  ...props
}: React.ComponentProps<typeof Button> & {
  value: string
  src?: string
}) {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [])

  return (
    <TooltipTrigger>
      <Button
        data-slot="copy-button"
        size="icon"
        variant={variant}
        className={cn(
          "bg-code absolute top-3 right-2 z-10 size-7 hover:opacity-100 focus-visible:opacity-100",
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
      <Tooltip>{hasCopied ? "Copied" : "Copy to Clipboard"}</Tooltip>
    </TooltipTrigger>
  )
}
