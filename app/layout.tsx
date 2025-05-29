import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css" // Make sure this is present
import { ThemeProvider } from "@/components/theme-provider" // CRITICAL: Path and component name
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sidebar App - Theme Debug",
  description: "Debugging Next.js theme toggle",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // CRITICAL: suppressHydrationWarning on html tag
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        {/* CRITICAL: ThemeProvider must wrap children and have correct props */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system" // Or "light" or "dark" if you don't want system preference
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
