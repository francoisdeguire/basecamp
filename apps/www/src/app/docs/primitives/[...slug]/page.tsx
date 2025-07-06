import { notFound } from "next/navigation"
import {
  getComponentMetadata,
  getComponentPathsByCategory,
} from "@basecamp/lib/registry"
import { loadExample } from "@basecamp/lib/load-example"

// Generate static params for all primitive pages
export async function generateStaticParams() {
  const paths = getComponentPathsByCategory("primitives")
  return paths.map((path) => ({
    slug: [path],
  }))
}

interface PageProps {
  params: Promise<{
    slug: string[]
  }>
}

export default async function PrimitivePage({ params }: PageProps) {
  const { slug } = await params

  // Get component metadata
  const componentPath = `primitives/${slug[0]}`
  const metadata = getComponentMetadata(componentPath)

  if (!metadata) {
    notFound()
  }

  // Load all examples
  const loadedExamples = await Promise.all(
    metadata.examples.map(async (example) => {
      try {
        return await loadExample(example, componentPath)
      } catch (error) {
        console.error(`Failed to load example ${example.name}:`, error)
        return null
      }
    })
  )

  // Filter out failed examples
  const validExamples = loadedExamples.filter(
    (example): example is NonNullable<typeof example> => example !== null
  )

  // Sort custom sections by order
  const sortedCustomSections =
    metadata.customSections?.sort((a, b) => {
      const orderA = a.order ?? 999
      const orderB = b.order ?? 999
      return orderA - orderB
    }) ?? []

  return (
    <div className="space-y-8">
      <div>
        <h1
          id={`${metadata.name.toLowerCase()}-primitive`}
          className="text-3xl font-bold"
        >
          {metadata.name}
        </h1>
        <p className="text-lg text-muted-foreground">{metadata.description}</p>
      </div>

      <section>
        <h2 id="examples" className="text-2xl font-semibold mb-4">
          Examples
        </h2>

        <div className="space-y-6">
          {validExamples.map((example, index) => (
            <div key={index}>
              <h3
                id={`example-${example.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="text-lg font-medium mb-3"
              >
                {example.name}
              </h3>
              {example.description && (
                <p className="text-sm text-muted-foreground mb-3">
                  {example.description}
                </p>
              )}

              <div className="space-y-4">
                {/* Preview */}
                <div className="p-4 border rounded-lg bg-muted/50">
                  <example.component />
                </div>

                {/* Code */}
                <div className="relative">
                  <pre className="p-4 bg-muted rounded-lg overflow-x-auto">
                    <code className="text-sm">{example.code}</code>
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Sections */}
      {sortedCustomSections.map((section, index) => (
        <section key={index}>
          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{
              __html: section.content
                .replace(/\n/g, "<br>")
                .replace(
                  /```tsx\n([\s\S]*?)\n```/g,
                  "<pre><code>$1</code></pre>"
                ),
            }}
          />
        </section>
      ))}

      <section>
        <h2 id="props" className="text-2xl font-semibold mb-4">
          Props
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-border">
            <thead>
              <tr className="bg-muted/50">
                <th className="border border-border px-4 py-2 text-left">
                  Prop
                </th>
                <th className="border border-border px-4 py-2 text-left">
                  Type
                </th>
                <th className="border border-border px-4 py-2 text-left">
                  Default
                </th>
                <th className="border border-border px-4 py-2 text-left">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.values(metadata.props).map((prop) => (
                <tr key={prop.name}>
                  <td className="border border-border px-4 py-2 font-mono text-sm">
                    {prop.name}
                    {prop.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">
                    {prop.type}
                  </td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">
                    {prop.default || "-"}
                  </td>
                  <td className="border border-border px-4 py-2">
                    {prop.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {metadata.dependencies && metadata.dependencies.length > 0 && (
        <section>
          <h2 id="dependencies" className="text-2xl font-semibold mb-4">
            Dependencies
          </h2>
          <div className="flex gap-2 flex-wrap">
            {metadata.dependencies.map((dep) => (
              <span
                key={dep}
                className="px-2 py-1 bg-muted text-sm rounded border"
              >
                {dep}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
