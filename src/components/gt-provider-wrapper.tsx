"use client"

import { GTClientProvider } from 'gt-next/client'
import { ReactNode, useState, useEffect } from 'react'

export default function GTProviderWrapper({ children }: { children: ReactNode }) {
  const [currentLocale, setCurrentLocale] = useState('en')
  
  useEffect(() => {
    // Initialize with browser language or stored preference
    const storedLocale = localStorage.getItem('locale')
    const browserLang = navigator.language?.split('-')[0]
    const initialLocale = storedLocale || (['en', 'de'].includes(browserLang || '') ? browserLang : 'en')
    setCurrentLocale(initialLocale as string)
  }, [])

  return (
    <GTClientProvider 
      projectId={process.env.NEXT_PUBLIC_GT_PROJECT_ID || "prj_x83xbh3yb5zv4vi5m4niclku"}
      developmentApiKey={process.env.NEXT_PUBLIC_GT_API_KEY}
      defaultLocale="en"
      locales={['en', 'de']}
      locale={currentLocale}
      onSetLocale={(newLocale: string) => {
        console.log('GT Provider: Setting locale to', newLocale)
        setCurrentLocale(newLocale)
        // Store preference
        localStorage.setItem('locale', newLocale)
      }}
    >
      {children}
    </GTClientProvider>
  )
}