import { useState, useEffect } from "react"
import { codeToHtml } from "shiki"
import type { ShikiTransformer } from "shiki"

export const transformers = [
  {
    code(node) {
      if (node.tagName === "code") {
        const raw = this.source
        node.properties["__raw__"] = raw

        if (raw.startsWith("npm install")) {
          node.properties["__npm__"] = raw
          node.properties["__yarn__"] = raw.replace("npm install", "yarn add")
          node.properties["__pnpm__"] = raw.replace("npm install", "pnpm add")
          node.properties["__bun__"] = raw.replace("npm install", "bun add")
        }

        if (raw.startsWith("npx create-")) {
          node.properties["__npm__"] = raw
          node.properties["__yarn__"] = raw.replace(
            "npx create-",
            "yarn create "
          )
          node.properties["__pnpm__"] = raw.replace(
            "npx create-",
            "pnpm create "
          )
          node.properties["__bun__"] = raw.replace("npx", "bunx --bun")
        }

        // npm create.
        if (raw.startsWith("npm create")) {
          node.properties["__npm__"] = raw
          node.properties["__yarn__"] = raw.replace("npm create", "yarn create")
          node.properties["__pnpm__"] = raw.replace("npm create", "pnpm create")
          node.properties["__bun__"] = raw.replace("npm create", "bun create")
        }

        // npx.
        if (raw.startsWith("npx")) {
          node.properties["__npm__"] = raw
          node.properties["__yarn__"] = raw.replace("npx", "yarn")
          node.properties["__pnpm__"] = raw.replace("npx", "pnpm dlx")
          node.properties["__bun__"] = raw.replace("npx", "bunx --bun")
        }

        // npm run.
        if (raw.startsWith("npm run")) {
          node.properties["__npm__"] = raw
          node.properties["__yarn__"] = raw.replace("npm run", "yarn")
          node.properties["__pnpm__"] = raw.replace("npm run", "pnpm")
          node.properties["__bun__"] = raw.replace("npm run", "bun")
        }
      }
    },
  },
] as ShikiTransformer[]

/**
 * Highlights code using shiki with proper theming and transformers
 */
export async function highlightCode(code: string, language: string = "tsx") {
  try {
    const html = await codeToHtml(code, {
      lang: language,
      themes: {
        dark: "github-dark",
        light: "github-light",
      },
      transformers: [
        ...transformers,
        {
          pre(node) {
            node.properties["class"] =
              "no-scrollbar relative min-w-0 overflow-x-auto py-3 outline-none !bg-transparent"
          },
          code(node) {
            node.properties["data-line-numbers"] = ""
            node.properties["class"] = "grid"
          },
          line(node, line) {
            node.properties["data-line"] = ""
            node.properties["class"] = "px-4"

            // Add line numbers
            const lineNumber = line
            node.children.unshift({
              type: "element",
              tagName: "span",
              properties: {
                class:
                  "mr-4 inline-block w-8 text-right text-muted-foreground/60 select-none",
                "data-line-number": lineNumber,
              },
              children: [{ type: "text", value: String(lineNumber) }],
            })
          },
        },
      ],
    })

    return html
  } catch (error) {
    console.error("Failed to highlight code:", error)
    // Fallback to plain text if highlighting fails
    return `<pre class="bg-muted/50 p-4 text-sm overflow-auto"><code>${escapeHtml(
      code
    )}</code></pre>`
  }
}

/**
 * React hook for highlighting code with proper loading states
 */
export function useCodeHighlight(code: string, language: string = "tsx") {
  const [highlightedCode, setHighlightedCode] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!code) {
      setHighlightedCode("")
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    highlightCode(code, language)
      .then((html) => {
        setHighlightedCode(html)
      })
      .catch((err) => {
        setError(err)
        // Fallback to escaped plain text
        setHighlightedCode(
          `<pre class="bg-muted/50 p-4 text-sm overflow-auto"><code>${escapeHtml(
            code
          )}</code></pre>`
        )
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [code, language])

  return { highlightedCode, isLoading, error }
}

/**
 * Simple HTML escape utility
 */
function escapeHtml(text: string): string {
  const div = document.createElement("div")
  div.textContent = text
  return div.innerHTML
}

// Re-export for convenience
export { codeToHtml } from "shiki"
export type { ShikiTransformer } from "shiki"
