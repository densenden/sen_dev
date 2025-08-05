"use client"

import { useThemeTransition } from "@/hooks/use-theme-transition"
import { Sun, Moon, Code } from "lucide-react"
import { motion, PanInfo } from "framer-motion"
import { useEffect, useState } from "react"

export default function ThemeToggleHero() {
  const { theme, setTheme } = useThemeTransition()
  const [mounted, setMounted] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const themes = ["light", "dark", "code"]
  const currentIndex = themes.indexOf(theme || "light")

  // Get switch position based on current theme (0, 1, 2)
  const getSwitchX = () => {
    const trackWidth = 320 // 80rem = 320px
    const switchWidth = 56 // 14 = 56px
    const availableSpace = trackWidth - switchWidth - 8 // minus padding
    return (availableSpace / 2) * currentIndex // Evenly distribute: 0, 128, 256
  }

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  const handleDragEnd = (_: any, info: PanInfo) => {
    setIsDragging(false)
    const threshold = 50
    
    if (Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > 0) {
        // Dragged right
        const nextIndex = Math.min(currentIndex + 1, themes.length - 1)
        setTheme(themes[nextIndex])
      } else {
        // Dragged left
        const prevIndex = Math.max(currentIndex - 1, 0)
        setTheme(themes[prevIndex])
      }
    }
  }

  if (!mounted) {
    return <div className="w-80 h-20" />
  }

  return (
    <div className="relative w-80 mx-auto">
      {/* Switch Track */}
      <div 
        className="relative w-80 h-16 rounded-full cursor-pointer"
        onClick={handleNext}
        style={{
          background: `
            rgba(255, 255, 255, 0.1)
          `,
          backdropFilter: "blur(20px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: `
            inset 0 2px 8px rgba(0, 0, 0, 0.3),
            0 4px 32px rgba(0, 0, 0, 0.2)
          `
        }}
      >
        {/* Theme Icons inside track */}
        <div className="absolute inset-0 flex items-center justify-between px-6">
          <Sun className={`w-6 h-6 text-white/60 transition-opacity duration-300 ${currentIndex === 0 ? 'opacity-0' : 'opacity-100'}`} />
          <Moon className={`w-6 h-6 text-white/60 transition-opacity duration-300 ${currentIndex === 1 ? 'opacity-0' : 'opacity-100'}`} />
          <Code className={`w-6 h-6 text-white/60 transition-opacity duration-300 ${currentIndex === 2 ? 'opacity-0' : 'opacity-100'}`} />
        </div>

        {/* Draggable Switch Element */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 256 }}
          dragElastic={0.1}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          animate={{ 
            x: getSwitchX(),
            scale: isDragging ? 1.1 : 1
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30 
          }}
          className="absolute top-1 left-1 w-14 h-14 rounded-full cursor-grab active:cursor-grabbing"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1))
            `,
            backdropFilter: "blur(20px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: `
              0 8px 32px rgba(0, 0, 0, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.2)
            `
          }}
        >
          {/* Active Theme Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            {theme === "light" && <Sun className="w-6 h-6 text-white" />}
            {theme === "dark" && <Moon className="w-6 h-6 text-white" />}
            {theme === "code" && <Code className="w-6 h-6 text-white" />}
          </div>
        </motion.div>
      </div>

      {/* Theme Labels */}
      <div className="flex justify-between mt-4 px-2">
        <div className="text-center flex-1">
          <div className={`text-sm transition-colors duration-300 ${theme === "light" ? "text-white" : "text-white/50"}`}>
            Light
          </div>
        </div>
        <div className="text-center flex-1">
          <div className={`text-sm transition-colors duration-300 ${theme === "dark" ? "text-white" : "text-white/50"}`}>
            Dark
          </div>
        </div>
        <div className="text-center flex-1">
          <div className={`text-sm transition-colors duration-300 ${theme === "code" ? "text-white" : "text-white/50"}`}>
            Code
          </div>
        </div>
      </div>
    </div>
  )
}