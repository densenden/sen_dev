"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ArrowRight, 
  Eye, 
  Zap, 
  Target, 
  Users, 
  Rocket,
  Brain,
  TrendingUp,
  Star,
  CheckCircle,
  Clock,
  Globe,
  Play,
  Sparkles
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import HeroElegant from "@/components/hero-elegant"
import SectionBackground from "@/components/section-background"
import { getUniqueRandomImages } from "@/lib/images-client"
import { useState, useEffect } from "react"

// All available projects with actual images
const allProjects = [
  {
    id: "senflix",
    title: "Senflix", 
    category: "Senflix - Community Streaming",
    description: "Community-driven streaming platform with gamified TV interface optimized for tvOS",
    tags: ["Streaming", "Social", "tvOS"],
    outcome: "21+ user profiles with seamless tvOS integration",
    image: "/projects/senflix.jpg",
    logo: "/logos/senflix.svg",
    logoType: "svg"
  },
  {
    id: "meme-machine",
    title: "Meme Machine",
    category: "Meme Machine - WhatsApp Chatbot", 
    description: "Revolutionary WhatsApp-based AI meme generator without app downloads",
    tags: ["AI", "Chatbot", "WhatsApp"],
    outcome: "Instant meme creation via WhatsApp messaging",
    image: "/projects/mememachine.png",
    logo: "/logos/mm_dark.svg",
    logoType: "svg"
  },
  {
    id: "beautymachine",
    title: "BeautyMachine",
    category: "BeautyMachine - Mobile Beauty Service",
    description: "Premium mobile makeup services for executive women in Frankfurt", 
    tags: ["Beauty", "Business", "Mobile Service"],
    outcome: "100% punctuality guarantee starting at €89",
    image: "/projects/beautymachine.jpeg",
    logo: "BM",
    logoType: "text"
  },
  {
    id: "synapsee",
    title: "Synapsee",
    category: "Synapsee - Relationship AI",
    description: "Privacy-focused AI app that analyzes interaction patterns to provide personalized relationship insights",
    tags: ["AI", "Relationships", "Privacy"],
    outcome: "Beta launching late 2025 with on-device AI processing",
    image: "/projects/synapsee.jpg",
    logo: "/logos/synapsee.svg",
    logoType: "svg"
  },
  {
    id: "kria-training",
    title: "Kria Training",
    category: "Kria Training - Fitness Community",
    description: "Mindful fitness community platform with smart member connections and diverse training programs",
    tags: ["Fitness", "Community", "Wellness"],
    outcome: "500+ active members with 98% satisfaction rate",
    image: "/projects/kria.png",
    logo: "/logos/KRIA.svg",
    logoType: "svg"
  },
  {
    id: "forkit",
    title: "Fork:it",
    category: "Fork:it - Digital Independence",
    description: "Platform empowering entrepreneurs to achieve digital independence from large tech platforms",
    tags: ["Privacy", "Self-Hosting", "Independence"],
    outcome: "Empowering entrepreneurs with digital sovereignty tools",
    image: "/projects/forkit.jpg",
    logo: "/logos/forkit_dark_logo.svg",
    logoType: "svg"
  }
]

// Function to randomly select 3 projects
function getRandomProjects(projects: typeof allProjects, count: number = 3) {
  const shuffled = [...projects].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

const targetAudiences = [
  {
    title: "Serial Entrepreneurs",
    description: "Need rapid MVP development to test multiple ideas quickly",
    example: "E-commerce platform with AI recommendations",
    icon: Rocket,
    color: "primary"
  },
  {
    title: "Tech Startups",
    description: "Require scalable technical infrastructure for growth",
    example: "SaaS platform with real-time collaboration features", 
    icon: TrendingUp,
    color: "accent"
  },
  {
    title: "Creative Agencies",
    description: "Want innovative digital experiences for their clients",
    example: "Interactive portfolio with motion design",
    icon: Star,
    color: "secondary"
  },
  {
    title: "Growing Businesses",
    description: "Need automation and technical leadership support",
    example: "Custom CRM with workflow automation",
    icon: Users,
    color: "primary"
  }
]

const coreValues = [
  {
    value: "Speed Without Compromise",
    description: "Rapid development that doesn't sacrifice quality or scalability",
    benefit: "Get to market 3x faster than traditional agencies"
  },
  {
    value: "Designer-Engineer Hybrid",
    description: "Unique combination of aesthetic vision and technical expertise",
    benefit: "Products that are both beautiful and technically sound"
  },
  {
    value: "Full-Package Delivery",
    description: "Everything from concept to launch in one cohesive process",
    benefit: "No coordination headaches between multiple vendors"
  },
  {
    value: "Entrepreneur-First Mindset",
    description: "Built by entrepreneurs, for entrepreneurs who understand urgency",
    benefit: "Decisions made at startup speed, not agency bureaucracy"
  }
]

export default function Home() {
  // Random project selection with hydration-safe approach
  const [featuredProjects, setFeaturedProjects] = useState(allProjects.slice(0, 3))

  useEffect(() => {
    setFeaturedProjects(getRandomProjects(allProjects, 3))
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroElegant />

      {/* Latest Projects Preview */}
      <section className="py-32">
        <div className="container mx-auto px-8">
          <div className="max-w-7xl mx-auto">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <Badge className="glass-accent border-line-accent bg-accent/10 text-accent px-6 py-3 text-xs tracking-wider font-light mb-8">
                <Eye className="w-3 h-3 mr-2" />
                Latest Work
              </Badge>
              <h2 className="text-4xl md:text-5xl font-light mb-6">
                <span className="text-primary">Recent</span> Success Stories
              </h2>
              <p className="text-lg font-light text-muted-foreground max-w-2xl mx-auto">
                Real projects, real results. See how we've helped entrepreneurs turn ambitious ideas into thriving businesses.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/projects/${project.id}`} className="block glass-primary rounded-3xl overflow-hidden hover:scale-105 transition-all duration-300 group">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge className="bg-accent/90 text-accent-foreground border-0 font-light text-xs mb-2">
                        {project.category}
                      </Badge>
                      <h3 className="text-white font-light text-xl">{project.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm font-light text-muted-foreground mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge 
                          key={tagIndex}
                          variant="outline" 
                          className="bg-secondary/5 text-secondary border-secondary/20 font-light text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="glass-secondary rounded-2xl p-3 mb-4">
                      <p className="text-xs font-light text-muted-foreground">
                        <CheckCircle className="w-3 h-3 inline mr-1 text-accent" />
                        {project.outcome}
                      </p>
                    </div>
                  </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <Button 
                className="glass-primary border-line-primary text-primary hover:bg-primary/5 px-8 py-3 font-light rounded-full border"
                asChild
              >
                <Link href="/projects">
                  View All Projects
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* For Whom - Target Audiences */}
      <section className="relative py-32 overflow-hidden">
        <SectionBackground opacity={0.08} blur={true} />
        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-light mb-6">
                <span className="text-accent">Perfect For</span> Visionaries
              </h2>
              <p className="text-lg font-light text-muted-foreground max-w-2xl mx-auto">
                We work with ambitious entrepreneurs and organizations who value speed, quality, and technical excellence.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {targetAudiences.map((audience, index) => {
                const Icon = audience.icon
                return (
                  <motion.div
                    key={audience.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="glass-primary rounded-3xl p-8"
                  >
                    <div className="flex items-start gap-6">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${
                        audience.color === 'primary' ? 'from-primary to-primary/20' :
                        audience.color === 'accent' ? 'from-accent to-accent/20' :
                        'from-secondary to-secondary/20'
                      } flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-6 h-6 ${
                          audience.color === 'primary' ? 'text-primary-foreground' :
                          audience.color === 'accent' ? 'text-accent-foreground' :
                          'text-secondary-foreground'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-light mb-3 text-foreground">{audience.title}</h3>
                        <p className="text-sm font-light text-muted-foreground mb-4">
                          {audience.description}
                        </p>
                        <div className="glass-secondary rounded-2xl p-4">
                          <p className="text-xs font-light text-muted-foreground mb-1">Example Project:</p>
                          <p className="text-sm font-light text-foreground">{audience.example}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values & Benefits */}
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
                <span className="text-secondary">Why</span> SenDev™
              </h2>
              <p className="text-lg font-light text-muted-foreground max-w-2xl mx-auto">
                Four core values that drive every project, every decision, every line of code.
              </p>
            </motion.div>

            <div className="space-y-8">
              {coreValues.map((item, index) => (
                <motion.div
                  key={item.value}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`flex items-center gap-12 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
                >
                  <div className="flex-1">
                    <div className="glass-primary rounded-3xl p-8">
                      <h3 className="text-2xl font-light mb-4 text-foreground">{item.value}</h3>
                      <p className="text-sm font-light text-muted-foreground mb-6 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="glass-accent rounded-2xl p-4">
                        <p className="text-xs font-light text-accent-foreground/90">
                          <Target className="w-3 h-3 inline mr-2" />
                          {item.benefit}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-20 h-20 rounded-full glass-secondary flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-light text-primary">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Entry CTA */}
      <section className="relative py-32 overflow-hidden">
        <SectionBackground opacity={0.1} blur={true} />
        <div className="container mx-auto px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-primary rounded-3xl p-16 max-w-4xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <Clock className="w-8 h-8 text-accent" />
              <Badge className="glass-accent border-line-accent bg-accent/10 text-accent px-6 py-3 text-sm tracking-wider font-light">
                Ready to Start Today?
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              Turn your <span className="text-primary">vision</span> into reality
            </h2>
            <p className="text-lg font-light text-muted-foreground mb-8 max-w-2xl mx-auto">
              From ambitious idea to market-ready product. Let's discuss your project and find the perfect approach to bring it to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="glass-accent border-line-accent bg-accent/10 hover:bg-accent/20 text-accent border px-12 py-6 text-lg font-light rounded-full group"
                asChild
              >
                <Link href="/contact">
                  Start Your Project
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="glass-primary border-line-primary text-primary hover:bg-primary/5 px-12 py-6 text-lg font-light rounded-full border"
                asChild
              >
                <Link href="/packages">View Packages</Link>
              </Button>
            </div>
            
            <div className="mt-12 pt-8 border-t border-primary/10">
              <div className="flex items-center justify-center gap-8 text-sm font-light text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span>Free Consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span>24h Response Time</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span>No Commitment</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}