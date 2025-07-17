import Image from "next/image"
import React from "react"
import logo from "@/public/logo.svg"
import Link from "next/link"
import { Button } from "@/registry/ui/button"
import { ThemeSwitcher } from "@/components/theme-switcher"

export function WebsiteHeader() {
  return (
    <header className="flex items-center gap-10 h-16 px-14 bg-background fixed top-0 left-0 right-0 z-50">
      <div className="absolute bottom-0 left-0 right-0 h-8 translate-y-full backdrop-blur-[3px] progressive-blur-mask-to-t" />
      <div className="absolute bottom-0 left-0 right-0 h-10 translate-y-full bg-gradient-to-b from-background via-background/50 via-60% to-transparent" />

      <Link href="/" className="flex items-center gap-2.5 -mt-1">
        <Image priority src={logo} alt="basecamp logo" className="size-6" />
        <span className="text-2xl font-medium tracking-tighter mt-1">
          Basecamp
        </span>
      </Link>

      <span className="h-5 w-px bg-border" />

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

      <div className="ml-auto">
        <ThemeSwitcher />
      </div>

      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#FF5258]/80" />
      <div className="hidden dark:block absolute top-0.5 left-0 right-0 h-3 bg-gradient-to-b from-[#FF5258]/30 to-transparent" />
    </header>
  )
}
