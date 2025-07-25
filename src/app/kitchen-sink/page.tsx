"use client"

import { Button } from "@/registry/ui/button"
import { PlusCircleIcon } from "lucide-react"

export default function HomePage() {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center gap-8">
      <Button>
        {({ isHovered }) => (
          <>
            {isHovered ? <span>Hovered</span> : <span>Not Hovered</span>}
            <PlusCircleIcon className="size-4" />
          </>
        )}
      </Button>
    </div>
  )
}
