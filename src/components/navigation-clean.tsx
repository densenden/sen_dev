"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"

const navItems = [
  { label: "Philosophy", href: "/philosophy" },
  { label: "Services", href: "/services" },
  { label: "Packages", href: "/packages" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" }
]

export default function NavigationClean() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-primary' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <Image
                src="/logo.svg"
                alt="SenDev Logo"
                width={32}
                height={32}
                className="w-8 h-8 dark:brightness-0 dark:invert"
              />
              <div className="text-3xl font-light tracking-tight">
                <span className="text-foreground dark:text-white">Sen</span>
                <span className="text-primary">Dev</span>
              </div>
            </motion.div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-12">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link 
                  href={item.href}
                  className="relative group font-light text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  {item.label}
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-primary via-accent to-secondary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    layoutId="underline"
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden lg:block"
          >
            <Button 
              className="glass-accent border-line-accent text-accent-foreground hover:bg-accent/20 font-light text-sm px-6 py-2 rounded-full border"
              asChild
            >
              <Link href="/contact">Start Project</Link>
            </Button>
          </motion.div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden">
            <div className="w-6 h-6 flex flex-col justify-center space-y-1 cursor-pointer group">
              <div className="w-full h-px bg-primary group-hover:bg-accent transition-colors duration-300"></div>
              <div className="w-full h-px bg-primary group-hover:bg-accent transition-colors duration-300"></div>
              <div className="w-full h-px bg-primary group-hover:bg-accent transition-colors duration-300"></div>
            </div>
          </div>
        </div>
        
        {/* Horizontal divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-30"
        />
      </div>
    </motion.nav>
  )
}