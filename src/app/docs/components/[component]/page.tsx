import DocsPage from "@/components/layout/DocsPage"

export async function generateStaticParams() {
  const { buildRegistry } = await import("@/lib/registry")
  const registry = await buildRegistry()

  return registry.components.map((component) => ({
    component: component.slug,
  }))
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ component: string }>
}) {
  const { component: componentSlug } = await params
  return <DocsPage slug={componentSlug} type="ui" />
}
