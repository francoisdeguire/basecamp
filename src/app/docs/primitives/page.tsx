import React from "react"
import Link from "next/link"
import { buildRegistry } from "@/lib/registry"

export default async function PrimitivesPage() {
  const registry = await buildRegistry()

  return (
    <div className="container mx-auto p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Primitives</h1>
        <p className="text-gray-600 text-lg">
          Basic building blocks for creating more complex components.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {registry.primitives.map((primitive) => (
          <Link
            key={primitive.slug}
            href={`/docs/primitives/${primitive.slug}`}
            className="group block"
          >
            <div className="border rounded-lg p-6 hover:shadow-lg transition-all duration-200 group-hover:border-green-300">
              <h2 className="text-xl font-semibold mb-2 group-hover:text-green-600 transition-colors">
                {primitive.frontmatter.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {primitive.frontmatter.description}
              </p>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{primitive.examples.length} examples</span>
                <span className="group-hover:text-green-500 transition-colors">
                  View details →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {registry.primitives.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No primitives found.</p>
        </div>
      )}
    </div>
  )
}
