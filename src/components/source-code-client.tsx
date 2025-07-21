"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"
import { FileIcon, ChevronDown, ChevronUp } from "lucide-react"

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
    "flex flex-col relative rounded-md bg-muted overflow-hidden",
    className
  )

  const contentClasses = cn(
    "[&>pre]:!bg-transparent [&>pre]:p-4 [&_code]:text-sm",
    !isExpanded && "max-h-96 overflow-y-hidden overflow-x-auto",
    isExpanded && "overflow-auto"
  )

  return (
    <figure className={containerClasses}>
      <figcaption className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <FileIcon className="size-4" />
          {filename}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="size-3" />
                Collapse
              </>
            ) : (
              <>
                <ChevronDown className="size-3" />
                Expand
              </>
            )}
          </button>
          <CopyButton value={code} className="-mt-1" />
        </div>
      </figcaption>

      <div
        className={contentClasses}
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </figure>
  )
}
