import { Button } from "@/registry/ui/button"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

export function BasicExample() {
  return (
    <div className="flex gap-2">
      <Button>
        <ArrowLeftIcon />
        Sliiide to the left
      </Button>

      <Button>
        Sliiide to the right
        <ArrowRightIcon />
      </Button>
    </div>
  )
}
