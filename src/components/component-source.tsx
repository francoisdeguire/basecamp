"use client"

import { getExampleCode, getExampleHighlightedCode } from "@/lib/code-extractor"
import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"
import { FileIcon } from "lucide-react"

interface ComponentSourceProps {
  name?: string
  example?: string
  src?: string
  title?: string
  className?: string
}

/**
 * Processes code by replacing registry imports for display purposes
 */
function processCode(code: string): string {
  return code.replace(/@\/registry\/ui\//g, "@/components/registry-client")
}

function ErrorDisplay({ message }: { message: string }) {
  return (
    <div className="relative overflow-hidden rounded-md border bg-background">
      <div className="flex h-[100px] items-center justify-center">
        <div className="text-sm text-destructive">{message}</div>
      </div>
    </div>
  )
}

export function ComponentSource({
  name,
  example = "basic",
  src,
  title,
  className,
}: ComponentSourceProps) {
  if (!name && !src) {
    return null
  }

  let code: string | undefined
  let highlightedCode: string | undefined

  if (name && example) {
    const rawCode = getExampleCode(name, example)
    const rawHighlightedCode = getExampleHighlightedCode(name, example)

    code = rawCode ? processCode(rawCode) : undefined
    highlightedCode = rawHighlightedCode
      ? processCode(rawHighlightedCode)
      : undefined
  }

  // Handle src prop (not currently supported)
  if (src && !code) {
    return (
      <ErrorDisplay message="Direct file loading not supported in server component" />
    )
  }

  // Handle missing code
  if (!code || !highlightedCode) {
    return <ErrorDisplay message={`Code not found for ${name}-${example}`} />
  }

  const displayTitle = title || `${name}-${example}.tsx`

  return (
    <figure
      className={cn(
        "flex flex-col relative rounded-md bg-muted h-full overflow-auto",
        className
      )}
    >
      <figcaption className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <FileIcon className="size-4" />
          {displayTitle}
        </div>

        <CopyButton value={code} className="-mt-1" />
      </figcaption>

      <div
        className="flex-1 min-h-0 [&>pre]:!bg-transparent [&>pre]:p-4 [&>pre]:h-full [&_code]:text-sm"
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </figure>
  )
}
