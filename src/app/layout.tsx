import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { WebsiteHeader } from "@/components/layout/WebsiteHeader"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          geist.variable,
          geistMono.variable,
          "font-sans antialiased"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div>
            <div className="flex flex-col rounded-br-3xl rounded-bl-3xl">
              <WebsiteHeader />

              <div className="min-h-screen flex flex-col">
                <div className="h-16" />

                {children}
              </div>
            </div>

            <footer
              inert
              className="bg-neutral-900 dark:bg-neutral-950 h-[1.4lh] leading-[0.76] text-[calc(0.175*100vw)] text-nowrap tracking-tighter block box-border overflow-hidden relative"
              style={{
                clipPath: "border-box",
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-black/15 to-transparent z-10" />
              <div className="fixed inset-0 h-full w-full bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]"></div>
              <div className="flex items-center justify-center fixed bottom-0 left-0 right-0 text-transparent bg-clip-text bg-gradient-to-b from-neutral-600 to-neutral-800">
                build it for real
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
