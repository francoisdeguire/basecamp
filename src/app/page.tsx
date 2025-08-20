import { Button } from "@/components/registry-client"
import Link from "next/link"
import React from "react"

export default async function HomePage() {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-5xl font-bold mb-6">Welcome to Basecamp</h1>

        <p className="text-xl text-gray-600 max-w-3xl mx-auto ">
          A v7 design system for building modern applications.
        </p>
      </div>

      <Button asChild variant="primary" size="lg">
        <Link href="/docs">Go to docs</Link>
      </Button>
    </div>
  )
}
