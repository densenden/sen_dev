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
  Zap
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
    summary: "AI-powered content recommendation platform",
    description: "A Netflix-inspired streaming platform with AI-driven content recommendations and personalized user experiences.",
    tech_stack: ["Next.js", "TypeScript", "OpenAI", "Supabase", "Tailwind CSS", "Framer Motion"],
    screenshots: ["/projects/senflix-1.jpg", "/projects/senflix-2.jpg"],
    video_demo: null,
    tags: ["AI", "Streaming", "Personalization", "Web App"],
    client_name: "SenDev Internal",
    outcome: "Demonstrated advanced AI integration capabilities and modern streaming UI patterns",
    link_live: "https://senflix.demo.com",
    created_at: "2024-01-15T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z"
  },
  {
    id: "2", 
    title: "Synapsee",
    slug: "synapsee",
    summary: "Collaborative knowledge management platform",
    description: "An intelligent workspace that connects ideas, people, and projects through AI-powered knowledge graphs.",
    tech_stack: ["React", "Node.js", "PostgreSQL", "GraphQL", "D3.js", "OpenAI"],
    screenshots: ["/projects/synapsee-1.jpg", "/projects/synapsee-2.jpg"],
    video_demo: null,
    tags: ["Knowledge Management", "Collaboration", "AI", "Graph Database"],
    client_name: "Tech Startup",
    outcome: "Increased team productivity by 40% and improved knowledge sharing across departments",
    link_live: "https://synapsee.app",
    created_at: "2024-02-10T00:00:00Z",
    updated_at: "2024-02-10T00:00:00Z"
  },
  {
    id: "3",
    title: "Kria Training",
    slug: "kria-training", 
    summary: "AI-powered fitness and wellness platform",
    description: "Personalized training programs powered by computer vision and AI coaching for optimal fitness results.",
    tech_stack: ["React Native", "Python", "TensorFlow", "Firebase", "Stripe", "Computer Vision"],
    screenshots: ["/projects/kria-1.jpg", "/projects/kria-2.jpg"],
    video_demo: null,
    tags: ["Fitness", "AI", "Mobile App", "Computer Vision"],
    client_name: "Fitness Startup",
    outcome: "Achieved 85% user retention rate and 200% increase in training completion",
    link_live: "https://kriatraining.com",
    created_at: "2024-03-05T00:00:00Z",
    updated_at: "2024-03-05T00:00:00Z"
  },
  {
    id: "4",
    title: "Meme Machine",
    slug: "meme-machine",
    summary: "AI-powered meme generation and social platform",
    description: "Creative platform that generates viral memes using AI, with social features and trend analysis.",
    tech_stack: ["Next.js", "OpenAI DALL-E", "Prisma", "Vercel", "Tailwind CSS", "Social APIs"],
    screenshots: ["/projects/meme-machine-1.jpg", "/projects/meme-machine-2.jpg"],
    video_demo: null,
    tags: ["AI", "Social", "Creative", "Viral Marketing"],
    client_name: "Creative Agency",
    outcome: "Generated over 1M memes and achieved viral status with 50K+ daily active users",
    link_live: "https://meme-machine.app",
    created_at: "2024-04-12T00:00:00Z", 
    updated_at: "2024-04-12T00:00:00Z"
  },
  {
    id: "5",
    title: "Fork:it",
    slug: "forkit",
    summary: "Developer collaboration and code review platform",
    description: "Streamlined code review and collaboration platform with AI-powered code analysis and team workflows.",
    tech_stack: ["Vue.js", "FastAPI", "PostgreSQL", "Docker", "GitHub API", "AI Code Analysis"],
    screenshots: ["/projects/forkit-1.jpg", "/projects/forkit-2.jpg"], 
    video_demo: null,
    tags: ["Developer Tools", "Code Review", "Collaboration", "AI"],
    client_name: "Software Company",
    outcome: "Reduced code review time by 60% and improved code quality scores across all teams",
    link_live: "https://forkit.dev",
    created_at: "2024-05-20T00:00:00Z",
    updated_at: "2024-05-20T00:00:00Z"
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
  "Collaboration": Users
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
                      className="glass-primary rounded-3xl overflow-hidden hover:scale-105 transition-all duration-300 group relative"
                    >
                      {/* Project Backdrop Image */}
                      <div className="absolute inset-0 h-[60%]">
                        {project.screenshots && project.screenshots[0] ? (
                          <>
                            <Image
                              src={project.screenshots[0]}
                              alt={`${project.title} screenshot`}
                              fill
                              className="object-cover opacity-90"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />
                          </>
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/10 relative">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <IconComponent className="w-16 h-16 text-primary/30" />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="relative z-10 p-8">
                        {/* Project Header */}
                        <div className="flex items-start justify-between mb-[180px]">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white/90 dark:bg-white/10 backdrop-blur-md flex items-center justify-center">
                              <IconComponent className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="text-xl font-light text-foreground group-hover:text-primary transition-colors duration-300">
                                {project.title}
                              </h3>
                              <p className="text-xs font-light text-muted-foreground">
                                {project.client_name}
                              </p>
                            </div>
                          </div>
                          {project.link_live && (
                            <Button 
                              size="sm"
                              variant="ghost"
                              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/80 dark:bg-white/10 backdrop-blur-md"
                              asChild
                            >
                              <Link href={project.link_live} target="_blank">
                                <ExternalLink className="w-4 h-4" />
                              </Link>
                            </Button>
                          )}
                        </div>

                      {/* Project Description */}
                      <p className="text-sm font-light text-muted-foreground mb-6 leading-relaxed">
                        {project.summary}
                      </p>

                      {/* Tech Stack */}
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                          {project.tech_stack?.slice(0, 4).map((tech, techIndex) => (
                            <Badge 
                              key={techIndex}
                              variant="outline"
                              className="bg-secondary/5 text-secondary border-secondary/20 font-light text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                          {project.tech_stack && project.tech_stack.length > 4 && (
                            <Badge 
                              variant="outline"
                              className="bg-muted/5 text-muted-foreground border-muted/20 font-light text-xs"
                            >
                              +{project.tech_stack.length - 4}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Project Tags */}
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                          {project.tags?.map((tag, tagIndex) => (
                            <Badge 
                              key={tagIndex}
                              className="bg-accent/10 text-accent border-accent/20 font-light text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Outcome */}
                      <div className="glass-secondary rounded-2xl p-4 mb-6">
                        <h4 className="text-sm font-light text-foreground mb-2">Project Impact</h4>
                        <p className="text-xs font-light text-muted-foreground leading-relaxed">
                          {project.outcome}
                        </p>
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