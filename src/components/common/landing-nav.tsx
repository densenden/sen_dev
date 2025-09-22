"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Rocket, 
  Crown, 
  Palette, 
  Target,
  ChevronDown 
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"

const landingPages = [
  {
    title: "MVP Development",
    href: "/packages",
    description: "From idea validation to scalable growth platforms",
    icon: Rocket,
    color: "primary",
    badge: "Check • Launch • Scale"
  },
  {
    title: "Lead Generation", 
    href: "/leads",
    description: "Transform visitors into qualified leads automatically",
    icon: Target,
    color: "accent",
    badge: "Check-up • Engine • Premium"
  },
  {
    title: "Luxury Design",
    href: "/luxury",
    description: "Sophisticated design solutions for premium brands",
    icon: Crown,
    color: "secondary",
    badge: "Premium • Exclusive"
  },
  {
    title: "Design Services",
    href: "/design", 
    description: "Beautiful design that drives business results",
    icon: Palette,
    color: "primary",
    badge: "Review • System • Full Service"
  }
]

interface LandingNavProps {
  currentPage?: string
  className?: string
}

export function LandingNav({ currentPage, className = "" }: LandingNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  const currentPageData = landingPages.find(page => page.href === currentPage)
  const otherPages = landingPages.filter(page => page.href !== currentPage)

  if (currentPageData && otherPages.length === 0) return null

  return (
    <div className={`fixed top-8 right-8 z-50 ${className}`}>
      <div className="relative">
        {/* Trigger Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="glass-primary border-primary/20 bg-primary/10 text-primary hover:bg-primary/20 font-light rounded-full px-4 py-2"
        >
          <span className="text-xs">More Services</span>
          <ChevronDown className={`w-3 h-3 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>

        {/* Dropdown Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-80 glass-primary rounded-2xl border border-primary/20 p-4 shadow-2xl"
          >
            <div className="space-y-3">
              {otherPages.map((page, index) => {
                const Icon = page.icon
                return (
                  <motion.div
                    key={page.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Link
                      href={page.href}
                      className="block p-3 rounded-xl glass-secondary border border-border/10 hover:bg-accent/5 hover:border-accent/20 transition-all group"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full glass-primary border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:border-accent/20 transition-colors">
                          <Icon className={`w-5 h-5 ${
                            page.color === 'primary' ? 'text-primary' :
                            page.color === 'accent' ? 'text-accent' :
                            'text-secondary'
                          } group-hover:text-accent transition-colors`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-light text-foreground group-hover:text-accent transition-colors mb-1">
                            {page.title}
                          </h3>
                          <p className="text-xs font-light text-muted-foreground leading-relaxed mb-2">
                            {page.description}
                          </p>
                          <Badge 
                            variant="outline" 
                            className={`${
                              page.color === 'primary' ? 'bg-primary/10 text-primary border-primary/20' :
                              page.color === 'accent' ? 'bg-accent/10 text-accent border-accent/20' :
                              'bg-secondary/10 text-secondary border-secondary/20'
                            } font-light text-xs`}
                          >
                            {page.badge}
                          </Badge>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
            
            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-border/20">
              <Link
                href="/"
                className="block text-center text-xs font-light text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                ← Back to Homepage
              </Link>
            </div>
          </motion.div>
        )}
      </div>

      {/* Click outside to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 -z-10" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}