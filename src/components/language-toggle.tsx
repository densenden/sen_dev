"use client"

import { useGT } from 'gt-next'
import { useState } from 'react'

export default function LanguageToggle() {
  const translate = useGT()
  const [currentLocale, setCurrentLocale] = useState('en')
  
  const toggleLanguage = () => {
    console.log('Toggle clicked! Current locale:', currentLocale)
    const newLocale = currentLocale === 'en' ? 'de' : 'en'
    setCurrentLocale(newLocale)
    // Try to set locale if the method exists
    if (translate && typeof translate.setLocale === 'function') {
      translate.setLocale(newLocale)
    }
    console.log('New locale:', newLocale)
  }
  
  return (
    <div className="flex items-center gap-4">
      <button 
        onClick={toggleLanguage}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md cursor-pointer transition-colors"
      >
        🌍 {currentLocale.toUpperCase()} → {currentLocale === 'en' ? 'DE' : 'EN'}
      </button>
      <div className="text-sm text-gray-600">
        Current: {currentLocale}
      </div>
    </div>
  )
}