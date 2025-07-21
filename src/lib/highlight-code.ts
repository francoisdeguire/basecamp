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
 * Simple HTML escape utility for server-side use
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

/**
 * Creates line number transformers for code highlighting
 */
function createLineNumberTransformers(code: string): ShikiTransformer[] {
  const totalLines = code.split("\n").length
  let lineNumberWidth = "2ch"
  if (totalLines >= 1000) {
    lineNumberWidth = "4ch"
  } else if (totalLines >= 100) {
    lineNumberWidth = "3ch"
  }

  return [
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
        node.properties["class"] = ""

        // Add line numbers
        const lineNumber = line
        node.children.unshift({
          type: "element",
          tagName: "span",
          properties: {
            class:
              "mr-4 inline-block text-right text-muted-foreground/60 select-none",
            style: `min-width: ${lineNumberWidth}`,
            "data-line-number": lineNumber,
          },
          children: [{ type: "text", value: String(lineNumber) }],
        })
      },
    },
  ]
}

/**
 * Highlights code using Shiki with the same themes as rehype-pretty-code
 */
export async function highlightCode(
  code: string,
  lang: string = "tsx",
  showLineNumbers: boolean = true
): Promise<string> {
  try {
    const lineNumberTransformers = showLineNumbers
      ? createLineNumberTransformers(code)
      : []

    const highlighted = await codeToHtml(code, {
      lang,
      themes: {
        light: "min-light",
        dark: "min-dark",
      },
      defaultColor: false, // Don't add default background colors
      transformers: [...transformers, ...lineNumberTransformers],
    })

    return highlighted
  } catch (error) {
    console.error("Failed to highlight code:", error)
    // Fallback to basic HTML escaping
    return `<pre><code class="language-${lang}">${escapeHtml(
      code
    )}</code></pre>`
  }
}

// Re-export for convenience
export { codeToHtml } from "shiki"
export type { ShikiTransformer } from "shiki"
