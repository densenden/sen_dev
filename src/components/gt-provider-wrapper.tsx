"use client"

import { GTClientProvider } from 'gt-next/client'
import { ReactNode } from 'react'

export default function GTProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <GTClientProvider 
      projectId="prj_x83xbh3yb5zv4vi5m4niclku" 
      defaultLocale="en"
      getLocale={() => {
        // Simple client-side locale detection
        if (typeof window !== 'undefined') {
          return navigator.language?.split('-')[0] || 'en'
        }
        return 'en'
      }}
    >
      {children}
    </GTClientProvider>
  )
}