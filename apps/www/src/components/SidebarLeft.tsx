import { navigation } from "../lib/navigation"

export function SidebarLeft() {
  return (
    <aside className="hidden lg:block w-64 border-r h-[calc(100vh-4rem)] sticky top-16 p-6 overflow-y-auto bg-background">
      {navigation.map((section) => (
        <div key={section.title} className="mb-8">
          <div className="mb-6 text-xs font-semibold uppercase text-muted-foreground">
            {section.title}
          </div>
          <ul className="space-y-2">
            {section.items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="hover:underline block py-1"
                  title={item.description}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  )
}
