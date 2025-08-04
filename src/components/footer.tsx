"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

const footerLinks = [
  {
    title: "Services",
    links: [
      { label: "Philosophy", href: "/philosophy" },
      { label: "Services", href: "/services" },
      { label: "Packages", href: "/packages" },
      { label: "Projects", href: "/projects" },
    ]
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/philosophy" },
      { label: "Contact", href: "/contact" },
      { label: "Portfolio", href: "/projects" },
    ]
  },
  {
    title: "Legal",
    links: [
      { label: "Imprint", href: "https://www.sen.studio/content/legal/imprint.html" },
      { label: "Privacy Policy", href: "https://www.sen.studio/content/legal/privacy.html" },
      { label: "Terms of Service", href: "https://www.sen.studio/content/legal/terms.html" },
    ]
  }
]

export default function Footer() {
  const { theme, setTheme } = useTheme()

  return (
    <footer className="border-t border-primary/10 bg-background">
      <div className="container mx-auto px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          
          {/* Logo and Brand */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <Link href="/" className="flex items-center space-x-3 group">
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
              </Link>
              
              <p className="text-sm font-light text-muted-foreground leading-relaxed max-w-sm">
                Where vision meets velocity. Full-package development for ambitious entrepreneurs.
              </p>
              
              <div className="text-xs font-light text-muted-foreground">
                © {new Date().getFullYear()} SEN.CO UG. All rights reserved.
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-3 gap-8">
              {footerLinks.map((section, sectionIndex) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                  className="space-y-4"
                >
                  <h3 className="text-sm font-light text-foreground tracking-wide">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          href={link.href}
                          target={link.href.startsWith('http') ? '_blank' : undefined}
                          rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-xs font-light text-muted-foreground hover:text-primary transition-colors duration-300"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Border */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-primary/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs font-light text-muted-foreground">
              Built with passion in Germany 🇩🇪
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="mailto:dev@sen.studio"
                className="text-xs font-light text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                dev@sen.studio
              </Link>
              <div className="w-px h-4 bg-primary/20"></div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 h-auto text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </Button>
              <div className="w-px h-4 bg-primary/20"></div>
              <Link
                href="/contact"
                className="text-xs font-light text-primary hover:text-accent transition-colors duration-300"
              >
                Start Your Project
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}