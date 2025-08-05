"use client"

import { useTheme } from "next-themes"
import { useEffect, useRef } from "react"

export function useThemeTransition() {
  const { theme, setTheme } = useTheme()
  const timeoutRef = useRef<NodeJS.Timeout>()

  const setThemeWithTransition = (newTheme: string) => {
    if (theme === newTheme) return
    
    // Add transition class for blur effect
    document.documentElement.classList.add('theme-transition')
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    // Set new theme after blur effect starts
    setTimeout(() => {
      setTheme(newTheme)
    }, 300)
    
    // Remove transition class after animation completes
    timeoutRef.current = setTimeout(() => {
      document.documentElement.classList.remove('theme-transition')
    }, 1200)
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      document.documentElement.classList.remove('theme-transition')
    }
  }, [])

  return {
    theme,
    setTheme: setThemeWithTransition
  }
}