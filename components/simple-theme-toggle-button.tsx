"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"

export function SimpleThemeToggleButton() {
  const [isMounted, setIsMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleToggle = () => {
    const currentEffectiveTheme = theme === "system" ? resolvedTheme : theme
    console.log("[SimpleToggle] Current theme:", theme, "Resolved:", resolvedTheme, "Effective:", currentEffectiveTheme)
    const newTheme = currentEffectiveTheme === "dark" ? "light" : "dark"
    console.log("[SimpleToggle] Setting to:", newTheme)
    setTheme(newTheme)
  }

  if (!isMounted) {
    return (
      <Button variant="outline" size="icon" disabled className="h-10 w-10">
        ...
      </Button>
    )
  }

  const displayIconTheme = theme === "system" ? resolvedTheme : theme

  return (
    <Button variant="outline" size="icon" onClick={handleToggle} className="fixed top-4 right-4 z-50 h-10 w-10">
      {displayIconTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
