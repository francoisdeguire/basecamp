import React from "react"
import { CategoryTitle } from "./CategoryTitle"
import { buildRegistry } from "@/lib/registry"
import { getRootPages } from "@/lib/config"
import { parseMDXFile } from "@/lib/mdx"
import { SidebarItem } from "./SidebarItem"

export async function DocsSidebar() {
  const registry = await buildRegistry()
  const rootPages = getRootPages()

  // Get root page titles
  const rootPagesWithTitles = await Promise.all(
    rootPages.map(async (page) => {
      const mdxContent = await parseMDXFile(page.path)
      return {
        ...page,
        title: mdxContent?.frontmatter.title || page.slug || "Introduction",
      }
    })
  )

  return (
    <aside className="w-64 max-h-screen overflow-y-auto sticky top-16 pt-5">
      <div className="flex flex-col gap-6 p-3">
        <div className="flex flex-col gap-0.5">
          <CategoryTitle>Getting started</CategoryTitle>
          <ul className="flex flex-col gap-0.5">
            {rootPagesWithTitles.map((page) => (
              <SidebarItem
                href={page.slug ? `/docs/${page.slug}` : "/docs"}
                key={page.slug || "index"}
              >
                {page.title}
              </SidebarItem>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-1">
          <CategoryTitle>Primitives</CategoryTitle>
          <ul className="flex flex-col gap-0.5">
            {registry.primitives.map((primitive) => (
              <SidebarItem
                href={`/docs/primitives/${primitive.slug}`}
                key={primitive.slug}
              >
                {primitive.frontmatter.title}
              </SidebarItem>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-1">
          <CategoryTitle>Components</CategoryTitle>
          <ul className="flex flex-col gap-0.5">
            {registry.components.map((component) => (
              <SidebarItem
                href={`/docs/components/${component.slug}`}
                key={component.slug}
              >
                {component.frontmatter.title}
              </SidebarItem>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  )
}
