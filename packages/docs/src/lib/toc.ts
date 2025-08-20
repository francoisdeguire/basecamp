import { generateHeaderId } from "./text-utils"

export interface TocItem {
  id: string
  text: string
  level: number
  children?: TocItem[]
}

export function extractTocFromMdx(content: string): TocItem[] {
  const lines = content.split("\n")
  const flatToc: TocItem[] = []

  for (const line of lines) {
    // Match markdown headers (## ### #### ##### ######) - exclude h1
    const headerMatch = line.match(/^(#{2,6})\s+(.+)$/)
    if (headerMatch) {
      const level = headerMatch[1].length
      const text = headerMatch[2].trim()
      const id = generateHeaderId(text)

      flatToc.push({ id, text, level })
    }
  }

  // Convert flat structure to hierarchical
  return buildHierarchicalToc(flatToc)
}

function buildHierarchicalToc(flatToc: TocItem[]): TocItem[] {
  const toc: TocItem[] = []
  const stack: TocItem[] = []

  for (const item of flatToc) {
    const newItem: TocItem = { ...item, children: [] }

    // Find the appropriate parent
    while (stack.length > 0 && stack[stack.length - 1].level >= item.level) {
      stack.pop()
    }

    if (stack.length === 0) {
      toc.push(newItem)
    } else {
      stack[stack.length - 1].children!.push(newItem)
    }

    stack.push(newItem)
  }

  return toc
}

// Re-export from text-utils for backward compatibility
export { generateHeaderId } from "./text-utils"
