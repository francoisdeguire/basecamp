"use client"

import React from "react"
import { ComponentSource } from "@/components/component-source"
import { ComponentPreviewTabs } from "@/components/component-preview-tabs"
import { Index } from "@basecamp/registry/__index__"

export function ComponentPreview({
  component,
  example,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  component: string
  example: string
}) {
  const key = `${component}-${example}` as keyof typeof Index
  const Component = Index[key]

  if (!Component) {
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

  return (
    <ComponentPreviewTabs
      className={className}
      component={<Component />}
      source={<ComponentSource name={component} example={example} />}
      {...props}
    />
  )
}
