import { Button } from "@/registry/ui/button"
import { CheckIcon } from "lucide-react"

export function ButtonDemo() {
  return (
    <div className="flex flex-col items-center gap-2 lg:flex-row">
      <Button variant="secondary">Cancel</Button>
      <Button>
        <CheckIcon />
        Deploy on Friday
      </Button>
    </div>
  )
}
