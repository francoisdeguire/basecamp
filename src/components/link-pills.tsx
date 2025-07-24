import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ExternalLinkIcon } from "lucide-react"

interface LinkPill {
  title: string
  href: string
}

interface LinkPillsProps {
  links: LinkPill[]
  className?: string
}

export function LinkPills({ links, className }: LinkPillsProps) {
  if (!links || links.length === 0) {
    return null
  }

  return (
    <div className={cn("flex flex-wrap gap-2 -mx-2.5 mt-2", className)}>
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex gap-1.5 pr-2 items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
        >
          {link.title}
          <ExternalLinkIcon className="size-3" />
        </Link>
      ))}
    </div>
  )
}
