"use client"

import { useLocale, useSetLocale } from 'gt-next/client'
import { useState, useEffect } from 'react'
import { Globe } from 'lucide-react'

interface LanguageToggleProps {
  compact?: boolean
}

export default function LanguageToggle({ compact = false }: LanguageToggleProps) {
  const locale = useLocale()
  const setLocale = useSetLocale()
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  const toggleLanguage = () => {
    console.log('Toggle clicked! Current locale:', locale)
    const newLocale = locale === 'en' ? 'de' : 'en'
    console.log('Switching to locale:', newLocale)
    
    // Use the setLocale hook from GT
    setLocale(newLocale)
  }
  
  // Don't render until client-side
  if (!isClient) {
    return null
  }
  
  if (compact) {
    return (
      <button 
        onClick={toggleLanguage}
        className="flex items-center gap-1 text-xs font-light text-muted-foreground hover:text-primary transition-colors duration-300"
        title={`Switch to ${locale === 'en' ? 'German' : 'English'}`}
      >
        <Globe className="w-3 h-3" />
        {locale?.toUpperCase() || 'EN'}
      </button>
    )
  }
  
  return (
    <div className="flex items-center gap-4">
      <button 
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