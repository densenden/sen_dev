"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Eye, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { useHero } from "@/hooks/use-data"

// Fallback data
const fallbackHero = {
  title: "Fast-track",
  subtitle: "SenDev™",
  description: "The designer's eye sees what others miss.\nFull-package delivery from idea to launch.",
  philosophical_quote: "Every pixel serves purpose. Every line of code carries intention. In the intersection of design and engineering lies the future of rapid innovation.",
  cta_primary: "Explore Packages",
  cta_secondary: "View Philosophy"
}

export default function HeroDynamic() {
  const { hero, loading, error } = useHero()
  
  // Use Sanity data if available, otherwise fallback
  const content = hero || fallbackHero

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20">
        <div className="animate-pulse text-center">
          <div className="w-64 h-8 bg-muted rounded mb-4 mx-auto"></div>
          <div className="w-48 h-12 bg-muted rounded mx-auto"></div>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-2xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <Badge variant="outline" className="glass px-6 py-3 text-xs uppercase tracking-wider font-medium border-primary/20">
              <Sparkles className="w-3 h-3 mr-2" />
              {content.subtitle} - Where Vision Meets Velocity
            </Badge>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none">
              <span className="text-foreground">{content.title}</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent animate-gradient">
                {content.subtitle}
              </span>
            </h1>
            
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                {content.description.split('\n').map((line, index) => (
                  <div key={index}>
                    {line.includes('Full-package delivery') ? (
                      <>
                        {line.split('Full-package delivery')[0]}
                        <strong className="text-foreground">Full-package delivery</strong>
                        {line.split('Full-package delivery')[1]}
                      </>
                    ) : (
                      line
                    )}
                    {index === 0 && <br />}
                  </div>
                ))}
              </div>
              <p className="text-base text-muted-foreground/80">
                No agencies. No translations. Just pure execution.
              </p>
            </div>
          </motion.div>

          {/* Philosophical quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="glass rounded-2xl p-8 max-w-3xl mx-auto"
          >
            <div className="flex items-start gap-4">
              <Eye className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <blockquote className="text-lg italic text-foreground/90 text-left">
                "{content.philosophical_quote}"
              </blockquote>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {content.cta_primary}
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="glass border-primary/30 hover:border-primary/60 px-12 py-6 text-lg font-medium rounded-full transition-all duration-300"
              onClick={() => document.getElementById('philosophy')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {content.cta_secondary}
            </Button>
          </motion.div>

          {/* Minimalist social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="pt-16 space-y-4"
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground/60">
              Trusted by Visionaries
            </p>
            <div className="flex justify-center items-center gap-12 text-xs font-medium text-muted-foreground/80">
              <span className="animate-pulse-subtle">Synapsee</span>
              <span className="w-1 h-1 bg-muted-foreground/40 rounded-full"></span>
              <span className="animate-pulse-subtle">Senflix</span>
              <span className="w-1 h-1 bg-muted-foreground/40 rounded-full"></span>
              <span className="animate-pulse-subtle">Kria</span>
            </div>
          </motion.div>

        </div>
      </div>

      {error && (
        <div className="fixed top-4 right-4 bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-xs text-destructive">
          CMS connection failed - using fallback content
        </div>
      )}
    </section>
  )
}