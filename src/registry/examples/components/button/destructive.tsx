import { Button } from "@/registry/ui/button"
import { SatelliteDishIcon } from "lucide-react"

export function DestructiveButton() {
  return (
    <Button variant="secondary" destructive>
      <SatelliteDishIcon />
      Execute Order 66
    </Button>
  )
}
