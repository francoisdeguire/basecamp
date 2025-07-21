"use client"

import React from "react"
import { ComponentProp } from "@/types/component"
import { Tooltip, TooltipTrigger } from "@/registry/ui/tooltip"
import { CircleHelpIcon } from "lucide-react"
import { Focusable } from "react-aria-components"
import { cn } from "@/lib/utils"

interface PropsTableProps {
  name: string
  propsData?: Record<string, ComponentProp> | null
}

export function PropsTable({ name, propsData }: PropsTableProps) {
  if (!propsData || Object.keys(propsData).length === 0) {
    return (
      <div className="border rounded-lg p-4">
        <p className="text-gray-600">
          No props documentation available for {name}.
        </p>
      </div>
    )
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full text-xs">
        <thead className="bg-muted/50">
          <tr className="*:text-left *:p-3 *:font-medium *:text-foreground ">
            <th className="text-left p-3 font-medium text-foreground">Name</th>
            <th className="text-left p-3 font-medium text-foreground">Type</th>
            <th className="text-left p-3 font-medium text-foreground">
              Default
            </th>
          </tr>
        </thead>
        <tbody className="font-mono">
          {Object.entries(propsData).map(([propName, prop], index) => (
            <tr key={index} className="border-t">
              <td className="p-3 flex items-center gap-2">
                <div className="inline-flex items-center text-[#6F42C1] bg-[#6F42C1]/10 dark:text-[#B392F0] dark:bg-[#B392F0]/20 rounded-sm">
                  <code className="px-1">{propName}</code>
                </div>
                {prop.description && (
                  <TooltipTrigger delay={0}>
                    <Focusable>
                      <CircleHelpIcon className="size-3 text-muted-foreground" />
                    </Focusable>
                    <Tooltip>{prop.description}</Tooltip>
                  </TooltipTrigger>
                )}
              </td>
              <td className="p-3">
                <code className="bg-muted text-muted-foreground rounded-sm px-1 py-0.5">
                  {prop.type}
                </code>
              </td>
              <td
                className={cn(
                  "p-3 text-[#22863A] dark:text-[#FFAB70]",
                  prop.default === undefined &&
                    "text-muted-foreground/30 dark:text-muted-foreground/30"
                )}
              >
                {prop.default !== undefined ? prop.default : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
