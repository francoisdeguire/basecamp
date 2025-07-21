"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"
import { ChevronDown, FileIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"

interface SourceCodeClientProps {
  filename: string
  code: string
  highlightedCode: string
  className?: string
}

export function SourceCodeClient({
  filename,
  code,
  highlightedCode,
  className,
}: SourceCodeClientProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const containerClasses = cn(
    "flex flex-col relative rounded-md bg-muted overflow-hidden mt-4",
    className
  )

  const contentClasses = cn(
    "[&>pre]:!bg-transparent [&>pre]:p-4 [&_code]:text-sm relative",
    !isExpanded && "max-h-48 overflow-y-hidden overflow-x-auto",
    isExpanded && "overflow-auto"
  )

  return (
    <figure className={containerClasses}>
      <figcaption className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <FileIcon className="size-4" />
          {filename}
        </div>

        <Button
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="cursor-pointer -my-2 flex bg-transparent shadow-none hover:bg-transparent font-medium items-center gap-1 text-xs mr-7 relative after:content-[''] after:absolute after:h-6 after:w-px after:right-0 after:bg-border after:top-1/2 after:-translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          {isExpanded ? "Collapse" : "Expand"}
        </Button>
        <CopyButton value={code} className=" -mt-1" />
      </figcaption>

      <div
        className={contentClasses}
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />

      {!isExpanded && (
        <div
          tabIndex={-1}
          className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-muted via-muted/60 to-transparent via-40% flex items-center justify-center cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Button
            variant="secondary"
            size="sm"
            className="shadow-md"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <ChevronDown className="size-4" />
            Expand
          </Button>
        </div>
      )}
    </figure>
  )
}
