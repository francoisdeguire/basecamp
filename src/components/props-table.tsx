import React from "react"

interface PropsTableProps {
  name: string
}

export function PropsTable({ name }: PropsTableProps) {
  // This is a placeholder - in the real implementation, you'd get props from the component metadata
  const getProps = () => {
    switch (name) {
      case "button":
        return [
          {
            name: "variant",
            type: "primary | secondary | ghost",
            default: "primary",
            description: "The visual style of the button",
          },
          {
            name: "size",
            type: "sm | md | lg",
            default: "md",
            description: "The size of the button",
          },
          {
            name: "children",
            type: "React.ReactNode",
            default: undefined,
            description: "The content to display inside the button",
          },
          {
            name: "className",
            type: "string",
            default: undefined,
            description: "Additional CSS classes to apply",
          },
          {
            name: "onClick",
            type: "() => void",
            default: undefined,
            description: "Function called when the button is clicked",
          },
        ]
      case "box":
        return [
          {
            name: "children",
            type: "React.ReactNode",
            default: undefined,
            description: "The content to display inside the box",
          },
          {
            name: "className",
            type: "string",
            default: undefined,
            description: "Additional CSS classes to apply",
          },
          {
            name: "as",
            type: "keyof JSX.IntrinsicElements",
            default: "div",
            description: "The HTML element to render as",
          },
        ]
      case "tooltip":
        return [
          {
            name: "variant",
            type: "default | secondary | destructive | outline",
            default: "default",
            description: "The visual style of the tooltip",
          },
          {
            name: "size",
            type: "sm | default | lg",
            default: "default",
            description: "The size of the tooltip content",
          },
          {
            name: "showArrow",
            type: "boolean",
            default: "true",
            description:
              "Whether to show an arrow pointing to the trigger element",
          },
          {
            name: "offset",
            type: "number",
            default: "4",
            description: "The distance in pixels from the trigger element",
          },
          {
            name: "delay",
            type: "number",
            default: "700",
            description: "The delay in milliseconds before the tooltip appears",
          },
          {
            name: "closeDelay",
            type: "number",
            default: "0",
            description:
              "The delay in milliseconds before the tooltip disappears",
          },
          {
            name: "children",
            type: "React.ReactNode",
            default: undefined,
            description: "The content to display inside the tooltip",
          },
          {
            name: "className",
            type: "string",
            default: undefined,
            description: "Additional CSS classes to apply",
          },
        ]
      default:
        return []
    }
  }

  const props = getProps()

  if (props.length === 0) {
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
          {props.map((prop, index) => (
            <tr key={index} className="border-t">
              <td className="p-3 font-mono text-sm text-blue-600">
                {prop.name}
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
