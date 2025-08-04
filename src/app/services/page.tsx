"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Code, 
  Smartphone, 
  Brain, 
  Database, 
  Palette, 
  FileText,
  Settings,
  Globe,
  Zap,
  Users,
  TrendingUp,
  Rocket
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

const serviceCategories = [
  {
    title: "MVP Development",
    description: "Transform ideas into market-ready prototypes",
    icon: Rocket,
    color: "primary",
    services: [
      "Web Applications (React, Next.js, TypeScript)",
      "Mobile Apps (React Native, Expo, Flutter)",
      "Progressive Web Apps (PWA)",
      "API Development & Integration",
      "Database Design & Setup",
      "Authentication & User Management"
    ]
  },
  {
    title: "AI Integration", 
    description: "Harness the power of artificial intelligence",
    icon: Brain,
    color: "accent",
    services: [
      "OpenAI GPT Integration (Chat, Completion)",
      "Computer Vision (Image Recognition)",
      "Speech Recognition & Synthesis",
      "Natural Language Processing",
      "Machine Learning Model Integration",
      "AI-Powered Automation"
    ]
  },
  {
    title: "Backend & Infrastructure",
    description: "Scalable, secure, and performant foundations",
    icon: Database,
    color: "secondary",
    services: [
      "REST & GraphQL APIs",
      "Database Architecture (PostgreSQL, SQLite)",
      "Cloud Infrastructure (Vercel, Railway, Firebase)",
      "Authentication Systems (Supabase Auth, Clerk)",
      "File Storage & CDN Setup",
      "Monitoring & Analytics"
    ]
  },
  {
    title: "Branding & Design",
    description: "Visual identity that resonates with your audience",
    icon: Palette,
    color: "primary",
    services: [
      "Brand Identity & Logo Design",
      "Design System & Tokens",
      "UI/UX Design & Prototyping",
      "Responsive Web Design",
      "Icon Design & Illustration",
      "Style Guide Development"
    ]
  },
  {
    title: "Business Operations",
    description: "Systems and processes for sustainable growth",
    icon: Settings,
    color: "accent",
    services: [
      "Notion Workspace Setup",
      "CRM & Customer Management",
      "Email Marketing Integration",
      "Payment Processing (Stripe)",
      "Automation Workflows (Zapier, n8n)",
      "Business Plan Development"
    ]
  },
  {
    title: "Growth & Scaling",
    description: "Optimize performance and expand reach",
    icon: TrendingUp,
    color: "secondary",
    services: [
      "Performance Optimization",
      "SEO & Search Visibility",
      "Internationalization (i18n)",
      "A/B Testing Implementation",
      "Analytics & Reporting",
      "Team Training & Documentation"
    ]
  }
]

const techStack = [
  { category: "Frontend", technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { category: "Mobile", technologies: ["React Native", "Expo", "Flutter", "Swift"] },
  { category: "Backend", technologies: ["Node.js", "Python", "Flask", "FastAPI", "Supabase"] },
  { category: "Database", technologies: ["PostgreSQL", "SQLite", "Prisma", "MongoDB"] },
  { category: "AI/ML", technologies: ["OpenAI", "Anthropic", "TensorFlow", "PyTorch", "Hugging Face"] },
  { category: "Cloud", technologies: ["Vercel", "Railway", "Firebase", "AWS", "Docker"] },
  { category: "Tools", technologies: ["GitHub", "Figma", "Notion", "Linear", "PostHog"] }
]

export default function ServicesPage() {
  // Hero section and glass tile sections need backdrop images
  const heroImage = "/random/hero-1.jpg"
  const techImage = "/random/hero-3.jpg"
  const processImage = "/random/hero-4.jpg"

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt="Services hero background"
            fill
            className="object-cover opacity-100"
            priority
          />
        </div>

        <div className="container mx-auto px-8 py-32 relative z-10">
          <div className="max-w-6xl mx-auto">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="glass-primary rounded-3xl p-16 text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                className="flex justify-center mb-12"
              >
                <Badge className="glass-accent border-line-accent bg-accent/20 text-accent px-6 py-3 text-xs tracking-wider font-light border">
                  <Code className="w-3 h-3 mr-2" />
                  Full-Stack Services
                </Badge>
              </motion.div>

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
                    From
                  </motion.span>
                  <motion.span 
                    className="block text-primary"
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, delay: 1 }}
                  >
                    Concept
                  </motion.span>
                  <motion.span 
                    className="block"
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, delay: 1.2 }}
                  >
                    To
                  </motion.span>
                  <motion.span 
                    className="block text-accent"
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, delay: 1.4 }}
                  >
                    Launch
                  </motion.span>
                </h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                  className="max-w-3xl mx-auto space-y-6"
                >
                  <p className="text-2xl font-light text-white/90 leading-relaxed">
                    Complete development services for ambitious entrepreneurs.
                  </p>
                  <p className="text-xl font-light text-white/80">
                    We handle the technical complexity so you can focus on <span className="text-accent">building your empire</span>.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
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
              <h2 className="text-4xl md:text-5xl font-light mb-6">
                <span className="text-primary">Service</span> Categories
              </h2>
              <p className="text-lg font-light text-muted-foreground max-w-2xl mx-auto">
                Comprehensive solutions covering every aspect of modern product development.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {serviceCategories.map((category, index) => {
                const Icon = category.icon
                return (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="white-tile p-8 hover:scale-105 transition-all duration-300"
                  >
                    <div className="flex items-start gap-6">
                      <div className={`w-16 h-16 rounded-full ${
                        category.color === 'primary' ? 'bg-primary/20' :
                        category.color === 'accent' ? 'bg-accent/20' :
                        'bg-secondary/20'
                      } flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-8 h-8 ${
                          category.color === 'primary' ? 'text-primary' :
                          category.color === 'accent' ? 'text-accent' :
                          'text-secondary'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-light mb-3 text-foreground">{category.title}</h3>
                        <p className="text-sm font-light text-muted-foreground mb-6">
                          {category.description}
                        </p>
                        <ul className="space-y-2">
                          {category.services.map((service, serviceIndex) => (
                            <li key={serviceIndex} className="flex items-center gap-3">
                              <div className={`w-1.5 h-1.5 rounded-full ${
                                category.color === 'primary' ? 'bg-primary' :
                                category.color === 'accent' ? 'bg-accent' :
                                'bg-secondary'
                              }`} />
                              <span className="text-xs font-light text-muted-foreground">{service}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={techImage}
            alt="Tech stack background"
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
                <span className="text-accent">Technology</span> Stack
              </h2>
              <p className="text-lg font-light text-muted-foreground max-w-2xl mx-auto">
                Cutting-edge technologies and battle-tested frameworks for maximum impact.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {techStack.map((stack, index) => (
                <motion.div
                  key={stack.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-secondary rounded-2xl p-6"
                >
                  <h3 className="text-lg font-light mb-4 text-foreground">{stack.category}</h3>
                  <div className="space-y-2">
                    {stack.technologies.map((tech, techIndex) => (
                      <Badge 
                        key={techIndex}
                        variant="outline"
                        className="mr-2 mb-2 bg-accent/5 text-accent border-accent/20 font-light text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
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
                <span className="text-secondary">How It</span> Works
              </h2>
              <p className="text-lg font-light text-muted-foreground max-w-2xl mx-auto">
                A streamlined process designed for speed, quality, and your peace of mind.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Discovery & Strategy",
                  description: "We dive deep into your vision, goals, and requirements to create a comprehensive development strategy."
                },
                {
                  step: "02", 
                  title: "Design & Development",
                  description: "Rapid prototyping and iterative development with regular check-ins to ensure perfect alignment."
                },
                {
                  step: "03",
                  title: "Launch & Scale",
                  description: "Seamless deployment, performance optimization, and ongoing support for sustainable growth."
                }
              ].map((process, index) => (
                <motion.div
                  key={process.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 rounded-full glass-primary border-2 border-primary/20 flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-light text-primary">{process.step}</span>
                  </div>
                  <h3 className="text-xl font-light mb-4 text-foreground">{process.title}</h3>
                  <p className="text-sm font-light text-muted-foreground leading-relaxed">
                    {process.description}
                  </p>
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
              Ready to build something <span className="text-accent">extraordinary</span>?
            </h2>
            <p className="text-lg font-light text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss your project and find the perfect service package for your needs.
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