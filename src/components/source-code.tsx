import {
  getRegistryCode,
  getRegistryHighlightedCode,
} from "@/generated/code-extractor"
import { SourceCodeClient } from "./source-code-client"

interface SourceCodeProps {
  filename: string
  src: string
  className?: string
}

function ErrorDisplay({ message }: { message: string }) {
  return (
    <div className="relative overflow-hidden rounded-md border bg-background mt-4">
      <div className="flex h-[100px] items-center justify-center">
        <div className="text-sm text-destructive">{message}</div>
      </div>
    </div>
  )
}

export function SourceCode({ filename, src, className }: SourceCodeProps) {
  // Use pre-built highlighted code from build system
  const code = getRegistryCode(src)
  const highlightedCode = getRegistryHighlightedCode(src)

  if (!code || code.startsWith("// No code available")) {
    return <ErrorDisplay message={`Could not find registry file: ${src}`} />
  }

  return (
    <SourceCodeClient
      filename={filename}
      code={code}
      highlightedCode={highlightedCode}
      className={className}
    />
  )
}
