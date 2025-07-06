import React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { parseMDXFile } from "@/lib/mdx"
import { getComponentBySlug } from "@/lib/registry"
import { ComponentPreview } from "@/mdx-components/component-preview"
import { PropsTable } from "@/mdx-components/props-table"

// MDX components - using any to avoid complex type issues

const components = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  h1: (props: any) => <h1 className="text-3xl font-bold mb-6" {...props} />,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  h2: (props: any) => (
    <h2 className="text-2xl font-semibold mb-4 mt-8" {...props} />
  ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  h3: (props: any) => (
    <h3 className="text-xl font-medium mb-3 mt-6" {...props} />
  ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  p: (props: any) => (
    <p className="mb-4 text-gray-700 leading-relaxed" {...props} />
  ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  code: (props: any) => (
    <code
      className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono"
      {...props}
    />
  ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pre: (props: any) => (
    <pre
      className="bg-gray-100 p-4 rounded mb-4 overflow-x-auto text-sm"
      {...props}
    />
  ),
  ComponentPreview,
  PropsTable,
}

export async function generateStaticParams() {
  // This would generate static params for all components
  // For now, we'll handle this dynamically
  return []
}

export default async function ComponentPage({
  params,
}: {
  params: { component: string }
}) {
  // Get component data
  const component = await getComponentBySlug(params.component, "ui")

  if (!component) {
    notFound()
  }

  // Parse the MDX file
  const mdxContent = await parseMDXFile(component.path)

  if (!mdxContent) {
    notFound()
  }

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <Link href="/components" className="hover:text-gray-900">
              Components
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 font-medium">
            {component.frontmatter.title}
          </li>
        </ol>
      </nav>

      {/* Component Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">
          {component.frontmatter.title}
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          {component.frontmatter.description}
        </p>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>{component.examples.length} examples</span>
          <span>•</span>
          <span>UI Component</span>
        </div>
      </div>

      {/* MDX Content */}
      <div className="prose max-w-none">
        <MDXRemote source={mdxContent.content} components={components} />
      </div>

      {/* Navigation */}
      <div className="mt-12 pt-8 border-t">
        <div className="flex justify-between">
          <Link
            href="/components"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Components
          </Link>
        </div>
      </div>
    </div>
  )
}
