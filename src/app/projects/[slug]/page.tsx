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
import { getRandomImage } from "@/lib/images-client"

// Project data (should match the projects page data)
const projects = [
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
    created_at: "2024-04-15T00:00:00Z",
    updated_at: "2024-12-15T00:00:00Z",
    challenge: "Traditional streaming platforms like Netflix and Prime Video lack meaningful social interaction. Users consume content in isolation, missing the shared experience of discovering and discussing shows with friends and family. The rigid, algorithm-driven recommendation systems don't account for social dynamics or community preferences.",
    solution: "Built Senflix as a community-first streaming platform with a gamified interface optimized for tvOS and Apple TV. The platform features personalized user profiles with unique avatars, social recommendation sharing, and community-driven content discovery. Users can see what friends are watching, share recommendations in real-time, and participate in gamified viewing challenges.",
    results: [
      "21+ customizable user profiles with cosmic-themed avatars like 'Elias Mercury' and 'Jules Noir'",
      "Native tvOS integration providing seamless Apple TV living room experiences",
      "Interactive profile selection interface with hover effects and smooth animations", 
      "Community recommendation system encouraging social content discovery",
      "Gamified viewing experience with social sharing and group challenges",
      "WhatsApp integration for connecting user profiles with phone numbers"
    ]
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
    created_at: "2024-05-03T00:00:00Z",
    updated_at: "2024-12-20T00:00:00Z",
    challenge: "Couples need objective insights into their communication patterns without compromising privacy or sharing intimate data.",
    solution: "Developed on-device AI processing that analyzes interaction metadata locally, providing relationship insights without reading message content.",
    results: [
      "100% privacy-focused with on-device processing",
      "Personalized relationship insights without content access",
      "Integration with Apple Intelligence ecosystem",
      "Beta launch scheduled for late 2025"
    ]
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
    created_at: "2024-07-31T00:00:00Z",
    updated_at: "2024-12-31T00:00:00Z",
    challenge: "Traditional fitness platforms lack community connection and mindful approach to wellness, leading to poor retention.",
    solution: "Created a community-first platform emphasizing mindful training with smart member connections and diverse program offerings.",
    results: [
      "500+ active community members",
      "50+ weekly courses across multiple disciplines",
      "98% user satisfaction rate",
      "Smart member connection system"
    ]
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
    created_at: "2024-08-04T00:00:00Z",
    updated_at: "2024-12-04T00:00:00Z",
    challenge: "Meme creation requires multiple apps and complex workflows, creating friction for viral content sharing.",
    solution: "Built WhatsApp-native AI meme generator that creates instant memes from text messages without any app downloads.",
    results: [
      "Zero-friction meme creation via WhatsApp",
      "AI-powered template and caption matching",
      "Instant sharing capabilities",
      "Eliminated app download barriers"
    ]
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
    created_at: "2024-05-27T00:00:00Z",
    updated_at: "2024-12-27T00:00:00Z",
    challenge: "Executive women need professional makeup services but lack time to visit salons during busy schedules.",
    solution: "Created premium mobile makeup service delivering high-end beauty services directly to offices, hotels, and homes.",
    results: [
      "100% punctuality guarantee",
      "Premium service starting at €89",
      "Serves Frankfurt's business districts",
      "Tailored for executive women's schedules"
    ]
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
    created_at: "2024-05-10T00:00:00Z",
    updated_at: "2024-12-10T00:00:00Z",
    challenge: "Entrepreneurs are dependent on large tech platforms that can change rules, pricing, or access without warning.",
    solution: "Built comprehensive platform providing tools and guidance for digital independence through self-hosting and decentralized solutions.",
    results: [
      "Complete digital sovereignty toolkit",
      "Self-hosting solution guidance",
      "Platform independence strategies",
      "Open source tool integration"
    ]
  },
  {
    id: "7",
    title: "SenCommerce",
    slug: "sencommerce",
    summary: "E-commerce platform for digital and physical products with focus on art, fashion, and personalized meditations",
    description: "Modern e-commerce solution built on Medusa v2 that seamlessly handles both digital downloads and physical products, with specialized features for creative entrepreneurs selling art, fashion, and wellness content.",
    tech_stack: ["Medusa v2", "Next.js", "React", "Tailwind CSS", "Supabase", "Stripe Checkout", "Printful API"],
    screenshots: ["/projects/sencommerce.jpg"],
    video_demo: null,
    tags: ["E-Commerce", "Marketplace", "Digital Products", "Web App"],
    client_name: "Creative Commerce",
    outcome: "Launched multi-vendor marketplace supporting artists and creators with seamless digital/physical product fulfillment",
    link_live: "https://shop.sen.studio",
    link_github: "https://github.com/densenden/sencommerce-storefront",
    created_at: "2024-08-13T00:00:00Z",
    updated_at: "2024-12-13T00:00:00Z",
    challenge: "Creative entrepreneurs struggle with platforms that either focus solely on digital or physical products, lacking integrated solutions for mixed inventory with personalized experiences.",
    solution: "Developed unified commerce platform on Medusa v2 supporting both digital downloads and print-on-demand products with integrated Printful API for automated fulfillment.",
    results: [
      "Seamless digital and physical product management",
      "Automated print-on-demand fulfillment via Printful",
      "Integrated Stripe Checkout for secure payments",
      "Personalized meditation content delivery system",
      "Support for art prints and fashion items"
    ]
  },
  {
    id: "8",
    title: "SenScript",
    slug: "senscript",
    summary: "Cheatcards that give you answers the moment your teacher asks - visual learning for instant recall",
    description: "Revolutionary cheatcard system that transforms entire subjects into memorable visual cards. Get answers instantly when your teacher asks, ace your exams with photographic recall, and turn complex topics into simple mental snapshots.",
    tech_stack: ["Next.js", "React", "Tailwind CSS", "MDX Content-System", "Supabase"],
    screenshots: ["/projects/senscript.png"],
    video_demo: null,
    tags: ["Education", "Learning", "Knowledge Management", "Web App"],
    client_name: "Education Technology",
    outcome: "Instant answers when your teacher asks - cheatcards that transform complex topics into memorable visual references",
    link_live: "https://getscript.sen.studio",
    link_github: "https://github.com/densenden/sen-script",
    created_at: "2024-08-26T00:00:00Z",
    updated_at: "2024-12-26T00:00:00Z",
    challenge: "Students struggle to recall information in the moment when teachers ask questions or during exams, leading to anxiety and poor performance despite knowing the material.",
    solution: "Created visual cheatcard system that gives you answers in the moment your teacher asks - condensing entire topics into memorable, scannable cards you can mentally recall instantly.",
    results: [
      "Instant recall during classroom questions and exams",
      "Visual cheatcards that stick in memory",
      "MDX-powered content for interactive learning",
      "Mobile-optimized for quick review before class",
      "Categorized by subject for rapid access"
    ]
  },
  {
    id: "9",
    title: "NorthPatrol",
    slug: "northpatrol",
    summary: "Security patrol management app with QR code checkpoints for professional guard services",
    description: "Digital transformation of security patrol operations through QR-based checkpoint system, real-time reporting, and comprehensive audit trails for security companies.",
    tech_stack: ["React", "Supabase", "Clerk", "Resend", "QR Code Generator", "Tailwind CSS"],
    screenshots: ["/projects/nortpatrol.png"],
    video_demo: null,
    tags: ["Security", "Business", "Mobile App", "SaaS"],
    client_name: "Security Services",
    outcome: "Digitized patrol operations for 50+ security guards, reducing reporting time by 75% and improving compliance",
    link_live: "https://northpatrol.sen.studio",
    link_github: "https://github.com/densenden/northpatrol",
    created_at: "2024-09-05T00:00:00Z",
    updated_at: "2024-12-05T00:00:00Z",
    challenge: "Security companies rely on paper-based patrol logs that are inefficient, prone to fraud, and lack real-time visibility into guard activities.",
    solution: "Created QR-based checkpoint system with mobile app for guards to scan locations, log incidents, and provide real-time updates to management dashboard.",
    results: [
      "75% reduction in patrol reporting time",
      "Real-time location verification via QR codes",
      "Comprehensive audit trail for compliance",
      "Instant incident reporting with photos",
      "Management dashboard with live patrol tracking"
    ]
  },
  {
    id: "10",
    title: "SenRecorder",
    slug: "senrecorder",
    summary: "Audio recording platform with emotion tagging for AI training data and voice UX research",
    description: "Specialized audio collection tool that captures voice recordings with emotional context metadata, designed for building emotion-aware AI models and improving voice user experiences.",
    tech_stack: ["React", "Tailwind CSS", "Clerk", "Supabase Buckets", "Resend", "Web Audio API"],
    screenshots: ["/projects/senrecorder.png"],
    video_demo: null,
    tags: ["AI", "Audio", "Research", "Web App"],
    client_name: "Voice AI Research",
    outcome: "Collected 10,000+ emotion-tagged audio samples for training emotion-aware voice AI models",
    link_live: "https://recorder.sen.studio",
    link_github: "https://github.com/densenden/emo-recorder",
    created_at: "2024-09-05T00:00:00Z",
    updated_at: "2024-12-05T00:00:00Z",
    challenge: "AI voice models lack emotional intelligence due to training data that doesn't capture emotional context alongside audio recordings.",
    solution: "Developed web-based recording platform with integrated emotion tagging, allowing users to label recordings with emotional states during capture.",
    results: [
      "10,000+ emotion-tagged audio samples collected",
      "7 emotion categories with confidence scoring",
      "High-quality audio capture via Web Audio API",
      "Automated transcription and metadata extraction",
      "GDPR-compliant data handling and storage"
    ]
  },
  {
    id: "11",
    title: "Paradieshof",
    slug: "paradieshof",
    summary: "Interactive architectural visualization platform for Frankfurt real estate development",
    description: "Immersive digital experience showcasing the Paradieshof development in Frankfurt Alt-Sachsenhausen, featuring interactive floor plans, virtual tours, and neighborhood integration visualizations.",
    tech_stack: ["React", "Node.js", "Supabase", "Clerk", "Tailwind CSS", "Three.js", "Mapbox"],
    screenshots: ["/projects/paradieshof.png"],
    video_demo: "/projects/paradieshof.mp4",
    tags: ["Real Estate", "Architecture", "3D Visualization", "Web App"],
    client_name: "Real Estate Development",
    outcome: "Generated 200+ qualified leads through immersive digital property showcase with 85% engagement rate",
    link_live: "https://paradieshof.sen.studio",
    link_github: "https://github.com/densenden/paradieshof",
    created_at: "2024-08-18T00:00:00Z",
    updated_at: "2024-12-18T00:00:00Z",
    challenge: "Traditional real estate presentations fail to convey the vision and lifestyle of new developments, especially for properties still under construction.",
    solution: "Built interactive platform with 3D visualizations, neighborhood integration maps, and annotation layers that bring architectural plans to life.",
    results: [
      "200+ qualified leads generated",
      "85% user engagement rate",
      "Interactive 3D floor plan navigation",
      "Neighborhood amenity mapping integration",
      "Virtual tour functionality with annotations"
    ]
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
  "3D Visualization": Eye
}

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find(p => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  const primaryTag = project.tags?.[0] || "Web App"
  const IconComponent = projectIcons[primaryTag] || Globe
  // Use project's screenshot as hero background, fallback to random if not available
  const heroImage = project.screenshots?.[0] || getRandomImage()

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
                    {project.link_github && (
                      <Button 
                        size="sm"
                        className="glass-secondary border-line-secondary bg-white/10 hover:bg-white/20 text-white border px-6 sm:px-8 py-3 sm:py-4 font-light rounded-full text-sm sm:text-base"
                        asChild
                      >
                        <Link href={project.link_github} target="_blank">
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
                  {project.challenge}
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
                  {project.solution}
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
                  {project.results?.map((result, index) => (
                    <li key={index} className="text-xs sm:text-sm font-light text-muted-foreground flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 sm:mt-2 mr-3 flex-shrink-0"></span>
                      {result}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="white-tile p-8 rounded-3xl mb-20"
            >
              <h3 className="text-2xl font-light mb-6 text-foreground">Technology Stack</h3>
              <div className="flex flex-wrap gap-3">
                {project.tech_stack?.map((tech, index) => (
                  <Badge 
                    key={index}
                    variant="outline"
                    className="bg-secondary/5 text-secondary border-secondary/20 font-light text-sm px-4 py-2"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </motion.div>

            {/* Project Meta */}
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="white-tile p-8 rounded-3xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Calendar className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-light text-foreground">Timeline</h3>
                </div>
                <p className="text-sm font-light text-muted-foreground">
                  Started: {new Date(project.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
                <p className="text-sm font-light text-muted-foreground">
                  Updated: {new Date(project.updated_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="white-tile p-8 rounded-3xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Users className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-light text-foreground">Impact</h3>
                </div>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  {project.outcome}
                </p>
              </motion.div>
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
              Ready to build your <span className="text-primary">next project</span>?
            </h2>
            <p className="text-lg font-light text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how we can create something amazing together.
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
                <Link href="/projects">View All Projects</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}