"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Eye, 
  ArrowRight,
  Graduate,
  Trophy,
  Building2,
  Heart,
  Code,
  Palette,
  Target,
  Users
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { getRandomImage } from "@/lib/images-client"

const educationData = [
  {
    period: "2008-2013",
    institution: "University of Applied Sciences Darmstadt",
    degree: "Diploma in Communication Design",
    focus: "Digital Interaction, Perception Models, Interface Psychology"
  },
  {
    period: "2024",
    institution: "Masterschool",
    degree: "Software Engineering Immersive",
    focus: "Python, Flask, SQL, Docker, Git, Full-Stack Development"
  }
]

const experienceData = [
  {
    period: "2024-Present",
    role: "Creative Director & Full-Stack Developer",
    company: "Studio Sen (Self-employed)",
    achievements: "8+ deployed AI applications, community platforms (500+ users), viral WhatsApp tools, rapid MVP development in 48 hours"
  },
  {
    period: "2022-2024", 
    role: "Communications Manager",
    company: "Deutsche Sport Marketing",
    achievements: "AI-assisted workflow automation, scalable design systems across 3 Olympic Games campaigns"
  },
  {
    period: "2019-2021",
    role: "Marketing & Creative Director",
    company: "German Olympic Committee (DOSB)",
    achievements: "5 national brands, AI-powered automation (40% efficiency gain), international wayfinding systems"
  },
  {
    period: "2016-2019",
    role: "Managing Director & Brand Consultant",
    company: "AGLTY UG (Self-employed)",
    achievements: "Boutique startup agency, 5 Kickstarter campaigns, 12 exits, 3 still-operating companies"
  },
  {
    period: "2013-2016",
    role: "Creative Director",
    company: "Cristinetti/Kreuzer",
    achievements: "100,000+ sqm public space projects, interactive installations, digital signage systems"
  }
]

const principlesData = [
  {
    title: "Creative Variety & Excellence",
    description: "From Olympic campaigns to WhatsApp bots - delivering 50+ projects across entertainment, finance, sports, and startups.",
    icon: Palette,
    color: "text-primary"
  },
  {
    title: "Startup Speed & Support", 
    description: "48-hour MVPs, complete infrastructure setup, and comprehensive launch support from vision to reality.",
    icon: Target,
    color: "text-accent"
  },
  {
    title: "Full-Stack Mastery",
    description: "AI integration, mobile platforms, community tools, payment systems - complete technical ecosystems.",
    icon: Code,
    color: "text-secondary"
  },
  {
    title: "Production Excellence",
    description: "Whether serving millions or intimate communities - every pixel and interaction crafted with intention.",
    icon: Eye,
    color: "text-primary"
  }
]

export default function AboutPage() {
  const heroImage = getRandomImage()
  const emotionalImage = getRandomImage()
  const finalImage = getRandomImage()

  return (
    <div className="min-h-screen">
      {/* Hero Section - Emotional with backdrop */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt="About hero background"
            fill
            className="object-cover opacity-80"
            priority
          />
          {/* Color overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30 mix-blend-multiply" />
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
                  Behind the Vision
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
                    Denis
                  </motion.span>
                  <motion.span 
                    className="block text-accent"
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, delay: 1 }}
                  >
                    Kreuzer
                  </motion.span>
                </h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="max-w-4xl mx-auto space-y-6"
                >
                  <p className="text-2xl font-light text-white/90 leading-relaxed">
                    Full-Stack Creative Developer | Startup Tech Partner
                  </p>
                  <p className="text-xl font-light text-white/80">
                    15+ years bridging design strategy and full-stack development — <span className="text-accent">From concept to launch</span>
                  </p>
                  <p className="text-lg font-light text-white/70 leading-relaxed">
                    Creative technologist specializing in rapid MVP development and comprehensive startup support. 
                    From Olympic campaigns reaching millions to intimate WhatsApp bots — delivering excellence across every scale.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Denis Portrait + Quote Layout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-16 max-w-6xl mx-auto"
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Denis Portrait */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2, delay: 1.4 }}
                  className="flex justify-center lg:justify-end"
                >
                  <div className="relative">
                    <div className="w-80 h-96 rounded-3xl overflow-hidden glass-primary border border-white/20">
                      <Image
                        src="/denis.png"
                        alt="Denis Kreuzer portrait"
                        width={320}
                        height={384}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Floating labels */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 2 }}
                      className="absolute -top-4 -left-4 text-xs font-light text-white/60 bg-white/10 backdrop-blur-md rounded-full px-3 py-2"
                    >
                      Experience Designer
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 2.2 }}
                      className="absolute -bottom-4 -right-4 text-xs font-light text-white/60 bg-white/10 backdrop-blur-md rounded-full px-3 py-2"
                    >
                      Full-Stack Engineer
                    </motion.div>
                  </div>
                </motion.div>

                {/* Quote Content */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2, delay: 1.6 }}
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <p className="text-sm font-light text-white/60 uppercase tracking-widest">Design Philosophy</p>
                    <p className="text-sm font-light text-white/60 uppercase tracking-widest">Human First</p>
                  </div>

                  <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light italic text-white/95 leading-relaxed">
                    "I don't build for screens. I build for <span className="text-accent font-normal">people</span>."
                  </blockquote>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.8 }}
                    className="space-y-4"
                  >
                    <p className="text-lg font-light text-white/80">
                      Every pixel has purpose. Every interaction tells a story.
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm font-light text-white/60">
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 2 }}
                        className="border border-white/20 rounded-full px-4 py-2"
                      >
                        Psychology
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 2.2 }}
                        className="border border-white/20 rounded-full px-4 py-2"
                      >
                        Technology
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 2.4 }}
                        className="border border-white/20 rounded-full px-4 py-2"
                      >
                        Empathy
                      </motion.span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Personal Story - White tiles, no backdrop */}
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
                <span className="text-primary">Becoming</span>
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="white-tile p-8 rounded-3xl"
              >
                <h3 className="text-2xl font-light mb-6 text-foreground">Origin Story</h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed mb-4">
                  Born in Germany and raised between design studios and nature trails, I've spent the past 15+ years learning how to bring structure to vision. I didn't grow up wanting to be a programmer — I wanted to tell stories.
                </p>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  And so I did, with shapes, systems, and eventually code. My background is in communication design, but curiosity led me deeper — into UX psychology, interaction theory, and business design.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="white-tile p-8 rounded-3xl"
              >
                <h3 className="text-2xl font-light mb-6 text-foreground">Evolution</h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed mb-4">
                  What began as typography and visual systems became creative direction. What started as campaign strategy eventually turned into AI tooling. I never stopped evolving. I never wanted to.
                </p>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  To me, both sides belong together. Beautiful systems must run well. Elegant code should feel thoughtful. The front and the back are not separate — they are two angles of the same human experience.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Education - White tiles with clean tables */}
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
                Education in <span className="text-secondary">Layers</span>
              </h2>
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
                      <th className="text-left py-4 px-2 font-light text-sm text-foreground">Period</th>
                      <th className="text-left py-4 px-2 font-light text-sm text-foreground">Institution</th>
                      <th className="text-left py-4 px-2 font-light text-sm text-foreground">Degree</th>
                      <th className="text-left py-4 px-2 font-light text-sm text-foreground">Focus</th>
                    </tr>
                  </thead>
                  <tbody>
                    {educationData.map((edu, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="border-b border-border/10 last:border-b-0"
                      >
                        <td className="py-4 px-2 text-xs font-light text-primary">{edu.period}</td>
                        <td className="py-4 px-2 text-xs font-light text-foreground">{edu.institution}</td>
                        <td className="py-4 px-2 text-xs font-light text-muted-foreground">{edu.degree}</td>
                        <td className="py-4 px-2 text-xs font-light text-muted-foreground">{edu.focus}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Professional Experience - White tiles with clean tables */}
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
                Crafting Campaigns, <span className="text-accent">Building Brands</span>
              </h2>
              <p className="text-lg font-light text-muted-foreground max-w-2xl mx-auto">
                From 2013 to 2021, leadership roles across agencies and federations — orchestrating visual narratives that moved millions.
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
                      <th className="text-left py-4 px-2 font-light text-sm text-foreground">Period</th>
                      <th className="text-left py-4 px-2 font-light text-sm text-foreground">Role</th>
                      <th className="text-left py-4 px-2 font-light text-sm text-foreground">Company</th>
                      <th className="text-left py-4 px-2 font-light text-sm text-foreground">Key Achievements</th>
                    </tr>
                  </thead>
                  <tbody>
                    {experienceData.map((exp, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="border-b border-border/10 last:border-b-0"
                      >
                        <td className="py-4 px-2 text-xs font-light text-primary">{exp.period}</td>
                        <td className="py-4 px-2 text-xs font-light text-foreground font-medium">{exp.role}</td>
                        <td className="py-4 px-2 text-xs font-light text-muted-foreground">{exp.company}</td>
                        <td className="py-4 px-2 text-xs font-light text-muted-foreground">{exp.achievements}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Studio Sen Section - Emotional with backdrop */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={emotionalImage}
            alt="Studio Sen background"
            fill
            className="object-cover opacity-80 saturate-75"
          />
        </div>

        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
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
                  <Building2 className="w-3 h-3 mr-2" />
                  Studio Sen
                </Badge>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                className="mb-12"
              >
                <h2 className="text-5xl md:text-6xl font-light leading-tight tracking-wide mb-8 text-white">
                  Building the <span className="text-accent">Future</span>
                </h2>
                
                <div className="max-w-4xl mx-auto space-y-6">
                  <p className="text-xl font-light text-white/90 leading-relaxed">
                    In 2024, I founded Studio Sen – a studio that believes in clarity, integrity, and the power of mindful creation.
                  </p>
                  <p className="text-lg font-light text-white/80">
                    We build digital ecosystems that calm, connect, and empower. This isn't about chasing trends. It's about building what matters, quietly and effectively.
                  </p>
                  <div className="pt-8">
                    <p className="text-lg font-light text-white/90 italic">
                      Studio Sen is where my intuition lives.<br />
                      <span className="text-accent">SenDev is where it builds.</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Working Mindset - White tiles */}
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
                <span className="text-primary">Working</span> Mindset
              </h2>
              <p className="text-lg font-light text-muted-foreground max-w-2xl mx-auto">
                Structured, but never rigid. Focused, but still listening. Making complexity feel simple.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {principlesData.map((principle, index) => {
                const Icon = principle.icon
                return (
                  <motion.div
                    key={principle.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="white-tile p-8 hover:scale-105 transition-all duration-300"
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-full glass-primary border border-primary/20 flex items-center justify-center flex-shrink-0">
                        <Icon className={`w-8 h-8 ${principle.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-light mb-3 text-foreground">{principle.title}</h3>
                        <p className="text-sm font-light text-muted-foreground leading-relaxed">
                          {principle.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* The Long Arc - Final emotional section with backdrop */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={finalImage}
            alt="The long arc background"
            fill
            className="object-cover opacity-80 saturate-75"
          />
          {/* Color overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30 mix-blend-multiply" />
        </div>

        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="glass-secondary rounded-3xl p-16"
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <p className="text-sm font-light text-white/60 uppercase tracking-widest">The Journey</p>
                    <p className="text-sm font-light text-white/60 uppercase tracking-widest">Integration</p>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-light leading-tight tracking-wide text-white">
                    The <span className="text-accent">Long Arc</span>
                  </h2>
                  
                  <div className="space-y-6">
                    <p className="text-lg font-light text-white/90 leading-relaxed">
                      This isn't about pivoting from designer to developer.<br />
                      It's about integrating decades of creative rigor with today's technical edge.
                    </p>
                    <p className="text-lg font-light text-white/80">
                      I'm not just here to code your vision.<br />
                      I'm here to <span className="text-accent">understand it</span>.
                    </p>
                    <p className="text-base font-light text-white/70">
                      And if I do my job right, you'll feel seen, your product will feel alive, and your users will feel invited — not overwhelmed.
                    </p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <Button 
                      size="lg" 
                      className="glass-accent border-line-accent bg-accent/10 hover:bg-accent/20 text-accent border px-8 py-4 text-base font-light rounded-full group transition-all duration-300"
                      asChild
                    >
                      <Link href="/contact">
                        Start Building Together
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="glass-primary border-line-primary text-white hover:bg-primary/5 px-8 py-4 text-base font-light rounded-full border transition-all duration-300"
                      asChild
                    >
                      <Link href="/services">View Services</Link>
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Denis Portrait */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.4 }}
                  className="flex justify-center lg:justify-start"
                >
                  <div className="relative">
                    <div className="w-64 h-80 rounded-3xl overflow-hidden glass-primary border border-white/20">
                      <Image
                        src="/denis.png"
                        alt="Denis Kreuzer portrait"
                        width={256}
                        height={320}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Floating labels */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                      className="absolute -top-3 -left-3 text-xs font-light text-white/60 bg-white/10 backdrop-blur-md rounded-full px-3 py-2"
                    >
                      Creative Rigor
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 1 }}
                      className="absolute -bottom-3 -right-3 text-xs font-light text-white/60 bg-white/10 backdrop-blur-md rounded-full px-3 py-2"
                    >
                      Technical Edge
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}