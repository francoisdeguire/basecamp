import Link from "next/link"
import React from "react"
import { CategoryTitle } from "./CategoryTitle"
import { buildRegistry } from "@/lib/registry"

export async function DocsSidebar() {
  const registry = await buildRegistry()

  return (
    <aside className="w-64 max-h-screen overflow-y-auto sticky top-16 pt-8">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-0.5 py-4">
          <CategoryTitle>Getting started</CategoryTitle>
          <ul className="flex flex-col gap-0.5">
            <li>
              <Link href="/docs" className="text-sm hover:underline h-8">
                Introduction
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-1 py-4">
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

        <div className="flex flex-col gap-1 py-4">
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
