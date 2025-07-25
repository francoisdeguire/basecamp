"use client"

import React from "react"
import { ComponentSource } from "@/components/component-source"
import { ComponentPreviewTabs } from "@/components/component-preview-tabs"
import { dynamicImportMap } from "@/generated/dynamic-imports"

export function ComponentPreview({
  component,
  example,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  component: string
  example: string
}) {
  const key = `${component}-${example}`
  const importFn = dynamicImportMap[key]

  if (!importFn) {
    return (
      <p className="text-muted-foreground text-sm">
        Component{" "}
        <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {component}
        </code>{" "}
        example &quot;{example}&quot; not found in registry.
      </p>
    )
  }

  const Component = React.lazy(async () => {
    const importedModule = await importFn()
    // Find the first export that's a component (capitalized function)
    const exportedComponent = Object.values(importedModule).find(
      (exp): exp is React.ComponentType =>
        typeof exp === "function" &&
        typeof exp.name === "string" &&
        /^[A-Z]/.test(exp.name)
    )

    if (!exportedComponent) {
      throw new Error(`No valid component export found in ${key}`)
    }

    return { default: exportedComponent }
  })

  return (
    <React.Suspense fallback={null}>
      <ComponentPreviewTabs
        className={className}
        component={<Component />}
        source={<ComponentSource name={component} example={example} />}
        {...props}
      />
    </React.Suspense>
  )
}
