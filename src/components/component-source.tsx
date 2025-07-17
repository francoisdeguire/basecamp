import { getExampleCode, getExampleHighlightedCode } from "@/lib/code-extractor"
import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"
import { FolderIcon } from "lucide-react"

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
  return code.replace(/@\/registry\/ui\//g, "@/components/ui/")
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
    // Use pre-highlighted code from build system
    const rawCode = getExampleCode(name, example)
    const rawHighlightedCode = getExampleHighlightedCode(name, example)

    // Process code for display
    code = rawCode ? processCode(rawCode) : undefined
    highlightedCode = rawHighlightedCode
      ? processCode(rawHighlightedCode)
      : undefined
  }

  // TODO: Handle src prop if needed (would require different approach)
  if (src && !code) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-md border bg-background",
          className
        )}
      >
        <div className="flex h-[200px] items-center justify-center">
          <div className="text-sm text-destructive">
            Direct file loading not supported in server component
          </div>
        </div>
      </div>
    )
  }

  if (!code || !highlightedCode) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-md border bg-background",
          className
        )}
      >
        <div className="flex h-[200px] items-center justify-center">
          <div className="text-sm text-destructive">
            Code not found for {name}-{example}
          </div>
        </div>
      </div>
    )
  }

  const displayTitle = title || `${name}-${example}.tsx`

  return (
    <div className={cn("relative", className)}>
      <ComponentCode
        code={code}
        highlightedCode={highlightedCode}
        title={displayTitle}
      />
    </div>
  )
}

function ComponentCode({
  code,
  highlightedCode,
  title,
}: {
  code: string
  highlightedCode: string
  title: string
}) {
  return (
    <figure className="relative overflow-hidden rounded-md">
      <figcaption className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <FolderIcon className="size-4 " />
          {title}
        </div>
        <CopyButton value={code} className="-mt-1" />
      </figcaption>

      <div className="[&>pre]:max-h-[350px] [&>pre]:overflow-auto [&>pre]:!bg-transparent [&>pre]:p-4 [&_code]:text-sm">
        <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </div>
    </figure>
  )
}
