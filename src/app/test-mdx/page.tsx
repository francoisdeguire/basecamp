import React from "react"
import { parseMDXFile } from "@/lib/mdx"
import { Button } from "@/components/ui/button/button"
import path from "path"

export default async function TestMDXPage() {
  // Parse the MDX file
  const mdxPath = path.join(
    process.cwd(),
    "src/components/ui/button/button.mdx"
  )
  const mdxContent = await parseMDXFile(mdxPath)

  if (!mdxContent) {
    return (
      <div className="container mx-auto p-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">MDX Test Page</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Error: Could not parse MDX file</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">MDX Test Page</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Parsed MDX Content</h2>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800">
              ✅ Successfully parsed MDX file: {mdxContent.frontmatter.title}
            </p>
            <p className="text-green-700 text-sm mt-2">
              Description: {mdxContent.frontmatter.description}
            </p>
            <p className="text-green-700 text-sm">
              Examples: {mdxContent.frontmatter.examples.join(", ")}
            </p>
          </div>

          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: mdxContent.htmlContent }} />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Raw MDX Content</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
            <code>{mdxContent.content}</code>
          </pre>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frontmatter Data</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
            <code>{JSON.stringify(mdxContent.frontmatter, null, 2)}</code>
          </pre>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Component Test</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Button Variants</h3>
              <div className="flex gap-2">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Button Sizes</h3>
              <div className="flex gap-2 items-center">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
