"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import { useState, useEffect } from 'react'

export function NonSSR() {
  const { setTheme, theme } = useTheme()
  return (
    <div className="inline-flex items-center">
      <Switch
        id="mode-toggle"
        checked={theme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
      <label htmlFor="mode-toggle" className="ml-2 flex items-center">
        {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </label>
    </div>
  );
}

export function ModeToggle() {
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])
  return (
    isClient ? <NonSSR /> : ''
  );
}