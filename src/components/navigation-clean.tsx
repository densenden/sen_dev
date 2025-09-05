"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { T } from "gt-next"

const navItems = [
  { label: "About", href: "/about", labelId: "nav-about" },
  { label: "Philosophy", href: "/philosophy", labelId: "nav-philosophy" },
  { label: "Services", href: "/services", labelId: "nav-services" },
  { label: "Packages", href: "/packages", labelId: "nav-packages" },
  { label: "Projects", href: "/projects", labelId: "nav-projects" },
  { label: "Contact", href: "/contact", labelId: "nav-contact" }
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
        scrolled ? 'bg-white/90 dark:bg-black/80 backdrop-blur-md' : 'bg-transparent'
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
                className="w-8 h-8 brightness-0 dark:brightness-0 dark:invert"
              />
              <div className="text-3xl font-light tracking-tight">
                <span className="text-black dark:text-white">Sen</span>
                <span className="text-black dark:text-white">Dev</span>
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
                  className="relative group font-light text-sm tracking-wide text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors duration-300"
                >
                  {item.labelId === 'nav-about' && <T id="nav-about">About</T>}
                  {item.labelId === 'nav-philosophy' && <T id="nav-philosophy">Philosophy</T>}
                  {item.labelId === 'nav-services' && <T id="nav-services">Services</T>}
                  {item.labelId === 'nav-packages' && <T id="nav-packages">Packages</T>}
                  {item.labelId === 'nav-projects' && <T id="nav-projects">Projects</T>}
                  {item.labelId === 'nav-contact' && <T id="nav-contact">Contact</T>}
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
              <Link href="/contact"><T id="nav-cta">Start Project</T></Link>
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