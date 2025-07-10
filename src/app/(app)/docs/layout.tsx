import React from "react"
import { DocsSidebar } from "@/components/layout/DocsSidebar"

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-1 px-8">
      <DocsSidebar />
      {children}
    </div>
  )
}
