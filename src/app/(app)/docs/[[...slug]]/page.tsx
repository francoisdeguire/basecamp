import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote-client/rsc"
import type { MDXComponents } from "mdx/types"
import { parseMDXFile, rehypePrettyCodeOptions } from "@/lib/mdx"
import { extractTocFromMdx } from "@/lib/toc"
import { ComponentPreview } from "@/components/component-preview"
import { PropsTable } from "@/components/props-table"
import { LinkPills } from "@/components/link-pills"
import {
  getStaticRegistry,
  getStaticRootPages,
  getRootPageBySlug,
  getComponentBySlug,
} from "@/lib/content"
import type { Metadata } from "next"
import { DashboardTableOfContents } from "@/components/layout/TOC"
import { mdxComponents } from "@/mdx-components"
// Try different import format
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"

// Enhanced MDX components with copy button functionality
const components = {
  ...mdxComponents,
  ComponentPreview,
  PropsTable,
} as MDXComponents

interface PageProps {
  params: Promise<{ slug?: string[] }>
}

// Enhanced content lookup function (similar to shadcn-ui's getDocFromParams)
async function getDocFromParams({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug?.join("/") || ""

  // Handle category listing pages FIRST
  if (slug === "components") {
    const registry = await getStaticRegistry()
    return {
      title: "Components",
      description:
        "A collection of reusable UI components for your applications.",
      slug: "/docs/components",
      slugAsParams: "components",
      body: { raw: "", content: "" },
      frontmatter: { title: "Components", description: "UI Components" },
      path: "",
      type: "components-listing" as const,
      components: registry.components,
    }
  }

  if (slug === "primitives") {
    const registry = await getStaticRegistry()
    return {
      title: "Primitives",
      description:
        "Basic building blocks for creating more complex components.",
      slug: "/docs/primitives",
      slugAsParams: "primitives",
      body: { raw: "", content: "" },
      frontmatter: { title: "Primitives", description: "Primitives" },
      path: "",
      type: "primitives-listing" as const,
      primitives: registry.primitives,
    }
  }

  // Handle root docs pages
  if (!slug || !slug.includes("/")) {
    const targetSlug = slug || ""
    const rootPage = getRootPageBySlug(targetSlug)

    if (!rootPage) {
      return null
    }

    // Root page data is already parsed in the JSON
    const mdxContent = {
      frontmatter: rootPage.frontmatter,
      content: rootPage.content,
    }

    return {
      title: mdxContent.frontmatter.title,
      description: mdxContent.frontmatter.description,
      slug: targetSlug ? `/docs/${targetSlug}` : "",
      slugAsParams: targetSlug,
      body: { raw: mdxContent.content, content: mdxContent.content },
      frontmatter: mdxContent.frontmatter,
      path: rootPage.path,
      type: "page" as const,
    }
  }

  // Handle component and primitive pages
  const slugParts = slug.split("/")
  const [category, componentName] = slugParts

  if (!category || !componentName) {
    return null
  }

  // Use static registry for better performance
  const componentType = category === "components" ? "ui" : "primitive"
  const component = await getComponentBySlug(componentName, componentType)

  if (!component) {
    return null
  }

  // Component data is already parsed in the JSON
  const mdxContent = {
    frontmatter: component.frontmatter,
    content: (component as any).content || "",
  }

  return {
    title: component.frontmatter.title,
    description: component.frontmatter.description,
    slug: `/docs/${category}/${componentName}`,
    slugAsParams: `${category}/${componentName}`,
    body: { raw: mdxContent.content, content: mdxContent.content },
    frontmatter: component.frontmatter,
    path: component.path,
    type: category as "components" | "primitives",
  }
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const doc = await getDocFromParams({ params: resolvedParams })

  if (!doc) {
    return {}
  }

  return {
    title: doc.title,
    description: doc.description,
  }
}

export default async function DocPage({ params }: PageProps) {
  const resolvedParams = await params
  const doc = await getDocFromParams({ params: resolvedParams })

  if (!doc) {
    notFound()
  }

  // Extract TOC for potential future use
  const toc = extractTocFromMdx(doc.body.raw)

  return (
    <div className="flex flex-1">
      <main className="mx-auto flex-1 max-w-2xl pt-8 pb-32 space-y-16">
        {/* Header */}
        <div className="space-y-4 mt-1.5">
          <h1 className="text-5xl font-medium tracking-tighter">{doc.title}</h1>
          {doc.description && (
            <p className="text-base text-pretty text-muted-foreground">
              {doc.description}
            </p>
          )}
          {"links" in doc.frontmatter && doc.frontmatter.links && (
            <LinkPills links={doc.frontmatter.links} className="mt-6" />
          )}
        </div>

        {/* Content */}
        <div className="prose max-w-none">
          {/* Handle listing pages */}
          {doc.type === "components-listing" && "components" in doc && (
            <div className="grid grid-cols-1 gap-4">
              {doc.components.map((component) => (
                <div
                  key={component.slug}
                  className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                >
                  <h3 className="text-lg font-semibold mb-1">
                    <a
                      href={`/docs/components/${component.slug}`}
                      className="text-foreground hover:text-primary no-underline"
                    >
                      {component.frontmatter.title || component.name}
                    </a>
                  </h3>
                  {component.frontmatter.description && (
                    <p className="text-muted-foreground mb-0">
                      {component.frontmatter.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {doc.type === "primitives-listing" && "primitives" in doc && (
            <div className="grid grid-cols-1 gap-4">
              {doc.primitives.map((primitive) => (
                <div
                  key={primitive.slug}
                  className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                >
                  <h3 className="text-lg font-semibold mb-1">
                    <a
                      href={`/docs/primitives/${primitive.slug}`}
                      className="text-foreground hover:text-primary no-underline"
                    >
                      {primitive.frontmatter.title || primitive.name}
                    </a>
                  </h3>
                  {primitive.frontmatter.description && (
                    <p className="text-muted-foreground mb-0">
                      {primitive.frontmatter.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Handle regular MDX content pages */}
          {doc.type !== "components-listing" &&
            doc.type !== "primitives-listing" && (
              <MDXRemote
                source={doc.body.content}
                components={components}
                options={{
                  mdxOptions: {
                    rehypePlugins: [
                      [rehypePrettyCode, rehypePrettyCodeOptions],
                      [rehypeSlug],
                    ],
                  },
                }}
              />
            )}
        </div>
      </main>

      {/* Table of Contents */}
      <DashboardTableOfContents toc={toc} />
    </div>
  )
}
