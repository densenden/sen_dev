"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Play, Image as ImageIcon, Monitor, Smartphone } from "lucide-react"
import { motion } from "framer-motion"
import { useProjects } from "@/hooks/use-data"

// Fallback data
const fallbackProjects = [
  {
    id: "1",
    title: "Senflix",
    slug: "senflix",
    summary: "AI-Powered Streaming Platform",
    description: "Netflix-style platform with intelligent content recommendations. Built with React, Next.js, and OpenAI integration.",
    tech_stack: ["React", "Next.js", "Supabase", "OpenAI"],
    tags: ["Entertainment", "AI"],
    client_name: "Internal",
    outcome: "1K+ Active Users",
    screenshots: [],
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
    video_demo: null,
    link_live: null
  },
  {
    id: "2",
    title: "Synapsee",
    slug: "synapsee",
    summary: "AI Knowledge Management",
    description: "Revolutionary platform connecting ideas through intelligent knowledge graphs. 50% productivity improvement for distributed teams.",
    tech_stack: ["Vue.js", "Node.js", "PostgreSQL", "GPT-4"],
    tags: ["Productivity", "AI"],
    client_name: "Synapsee Inc.",
    outcome: "50% Productivity Boost",
    screenshots: [],
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
    video_demo: null,
    link_live: null
  },
  {
    id: "3",
    title: "Kria Training",
    slug: "kria-training",
    summary: "Professional Development Platform",
    description: "Comprehensive training ecosystem with interactive courses and certification management. 95% completion rate.",
    tech_stack: ["Angular", "NestJS", "MongoDB", "Stripe"],
    tags: ["Education", "Platform"],
    client_name: "Kria Education",
    outcome: "500+ Certified Professionals",
    screenshots: [],
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
    video_demo: null,
    link_live: null
  }
]

const categoryColors: Record<string, string> = {
  Entertainment: "from-red-500/20 to-pink-500/20",
  Productivity: "from-blue-500/20 to-indigo-500/20",
  Education: "from-green-500/20 to-emerald-500/20",
  AI: "from-purple-500/20 to-violet-500/20",
  Platform: "from-orange-500/20 to-yellow-500/20"
}

function getDeviceIcons(techStack: string[]) {
  const devices = ["desktop"]
  if (techStack.some(tech => tech.toLowerCase().includes('native') || tech.toLowerCase().includes('mobile'))) {
    devices.push("mobile")
  }
  if (techStack.some(tech => tech.toLowerCase().includes('tablet') || tech.toLowerCase().includes('responsive'))) {
    devices.push("tablet")
  }
  return devices
}

function parseMetrics(outcome: string) {
  // Simple parsing of common outcome patterns
  if (outcome.includes('+') && outcome.includes('Users')) {
    return { users: outcome.split(' ')[0], label: 'users' }
  }
  if (outcome.includes('%') && outcome.includes('Productivity')) {
    return { productivity: outcome.split(' ')[0], label: 'productivity' }
  }
  if (outcome.includes('+') && outcome.includes('Certified')) {
    return { certified: outcome.split(' ')[0], label: 'certified' }
  }
  return { value: outcome, label: 'result' }
}

export default function ProjectShowcaseDynamic() {
  const { projects, loading, error } = useProjects()
  
  // Use Supabase data if available, otherwise fallback
  const displayProjects = projects.length > 0 ? projects.slice(0, 3) : fallbackProjects

  if (loading) {
    return (
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="animate-pulse space-y-4">
              <div className="w-32 h-6 bg-muted rounded mx-auto"></div>
              <div className="w-64 h-12 bg-muted rounded mx-auto"></div>
              <div className="w-96 h-6 bg-muted rounded mx-auto"></div>
            </div>
          </div>
          <div className="space-y-20">
            {[1, 2, 3].map((i) => (
              <div key={i} className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 animate-pulse">
                  <div className="w-24 h-6 bg-muted rounded"></div>
                  <div className="w-64 h-8 bg-muted rounded"></div>
                  <div className="w-full h-20 bg-muted rounded"></div>
                </div>
                <div className="w-full h-64 bg-muted rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-20 space-y-6"
        >
          <Badge variant="outline" className="glass px-6 py-3 text-xs uppercase tracking-wider">
            <Play className="w-3 h-3 mr-2" />
            Showcase
          </Badge>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black leading-none">
            <span className="text-foreground">Vision</span>
            <br />
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              in Action
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real projects. Real impact. Real results. 
            See how SenDev™ transforms ideas into market-ready products.
          </p>
        </motion.div>

        {/* Projects */}
        <div className="space-y-20">
          {displayProjects.map((project, index) => {
            const primaryCategory = project.tags[0] || 'Platform'
            const color = categoryColors[primaryCategory] || categoryColors.Platform
            const devices = getDeviceIcons(project.tech_stack)
            const metrics = parseMetrics(project.outcome)
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
              >
                
                {/* Project Info */}
                <div className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs">
                        {primaryCategory}
                      </Badge>
                      <div className="flex gap-2">
                        {devices.includes('desktop') && <Monitor className="w-4 h-4 text-muted-foreground" />}
                        {devices.includes('mobile') && <Smartphone className="w-4 h-4 text-muted-foreground" />}
                        {devices.includes('tablet') && <ImageIcon className="w-4 h-4 text-muted-foreground" />}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-4xl font-black">{project.title}</h3>
                      <p className="text-xl text-primary font-semibold">{project.summary}</p>
                    </div>
                    
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-black text-primary">{metrics.value || project.outcome.split(' ')[0]}</div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">
                        {metrics.label}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-black text-primary">{project.tech_stack.length}</div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">
                        technologies
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-black text-primary">
                        {Math.floor(Math.random() * 12) + 4}w
                      </div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">
                        timeline
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      Tech Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech_stack.map((tech, idx) => (
                        <Badge key={idx} variant="secondary" className="glass text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <Button 
                    variant="outline" 
                    className="glass border-primary/30 hover:border-primary/60 group"
                    onClick={() => window.open(`/projects/${project.slug}`, '_blank')}
                  >
                    View Case Study
                    <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </Button>
                </div>

                {/* Project Visual */}
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative group"
                  >
                    <Card className="glass overflow-hidden border-0 shadow-2xl">
                      <CardContent className="p-0">
                        {/* Image Placeholder */}
                        <div className={`aspect-video bg-gradient-to-br ${color} relative overflow-hidden`}>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center space-y-4">
                              <ImageIcon className="w-16 h-16 text-white/60 mx-auto" />
                              <div className="space-y-2">
                                <p className="text-white/80 font-semibold text-lg">{project.title}</p>
                                <p className="text-white/60 text-sm">Screenshot Placeholder</p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Overlay on hover */}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <Button size="lg" className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30">
                              <Play className="w-5 h-5 mr-2" />
                              View Demo
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Floating metrics */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      viewport={{ once: true }}
                      className="absolute -right-6 top-6 glass rounded-xl p-4 text-center animate-float"
                    >
                      <div className="text-lg font-black text-primary">
                        {project.outcome.split(' ')[0]}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        success
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center pt-20"
        >
          <div className="glass rounded-2xl p-12 max-w-3xl mx-auto">
            <h3 className="text-3xl font-black mb-4">Ready to join this showcase?</h3>
            <p className="text-lg text-muted-foreground mb-8">
              Your project could be the next success story. Let's turn your vision into reality.
            </p>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-lg font-semibold rounded-full"
              onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Your Project
            </Button>
          </div>
        </motion.div>

        {error && (
          <div className="fixed top-20 right-4 bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-xs text-destructive">
            Database connection failed - using fallback projects
          </div>
        )}

      </div>
    </section>
  )
}