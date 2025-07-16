import { Button } from "@/registry/ui/button"
import { Tooltip, TooltipTrigger } from "@/registry/ui/tooltip"

export default function BasicExample() {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <TooltipTrigger>
        <Button>Hover me</Button>
        <Tooltip>
          This is a helpful tooltip that provides additional information.
        </Tooltip>
      </TooltipTrigger>
    </div>
  )
}
