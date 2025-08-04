"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Eye } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { getRandomImage } from "@/lib/images-client"

export default function HeroElegant() {
  const randomImage = getRandomImage()

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={randomImage}
          alt="Hero background"
          fill
          className="object-cover opacity-100"
          priority
          onError={() => {
            // Fallback to gradient if image fails to load
            const element = document.querySelector('.hero-fallback') as HTMLElement
            if (element) {
              element.style.display = 'block'
            }
          }}
        />
        {/* Fallback gradient */}
        <div className="hero-fallback hidden w-full h-full bg-gradient-to-br from-background via-muted/20 to-background">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="text-8xl font-light text-primary">HERO</div>
          </div>
        </div>
        
        {/* Color overlay lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-30" />
        
        {/* No overlay - full background visibility */}
      </div>

      <div className="container mx-auto px-8 py-32 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="glass-primary rounded-3xl p-16 text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="flex justify-center mb-12"
            >
              <Badge className="glass-accent border-line-accent bg-accent/20 text-accent px-6 py-3 text-xs tracking-wider font-light border">
                <Eye className="w-3 h-3 mr-2" />
                Where Vision Meets Velocity
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              className="mb-16"
            >
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-light leading-none tracking-wide mb-8 text-white">
                <motion.span 
                  className="block"
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1.2, delay: 0.8 }}
                >
                  Fast-track
                </motion.span>
                <motion.span 
                  className="block text-primary"
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1.2, delay: 1 }}
                >
                  SenDev™
                </motion.span>
              </h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="max-w-3xl mx-auto space-y-6"
              >
                <p className="text-2xl font-light text-white/90 leading-relaxed">
                  The designer's eye sees what others miss.
                </p>
                <p className="text-xl font-light text-white/80">
                  <span className="text-accent">Full-package delivery</span> from idea to launch.
                </p>
                <p className="text-lg font-light text-white/70">
                  No agencies. No translations. Just pure execution.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Direct Quote on Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mb-16 max-w-4xl mx-auto"
          >
            <blockquote className="text-2xl md:text-3xl font-light italic text-white/95 leading-relaxed text-center">
              "Speed beats perfection. Execution trumps planning. 
              Your MVP doesn't need to be flawless—it needs to be <span className="text-accent font-normal">fast</span>."
            </blockquote>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Button 
              size="lg" 
              className="glass-accent border-line-accent bg-accent/10 hover:bg-accent/20 text-accent border px-12 py-6 text-lg font-light rounded-full group transition-all duration-300"
              asChild
            >
              <Link href="/packages">
                Explore Packages
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="glass-primary border-line-primary text-primary hover:bg-primary/5 px-12 py-6 text-lg font-light rounded-full border transition-all duration-300"
              asChild
            >
              <Link href="/philosophy">View Philosophy</Link>
            </Button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="text-center pt-24 space-y-6"
          >
            <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-8" />
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-light">
              Trusted by Visionaries
            </p>
            <div className="flex justify-center items-center gap-16 text-sm font-light">
              <span className="text-primary hover:text-accent transition-colors duration-300 cursor-pointer">Synapsee</span>
              <span className="w-px h-4 bg-primary/20"></span>
              <span className="text-primary hover:text-accent transition-colors duration-300 cursor-pointer">Senflix</span>
              <span className="w-px h-4 bg-primary/20"></span>
              <span className="text-primary hover:text-accent transition-colors duration-300 cursor-pointer">Kria</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}