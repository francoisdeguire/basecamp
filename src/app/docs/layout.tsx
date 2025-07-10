import React from "react"
import { DocsSidebar } from "@/components/layout/DocsSidebar"
import { OnThisPage } from "@/components/layout/OnThisPage"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-1 px-14">
      <DocsSidebar />
      <main className="flex flex-1 pt-8">{children}</main>
      <OnThisPage />
    </div>
  )
}
