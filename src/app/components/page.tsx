import React from "react"
import Link from "next/link"
import { buildRegistry } from "@/lib/registry"

export default async function ComponentsPage() {
  const registry = await buildRegistry()

  return (
    <div className="container mx-auto p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Components</h1>
        <p className="text-gray-600 text-lg">
          A collection of reusable UI components for your applications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {registry.components.map((component) => (
          <Link
            key={component.slug}
            href={`/components/${component.slug}`}
            className="group block"
          >
            <div className="border rounded-lg p-6 hover:shadow-lg transition-all duration-200 group-hover:border-blue-300">
              <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                {component.frontmatter.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {component.frontmatter.description}
              </p>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{component.examples.length} examples</span>
                <span className="group-hover:text-blue-500 transition-colors">
                  View details →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {registry.components.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No components found.</p>
        </div>
      )}
    </div>
  )
}
