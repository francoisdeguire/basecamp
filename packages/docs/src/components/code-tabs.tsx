"use client"

import * as React from "react"

import { useConfig } from "@/hooks/use-config"
import { Tab, TabList, TabPanel, Tabs } from "react-aria-components"

export function CodeTabs({ children }: React.ComponentProps<typeof Tabs>) {
  const [config, setConfig] = useConfig()

  const installationType = React.useMemo(() => {
    return config.installationType || "cli"
  }, [config])

  return (
    <Tabs
      selectedKey={installationType}
      onSelectionChange={(key) =>
        setConfig({ ...config, installationType: key as "cli" | "manual" })
      }
      className="relative mt-6 mr-auto w-full space-y-4"
    >
      <>
        <TabList className="flex gap-4">
          <Tab
            id="cli"
            className="text-base font-medium select-none text-muted-foreground selected:text-foreground selected:cursor-auto cursor-pointer"
          >
            CLI
          </Tab>
          <Tab
            id="manual"
            className="text-base font-medium select-none text-muted-foreground selected:text-foreground selected:cursor-auto cursor-pointer"
          >
            Manual
          </Tab>
        </TabList>

        {children}
      </>
    </Tabs>
  )
}

export function CodeTabsContent({
  children,
  id,
}: React.ComponentProps<typeof TabPanel>) {
  return (
    <TabPanel id={id} className="flex-1 outline-none">
      {children}
    </TabPanel>
  )
}
