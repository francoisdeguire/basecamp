import { Button } from "@basecamp/registry"
import { Tooltip, TooltipTrigger } from "@basecamp/registry"

export default function VariantsExample() {
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center min-h-[300px]">
      <TooltipTrigger>
        <Button variant="primary">Primary</Button>
        <Tooltip variant="default">Default tooltip variant</Tooltip>
      </TooltipTrigger>

      <TooltipTrigger>
        <Button variant="secondary">Secondary</Button>
        <Tooltip variant="secondary">Secondary tooltip variant</Tooltip>
      </TooltipTrigger>

      <TooltipTrigger>
        <Button variant="secondary">Secondary</Button>
        <Tooltip variant="outline">Secondary tooltip variant</Tooltip>
      </TooltipTrigger>

      <TooltipTrigger>
        <Button variant="tertiary">Tertiary</Button>
        <Tooltip variant="destructive">
          Destructive tooltip variant for errors
        </Tooltip>
      </TooltipTrigger>
    </div>
  )
}
