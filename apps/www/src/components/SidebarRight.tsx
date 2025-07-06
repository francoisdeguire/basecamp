import { TableOfContents } from "./TableOfContents"

export function SidebarRight() {
  return (
    <aside className="hidden xl:block w-64 border-l h-[calc(100vh-4rem)] sticky top-16 p-6 overflow-y-auto bg-background">
      <TableOfContents />
    </aside>
  )
}
