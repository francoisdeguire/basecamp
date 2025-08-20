"use client"

import * as React from "react"
import { cn } from "@/shared/utils"

export function ComponentPreviewTabs({
  className,
  component,
  source,
  ...props
}: React.ComponentProps<"div"> & {
  component: React.ReactNode
  source: React.ReactNode
}) {
  const [activeTab, setActiveTab] = React.useState("preview")

  return (
    <div
      className={cn("relative mt-4 mb-12 -mx-4 flex flex-col gap-4", className)}
      {...props}
    >
      <div className="flex gap-4 ml-4">
        <button
          onClick={() => setActiveTab("preview")}
          className={cn(
            "text-base font-medium transition-colors",
            activeTab === "preview"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Preview
        </button>
        <button
          onClick={() => setActiveTab("code")}
          className={cn(
            "text-base font-medium transition-colors",
            activeTab === "code"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Code
        </button>
      </div>

      <div className="relative">
        {activeTab === "preview" && (
          <div className="flex h-[450px] border rounded-lg w-full items-center justify-center p-8">
            {component}
          </div>
        )}

        {activeTab === "code" && (
          <div className="h-[450px] overflow-hidden rounded-lg">{source}</div>
        )}
      </div>
    </div>
  )
}
