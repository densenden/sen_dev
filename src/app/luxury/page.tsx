"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Crown, 
  Palette, 
  Sparkles, 
  Diamond,
  Star,
  Camera,
  Users,
  TrendingUp,
  Heart,
  Shield
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

const luxuryServices = [
  {
    title: "Premium Brand Identity",
    description: "Sophisticated visual systems that command attention",
    icon: Crown,
    color: "primary",
    services: [
      "Luxury Logo Design & Brand Marks",
      "Premium Typography Systems", 
      "Sophisticated Color Palettes",
      "Brand Guidelines & Standards",
      "Stationery & Business Collateral",
      "Brand Voice & Messaging Strategy"
    ]
  },
  {
    title: "High-End Web Experiences",
    description: "Digital presence that reflects your premium positioning",
    icon: Diamond,
    color: "accent",
    services: [
      "Luxury Website Design & Development",
      "Premium E-commerce Solutions",
      "Interactive Brand Experiences",
      "Custom Animation & Micro-interactions",
      "Mobile-First Responsive Design",
      "Performance Optimization"
    ]
  },
  {
    title: "Editorial & Content Design",
    description: "Compelling narratives that elevate your brand story",
    icon: Palette,
    color: "secondary",
    services: [
      "Brand Storytelling & Copywriting",
      "Editorial Design & Layouts",
      "Premium Photography Direction",
      "Social Media Visual Strategy",
      "Marketing Collateral Design",
      "Brand Content Strategy"
    ]
  },
  {
    title: "Exclusive Client Experience",
    description: "White-glove service that exceeds expectations",
    icon: Star,
    color: "primary",
    services: [
      "1-on-1 Creative Direction",
      "Priority Project Timelines",
      "Unlimited Revisions",
      "Direct Designer Access",
      "Brand Evolution Support",
      "Strategic Growth Consulting"
    ]
  }
]

const luxuryPortfolio = [
  {
    title: "Atelier Collection",
    category: "Fashion & Luxury Goods",
    description: "Complete brand identity and e-commerce platform for premium fashion house",
    image: "/luxury/atelier-preview.jpg"
  },
  {
    title: "Meridian Estates", 
    category: "Real Estate & Property",
    description: "Sophisticated digital presence for luxury property development",
    image: "/luxury/meridian-preview.jpg"
  },
  {
    title: "Lumière Hospitality",
    category: "Hotels & Hospitality", 
    description: "Brand refresh and digital experience for boutique hotel chain",
    image: "/luxury/lumiere-preview.jpg"
  }
]

const process = [
  {
    step: "01",
    title: "Discovery & Vision",
    description: "Deep brand exploration to understand your unique positioning and luxury market opportunities."
  },
  {
    step: "02",
    title: "Strategic Design",
    description: "Crafting sophisticated visual systems that communicate premium value and brand distinction."
  },
  {
    step: "03",
    title: "Premium Execution",
    description: "Flawless implementation with meticulous attention to detail and luxury standards."
  },
  {
    step: "04",
    title: "Growth & Evolution",
    description: "Ongoing brand development and strategic guidance for sustainable luxury positioning."
  }
]

export default function LuxuryPage() {
  const heroImage = "/random/hero-2.jpg"
  const processImage = "/random/hero-4.jpg"
  const portfolioImage = "/random/hero-3.jpg"

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt="Luxury design hero background"
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
                  <Crown className="w-3 h-3 mr-2" />
                  Luxury Brand Design
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
                    Luxury
                  </motion.span>
                  <motion.span 
                    className="block text-primary"
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, delay: 1 }}
                  >
                    Brand
                  </motion.span>
                  <motion.span 
                    className="block text-accent"
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, delay: 1.2 }}
                  >
                    Design
                  </motion.span>
                </h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                  className="max-w-3xl mx-auto space-y-6"
                >
                  <p className="text-2xl font-light text-white/90 leading-relaxed">
                    Sophisticated design solutions for discerning brands.
                  </p>
                  <p className="text-xl font-light text-white/80">
                    We craft premium brand experiences that command attention and <span className="text-accent">inspire desire</span>.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
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
                <span className="text-primary">Luxury</span> Services
              </h2>
              <p className="text-lg font-light text-muted-foreground max-w-2xl mx-auto">
                Premium design services that elevate your brand to luxury status.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {luxuryServices.map((service, index) => {
                const Icon = service.icon
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="white-tile p-8 hover:scale-105 transition-all duration-300"
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-full glass-primary border border-primary/20 flex items-center justify-center flex-shrink-0">
                        <Icon className={`w-8 h-8 ${
                          service.color === 'primary' ? 'text-primary' :
                          service.color === 'accent' ? 'text-accent' :
                          'text-secondary'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-light mb-3 text-foreground">{service.title}</h3>
                        <p className="text-sm font-light text-muted-foreground mb-6">
                          {service.description}
                        </p>
                        <ul className="space-y-2">
                          {service.services.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-center gap-3">
                              <div className={`w-1.5 h-1.5 rounded-full ${
                                service.color === 'primary' ? 'bg-primary' :
                                service.color === 'accent' ? 'bg-accent' :
                                'bg-secondary'
                              }`} />
                              <span className="text-xs font-light text-muted-foreground">{item}</span>
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

      {/* Portfolio Preview */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={portfolioImage}
            alt="Portfolio background"
            fill
            className="object-cover opacity-80 saturate-75"
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
                <span className="text-accent">Premium</span> Portfolio
              </h2>
              <p className="text-lg font-light text-muted-foreground max-w-2xl mx-auto">
                Selected luxury brand projects showcasing sophisticated design excellence.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {luxuryPortfolio.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-secondary rounded-2xl p-6 text-center"
                >
                  <div className="w-12 h-12 rounded-full glass-primary border border-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-light mb-2 text-foreground">{project.title}</h3>
                  <Badge variant="outline" className="mb-4 bg-accent/5 text-accent border-accent/20 font-light text-xs">
                    {project.category}
                  </Badge>
                  <p className="text-sm font-light text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={processImage}
            alt="Process background"
            fill
            className="object-cover opacity-80 saturate-75"
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
                <span className="text-secondary">Our</span> Process
              </h2>
              <p className="text-lg font-light text-muted-foreground max-w-2xl mx-auto">
                A refined approach to luxury brand development, meticulously crafted.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 rounded-full glass-primary border-2 border-primary/20 flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-light text-primary">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-light mb-4 text-foreground">{step.title}</h3>
                  <p className="text-sm font-light text-muted-foreground leading-relaxed">
                    {step.description}
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
              Ready to elevate your brand to <span className="text-accent">luxury status</span>?
            </h2>
            <p className="text-lg font-light text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how we can transform your brand into a coveted luxury experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="glass-accent border-line-accent bg-accent/10 hover:bg-accent/20 text-accent border px-12 py-6 text-lg font-light rounded-full"
                asChild
              >
                <Link href="/contact">Start Your Luxury Journey</Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="glass-secondary border-line-secondary text-secondary hover:bg-secondary/5 px-12 py-6 text-lg font-light rounded-full border"
                asChild
              >
                <Link href="/packages">View Premium Packages</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}