"use client"

import { Badge } from "@/components/ui/badge"

export default function AdminFooter() {
  return (
    <footer className="border-t bg-background/50 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>© 2024 SenDev Admin Panel</span>
            <span>•</span>
            <span>Version 1.0.0</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-xs">
              Database: Connected
            </Badge>
            <Badge variant="outline" className="text-xs">
              Storage: Active
            </Badge>
            <Badge variant="outline" className="text-xs">
              AI: Ready
            </Badge>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t text-center text-xs text-muted-foreground">
          <p>Admin dashboard for managing projects, users, and content. Handle with care.</p>
        </div>
      </div>
    </footer>
  )
}