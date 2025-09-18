"use client"

import { usePathname } from 'next/navigation'
import NavigationClean from "@/components/navigation-clean"
import Footer from "@/components/footer"

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith('/admin')

  if (isAdminRoute) {
    // Admin routes: no navigation or footer, let admin pages handle their own layout
    return <>{children}</>
  }

  // Regular routes: include navigation and footer
  return (
    <>
      <NavigationClean />
      {children}
      <Footer />
    </>
  )
}