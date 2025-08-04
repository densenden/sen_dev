"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Zap, 
  Rocket, 
  Crown, 
  Star, 
  Users,
  Check,
  ArrowRight,
  Clock,
  Target,
  TrendingUp
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { getUniqueRandomImages } from "@/lib/images-client"

const packages = [
  {
    name: "Impulse Sprint",
    description: "Perfect for testing ideas and quick market validation",
    icon: Zap,
    price: "€1,500 - €3,000",
    duration: "2-3 days",
    ideal: "Entrepreneurs with a clear vision",
    color: "primary",
    features: [
      "Landing page with core messaging",
      "Basic user authentication",
      "Simple contact/lead capture",
      "Mobile-responsive design",
      "Basic analytics setup",
      "Domain setup & hosting"
    ],
    deliverables: [
      "Functional MVP website",
      "Mobile-optimized design",
      "Basic SEO optimization",
      "Simple admin dashboard",
      "Deployment & hosting setup"
    ]
  },
  {
    name: "Starter Sprint",
    description: "Comprehensive foundation for serious startups",
    icon: Rocket,
    price: "€4,000 - €8,000", 
    duration: "5-7 days",
    ideal: "Startups ready to launch",
    color: "accent",
    features: [
      "Full web application",
      "User management system",
      "Database integration",
      "Payment processing",
      "API development",
      "Custom branding & design",
      "Email automation",
      "Advanced analytics"
    ],
    deliverables: [
      "Complete web application",
      "User onboarding flow",
      "Payment & subscription system",
      "Admin panel & analytics",
      "Brand identity package",
      "Technical documentation"
    ]
  },
  {
    name: "Launch Ready",
    description: "Everything needed for a professional market entry",
    icon: Crown,
    price: "€12,000 - €20,000",
    duration: "1-2 weeks", 
    ideal: "Scale-ready businesses",
    color: "secondary",
    features: [
      "Multi-platform application",
      "Advanced AI integration",
      "Custom CRM/admin tools",
      "Multi-payment processing",
      "Advanced automation",
      "Professional branding suite", 
      "SEO & marketing tools",
      "Performance optimization",
      "Security implementation",
      "Team collaboration tools"
    ],
    deliverables: [
      "Web + Mobile applications",
      "AI-powered features",
      "Complete business automation",
      "Professional brand package",
      "Marketing website",
      "Documentation & training"
    ]
  },
  {
    name: "Creator+ Build",
    description: "Premium solution for ambitious visionaries",
    icon: Star,
    price: "€15,000 - €20,000",
    duration: "2-3 weeks",
    ideal: "Enterprise-level projects",
    color: "primary",
    features: [
      "Enterprise-grade platform",
      "Custom AI & ML integration",
      "Advanced backend architecture",
      "Multi-tenant system",
      "Real-time features",
      "Complete brand ecosystem",
      "Advanced analytics & reporting",
      "Security & compliance",
      "Scalability planning",
      "Team training & support"
    ],
    deliverables: [
      "Enterprise web platform",
      "Native mobile apps",
      "AI/ML integrations",
      "Complete brand ecosystem",
      "Advanced admin tools",
      "Team training program"
    ]
  },
  {
    name: "Co-Founder Tech Partner",
    description: "Ongoing technical leadership and development",
    icon: Users,
    price: "€3,000 - €8,000/month",
    duration: "Ongoing retainer",
    ideal: "Growing companies",
    color: "accent",
    features: [
      "Dedicated development time",
      "Strategic technical guidance",
      "Continuous feature development",
      "Performance monitoring",
      "Security updates",
      "Team mentoring",
      "Architecture planning",
      "Technology consulting"
    ],
    deliverables: [
      "Monthly development sprints",
      "Technical strategy sessions",
      "Feature roadmap planning",
      "Performance reports",
      "Team training sessions",
      "Architecture documentation"
    ]
  }
]

const addOns = [
  { name: "AI Integration", price: "€2,000 - €8,000", description: "GPT, Vision, Voice capabilities" },
  { name: "Mobile App", price: "€5,000 - €15,000", description: "Native iOS/Android or React Native" },
  { name: "Advanced Analytics", price: "€1,500 - €3,000", description: "Custom dashboards & reporting" },
  { name: "API Development", price: "€2,000 - €6,000", description: "RESTful or GraphQL APIs" },
  { name: "Brand Identity", price: "€3,000 - €8,000", description: "Logo, colors, typography, guidelines" },
  { name: "SEO Optimization", price: "€1,000 - €3,000", description: "Technical SEO & content strategy" }
]

export default function PackagesPage() {
  // Get unique random images for this page
  const uniqueImages = getUniqueRandomImages(4)
  const [heroImage, packagesImage, addonsImage, processImage] = uniqueImages

  return (
    <div className="min-h-screen grain-effect">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 grain-backdrop">
          <Image
            src={heroImage}
            alt="Packages hero background"
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
                  <Crown className="w-3 h-3 mr-2" />
                  Service Packages
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
                    Choose Your
                  </motion.span>
                  <motion.span 
                    className="block text-primary"
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, delay: 1 }}
                  >
                    Sprint
                  </motion.span>
                </h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="max-w-3xl mx-auto space-y-6"
                >
                  <p className="text-2xl font-light text-white/90 leading-relaxed">
                    Transparent pricing, clear deliverables, and rapid execution.
                  </p>
                  <p className="text-xl font-light text-white/80">
                    Every package is designed to deliver maximum value for your <span className="text-accent">investment</span>.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
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
                <span className="text-primary">Development</span> Packages
              </h2>
              <p className="text-lg font-light text-muted-foreground max-w-2xl mx-auto">
                From rapid prototypes to enterprise solutions, find the perfect fit for your project.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {packages.map((pkg, index) => {
                const Icon = pkg.icon
                return (
                  <motion.div
                    key={pkg.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`white-tile p-8 hover:scale-105 transition-all duration-300 ${
                      pkg.name === "Launch Ready" ? "xl:col-span-1 xl:row-span-1 border-2 border-accent/30" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${
                        pkg.color === 'primary' ? 'from-primary to-primary/20' :
                        pkg.color === 'accent' ? 'from-accent to-accent/20' :
                        'from-secondary to-secondary/20'
                      } flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${
                          pkg.color === 'primary' ? 'text-primary-foreground' :
                          pkg.color === 'accent' ? 'text-accent-foreground' :
                          'text-secondary-foreground'
                        }`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-light text-foreground">{pkg.name}</h3>
                        {pkg.name === "Launch Ready" && (
                          <Badge className="bg-accent/10 text-accent border-accent/20 font-light text-xs mt-1">
                            Most Popular
                          </Badge>
                        )}
                      </div>
                    </div>

                    <p className="text-sm font-light text-muted-foreground mb-6">
                      {pkg.description}
                    </p>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-light text-muted-foreground">Investment</span>
                        <span className="text-lg font-light text-foreground">{pkg.price}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-light text-muted-foreground">Timeline</span>
                        <span className="text-sm font-light text-foreground">{pkg.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-light text-muted-foreground">Ideal for</span>
                        <span className="text-sm font-light text-foreground">{pkg.ideal}</span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-light text-foreground mb-3">Key Features</h4>
                        <ul className="space-y-2">
                          {pkg.features.slice(0, 4).map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center gap-2">
                              <Check className={`w-3 h-3 ${
                                pkg.color === 'primary' ? 'text-primary' :
                                pkg.color === 'accent' ? 'text-accent' :
                                'text-secondary'
                              }`} />
                              <span className="text-xs font-light text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                          {pkg.features.length > 4 && (
                            <li className="text-xs font-light text-muted-foreground opacity-60">
                              +{pkg.features.length - 4} more features
                            </li>
                          )}
                        </ul>
                      </div>

                      <Button 
                        className="w-full glass-accent border-line-accent bg-accent/10 hover:bg-accent/20 text-accent border font-light rounded-full group"
                        asChild
                      >
                        <Link href="/contact">
                          Get Started
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
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
                <span className="text-secondary">Add-On</span> Services
              </h2>
              <p className="text-lg font-light text-muted-foreground max-w-2xl mx-auto">
                Enhance any package with specialized features and capabilities.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {addOns.map((addon, index) => (
                <motion.div
                  key={addon.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="white-tile p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-light text-foreground">{addon.name}</h3>
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-light text-xs">
                      {addon.price}
                    </Badge>
                  </div>
                  <p className="text-sm font-light text-muted-foreground">
                    {addon.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0 grain-backdrop">
          <Image
            src={processImage}
            alt="Process background"
            fill
            className="object-cover opacity-100"
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
                <span className="text-accent">How It</span> Works
              </h2>
              <p className="text-lg font-light text-muted-foreground max-w-2xl mx-auto">
                A transparent process from first contact to final delivery.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Discovery Call",
                  description: "Free consultation to understand your vision and requirements",
                  icon: Target
                },
                {
                  step: "02", 
                  title: "Proposal & Planning",
                  description: "Detailed project scope, timeline, and investment breakdown",
                  icon: Clock
                },
                {
                  step: "03",
                  title: "Development Sprint",
                  description: "Rapid development with regular updates and feedback loops",
                  icon: Rocket
                },
                {
                  step: "04",
                  title: "Launch & Support",
                  description: "Deployment, testing, and ongoing support for your success",
                  icon: TrendingUp
                }
              ].map((process, index) => {
                const Icon = process.icon
                return (
                  <motion.div
                    key={process.step}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 rounded-full glass-primary border-2 border-primary/20 flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-xs font-light text-primary mb-2">{process.step}</div>
                    <h3 className="text-lg font-light mb-4 text-foreground">{process.title}</h3>
                    <p className="text-sm font-light text-muted-foreground leading-relaxed">
                      {process.description}
                    </p>
                  </motion.div>
                )
              })}
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
              Not sure which package <span className="text-primary">fits</span>?
            </h2>
            <p className="text-lg font-light text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss your project and find the perfect solution for your needs and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="glass-accent border-line-accent bg-accent/10 hover:bg-accent/20 text-accent border px-12 py-6 text-lg font-light rounded-full"
                asChild
              >
                <Link href="/contact">Schedule Discovery Call</Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="glass-secondary border-line-secondary text-secondary hover:bg-secondary/5 px-12 py-6 text-lg font-light rounded-full border"
                asChild
              >
                <Link href="/services">View All Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}