import { Button } from "@/components/registry-client"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

export function ButtonWithIcon() {
  return (
    <div className="flex gap-2">
      <Button variant="secondary">
        <ArrowLeftIcon />
        Sliiide to the left
      </Button>

      <Button variant="secondary">
        Sliiide to the right
        <ArrowRightIcon />
      </Button>
    </div>
  )
}
