import { Button } from "@/components/registry-client"
import { Tooltip, TooltipTrigger } from "@/components/registry-client"

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
