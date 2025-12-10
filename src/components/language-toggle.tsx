"use client"

import { useLocale } from '@/contexts/locale-context'
import { useState, useEffect } from 'react'
import { Globe } from 'lucide-react'

interface LanguageToggleProps {
  compact?: boolean
  iconOnly?: boolean
}

export default function LanguageToggle({ compact = false, iconOnly = false }: LanguageToggleProps) {
  const { locale, setLocale } = useLocale()
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  const toggleLanguage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const newLocale = locale === 'en' ? 'de' : 'en'
    setLocale(newLocale)
  }
  
  // Don't render until client-side
  if (!isClient) {
    return null
  }
  
  if (iconOnly) {
    return (
      <button
        type="button"
        onClick={toggleLanguage}
        className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/30 bg-white/20 text-xs font-light uppercase tracking-widest text-black/70 transition hover:bg-black/10 dark:border-white/20 dark:bg-white/10 dark:text-white/70 dark:hover:bg-white/20"
        title={`Switch to ${locale === 'en' ? 'German' : 'English'}`}
        aria-label={`Switch to ${locale === 'en' ? 'German' : 'English'}`}
      >
        <Globe className="h-4 w-4" />
      </button>
    )
  }
  
  if (compact) {
    return (
      <button
        type="button"
        onClick={toggleLanguage}
        className="flex items-center gap-1.5 text-xs font-light text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-300"
        title={`Switch to ${locale === 'en' ? 'German' : 'English'}`}
      >
        <Globe className="w-3.5 h-3.5" />
        <span className="uppercase">{locale || 'EN'}</span>
      </button>
    )
  }
  
  return (
    <div className="flex items-center gap-4">
      <button 
        type="button"
        onClick={toggleLanguage}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md cursor-pointer transition-colors"
      >
        🌍 {locale?.toUpperCase() || 'EN'} → {locale === 'en' ? 'DE' : 'EN'}
      </button>
      <div className="text-sm text-gray-600">
        Current: {locale || 'en'}
      </div>
    </div>
  )
}