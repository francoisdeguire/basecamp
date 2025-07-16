import Image from "next/image"
import React from "react"
import logo from "@/public/logo.svg"
import Link from "next/link"
import { Button } from "@/registry/ui/button"

export function WebsiteHeader() {
  return (
    <header className="flex items-center gap-10 h-16 px-14 bg-white fixed top-0 left-0 right-0 z-10">
      <Link href="/" className="flex items-center gap-2.5 -mt-1">
        <Image priority src={logo} alt="basecamp logo" className="size-6" />
        <span className="text-2xl font-medium tracking-tighter mt-1">
          Basecamp
        </span>
      </Link>

      <span className="h-5 w-px bg-gray-200" />

      <div className="flex items-center gap-1 -ml-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/docs">Docs</Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/docs/components">Components</Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/docs/primitives">Primitives</Link>
        </Button>
      </div>
    </header>
  )
}
