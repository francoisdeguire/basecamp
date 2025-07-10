import DocsPage from "@/components/layout/DocsPage"

export async function generateStaticParams() {
  const { buildRegistry } = await import("@/lib/registry")
  const registry = await buildRegistry()

  return registry.primitives.map((primitive) => ({
    primitive: primitive.slug,
  }))
}

export default async function PrimitivePage({
  params,
}: {
  params: Promise<{ primitive: string }>
}) {
  const { primitive: primitiveSlug } = await params
  return <DocsPage slug={primitiveSlug} type="primitive" />
}
