"use client"

import * as React from "react"
import { TocItem } from "@/lib/toc"
import { cn } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"

interface TocProps {
  toc: TocItem[]
}

export function DashboardTableOfContents({ toc }: TocProps) {
  const itemIds = React.useMemo(
    () => toc.map((item) => item.id).filter(Boolean),
    [toc]
  )
  const activeHeading = useActiveItem(itemIds)

  if (!toc?.length) {
    return null
  }

  return (
    <aside className="sticky top-16 w-64 max-h-screen overflow-y-auto pt-8 space-y-8 hidden xl:block">
      <div className="space-y-2 px-6">
        <p className="text-xs h-[30px] flex items-center text-muted-foreground select-none">
          On This Page
        </p>
        <Tree items={toc} activeItem={activeHeading} />
      </div>

      <div className="w-full bg-muted p-6 rounded-lg flex flex-col gap-2.5">
        <h3 className="text-base font-medium">Something wrong?</h3>
        <p className="text-sm text-muted-foreground inline-flex items-center gap-1">
          Let me know on{" "}
          <a
            href="https://volume7.slack.com/archives/C096TPUCQRW"
            className="h-5 pt-px flex items-center gap-0.5 hover:text-foreground border-b !border-b-transparent hover:!border-b-foreground transition-all duration-200"
          >
            <span>Slack</span>
            <ArrowUpRight className="size-4" />
          </a>
        </p>
      </div>
    </aside>
  )
}

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState<string | null>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: `0% 0% -80% 0%` }
    )

    itemIds?.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      itemIds?.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [itemIds])

  return activeId
}

interface TreeProps {
  items: TocItem[]
  level?: number
  activeItem?: string | null
}

function Tree({ items, level = 1, activeItem }: TreeProps) {
  return items?.length && level < 3 ? (
    <ul className={cn("m-0 list-none", { "pl-4": level !== 1 })}>
      {items.map((item, index) => {
        return (
          <li key={index} className={cn("mt-0 pt-1")}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById(item.id)
                if (element) {
                  element.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              }}
              className={cn(
                "inline-block text-xs no-underline hover:text-foreground",
                item.id === activeItem
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.text}
            </a>
            {item.children?.length ? (
              <Tree
                items={item.children}
                level={level + 1}
                activeItem={activeItem}
              />
            ) : null}
          </li>
        )
      })}
    </ul>
  ) : null
}
