"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Play, Image as ImageIcon, Monitor, Smartphone } from "lucide-react"
import { motion } from "framer-motion"

const projects = [
  {
    title: "Senflix",
    subtitle: "AI-Powered Streaming Platform",
    description: "Netflix-style platform with intelligent content recommendations. Built with React, Next.js, and OpenAI integration.",
    metrics: {
      users: "1K+",
      growth: "300%",
      time: "6 weeks"
    },
    tech: ["React", "Next.js", "Supabase", "OpenAI"],
    category: "Entertainment",
    image: "/placeholder-senflix.jpg",
    color: "from-red-500/20 to-pink-500/20",
    devices: ["desktop", "mobile"]
  },
  {
    title: "Synapsee",
    subtitle: "AI Knowledge Management",
    description: "Revolutionary platform connecting ideas through intelligent knowledge graphs. 50% productivity improvement for distributed teams.",
    metrics: {
      productivity: "+50%",
      teams: "25+",
      time: "8 weeks"
    },
    tech: ["Vue.js", "Node.js", "PostgreSQL", "GPT-4"],
    category: "Productivity",
    image: "/placeholder-synapsee.jpg",
    color: "from-blue-500/20 to-indigo-500/20",
    devices: ["desktop", "tablet"]
  },
  {
    title: "Kria Training",
    subtitle: "Professional Development Platform",
    description: "Comprehensive training ecosystem with interactive courses and certification management. 95% completion rate.",
    metrics: {
      completion: "95%",
      certified: "500+",
      time: "10 weeks"
    },
    tech: ["Angular", "NestJS", "MongoDB", "Stripe"],
    category: "Education",
    image: "/placeholder-kria.jpg",
    color: "from-green-500/20 to-emerald-500/20",
    devices: ["desktop", "mobile", "tablet"]
  }
]

export default function ProjectShowcase() {
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
          {projects.map((project, index) => (
            <motion.div
              key={index}
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
                      {project.category}
                    </Badge>
                    <div className="flex gap-2">
                      {project.devices.includes('desktop') && <Monitor className="w-4 h-4 text-muted-foreground" />}
                      {project.devices.includes('mobile') && <Smartphone className="w-4 h-4 text-muted-foreground" />}
                      {project.devices.includes('tablet') && <ImageIcon className="w-4 h-4 text-muted-foreground" />}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-4xl font-black">{project.title}</h3>
                    <p className="text-xl text-primary font-semibold">{project.subtitle}</p>
                  </div>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-6">
                  {Object.entries(project.metrics).map(([key, value], idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-2xl font-black text-primary">{value}</div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">
                        {key}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech Stack */}
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, idx) => (
                      <Badge key={idx} variant="secondary" className="glass text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Button variant="outline" className="glass border-primary/30 hover:border-primary/60 group">
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
                      <div className={`aspect-video bg-gradient-to-br ${project.color} relative overflow-hidden`}>
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
                      {Object.values(project.metrics)[0]}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {Object.keys(project.metrics)[0]}
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
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
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-lg font-semibold rounded-full">
              Start Your Project
            </Button>
          </div>
        </motion.div>

      </div>
    </section>
  )
}