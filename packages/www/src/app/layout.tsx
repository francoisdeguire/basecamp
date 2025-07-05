import type { Metadata } from "next"
import "./globals.css"
import { Header } from "../components/Header"
import { SidebarLeft } from "../components/SidebarLeft"
import { SidebarRight } from "../components/SidebarRight"

export const metadata: Metadata = {
  title: "BaseCamp Docs",
  description: "Documentation for BaseCamp component library.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <div className="flex min-h-[calc(100vh-4rem)]">
          <SidebarLeft />
          <main className="flex-1 max-w-3xl mx-auto px-4 py-8">{children}</main>
          <SidebarRight />
        </div>
      </body>
    </html>
  )
}
