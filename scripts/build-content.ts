import { promises as fs } from "fs"
import path from "path"
import { CONFIG } from "../src/lib/config"
import { buildRegistry } from "../src/lib/registry"
import { getRootPages } from "../src/lib/config"
import { parseMDXFile } from "../src/lib/mdx"

/**
 * Generate static content JSON to replace runtime fs calls
 * This eliminates the 5+ second page load times caused by fs operations
 */
async function buildContentJSON() {
  console.log("📄 Generating static content JSON...")

  try {
    // Generate registry data (components + primitives) with content
    const registry = await buildRegistry()

    // Add content to each component
    for (const component of [...registry.components, ...registry.primitives]) {
      const mdxContent = await parseMDXFile(component.path)
      if (mdxContent) {
        ;(component as any).content = mdxContent.content
      }
    }

    console.log(`✅ Built registry with ${registry.totalCount} components`)

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

    console.log(`✅ Built ${rootPagesData.length} root pages`)

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

    console.log("🚀 Static content JSON generated successfully!")
    console.log(`📁 File: ${path.relative(CONFIG.ROOT_DIR, contentFile)}`)
    console.log(
      `📊 Size: ${(JSON.stringify(contentData).length / 1024).toFixed(1)}KB`
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
