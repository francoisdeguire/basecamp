import React from "react"
import { CategoryTitle } from "./CategoryTitle"
import { getStaticRegistry, getStaticRootPages } from "@/lib/content"
import { SidebarItem } from "./SidebarItem"

export async function DocsSidebar() {
  // Use static content instead of runtime filesystem operations
  const registry = await getStaticRegistry()
  const rootPagesWithTitles = getStaticRootPages().map((page) => ({
    slug: page.slug,
    path: page.path,
    title: page.frontmatter?.title || page.slug || "Introduction",
  }))

  return (
    <aside className="w-64 max-h-screen overflow-y-auto sticky top-16 pt-5">
      <div className="flex flex-col gap-5 p-3">
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
