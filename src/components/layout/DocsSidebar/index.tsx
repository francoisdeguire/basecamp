import Link from "next/link"
import React from "react"
import { CategoryTitle } from "./CategoryTitle"

export function DocsSidebar() {
  return (
    <aside className="w-64 max-h-screen overflow-y-auto sticky top-16 pt-8">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-0.5 py-4">
          <CategoryTitle>Getting started</CategoryTitle>
          <ul className="flex flex-col gap-0.5">
            <li>
              <Link href="/docs" className="text-sm hover:underline h-8">
                Introduction
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-1 py-4">
          <CategoryTitle>Primitives</CategoryTitle>
          <ul className="flex flex-col gap-0.5">
            <li>
              <Link
                href="/docs/primitives/box"
                className="text-sm hover:underline"
              >
                Box
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-1 py-4">
          <CategoryTitle>Components</CategoryTitle>
          <ul className="flex flex-col gap-0.5">
            <li>
              <Link
                href="/docs/components/button"
                className="text-sm hover:underline"
              >
                Button
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  )
}
