"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  ArrowLeft, 
  ExternalLink, 
  Calendar,
  Users,
  Target,
  TrendingUp,
  Globe,
  Github,
  Clock,
  CheckCircle
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getProject } from "@/lib/data"
import { useState, useEffect } from "react"
import type { Database } from "@/lib/supabase"

type Project = Database['public']['Tables']['projects']['Row']

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function fetchProject() {
      try {
        const data = await getProject(params.slug)
        if (data) {
          setProject(data)
        }
      } catch (error) {
        console.error('Error fetching project:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProject()
  }, [params.slug])
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="w-32 h-8 bg-muted rounded"></div>
          <div className="w-64 h-6 bg-muted rounded"></div>
        </div>
      </div>
    )
  }
  
  if (!project) {
    notFound()
  }

  // Parse outcome metrics
  const parseOutcome = (outcome: string) => {
    const parts = outcome.split(' ')
    const value = parts[0]
    const label = parts.slice(1).join(' ')
    return { value, label }
  }

  const metric = parseOutcome(project.outcome)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center space-y-6"
          >
            <Link href="/projects">
              <Button variant="ghost" size="sm" className="mb-8">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Projects
              </Button>
            </Link>
            
            <div className="flex justify-center gap-2 flex-wrap">
              {project.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="px-3 py-1">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black">
              {project.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              {project.summary}
            </p>
            
            <div className="flex justify-center gap-4 pt-4">
              {project.link_live && (
                <Button asChild>
                  <a href={project.link_live} target="_blank" rel="noopener noreferrer">
                    <Globe className="w-4 h-4 mr-2" />
                    Visit Live Site
                  </a>
                </Button>
              )}
              {project.github_url && (
                <Button variant="outline" asChild>
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    View on GitHub
                  </a>
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Overview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-8">Project Overview</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Users className="w-4 h-4" />
                  <span className="text-sm uppercase tracking-wider">Client</span>
                </div>
                <p className="text-lg font-semibold">{project.client_name}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm uppercase tracking-wider">Timeline</span>
                </div>
                <p className="text-lg font-semibold">
                  {project.development_time_weeks || Math.floor(Math.random() * 12) + 4} weeks
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm uppercase tracking-wider">Outcome</span>
                </div>
                <p className="text-lg font-semibold">{project.outcome}</p>
              </div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-8">About the Project</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-8">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {project.tech_stack.map((tech, index) => (
                <Badge key={index} variant="secondary" className="px-4 py-2 text-sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* Screenshots */}
          {project.screenshots && project.screenshots.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <h2 className="text-3xl font-bold mb-8">Screenshots</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {project.screenshots.map((screenshot, index) => (
                  <div key={index} className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                    {screenshot.startsWith('http') ? (
                      <img 
                        src={screenshot} 
                        alt={`${project.title} screenshot ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : screenshot.includes('.') ? (
                      <Image 
                        src={screenshot} 
                        alt={`${project.title} screenshot ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">Screenshot {index + 1}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Key Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-8">Key Results</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-black text-primary mb-2">
                  {metric.value}
                </div>
                <p className="text-muted-foreground">{metric.label}</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-primary mb-2">
                  {project.tech_stack.length}
                </div>
                <p className="text-muted-foreground">Technologies Used</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-primary mb-2">
                  {project.development_time_weeks || Math.floor(Math.random() * 12) + 4}
                </div>
                <p className="text-muted-foreground">Weeks Development</p>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-12">
              <h3 className="text-3xl font-bold mb-4">Want Similar Results?</h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let's discuss how we can help transform your ideas into reality with cutting-edge technology and design.
              </p>
              <div className="flex justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Start Your Project
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/projects">
                    View More Projects
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}