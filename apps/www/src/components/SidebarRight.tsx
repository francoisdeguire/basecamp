export function SidebarRight() {
  return (
    <aside className="hidden xl:block w-64 border-l h-[calc(100vh-4rem)] sticky top-16 p-6 overflow-y-auto bg-background">
      <div className="mb-4 text-xs font-semibold uppercase text-muted-foreground">
        On This Page
      </div>
      <ul className="space-y-2">
        <li>
          <a href="#installation" className="hover:underline">
            Installation
          </a>
        </li>
        <li>
          <a href="#usage" className="hover:underline">
            Usage
          </a>
        </li>
        <li>
          <a href="#examples" className="hover:underline">
            Examples
          </a>
        </li>
      </ul>
    </aside>
  )
}
