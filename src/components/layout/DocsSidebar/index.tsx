import Link from "next/link"
import React from "react"
import { CategoryTitle } from "./CategoryTitle"
import { buildRegistry } from "@/lib/registry"
import { getRootPages } from "@/lib/config"
import { parseMDXFile } from "@/lib/mdx"

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
    <aside className="w-64 max-h-screen overflow-y-auto sticky top-16 pt-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-0.5">
          <CategoryTitle>Getting started</CategoryTitle>
          <ul className="flex flex-col gap-0.5">
            {rootPagesWithTitles.map((page) => (
              <li key={page.slug || "index"}>
                <Link
                  href={page.slug ? `/docs/${page.slug}` : "/docs"}
                  className="text-sm hover:underline h-8"
                >
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-1">
          <CategoryTitle>Primitives</CategoryTitle>
          <ul className="flex flex-col gap-0.5">
            {registry.primitives.map((primitive) => (
              <li key={primitive.slug}>
                <Link
                  href={`/docs/primitives/${primitive.slug}`}
                  className="text-sm hover:underline"
                >
                  {primitive.frontmatter.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-1">
          <CategoryTitle>Components</CategoryTitle>
          <ul className="flex flex-col gap-0.5">
            {registry.components.map((component) => (
              <li key={component.slug}>
                <Link
                  href={`/docs/components/${component.slug}`}
                  className="text-sm hover:underline"
                >
                  {component.frontmatter.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  )
}
