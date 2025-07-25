import { codeMap } from "@/generated/code-map"
import { highlightedMap } from "@/generated/highlighted-map"

export function getExampleCode(
  componentName: string,
  exampleName: string
): string {
  const key = `example:${componentName}-${exampleName}`
  return (
    codeMap[key] || `// No code available for ${componentName}/${exampleName}`
  )
}

export function getExampleHighlightedCode(
  componentName: string,
  exampleName: string
): string {
  const key = `example:${componentName}-${exampleName}`
  return (
    highlightedMap[key] ||
    `<pre><code>// No code available for ${componentName}/${exampleName}</code></pre>`
  )
}

export function getRegistryCode(src: string): string {
  const key = `registry:${src}`
  return codeMap[key] || `// No code available for ${src}`
}

export function getRegistryHighlightedCode(src: string): string {
  const key = `registry:${src}`
  return (
    highlightedMap[key] ||
    `<pre><code>// No code available for ${src}</code></pre>`
  )
}
