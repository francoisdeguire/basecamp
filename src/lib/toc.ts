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
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-") // Replace multiple hyphens with single
        .replace(/^-|-$/g, "") // Remove leading/trailing hyphens

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

export function generateHeaderId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .replace(/^-|-$/g, "") // Remove leading/trailing hyphens
}
