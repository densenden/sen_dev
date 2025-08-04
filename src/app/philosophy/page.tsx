"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, Eye, Zap, Users, Lightbulb, Target } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import SectionBackground from "@/components/section-background"
import { getUniqueRandomImages } from "@/lib/images-client"

const philosophyPrinciples = [
  {
    icon: Eye,
    title: "The Designer's Eye",
    description: "Every pixel serves purpose. Every line of code carries intention. The intersection of design and engineering is where magic happens.",
    color: "text-primary"
  },
  {
    icon: Zap,
    title: "Velocity Without Compromise",
    description: "Speed doesn't mean cutting corners. It means eliminating friction, automating repetition, and focusing energy where it matters most.",
    color: "text-accent"
  },
  {
    icon: Brain,
    title: "Systems Thinking",
    description: "We don't build features. We build ecosystems. Every component must work in harmony with the whole.",
    color: "text-secondary"
  },
  {
    icon: Users,
    title: "Human-First Technology",
    description: "Technology should serve humans, not the other way around. Beautiful interfaces paired with powerful functionality.",
    color: "text-primary"
  },
  {
    icon: Lightbulb,
    title: "Continuous Innovation",
    description: "The best solution today is the starting point for tomorrow's breakthrough. We iterate, we improve, we evolve.",
    color: "text-accent"
  },
  {
    icon: Target,
    title: "Ruthless Focus",
    description: "Saying no to good ideas to say yes to great ones. Every decision filters through the lens of your core mission.",
    color: "text-secondary"
  }
]

const processSteps = [
  {
    phase: "01",
    title: "Vision Alignment",
    description: "We start by understanding not just what you want to build, but why it matters and who it serves.",
    duration: "1-2 days"
  },
  {
    phase: "02", 
    title: "System Architecture",
    description: "Designing the technical foundation that will scale with your ambitions, not against them.",
    duration: "2-3 days"
  },
  {
    phase: "03",
    title: "Rapid Prototyping",
    description: "Building, testing, iterating. Fast feedback loops that keep us aligned with your vision.",
    duration: "1-2 weeks"
  },
  {
    phase: "04",
    title: "Polish & Launch",
    description: "The details that separate good from exceptional. Performance, accessibility, and user delight.",
    duration: "3-5 days"
  }
]

export default function PhilosophyPage() {
  // Get unique random images for this page (need enough for principles cards too)
  const uniqueImages = getUniqueRandomImages(10)
  const [heroImage, principlesImage, processImage, ...principleCardImages] = uniqueImages

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 grain-backdrop">
          <Image
            src={heroImage}
            alt="Philosophy hero background"
            fill
            className="object-cover opacity-100"
            priority
          />
        </div>

        <div className="container mx-auto px-8 py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="glass-primary rounded-3xl p-16"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-8"
              >
                <Badge className="glass-accent border-line-accent bg-accent/20 text-accent px-6 py-3 text-xs tracking-wider font-light border">
                  <Brain className="w-3 h-3 mr-2" />
                  Our Philosophy
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-6xl md:text-7xl lg:text-8xl font-light leading-none tracking-wide mb-8 text-white"
              >
                <span className="text-white">Where </span>
                <span className="text-primary">Vision</span>
                <br />
                <span className="text-white">Meets </span>
                <span className="text-accent">Velocity</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-xl font-light text-white/80 leading-relaxed max-w-3xl mx-auto"
              >
                The designer's eye sees what others miss. Every decision, every pixel, 
                every line of code serves a greater purpose—turning ambitious ideas into 
                <span className="text-accent"> extraordinary realities</span>.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Principles */}
      <section className="py-32">
        <div className="container mx-auto px-8">
          <div className="max-w-6xl mx-auto">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-light mb-6">
                <span className="text-primary">Core</span> Principles
              </h2>
              <p className="text-lg font-light text-muted-foreground max-w-2xl mx-auto">
                The guiding beliefs that shape every project, every decision, every line of code.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {philosophyPrinciples.map((principle, index) => {
                const Icon = principle.icon
                return (
                  <motion.div
                    key={principle.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="white-tile p-8 hover:scale-105 transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={principleCardImages[index % principleCardImages.length]}
                        alt=""
                        fill
                        className="object-cover opacity-5"
                      />
                    </div>
                    <div className="relative z-10">
                      <div className={`w-12 h-12 rounded-full ${
                      principle.color === 'text-primary' ? 'bg-primary/20' :
                      principle.color === 'text-accent' ? 'bg-accent/20' :
                      'bg-secondary/20'
                    } flex items-center justify-center mb-6`}>
                      <Icon className={`w-6 h-6 ${principle.color}`} />
                    </div>
                    <h3 className="text-xl font-light mb-4 text-foreground">{principle.title}</h3>
                      <p className="text-sm font-light text-muted-foreground leading-relaxed">
                        {principle.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 grain-backdrop">
          <Image
            src={processImage}
            alt="Process background"
            fill
            className="object-cover opacity-100"
          />
        </div>
        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-light mb-6">
                <span className="text-accent">How We</span> Work
              </h2>
              <p className="text-lg font-light text-muted-foreground max-w-2xl mx-auto">
                A proven process that transforms ambitious visions into market-ready products.
              </p>
            </motion.div>

            <div className="space-y-12">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.phase}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`flex items-center gap-12 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
                >
                  <div className="flex-1">
                    <div className="white-tile p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-3xl font-light text-primary">{step.phase}</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-primary to-accent opacity-30" />
                        <Badge className="bg-accent/10 text-accent border-accent/20 font-light text-xs">
                          {step.duration}
                        </Badge>
                      </div>
                      <h3 className="text-2xl font-light mb-4 text-foreground">{step.title}</h3>
                      <p className="text-sm font-light text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  <div className="w-32 h-32 rounded-full glass-accent flex items-center justify-center flex-shrink-0">
                    <span className="text-4xl font-light text-accent">{step.phase}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-primary rounded-3xl p-16 max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              Ready to bring your <span className="text-primary">vision</span> to life?
            </h2>
            <p className="text-lg font-light text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how our philosophy can accelerate your project from concept to launch.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="glass-accent border-line-accent bg-accent/10 hover:bg-accent/20 text-accent border px-12 py-6 text-lg font-light rounded-full"
                asChild
              >
                <Link href="/contact">Start Your Project</Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="glass-secondary border-line-secondary text-secondary hover:bg-secondary/5 px-12 py-6 text-lg font-light rounded-full border"
                asChild
              >
                <Link href="/packages">View Packages</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}