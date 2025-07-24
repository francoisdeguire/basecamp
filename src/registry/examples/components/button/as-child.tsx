import { Button } from "@/registry/ui/button"
import Link from "next/link"

export function DisabledButtonExample() {
  return (
    <div className="flex items-center gap-4">
      <Button asChild>
        <Link href="https://www.youtube.com/shorts/SXHMnicI6Pg" target="_blank">
          I am a Link
        </Link>
      </Button>
    </div>
  )
}
