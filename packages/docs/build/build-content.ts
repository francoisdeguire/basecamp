import { promises as fs } from "fs"
import path from "path"
import { CONFIG } from "./lib/config"
import { buildRegistry } from "./lib/build-registry"
import { getRootPages } from "./lib/build-config"
import { parseMDXFile } from "./lib/build-mdx"

/**
 * Generate static content JSON to replace runtime fs calls
 * This eliminates the 5+ second page load times caused by fs operations
 */
async function buildContentJSON() {
  try {
    // Generate registry data (components + primitives) with content
    const registry = await buildRegistry()

    // Add content to each component (extend ComponentInfo with content field)
    const allComponents = [...registry.components, ...registry.primitives]

    for (let i = 0; i < allComponents.length; i++) {
      const component = allComponents[i]
      const mdxContent = await parseMDXFile(component.path)
      if (mdxContent) {
        // Type-safe content addition
        Object.assign(component, { content: mdxContent.content })
      }
    }

    // Generate root pages data
    const rootPages = getRootPages()
    const rootPagesData = []

    for (const page of rootPages) {
      const mdxContent = await parseMDXFile(page.path)
      if (mdxContent) {
        rootPagesData.push({
          slug: page.slug,
          path: page.path,
          frontmatter: mdxContent.frontmatter,
          content: mdxContent.content,
        })
      }
    }

    // Combine all content data
    const contentData = {
      registry,
      rootPages: rootPagesData,
      buildTime: new Date().toISOString(),
    }

    // Write to generated directory
    const generatedDir = path.join(CONFIG.ROOT_DIR, "src/generated")
    await fs.mkdir(generatedDir, { recursive: true })

    const contentFile = path.join(generatedDir, "content.json")
    await fs.writeFile(
      contentFile,
      JSON.stringify(contentData, null, 2),
      "utf-8"
    )

    console.log(
      `📄 Generated content.json (${registry.totalCount} components, ${rootPagesData.length} pages, ${(JSON.stringify(contentData).length / 1024).toFixed(1)}KB)`
    )
  } catch (error) {
    console.error("💥 Failed to generate content JSON:", error)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  buildContentJSON()
}

export { buildContentJSON }
