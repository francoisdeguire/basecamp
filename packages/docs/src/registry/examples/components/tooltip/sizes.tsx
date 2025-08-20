import { Button } from "@/components/registry-client"
import { Tooltip, TooltipTrigger } from "@/components/registry-client"

export default function SizesExample() {
  return (
    <div className="flex gap-8 justify-center items-center min-h-[200px]">
      <TooltipTrigger>
        <Button size="sm">Small</Button>
        <Tooltip size="sm">Small tooltip</Tooltip>
      </TooltipTrigger>

      <TooltipTrigger>
        <Button>Default</Button>
        <Tooltip size="default">Default size tooltip with more content</Tooltip>
      </TooltipTrigger>

      <TooltipTrigger>
        <Button size="lg">Large</Button>
        <Tooltip size="lg">
          Large tooltip with even more content and better readability
        </Tooltip>
      </TooltipTrigger>
    </div>
  )
}
