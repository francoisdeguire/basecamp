"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Tabs, TabList, Tab } from "react-aria-components"

export function ComponentPreviewTabs({
  className,
  hideCode = false,
  component,
  source,
  ...props
}: React.ComponentProps<"div"> & {
  hideCode?: boolean
  component: React.ReactNode
  source: React.ReactNode
}) {
  const [tab, setTab] = React.useState("preview")

  return (
    <div
      className={cn("group relative mt-4 mb-12 flex flex-col gap-2", className)}
      {...props}
    >
      <Tabs
        className="relative mr-auto w-full"
        selectedKey={tab}
        onSelectionChange={(key) => setTab(key as string)}
      >
        <div className="flex items-center justify-between">
          {!hideCode && (
            <TabList className="flex gap-4">
              <Tab
                id="preview"
                className="text-base font-medium select-none text-muted-foreground selected:text-foreground selected:cursor-auto cursor-pointer"
              >
                Preview
              </Tab>
              <Tab
                id="code"
                className="text-base font-medium select-none text-muted-foreground selected:text-foreground selected:cursor-auto"
              >
                Code
              </Tab>
            </TabList>
          )}
        </div>
      </Tabs>
      <div
        data-tab={tab}
        className="data-[tab=code]:border-code relative md:-mx-1.5"
      >
        <div
          data-slot="preview"
          data-active={tab === "preview"}
          className="invisible data-[active=true]:visible flex h-[450px] border rounded-lg w-full items-center justify-center p-8"
        >
          {component}
        </div>
        <div
          data-slot="code"
          data-active={tab === "code"}
          className="absolute inset-0 hidden overflow-hidden rounded-lg bg-muted data-[active=true]:block **:[figure]:!m-0 **:[pre]:h-[450px]"
        >
          {source}
        </div>
      </div>
    </div>
  )
}
