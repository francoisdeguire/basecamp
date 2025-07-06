import React from "react"
import { buildRegistry, validateRegistry } from "@/lib/registry"

export default async function TestRegistryPage() {
  // Build the registry
  const registry = await buildRegistry()
  const validation = validateRegistry(registry)

  return (
    <div className="container mx-auto p-8 max-w-6xl">
      <h1 className="text-4xl font-bold mb-8">Registry Test Page</h1>

      <div className="space-y-8">
        {/* Registry Status */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Registry Status</h2>
          <div
            className={`border rounded-lg p-4 ${
              validation.isValid
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <p
              className={`font-medium ${
                validation.isValid ? "text-green-800" : "text-red-800"
              }`}
            >
              {validation.isValid
                ? "✅ Registry is valid"
                : "❌ Registry has errors"}
            </p>
            <p className="text-sm mt-2">
              Total components: {registry.totalCount} | Last updated:{" "}
              {new Date(registry.lastUpdated).toLocaleString()}
            </p>
            {!validation.isValid && (
              <div className="mt-4">
                <p className="text-red-700 font-medium">Errors:</p>
                <ul className="list-disc list-inside text-red-600 text-sm mt-2">
                  {validation.errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* UI Components */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            UI Components ({registry.components.length})
          </h2>
          {registry.components.length === 0 ? (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-gray-600">No UI components found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {registry.components.map((component) => (
                <div
                  key={component.slug}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    {component.frontmatter.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {component.frontmatter.description}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Slug: {component.slug}</span>
                    <span>{component.examples.length} examples</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Primitives */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Primitives ({registry.primitives.length})
          </h2>
          {registry.primitives.length === 0 ? (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-gray-600">No primitives found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {registry.primitives.map((primitive) => (
                <div
                  key={primitive.slug}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    {primitive.frontmatter.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {primitive.frontmatter.description}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Slug: {primitive.slug}</span>
                    <span>{primitive.examples.length} examples</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Raw Registry Data */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Raw Registry Data</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
            <code>{JSON.stringify(registry, null, 2)}</code>
          </pre>
        </section>
      </div>
    </div>
  )
}
