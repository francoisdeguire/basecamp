import { Button } from "@/registry/ui/button"
import { CheckIcon, TrashIcon } from "lucide-react"

export function ButtonDemo() {
  return (
    <div className="flex items-center gap-2">
      <Button destructive>
        <TrashIcon />
        Delete
      </Button>
      <Button>Stage Changes</Button>
      <Button variant="primary" onPress={() => alert("Hello world!")}>
        <CheckIcon />
        Publish
      </Button>
    </div>
  )
}
