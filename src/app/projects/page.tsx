"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ExternalLink, 
  Github, 
  Play, 
  Eye,
  Code,
  Smartphone,
  Globe,
  Brain,
  TrendingUp,
  Users,
  Zap,
  Sparkles,
  Building2,
  CheckCircle
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { getProjects } from "@/lib/data"
import { useEffect, useState } from "react"
import { getUniqueRandomImages } from "@/lib/images-client"

// Fallback project data for when Supabase is unavailable
const fallbackProjects = [
  {
    id: "1",
    title: "Senflix",
    slug: "senflix",
    summary: "Community-driven streaming platform with gamified TV interface",
    description: "A Netflix-inspired streaming platform where communities share recommendations through a gamified interface optimized for tvOS and Apple TV experiences.",
    tech_stack: ["Next.js", "TypeScript", "tvOS", "React Native", "Supabase", "Tailwind CSS"],
    screenshots: ["/projects/senflix.jpg"],
    video_demo: null,
    tags: ["Streaming", "Social", "tvOS", "Web App"],
    client_name: "Entertainment Tech", 
    outcome: "Created engaging community-driven content discovery with 21+ user profiles and seamless tvOS integration",
    link_live: "https://flix.sen.studio",
    created_at: "2024-01-15T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
    icon: Play,
    logo: "/logos/senflix.svg",
    logoType: "svg",
    headline: "Senflix - Community Streaming",
    subline: "Gamified TV Interface",
    features: ["21+ Profiles", "tvOS Native", "Social Sharing"]
  },
  {
    id: "2", 
    title: "Synapsee",
    slug: "synapsee",
    summary: "AI-powered relationship insights for couples",
    description: "Privacy-focused AI app that analyzes interaction patterns to provide personalized relationship insights and communication improvements for couples.",
    tech_stack: ["React Native", "Apple Intelligence", "On-Device AI", "Swift", "Core ML", "Privacy APIs"],
    screenshots: ["/projects/synapsee.jpg"],
    video_demo: null,
    tags: ["AI", "Relationships", "Privacy", "Mobile App"],
    client_name: "Relationship Tech",
    outcome: "Launching beta in late 2025 with on-device AI processing that respects user privacy completely",
    link_live: "https://synapsee.sen.studio",
    created_at: "2024-02-10T00:00:00Z",
    updated_at: "2024-02-10T00:00:00Z",
    icon: Brain,
    logo: "/logos/synapsee.svg",
    logoType: "svg",
    headline: "Synapsee - Relationship AI",
    subline: "Privacy-First Insights",
    features: ["On-Device AI", "100% Private", "Beta 2025"]
  },
  {
    id: "3",
    title: "Kria Training",
    slug: "kria-training", 
    summary: "Mindful fitness community platform with smart connections",
    description: "Community-driven fitness platform offering diverse training programs from swimming to HIIT, with smart member connections and flexible scheduling.",
    tech_stack: ["Next.js", "Supabase", "Stripe", "Calendar APIs", "Community Features", "React"],
    screenshots: ["/projects/kria.png"],
    video_demo: null,
    tags: ["Fitness", "Community", "Web App", "Wellness"],
    client_name: "Fitness Community",
    outcome: "Built thriving community with 500+ active members, 50+ weekly courses, and 98% satisfaction rate",
    link_live: "https://community.kria-training.de",
    created_at: "2024-03-05T00:00:00Z",
    updated_at: "2024-03-05T00:00:00Z",
    icon: TrendingUp,
    logo: "/logos/KRIA.svg",
    logoType: "svg",
    headline: "Kria Training - Mindful Fitness",
    subline: "Smart Community",
    features: ["500+ Members", "50+ Courses", "98% Satisfaction"]
  },
  {
    id: "4",
    title: "Meme Machine",
    slug: "meme-machine",
    summary: "Innovative WhatsApp meme generation chatbot",
    description: "Revolutionary WhatsApp-based AI meme generator that creates instant memes from user text without any app downloads - just send a message.",
    tech_stack: ["WhatsApp Business API", "OpenAI", "Node.js", "AI Image Generation", "Chatbot APIs"],
    screenshots: ["/projects/mememachine.png"],
    video_demo: null,
    tags: ["AI", "Social", "Chatbot", "WhatsApp"],
    client_name: "Social Media Innovation",
    outcome: "Revolutionized meme creation with instant WhatsApp integration, eliminating app barriers completely",
    link_live: "https://meme-machine.app",
    created_at: "2024-04-12T00:00:00Z", 
    updated_at: "2024-04-12T00:00:00Z",
    icon: Brain,
    logo: "/logos/mm_dark.svg",
    logoType: "svg",
    headline: "Meme Machine - WhatsApp Bot",
    subline: "Instant Memes",
    features: ["No App Needed", "AI Generated", "Viral Ready"]
  },
  {
    id: "5",
    title: "BeautyMachine",
    slug: "beautymachine",
    summary: "Premium mobile makeup services for executive women",
    description: "High-end mobile makeup service targeting professional women in Frankfurt, offering on-site beauty services with 100% punctuality guarantee starting at €89.",
    tech_stack: ["Next.js", "Supabase", "Stripe", "Booking System", "Tailwind CSS", "Mobile Optimization"],
    screenshots: ["/projects/beautymachine.jpeg"],
    video_demo: null,
    tags: ["Beauty", "Business", "Mobile Service", "Luxury"],
    client_name: "Beauty Industry",
    outcome: "Established premium mobile beauty service serving executive women across Frankfurt's business districts",
    link_live: "https://beautymachine.sen.studio",
    created_at: "2024-03-20T00:00:00Z",
    updated_at: "2024-03-20T00:00:00Z",
    icon: Sparkles,
    logo: "BM",
    logoType: "text",
    headline: "BeautyMachine - Mobile Beauty",
    subline: "Executive Service",
    features: ["€89 Starting", "100% Punctual", "Frankfurt"]
  },
  {
    id: "6",
    title: "Fork:it",
    slug: "forkit",
    summary: "Digital independence platform for entrepreneurs",
    description: "Platform empowering entrepreneurs to achieve digital independence from large tech platforms through decentralized tools and self-hosted solutions.",
    tech_stack: ["Next.js", "Self-Hosting", "Docker", "Privacy Tools", "Decentralized Tech", "Open Source"],
    screenshots: ["/projects/forkit.jpg"], 
    video_demo: null,
    tags: ["Digital Independence", "Privacy", "Self-Hosting", "Web App"],
    client_name: "Independent Entrepreneurs",
    outcome: "Empowering entrepreneurs with tools for digital sovereignty and platform independence",
    link_live: "https://forkit.sen.studio",
    created_at: "2024-05-20T00:00:00Z",
    updated_at: "2024-05-20T00:00:00Z",
    icon: Globe,
    logo: "/logos/forkit_dark_logo.svg",
    logoType: "svg",
    headline: "Fork:it - Digital Independence",
    subline: "Platform Freedom",
    features: ["Self-Hosted", "Open Source", "Privacy First"]
  }
]

const projectIcons = {
  "AI": Brain,
  "Web App": Globe,
  "Mobile App": Smartphone,
  "Streaming": Play,
  "Social": Users,
  "Creative": Zap,
  "Developer Tools": Code,
  "Fitness": TrendingUp,
  "Knowledge Management": Eye,
  "Collaboration": Users,
  "Beauty": Sparkles,
  "Business": Building2
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState(fallbackProjects)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects()
        if (data && data.length > 0) {
          setProjects(data)
        }
      } catch (error) {
        console.log("Using fallback project data")
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  // Only hero section needs backdrop image  
  const heroImage = "/random/hero-1.jpg"

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 ">
          <Image
            src={heroImage}
            alt="Projects hero background"
            fill
            className="object-cover opacity-80 saturate-75"
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
                  <Eye className="w-3 h-3 mr-2" />
                  Project Showcase
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
                    Ideas
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
                    Impact
                  </motion.span>
                </h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                  className="max-w-3xl mx-auto space-y-6"
                >
                  <p className="text-2xl font-light text-white/90 leading-relaxed">
                    Real projects, real results. Explore our portfolio of innovative solutions.
                  </p>
                  <p className="text-xl font-light text-white/80">
                    We helped ambitious entrepreneurs turn their visions into <span className="text-accent">thriving businesses</span>.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
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
                <span className="text-primary">Featured</span> Projects
              </h2>
              <p className="text-lg font-light text-muted-foreground max-w-2xl mx-auto">
                Each project represents a unique challenge solved with innovative technology and thoughtful design.
              </p>
            </motion.div>

            {loading ? (
              <div className="grid lg:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="glass-primary rounded-3xl p-8 animate-pulse">
                    <div className="h-6 bg-muted-foreground/20 rounded mb-4"></div>
                    <div className="h-4 bg-muted-foreground/10 rounded mb-6"></div>
                    <div className="h-32 bg-muted-foreground/5 rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid lg:grid-cols-2 gap-8">
                {projects.map((project, index) => {
                  const primaryTag = project.tags?.[0] || "Web App"
                  const IconComponent = projectIcons[primaryTag] || Globe
                  
                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="glass-primary backdrop-blur-md bg-white/80 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-3xl overflow-hidden hover:scale-105 transition-all duration-300 group relative shadow-xl"
                    >
                      {/* Top Section - Icon, Logo, Headlines */}
                      <div className="p-6 pb-4">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-full glass-secondary backdrop-blur-md bg-white/90 dark:bg-white/10 border border-white/30 dark:border-white/20 flex items-center justify-center shadow-lg">
                            <IconComponent className="w-6 h-6 text-black dark:text-white" />
                          </div>
                          {project.logoType === "svg" ? (
                            <img 
                              src={project.logo} 
                              alt={`${project.title} logo`}
                              className="max-h-8 w-auto filter brightness-0 dark:invert"
                              style={{ maxHeight: '32px' }}
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-2xl glass-accent bg-accent/10 border border-accent/20 flex items-center justify-center">
                              <span className="text-sm font-medium text-accent">{project.logo}</span>
                            </div>
                          )}
                          {project.link_live && (
                            <Button 
                              size="sm"
                              variant="ghost"
                              className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 glass-secondary backdrop-blur-md bg-white/90 dark:bg-white/10 border border-white/30 dark:border-white/20 shadow-lg hover:bg-white/95 dark:hover:bg-white/15"
                              asChild
                            >
                              <Link href={project.link_live} target="_blank">
                                <ExternalLink className="w-4 h-4 text-black dark:text-white" />
                              </Link>
                            </Button>
                          )}
                        </div>
                        <h3 className="text-xl font-light text-foreground mb-1">{project.headline}</h3>
                        <p className="text-sm font-light text-muted-foreground">{project.subline}</p>
                      </div>

                      {/* Image Section with Feature Bubbles */}
                      <div className="aspect-video relative overflow-hidden mx-6 rounded-2xl">
                        {project.screenshots && project.screenshots[0] ? (
                          <Image
                            src={project.screenshots[0]}
                            alt={`${project.title} screenshot`}
                            fill
                            className="object-cover saturate-75 dark:saturate-100 group-hover:saturate-100 transition-all duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
                            <IconComponent className="w-16 h-16 text-primary/30" />
                          </div>
                        )}
                        
                        {/* Feature Bubbles */}
                        {project.features?.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className={`absolute ${
                              featureIndex === 0 ? 'top-4 left-4' :
                              featureIndex === 1 ? 'top-4 right-4' :
                              'bottom-4 left-4'
                            } glass-primary backdrop-blur-md bg-white/90 dark:bg-black/50 border border-white/30 dark:border-white/20 rounded-full px-3 py-2 shadow-lg`}
                            style={{
                              transform: `scale(${0.8 + featureIndex * 0.1})`,
                              opacity: 0.9
                            }}
                          >
                            <span className="text-xs font-light text-black dark:text-white">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Bottom Section - Impact & Buttons */}
                      <div className="p-6 pt-4">
                        {/* Project Outcome */}
                        <div className="glass-secondary rounded-2xl p-4 mb-4">
                          <p className="text-xs font-light text-muted-foreground">
                            <CheckCircle className="w-3 h-3 inline mr-1 text-accent" />
                            {project.outcome}
                          </p>
                        </div>

                        {/* Tech Stack Preview */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech_stack?.slice(0, 3).map((tech, techIndex) => (
                            <Badge 
                              key={techIndex}
                              variant="outline" 
                              className="bg-secondary/5 text-secondary border-secondary/20 font-light text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                          {project.tech_stack && project.tech_stack.length > 3 && (
                            <Badge 
                              variant="outline" 
                              className="bg-secondary/5 text-secondary border-secondary/20 font-light text-xs"
                            >
                              +{project.tech_stack.length - 3}
                            </Badge>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                        {project.link_live && (
                          <Button 
                            size="sm"
                            className="glass-accent border-line-accent bg-accent/10 hover:bg-accent/20 text-accent border font-light rounded-full flex-1"
                            asChild
                          >
                            <Link href={project.link_live} target="_blank">
                              <Eye className="w-3 h-3 mr-2" />
                              View Live
                            </Link>
                          </Button>
                        )}
                        <Button 
                          size="sm"
                          variant="outline"
                          className="glass-primary border-line-primary text-primary hover:bg-primary/5 font-light rounded-full flex-1"
                          asChild
                        >
                          <Link href={`/projects/${project.slug}`}>
                            <Code className="w-3 h-3 mr-2" />
                            Case Study
                          </Link>
                        </Button>
                      </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
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
                <span className="text-accent">Proven</span> Results
              </h2>
              <p className="text-lg font-light text-muted-foreground max-w-2xl mx-auto">
                Numbers that matter: the impact of our work on real businesses.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: "50+", label: "Projects Delivered", color: "primary" },
                { value: "98%", label: "Client Satisfaction", color: "accent" },
                { value: "2.5M+", label: "Users Reached", color: "secondary" },
                { value: "15+", label: "Industries Served", color: "primary" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center white-tile p-8 rounded-3xl"
                >
                  <div className={`text-4xl md:text-5xl font-light mb-2 ${
                    stat.color === 'primary' ? 'text-primary' :
                    stat.color === 'accent' ? 'text-accent' :
                    'text-secondary'
                  }`}>
                    {stat.value}
                  </div>
                  <div className="text-sm font-light text-muted-foreground">
                    {stat.label}
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
              Ready to create your own <span className="text-primary">success story</span>?
            </h2>
            <p className="text-lg font-light text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss your project and explore how we can bring your vision to life.
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