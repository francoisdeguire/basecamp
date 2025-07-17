import React from "react"
import { ComponentSource } from "@/components/component-source"
import { ComponentPreviewTabs } from "@/components/component-preview-tabs"
import { dynamicImportMap } from "@/lib/dynamic-imports"

export function ComponentPreview({
  name,
  example,
  className,
  align = "center",
  hideCode = false,
  ...props
}: React.ComponentProps<"div"> & {
  name: string
  example: string
  align?: "center" | "start" | "end"
  hideCode?: boolean
}) {
  const key = `${name}-${example}`
  const importFn = dynamicImportMap[key]

  if (!importFn) {
    return (
      <p className="text-muted-foreground text-sm">
        Component{" "}
        <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {name}
        </code>{" "}
        example &quot;{example}&quot; not found in registry.
      </p>
    )
  }

  const Component = React.lazy(importFn)

  return (
    <React.Suspense
      fallback={
        <div className="flex h-[450px] w-full items-center justify-center">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
            <span>Loading component...</span>
          </div>
        </div>
      }
    >
      <ComponentPreviewTabs
        className={className}
        align={align}
        hideCode={hideCode}
        component={
          <div className="relative w-full h-full text-foreground bg-background">
            <Component />
          </div>
        }
        source={<ComponentSource name={name} example={example} />}
        {...props}
      />
    </React.Suspense>
  )
}
