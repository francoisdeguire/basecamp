import React from "react"
import { ComponentProp } from "@/types/component"

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
      <table className="w-full">
        <thead className="bg-muted/50">
          <tr>
            <th className="text-left p-3 font-medium text-foreground">Prop</th>
            <th className="text-left p-3 font-medium text-foreground">Type</th>
            <th className="text-left p-3 font-medium text-foreground">
              Default
            </th>
            <th className="text-left p-3 font-medium text-foreground">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(propsData).map(([propName, prop], index) => (
            <tr key={index} className="border-t">
              <td className="p-3 font-mono text-sm text-primary">{propName}</td>
              <td className="p-3 text-sm text-foreground">{prop.type}</td>
              <td className="p-3 text-sm text-muted-foreground">
                {prop.default !== undefined ? prop.default : "-"}
              </td>
              <td className="p-3 text-sm text-foreground">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
