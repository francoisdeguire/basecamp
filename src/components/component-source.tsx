import { getExampleCode, getExampleHighlightedCode } from "@/lib/code-extractor"
import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"

interface ComponentSourceProps {
  name?: string
  example?: string
  src?: string
  title?: string
  className?: string
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
    code = getExampleCode(name, example)
    highlightedCode = getExampleHighlightedCode(name, example)
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
    <figure className="relative overflow-hidden rounded-md bg-background">
      <figcaption className="flex items-center justify-between border-b bg-muted/50 px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-medium">
          <FileIcon />
          {title}
        </div>
        <CopyButton value={code} />
      </figcaption>

      <div className="[&>pre]:max-h-[350px] [&>pre]:overflow-auto [&>pre]:!bg-transparent [&>pre]:p-4 [&_code]:text-sm">
        <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </div>
    </figure>
  )
}

function FileIcon() {
  return (
    <svg
      className="h-4 w-4 text-blue-500"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2l3 3h5v14a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2h6z" />
    </svg>
  )
}
