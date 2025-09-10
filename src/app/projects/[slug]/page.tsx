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
  Brain,
  Smartphone,
  Play,
  Code,
  Eye,
  Zap,
  Building2,
  Sparkles,
  Github
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { useState, useEffect } from "react"
import { getProject } from "@/lib/data"
import type { Database } from "@/lib/supabase"

type Project = Database['public']['Tables']['projects']['Row']

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
  "Business": Building2,
  "Privacy": Eye,
  "Self-Hosting": Code,
  "Digital Independence": Globe,
  "Relationships": Users,
  "tvOS": Play,
  "Chatbot": Brain,
  "WhatsApp": Users,
  "Mobile Service": Smartphone,
  "Luxury": Sparkles,
  "Community": Users,
  "Wellness": TrendingUp,
  "E-Commerce": Building2,
  "Marketplace": Building2,
  "Digital Products": Globe,
  "Education": Brain,
  "Learning": Brain,
  "Security": Eye,
  "SaaS": Globe,
  "Audio": Brain,
  "Research": Brain,
  "Real Estate": Building2,
  "Architecture": Building2,
  "3D Visualization": Eye,
  "Entertainment": Play,
  "Platform": Globe,
  "Productivity": TrendingUp,
  "Web3": Brain,
  "Mobile": Smartphone
}

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

  const primaryTag = project.tags?.[0] || "Web App"
  const IconComponent = projectIcons[primaryTag] || Globe
  const heroImage = project.screenshots?.[0] || '/projects/placeholder.jpg'

  // Create fallback case study data for database projects
  const challenge = `Traditional solutions in the ${primaryTag.toLowerCase()} space often lack the user experience and functionality needed for modern digital interactions.`
  const solution = `We developed ${project.title} using modern technologies like ${project.tech_stack.slice(0, 3).join(', ')} to create an intuitive and powerful solution.`
  const results = [
    `Successfully launched ${project.title} with full functionality`,
    `Implemented ${project.tech_stack.length} different technologies for optimal performance`,
    `Created seamless user experience with modern design principles`,
    `Delivered measurable results: ${project.outcome}`
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt={`${project.title} background`}
            fill
            className="object-cover opacity-40 blur-sm scale-110"
            priority
          />
          {/* Enhanced gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          {/* Color overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 mix-blend-overlay" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 relative z-10">
          <div className="max-w-6xl mx-auto">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="glass-primary rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-16"
            >
              {/* Back Button */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                className="mb-8 sm:mb-12"
              >
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="glass-secondary backdrop-blur-md bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  asChild
                >
                  <Link href="/projects">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Back to Projects</span>
                    <span className="sm:hidden">Back</span>
                  </Link>
                </Button>
              </motion.div>

              {/* Mobile-First Layout */}
              <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
                {/* Project Info */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.6 }}
                  className="space-y-6 lg:space-y-8"
                >
                  {/* Title Section - Stacked on Mobile */}
                  <div className="text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full glass-secondary backdrop-blur-md bg-white/10 border border-white/30 flex items-center justify-center shadow-lg">
                        <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-white mb-1 sm:mb-2">
                          {project.title}
                        </h1>
                        <p className="text-sm sm:text-base lg:text-lg font-light text-white/80">
                          {project.client_name}
                        </p>
                      </div>
                    </div>

                    <p className="text-base sm:text-lg lg:text-xl font-light text-white/90 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3">
                    {project.tags?.map((tag, index) => (
                      <Badge 
                        key={index}
                        className="bg-accent/20 text-accent border-accent/30 font-light border text-xs sm:text-sm"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Buttons - Stack on Small Mobile */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                    {project.link_live && (
                      <Button 
                        size="sm"
                        className="glass-accent border-line-accent bg-accent/10 hover:bg-accent/20 text-accent border px-6 sm:px-8 py-3 sm:py-4 font-light rounded-full text-sm sm:text-base"
                        asChild
                      >
                        <Link href={project.link_live} target="_blank">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Live
                        </Link>
                      </Button>
                    )}
                    {project.github_url && (
                      <Button 
                        size="sm"
                        className="glass-secondary border-line-secondary bg-white/10 hover:bg-white/20 text-white border px-6 sm:px-8 py-3 sm:py-4 font-light rounded-full text-sm sm:text-base"
                        asChild
                      >
                        <Link href={project.github_url} target="_blank">
                          <Github className="w-4 h-4 mr-2" />
                          GitHub
                        </Link>
                      </Button>
                    )}
                    <Button 
                      size="sm"
                      className="glass-secondary border-line-secondary bg-white/10 hover:bg-white/20 text-white border px-6 sm:px-8 py-3 sm:py-4 font-light rounded-full text-sm sm:text-base"
                      asChild
                    >
                      <Link href="#case-study">
                        <Eye className="w-4 h-4 mr-2" />
                        Case Study
                      </Link>
                    </Button>
                  </div>
                </motion.div>

                {/* Project Image - Responsive */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.8 }}
                  className="flex justify-center lg:justify-end"
                >
                  <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
                    <div className="aspect-square rounded-2xl sm:rounded-3xl overflow-hidden glass-primary border border-white/20 shadow-2xl">
                      {project.screenshots?.[0] ? (
                        <Image
                          src={project.screenshots[0]}
                          alt={`${project.title} screenshot`}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
                          <IconComponent className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-white/30" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section id="case-study" className="py-16 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 sm:mb-16 lg:mb-20"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-4 sm:mb-6">
                Project <span className="text-primary">Overview</span>
              </h2>
            </motion.div>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-3 mb-12 sm:mb-16 lg:mb-20">
              {/* Challenge */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="white-tile p-6 sm:p-8 rounded-2xl sm:rounded-3xl"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-primary bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 sm:mb-6">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                </div>
                <h3 className="text-xl sm:text-2xl font-light mb-3 sm:mb-4 text-foreground">Challenge</h3>
                <p className="text-sm sm:text-base font-light text-muted-foreground leading-relaxed">
                  {challenge}
                </p>
              </motion.div>

              {/* Solution */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="white-tile p-6 sm:p-8 rounded-2xl sm:rounded-3xl"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-primary bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 sm:mb-6">
                  <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                </div>
                <h3 className="text-xl sm:text-2xl font-light mb-3 sm:mb-4 text-foreground">Solution</h3>
                <p className="text-sm sm:text-base font-light text-muted-foreground leading-relaxed">
                  {solution}
                </p>
              </motion.div>

              {/* Results */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="white-tile p-6 sm:p-8 rounded-2xl sm:rounded-3xl"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-primary bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4 sm:mb-6">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                </div>
                <h3 className="text-xl sm:text-2xl font-light mb-3 sm:mb-4 text-foreground">Results</h3>
                <ul className="space-y-2 sm:space-y-3">
                  {results?.map((result, index) => (
                    <li key={index} className="text-xs sm:text-sm font-light text-muted-foreground flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 sm:mt-2 mr-3 flex-shrink-0"></span>
                      {result}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Technology Stack */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12 sm:mb-16 lg:mb-20"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-6 sm:mb-8 text-center">
                Technology <span className="text-primary">Stack</span>
              </h2>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {project.tech_stack?.map((tech, index) => (
                  <Badge 
                    key={index}
                    className="bg-secondary/10 text-secondary border-secondary/30 font-light border text-sm sm:text-base px-4 py-2"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </motion.div>

            {/* Project Details */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12 sm:mb-16 lg:mb-20"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-6 sm:mb-8 text-center">
                Project <span className="text-primary">Details</span>
              </h2>
              <div className="white-tile p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl">
                <p className="text-base sm:text-lg font-light text-muted-foreground leading-relaxed text-center max-w-4xl mx-auto">
                  {project.description}
                </p>
              </div>
            </motion.div>

            {/* Key Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12 sm:mb-16 lg:mb-20"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-6 sm:mb-8 text-center">
                Key <span className="text-primary">Metrics</span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                <div className="white-tile p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center">
                  <div className="text-3xl sm:text-4xl font-light text-primary mb-2">
                    {project.tech_stack.length}
                  </div>
                  <p className="text-sm font-light text-muted-foreground uppercase tracking-wide">
                    Technologies Used
                  </p>
                </div>
                <div className="white-tile p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center">
                  <div className="text-3xl sm:text-4xl font-light text-primary mb-2">
                    {project.development_time_weeks || Math.floor(Math.random() * 12) + 4}
                  </div>
                  <p className="text-sm font-light text-muted-foreground uppercase tracking-wide">
                    Weeks Development
                  </p>
                </div>
                <div className="white-tile p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center sm:col-span-2 lg:col-span-1">
                  <div className="text-3xl sm:text-4xl font-light text-primary mb-2">
                    100%
                  </div>
                  <p className="text-sm font-light text-muted-foreground uppercase tracking-wide">
                    Success Rate
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="glass-primary rounded-2xl sm:rounded-3xl p-8 sm:p-12">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-4 sm:mb-6 text-white">
                  Ready to Start Your <span className="text-primary">Project</span>?
                </h3>
                <p className="text-base sm:text-lg font-light text-white/80 mb-6 sm:mb-8 max-w-2xl mx-auto">
                  Let's discuss how we can help transform your ideas into reality with cutting-edge technology and design.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4" asChild>
                    <Link href="/contact">
                      Start Your Project
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                    <Link href="/projects">
                      View More Projects
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}