import Image from "next/image"
import React from "react"
import logo from "@/public/logo.svg"
import Link from "next/link"

export function WebsiteHeader() {
  return (
    <header className="flex items-center h-16 px-14 bg-white fixed top-0 left-0 right-0 z-10">
      <Link href="/" className="flex items-center gap-2.5">
        <Image priority src={logo} alt="basecamp logo" className="size-6" />
        <div className="flex items-start gap-0.5 mt-0.5">
          <span className="text-2xl font-medium tracking-tight leading-none">
            Basecamp
          </span>
          <span className="text-[11px] font-medium text-muted-foreground leading-none">
            for V7
          </span>
        </div>
      </Link>
    </header>
  )
}
