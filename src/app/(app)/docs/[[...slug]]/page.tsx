import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { parseMDXFile } from "@/lib/mdx"
import { extractTocFromMdx, generateHeaderId } from "@/lib/toc"
import { ComponentPreview } from "@/components/component-preview"
import { PropsTable } from "@/components/props-table"
import { buildRegistry } from "@/lib/registry"
import { getRootPages } from "@/lib/config"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import type { Metadata } from "next"
import { DashboardTableOfContents } from "@/components/layout/TOC"

// MDX components - using any to avoid complex type issues with MDX
const components = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  h1: (props: any) => <h1 className="text-3xl font-bold mb-6" {...props} />,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  h2: (props: any) => (
    <h2
      id={generateHeaderId(props.children)}
      className="text-2xl font-semibold mb-4 mt-8 scroll-mt-20"
      {...props}
    />
  ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  h3: (props: any) => (
    <h3
      id={generateHeaderId(props.children)}
      className="text-xl font-medium mb-3 mt-6 scroll-mt-20"
      {...props}
    />
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

interface PageProps {
  params: Promise<{ slug?: string[] }>
}

// Enhanced content lookup function (similar to shadcn-ui's getDocFromParams)
async function getDocFromParams({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug?.join("/") || ""

  // Handle root docs pages
  if (!slug || !slug.includes("/")) {
    const rootPages = getRootPages()
    const targetSlug = slug || ""
    const rootPage = rootPages.find((page) => page.slug === targetSlug)

    if (!rootPage) {
      return null
    }

    const mdxContent = await parseMDXFile(rootPage.path)
    if (!mdxContent) {
      return null
    }

    return {
      title: mdxContent.frontmatter.title,
      description: mdxContent.frontmatter.description,
      slug: targetSlug ? `/docs/${targetSlug}` : "",
      slugAsParams: targetSlug,
      body: { raw: mdxContent.content, code: mdxContent.content },
      frontmatter: mdxContent.frontmatter,
      path: rootPage.path,
      type: "page" as const,
    }
  }

  // Handle category listing pages
  if (slug === "components") {
    const registry = await buildRegistry()
    return {
      title: "Components",
      description:
        "A collection of reusable UI components for your applications.",
      slug: "/docs/components",
      slugAsParams: "components",
      body: { raw: "", code: "" },
      frontmatter: { title: "Components", description: "UI Components" },
      path: "",
      type: "components-listing" as const,
      components: registry.components,
    }
  }

  if (slug === "primitives") {
    const registry = await buildRegistry()
    return {
      title: "Primitives",
      description:
        "Basic building blocks for creating more complex components.",
      slug: "/docs/primitives",
      slugAsParams: "primitives",
      body: { raw: "", code: "" },
      frontmatter: { title: "Primitives", description: "Primitives" },
      path: "",
      type: "primitives-listing" as const,
      primitives: registry.primitives,
    }
  }

  // Handle component and primitive pages
  const slugParts = slug.split("/")
  const [category, componentName] = slugParts

  if (!category || !componentName) {
    return null
  }

  // Use registry for better content discovery (like shadcn-ui)
  const registry = await buildRegistry()
  const components =
    category === "components" ? registry.components : registry.primitives
  const component = components.find((c) => c.slug === componentName)

  if (!component) {
    return null
  }

  const mdxContent = await parseMDXFile(component.path)
  if (!mdxContent) {
    return null
  }

  return {
    title: component.frontmatter.title,
    description: component.frontmatter.description,
    slug: `/docs/${category}/${componentName}`,
    slugAsParams: `${category}/${componentName}`,
    body: { raw: mdxContent.content, code: mdxContent.content },
    frontmatter: component.frontmatter,
    path: component.path,
    type: category as "components" | "primitives",
    examples: component.examples,
  }
}

// Generate metadata for SEO (like shadcn-ui)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const doc = await getDocFromParams({ params: resolvedParams })

  if (!doc) {
    return {
      title: "Documentation",
      description: "Basecamp documentation",
    }
  }

  return {
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url: `https://yourdomain.com${doc.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
    },
  }
}

// Generate static params for better performance (like shadcn-ui)
export async function generateStaticParams() {
  const registry = await buildRegistry()
  const rootPages = getRootPages()

  const params = [
    // Root docs pages (including index and any additional pages)
    ...rootPages.map((page) => ({
      slug: page.slug ? [page.slug] : [],
    })),
    // Component pages
    ...registry.components.map((component) => ({
      slug: ["components", component.slug],
    })),
    // Primitive pages
    ...registry.primitives.map((primitive) => ({
      slug: ["primitives", primitive.slug],
    })),
  ]

  return params
}

export default async function DocPage({ params }: PageProps) {
  const resolvedParams = await params
  const doc = await getDocFromParams({ params: resolvedParams })

  if (!doc) {
    notFound()
  }

  // Extract TOC for potential future use

  const toc = extractTocFromMdx(doc.body.raw)

  // Handle category listing pages
  if (doc.type === "components-listing" || doc.type === "primitives-listing") {
    const categorySlug =
      doc.type === "components-listing" ? "components" : "primitives"

    return (
      <div className="flex bg-red-500">
        <div className="flex-1 mx-auto w-full max-w-2xl">
          <div className="mb-4 flex items-center space-x-1 text-sm leading-none text-muted-foreground">
            <Link href="/docs" className="truncate">
              Docs
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <div className="text-foreground">{doc.title}</div>
          </div>
          <div className="space-y-2">
            <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
              {doc.title}
            </h1>
            {doc.description && (
              <p className="text-base text-muted-foreground">
                {doc.description}
              </p>
            )}
          </div>
          <div className="pb-12 pt-8">
            <div className="grid grid-cols-3 gap-6">
              {doc.components?.map((component) => (
                <Link
                  key={component.slug}
                  href={`/docs/${categorySlug}/${component.slug}`}
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
          </div>
        </div>
        {toc.length > 0 && <DashboardTableOfContents toc={toc} />}
      </div>
    )
  }

  return (
    <div className="flex flex-1">
      <main className="mx-auto flex-1 max-w-2xl pt-8 pb-12 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
            {doc.title}
          </h1>
          {doc.description && (
            <p className="text-base text-muted-foreground">{doc.description}</p>
          )}
        </div>

        {/* Content */}
        <div className="prose max-w-none">
          <MDXRemote source={doc.body.code} components={components} />
        </div>
      </main>

      {/* Table of Contents */}
      {toc.length > 0 && <DashboardTableOfContents toc={toc} />}
    </div>
  )
}
