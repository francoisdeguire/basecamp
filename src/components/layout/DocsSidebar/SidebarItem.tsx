import { Button } from "@/registry/ui/button"
import Link from "next/link"

export const SidebarItem = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) => {
  return (
    <li>
      <Button
        variant="tertiary"
        size="sm"
        className="relative h-[30px] w-fit overflow-visible text-[0.8rem] font-medium"
        asChild
      >
        <Link href={href}>{children}</Link>
      </Button>
    </li>
  )
}
