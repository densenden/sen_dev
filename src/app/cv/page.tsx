"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Eye, 
  ArrowRight,
  Download,
  Mail,
  MapPin,
  Calendar,
  Code,
  Palette,
  Target,
  Building2,
  Award,
  GraduationCap,
  Briefcase,
  Phone,
  ExternalLink,
  FileText
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { getRandomImage } from "@/lib/images-client"
import { getProjects } from "@/lib/data"
import { useEffect, useState } from "react"
import type { Database } from "@/lib/supabase"

type Project = Database['public']['Tables']['projects']['Row']

const personalInfo = {
  name: "Denis Kreuzer",
  title: "Creative Director & Full-Stack Developer",
  location: "Frankfurt am Main, Germany",
  email: "denis@kreuzer.dk",
  phone: "+49 176 20957038",
  experience: "15+ years",
  focus: "Rapid MVP Development & Startup Tech Partnership"
}

const educationData = [
  {
    period: "2024",
    institution: "Masterschool",
    degree: "Software Engineering Immersive",
    focus: "Python, Flask, SQL, Docker, Git, Full-Stack Development",
    type: "Certificate"
  },
  {
    period: "2008-2013",
    institution: "University of Applied Sciences Darmstadt",
    degree: "Diploma in Communication Design",
    focus: "Digital Interaction, Perception Models, Interface Psychology",
    type: "Diploma"
  }
]

const experienceData = [
  {
    period: "2024-Present",
    role: "Creative Director & Full-Stack Developer",
    company: "Studio Sen (Self-employed)",
    location: "Remote",
    achievements: [
      "Deployed 8+ AI-powered applications serving 500+ active users",
      "Built viral WhatsApp automation tools with 10,000+ interactions",
      "Delivered complete MVP solutions in 48-hour sprints",
      "Integrated AI technologies (OpenAI, Whisper, Vision API) into production systems"
    ]
  },
  {
    period: "2022-2024", 
    role: "Communications Manager",
    company: "Deutsche Sport Marketing",
    location: "Frankfurt, Germany",
    achievements: [
      "Implemented AI-assisted workflow automation across 3 Olympic Games campaigns",
      "Designed scalable design systems for international sports marketing",
      "Managed digital communications reaching millions of global audiences",
      "Streamlined content production pipelines with 40% efficiency gains"
    ]
  },
  {
    period: "2019-2021",
    role: "Marketing & Creative Director",
    company: "German Olympic Committee (DOSB)",
    location: "Frankfurt, Germany", 
    achievements: [
      "Led creative strategy for 5 national sporting brands",
      "Developed international wayfinding systems for major sporting events",
      "Implemented AI-powered automation systems improving efficiency by 40%",
      "Coordinated cross-cultural design teams for global campaigns"
    ]
  },
  {
    period: "2016-2019",
    role: "Managing Director & Brand Consultant",
    company: "AGLTY UG (Self-employed)",
    location: "Germany",
    achievements: [
      "Founded boutique startup consultancy specializing in rapid growth",
      "Executed 5 successful Kickstarter campaigns with $500K+ total funding",
      "Guided 12 startup exits with 3 companies still operating successfully",
      "Developed comprehensive brand strategies for early-stage ventures"
    ]
  },
  {
    period: "2013-2016",
    role: "Creative Director",
    company: "Cristinetti/Kreuzer",
    location: "Germany",
    achievements: [
      "Directed 100,000+ sqm public space design projects",
      "Created interactive installations for museums and public venues",
      "Designed digital signage systems for major infrastructure projects",
      "Led multidisciplinary teams combining architecture and digital design"
    ]
  }
]

const skillsData = {
  "Frontend Development": ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"],
  "Backend Development": ["Node.js", "Python", "Flask", "FastAPI", "PostgreSQL", "Supabase"],
  "AI & Integration": ["OpenAI API", "Whisper", "Vision API", "LangChain", "Vector Databases"],
  "Infrastructure": ["Vercel", "Railway", "Docker", "GitHub Actions", "Netlify", "Firebase"],
  "Design & UX": ["Figma", "Adobe Creative Suite", "Design Systems", "User Research", "Prototyping"],
  "Business": ["Startup Strategy", "MVP Development", "Growth Marketing", "Investor Relations"]
}


export default function CVPage() {
  const heroImage = "/cv-header.png"
  const sectionImage = getRandomImage()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const projectsData = await getProjects()
        setProjects(projectsData)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])
  
  return (
    <div className="min-h-screen">
      {/* CV Header - Clean professional layout */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt="CV header background"
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 mix-blend-multiply" />
        </div>

        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="glass-primary rounded-3xl p-12"
            >
              {/* Header with photo */}
              <div className="flex flex-col lg:flex-row gap-12 items-start lg:items-center mb-8">
                <div className="relative">
                  <div className="w-32 h-40 rounded-3xl overflow-hidden glass-primary border border-white/20">
                    <Image
                      src="/denis.png"
                      alt="Denis Kreuzer"
                      width={128}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Floating labels */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="absolute -top-3 -left-3 text-xs font-light text-white/60 bg-white/10 backdrop-blur-md rounded-full px-3 py-2"
                  >
                    Available
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    className="absolute -bottom-3 -right-3 text-xs font-light text-white/60 bg-white/10 backdrop-blur-md rounded-full px-3 py-2"
                  >
                    Remote & On-site
                  </motion.div>
                </div>
                
                <div className="flex-1">
                  <h1 className="text-4xl md:text-5xl font-light text-white mb-2">
                    {personalInfo.name}
                  </h1>
                  <p className="text-xl font-light text-white/90 mb-4">
                    {personalInfo.title}
                  </p>
                  <p className="text-base font-light text-white/80 mb-6">
                    {personalInfo.focus}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-light text-white/70">
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {personalInfo.location}
                    </span>
                    <span className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {personalInfo.email}
                    </span>
                    <span className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {personalInfo.phone}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {personalInfo.experience}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button 
                    size="lg" 
                    className="glass-accent border-line-accent bg-accent/10 hover:bg-accent/20 text-accent border px-6 py-3 text-sm font-light rounded-full"
                    asChild
                  >
                    <Link href="/contact">
                      <Mail className="mr-2 w-4 h-4" />
                      Contact
                    </Link>
                  </Button>
                  
                  {/* Documents section with illustration */}
                  <div className="relative">
                    <div className="absolute -top-2 -right-2 w-16 h-12 opacity-20">
                      <Image
                        src="/cv/documents.png"
                        alt="Documents"
                        width={64}
                        height={48}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="glass-primary border-line-primary text-white hover:bg-primary/5 px-6 py-3 text-sm font-light rounded-full border mb-3 w-full"
                      asChild
                    >
                      <a href="/denis-kreuzer-cv.pdf" download>
                        <Download className="mr-2 w-4 h-4" />
                        Download PDF
                      </a>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="glass-primary border-line-primary text-white hover:bg-primary/5 px-6 py-3 text-sm font-light rounded-full border w-full"
                      asChild
                    >
                      <a href="/denis-kreuzer-portfolio.pdf" download>
                        <FileText className="mr-2 w-4 h-4" />
                        Portfolio
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Professional Summary */}
      <section className="py-16">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="white-tile rounded-3xl p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full glass-primary border border-primary/20 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-light text-foreground">Professional Summary</h2>
              </div>
              
              <div className="space-y-4 text-sm font-light text-muted-foreground leading-relaxed">
                <p>
                  Full-stack creative developer with 15+ years bridging design strategy and technical implementation. 
                  Specialized in rapid MVP development and comprehensive startup support, from initial concept through launch and growth.
                </p>
                <p>
                  Expert in modern web technologies, AI integration, and user-centered design principles. 
                  Proven track record of delivering scalable solutions for startups, established brands, and international organizations.
                </p>
                <p>
                  Founded Studio Sen to provide complete technical and creative partnerships for ambitious entrepreneurs. 
                  Focus on quality execution, thoughtful user experience, and sustainable growth strategies.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Professional Experience */}
      <section className="py-16">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full glass-primary border border-accent/20 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-accent" />
                </div>
                <h2 className="text-3xl font-light text-foreground">Professional Experience</h2>
              </div>
            </motion.div>

            <div className="space-y-6">
              {experienceData.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="white-tile rounded-3xl p-8"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-medium text-foreground mb-2">{exp.role}</h3>
                      <p className="text-base font-light text-primary mb-1">{exp.company}</p>
                      <p className="text-sm font-light text-muted-foreground">{exp.location}</p>
                    </div>
                    <Badge className="glass-secondary border-line-secondary bg-secondary/10 text-secondary px-4 py-2 text-xs font-light border self-start">
                      {exp.period}
                    </Badge>
                  </div>
                  
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="flex items-start gap-3 text-sm font-light text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-16">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full glass-primary border border-secondary/20 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-secondary" />
                </div>
                <h2 className="text-3xl font-light text-foreground">Education</h2>
              </div>
            </motion.div>

            <div className="space-y-6">
              {educationData.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="white-tile rounded-3xl p-8"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-medium text-foreground mb-2">{edu.degree}</h3>
                      <p className="text-base font-light text-primary mb-1">{edu.institution}</p>
                      <p className="text-sm font-light text-muted-foreground">{edu.focus}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge className="glass-secondary border-line-secondary bg-secondary/10 text-secondary px-4 py-2 text-xs font-light border self-start">
                        {edu.period}
                      </Badge>
                      <Badge variant="outline" className="text-muted-foreground px-3 py-1 text-xs font-light self-start">
                        {edu.type}
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Vision - Backdrop section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={sectionImage}
            alt="Professional vision background"
            fill
            className="object-cover opacity-80 saturate-75"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30 mix-blend-multiply" />
        </div>

        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="glass-primary rounded-3xl p-16 text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="flex justify-center mb-12"
              >
                <Badge className="glass-accent border-line-accent bg-accent/20 text-accent px-6 py-3 text-xs tracking-wider font-light border">
                  <Target className="w-3 h-3 mr-2" />
                  Professional Vision
                </Badge>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                className="mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-light leading-tight tracking-wide mb-8 text-white">
                  Creating <span className="text-accent">Digital Excellence</span>
                </h2>
                
                <div className="max-w-3xl mx-auto space-y-6">
                  <p className="text-xl font-light text-white/90 leading-relaxed">
                    Where strategic design thinking meets modern development practices.
                  </p>
                  <p className="text-lg font-light text-white/80">
                    15+ years of turning complex visions into elegant, scalable solutions that drive real business outcomes.
                  </p>
                  <div className="pt-6">
                    <p className="text-lg font-light text-white/90 italic">
                      "Technology should amplify human potential,<br />
                      <span className="text-accent">not complicate it."</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-16">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full glass-primary border border-primary/20 flex items-center justify-center">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl font-light text-foreground">Technical Skills</h2>
              </div>
              
              {/* Skills Illustration */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="flex justify-center mb-8"
              >
                <div className="relative max-w-md mx-auto">
                  <Image
                    src="/cv/skills.png"
                    alt="Technical Skills Illustration"
                    width={400}
                    height={300}
                    className="rounded-2xl"
                  />
                </div>
              </motion.div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(skillsData).map(([category, skills], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="white-tile rounded-3xl p-6"
                >
                  <h3 className="text-lg font-medium text-foreground mb-4">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="px-3 py-1 bg-primary/5 text-primary rounded-full text-xs font-light border border-primary/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Projects */}
      <section className="py-16">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full glass-primary border border-accent/20 flex items-center justify-center">
                  <Award className="w-6 h-6 text-accent" />
                </div>
                <h2 className="text-3xl font-light text-foreground">Featured Projects</h2>
              </div>
              <p className="text-lg font-light text-muted-foreground max-w-2xl">
                {projects.length > 0 
                  ? `${projects.length} applications showcasing full-stack development, AI integration, and user-centered design.`
                  : 'Recent applications showcasing full-stack development, AI integration, and user-centered design.'
                }
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="white-tile rounded-3xl p-8"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/20">
                      <th className="text-left py-4 px-2 font-light text-sm text-foreground">Project</th>
                      <th className="text-left py-4 px-2 font-light text-sm text-foreground">Description</th>
                      <th className="text-left py-4 px-2 font-light text-sm text-foreground">Tech Stack</th>
                      <th className="text-left py-4 px-2 font-light text-sm text-foreground">Impact</th>
                      <th className="text-left py-4 px-2 font-light text-sm text-foreground">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center">
                          <div className="text-sm font-light text-muted-foreground">Loading projects...</div>
                        </td>
                      </tr>
                    ) : projects.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center">
                          <div className="text-sm font-light text-muted-foreground">No projects found.</div>
                        </td>
                      </tr>
                    ) : (
                      projects.map((project, index) => {
                        const thumbnailImage = project.screenshots?.[0] || null
                        const techStack = Array.isArray(project.tech_stack) 
                          ? project.tech_stack.join(', ') 
                          : project.tech_stack || 'Various technologies'
                        
                        return (
                          <motion.tr
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="border-b border-border/10 last:border-b-0"
                          >
                            <td className="py-4 px-2">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-primary/5 border border-primary/10 flex-shrink-0">
                                  {thumbnailImage ? (
                                    <Image
                                      src={thumbnailImage}
                                      alt={project.title}
                                      width={48}
                                      height={48}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        if (target.parentElement) {
                                          target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-primary text-xs font-medium bg-primary/5 rounded">${project.title[0]}</div>`;
                                        }
                                      }}
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-primary text-xs font-medium bg-primary/5 rounded">
                                      {project.title[0]}
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-foreground">{project.title}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-2 text-xs font-light text-muted-foreground max-w-xs">
                              {project.summary || project.description}
                            </td>
                            <td className="py-4 px-2 text-xs font-light text-muted-foreground max-w-xs">
                              {techStack}
                            </td>
                            <td className="py-4 px-2 text-xs font-light text-accent">
                              {project.outcome || 'Successful delivery'}
                            </td>
                            <td className="py-4 px-2">
                              {project.link_live ? (
                                <a 
                                  href={project.link_live}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-xs font-light text-primary hover:text-accent transition-colors"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                  View
                                </a>
                              ) : (
                                <span className="text-xs font-light text-muted-foreground">Private</span>
                              )}
                            </td>
                          </motion.tr>
                        )
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full glass-primary border border-primary/20 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl font-light text-foreground">Get In Touch</h2>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="white-tile rounded-3xl p-8"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-light text-foreground mb-4">Contact Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm font-light text-foreground">Email</p>
                        <a href="mailto:denis@kreuzer.dk" className="text-sm font-light text-accent hover:underline">
                          denis@kreuzer.dk
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm font-light text-foreground">Phone</p>
                        <a href="tel:+4917620957038" className="text-sm font-light text-accent hover:underline">
                          +49 176 20957038
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm font-light text-foreground">Location</p>
                        <p className="text-sm font-light text-muted-foreground">Frankfurt am Main, Germany (Remote & On-site)</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-light text-foreground mb-4">Quick Links</h3>
                  
                  <div className="space-y-3">
                    <Button 
                      size="sm" 
                      className="w-full justify-start glass-accent border-line-accent bg-accent/10 hover:bg-accent/20 text-accent border px-4 py-2 text-sm font-light rounded-full"
                      asChild
                    >
                      <Link href="/contact">
                        <Mail className="mr-2 w-4 h-4" />
                        Contact Form
                      </Link>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start border-border/20 text-foreground hover:bg-primary/5 px-4 py-2 text-sm font-light rounded-full border"
                      asChild
                    >
                      <Link href="/projects">
                        <Eye className="mr-2 w-4 h-4" />
                        View All Projects
                      </Link>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start border-border/20 text-foreground hover:bg-primary/5 px-4 py-2 text-sm font-light rounded-full border"
                      asChild
                    >
                      <Link href="/services">
                        <Building2 className="mr-2 w-4 h-4" />
                        Services Overview
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action - Employer focused */}
      <section className="py-20">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="white-tile rounded-3xl p-12 text-center relative overflow-hidden"
            >
              {/* Personal activity image */}
              <div className="absolute top-4 right-4 w-24 h-24 opacity-10">
                <Image
                  src="/cv/swim.png"
                  alt="Personal Activity"
                  width={96}
                  height={96}
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
              
              <h2 className="text-3xl font-light text-foreground mb-6">
                Looking for a <span className="text-accent">Senior Technical Leader</span>?
              </h2>
              <p className="text-lg font-light text-muted-foreground mb-8 max-w-2xl mx-auto">
                I bring 15+ years of proven leadership in scaling technical teams, delivering complex projects, and driving innovation from concept to production.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full glass-primary border border-primary/20 flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-base font-medium text-foreground mb-2">Leadership Experience</h3>
                  <p className="text-sm font-light text-muted-foreground">Led teams at Olympic Committee, major agencies, and startups</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full glass-primary border border-accent/20 flex items-center justify-center">
                    <Code className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-base font-medium text-foreground mb-2">Technical Depth</h3>
                  <p className="text-sm font-light text-muted-foreground">Full-stack expertise with modern AI/ML integration</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full glass-primary border border-secondary/20 flex items-center justify-center">
                    <Target className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-base font-medium text-foreground mb-2">Business Impact</h3>
                  <p className="text-sm font-light text-muted-foreground">Delivered systems serving millions of users</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="glass-accent border-line-accent bg-accent/10 hover:bg-accent/20 text-accent border px-8 py-4 text-base font-light rounded-full group transition-all duration-300"
                  asChild
                >
                  <a href="mailto:denis@kreuzer.dk?subject=Senior Role Opportunity">
                    Discuss Opportunities
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-border/20 text-foreground hover:bg-primary/5 px-8 py-4 text-base font-light rounded-full border transition-all duration-300"
                  asChild
                >
                  <a href="/denis-kreuzer-cv.pdf" download>
                    Download Full CV
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}