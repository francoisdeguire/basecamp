import React from "react"
import { ComponentProp } from "@/types/component"

interface PropsTableProps {
  name: string
  propsData?: Record<string, ComponentProp> | null
}

/**
 * PropsTable component that displays props documentation
 * Props data should be pre-loaded and passed in via propsData prop
 */
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
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-3 font-medium text-gray-900">Prop</th>
            <th className="text-left p-3 font-medium text-gray-900">Type</th>
            <th className="text-left p-3 font-medium text-gray-900">Default</th>
            <th className="text-left p-3 font-medium text-gray-900">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(propsData).map(([propName, prop], index) => (
            <tr key={index} className="border-t">
              <td className="p-3 font-mono text-sm text-blue-600">
                {propName}
              </td>
              <td className="p-3 text-sm text-gray-700">{prop.type}</td>
              <td className="p-3 text-sm text-gray-500">
                {prop.default !== undefined ? prop.default : "-"}
              </td>
              <td className="p-3 text-sm text-gray-700">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
