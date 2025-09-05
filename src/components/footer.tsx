"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useThemeTransition } from "@/hooks/use-theme-transition"
import { Sun, Moon, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { T } from "gt-next"
import LanguageToggle from "./language-toggle"

const footerLinks = [
  {
    title: "Services",
    titleId: "footer-services",
    links: [
      { label: "About", labelId: "footer-about", href: "/about" },
      { label: "Philosophy", labelId: "footer-philosophy", href: "/philosophy" },
      { label: "Services", labelId: "footer-services-link", href: "/services" },
      { label: "Packages", labelId: "footer-packages", href: "/packages" },
      { label: "Projects", labelId: "footer-projects", href: "/projects" },
    ]
  },
  {
    title: "Company",
    titleId: "footer-company",
    links: [
      { label: "About Denis", labelId: "footer-about-denis", href: "/about" },
      { label: "Contact", labelId: "footer-contact", href: "/contact" },
      { label: "Portfolio", labelId: "footer-portfolio", href: "/projects" },
    ]
  },
  {
    title: "Legal",
    titleId: "footer-legal",
    links: [
      { label: "Imprint", labelId: "footer-imprint", href: "https://www.sen.studio/content/legal/imprint.html" },
      { label: "Privacy Policy", labelId: "footer-privacy", href: "https://www.sen.studio/content/legal/privacy.html" },
      { label: "Terms of Service", labelId: "footer-terms", href: "https://www.sen.studio/content/legal/terms.html" },
    ]
  }
]

export default function Footer() {
  const { theme, setTheme } = useThemeTransition()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
                  className="w-8 h-8 brightness-0 dark:brightness-0 dark:invert code:brightness-0 code:invert"
                />
                <div className="text-3xl font-light tracking-tight">
                  <span className="text-black dark:text-white code:text-white">Sen</span>
                  <span className="text-black dark:text-white code:text-white">Dev</span>
                </div>
              </Link>
              
              <p className="text-sm font-light text-muted-foreground leading-relaxed max-w-sm">
                <T id="footer-tagline">Where vision meets velocity. Full-package development for ambitious entrepreneurs.</T>
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
                    {sectionIndex === 0 && <T id="footer-services">Services</T>}
                    {sectionIndex === 1 && <T id="footer-company">Company</T>}
                    {sectionIndex === 2 && <T id="footer-legal">Legal</T>}
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
                          {/* Services Section */}
                          {sectionIndex === 0 && linkIndex === 0 && <T id="footer-about">About</T>}
                          {sectionIndex === 0 && linkIndex === 1 && <T id="footer-philosophy">Philosophy</T>}
                          {sectionIndex === 0 && linkIndex === 2 && <T id="footer-services-link">Services</T>}
                          {sectionIndex === 0 && linkIndex === 3 && <T id="footer-packages">Packages</T>}
                          {sectionIndex === 0 && linkIndex === 4 && <T id="footer-projects">Projects</T>}
                          
                          {/* Company Section */}
                          {sectionIndex === 1 && linkIndex === 0 && <T id="footer-about-denis">About Denis</T>}
                          {sectionIndex === 1 && linkIndex === 1 && <T id="footer-contact">Contact</T>}
                          {sectionIndex === 1 && linkIndex === 2 && <T id="footer-portfolio">Portfolio</T>}
                          
                          {/* Legal Section */}
                          {sectionIndex === 2 && linkIndex === 0 && <T id="footer-imprint">Imprint</T>}
                          {sectionIndex === 2 && linkIndex === 1 && <T id="footer-privacy">Privacy Policy</T>}
                          {sectionIndex === 2 && linkIndex === 2 && <T id="footer-terms">Terms of Service</T>}
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
              <T id="footer-germany">Built with passion in Germany 🇩🇪</T>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="mailto:dev@sen.studio"
                className="text-xs font-light text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                dev@sen.studio
              </Link>
              <div className="w-px h-4 bg-primary/20"></div>
              <Link
                href="tel:+4915566179807"
                className="text-xs font-light text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                +49 15566179807
              </Link>
              <div className="w-px h-4 bg-primary/20"></div>
              <LanguageToggle compact={true} />
              <div className="w-px h-4 bg-primary/20"></div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (theme === "light") setTheme("dark")
                  else if (theme === "dark") setTheme("code")
                  else setTheme("light")
                }}
                className="p-2 h-auto text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {mounted ? (
                  theme === "dark" ? (
                    <Sun className="w-4 h-4" />
                  ) : theme === "code" ? (
                    <Code className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )
                ) : (
                  <div className="w-4 h-4" />
                )}
              </Button>
              <div className="w-px h-4 bg-primary/20"></div>
              <Link
                href="/contact"
                className="text-xs font-light text-primary hover:text-accent transition-colors duration-300"
              >
                <T id="footer-cta">Start Your Project</T>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}