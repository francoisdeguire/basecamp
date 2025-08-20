import { Button } from "@/components/registry-client"
import Link from "next/link"

export function ButtonAsChild() {
  return (
    <Button asChild>
      <Link href="https://www.youtube.com/shorts/SXHMnicI6Pg" target="_blank">
        I am a &lt;Link /&gt; element
      </Link>
    </Button>
  )
}
