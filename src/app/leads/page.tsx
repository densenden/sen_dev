"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Target, 
  TrendingUp, 
  Zap,
  Users,
  BarChart3,
  Rocket,
  CheckCircle,
  Star,
  Calendar,
  Crown,
  Gauge
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

const leadPackages = [
  {
    title: "Lead Check-up",
    subtitle: "Kostenlose Lead-Analyse & Quick Wins",
    targetAudience: "Unternehmen, die ihre aktuellen Lead-Generierung verbessern wollen, aber nicht wissen, wo die größten Hebel liegen",
    description: "Wir analysieren deine bestehenden Lead-Kanäle kostenlos, identifizieren Quick Wins und zeigen dir, welche Maßnahmen den größten ROI bringen werden",
    priceRange: "Kostenlos",
    icon: Target,
    color: "primary",
    features: [
      "Comprehensive lead audit",
      "Website conversion analysis",
      "Social media lead potential review",
      "Email marketing effectiveness check",
      "Competitor lead strategy analysis",
      "Quick win identification",
      "ROI potential assessment",
      "Action plan with priorities"
    ],
    deliverables: [
      "Lead generation audit report",
      "Conversion optimization recommendations",
      "Quick win action plan",
      "Lead funnel improvement strategy",
      "Priority implementation roadmap"
    ]
  },
  {
    title: "Growth Engine",
    subtitle: "Automated Lead Generation System",
    targetAudience: "KMUs und Startups, die ein nachhaltiges, automatisiertes Lead-System aufbauen wollen mit messbaren Ergebnissen",
    description: "Du bekommst ein vollständiges, automatisiertes Lead-Generation-System mit Landing Pages, Email-Sequenzen, Social Proof und Analytics – ready to convert",
    priceRange: "ca. 3.000-8.000 €",
    icon: Gauge,
    color: "accent",
    features: [
      "Custom landing page design",
      "Email automation sequences",
      "Lead magnet development",
      "CRM integration setup",
      "Analytics & tracking implementation",
      "A/B testing framework",
      "Social proof integration",
      "Lead scoring system"
    ],
    deliverables: [
      "High-converting landing pages",
      "Automated email sequences",
      "Lead magnet assets",
      "CRM integration",
      "Analytics dashboard",
      "Performance optimization guide"
    ]
  },
  {
    title: "LeadMonster Premium",
    subtitle: "Enterprise Lead Generation Machine",
    targetAudience: "Etablierte Unternehmen mit größeren Budgets, die Lead-Generation skalieren und als echten Wettbewerbsvorteil nutzen wollen",
    description: "Das komplette Lead-Monster: Multi-Channel-Kampagnen, AI-gesteuerte Personalisierung, Advanced Analytics, Account-Based Marketing und kontinuierliche Optimierung",
    priceRange: "ca. 15.000-40.000 €",
    icon: Crown,
    color: "secondary",
    features: [
      "Multi-channel lead campaigns",
      "AI-powered personalization",
      "Account-based marketing setup",
      "Advanced lead scoring & routing",
      "Custom CRM development",
      "Marketing automation workflows",
      "Advanced analytics & reporting",
      "Ongoing optimization & support"
    ],
    deliverables: [
      "Multi-channel campaign system",
      "AI personalization engine",
      "Custom CRM solution",
      "Advanced analytics platform",
      "ABM campaign framework",
      "Continuous optimization plan"
    ]
  }
]

const leadMetrics = [
  {
    title: "Conversion Rate",
    improvement: "+340%",
    description: "Average improvement in lead conversion rates",
    icon: Target
  },
  {
    title: "Lead Quality",
    improvement: "+220%",
    description: "Increase in qualified lead generation",
    icon: Star
  },
  {
    title: "Cost per Lead",
    improvement: "-65%",
    description: "Reduction in average cost per lead",
    icon: TrendingUp
  },
  {
    title: "Revenue Growth",
    improvement: "+180%",
    description: "Average revenue increase from leads",
    icon: BarChart3
  }
]

const leadProcess = [
  {
    step: "01",
    title: "Lead Audit & Strategy",
    description: "Deep analysis of current lead generation and identification of highest-impact opportunities."
  },
  {
    step: "02", 
    title: "System Design & Build",
    description: "Create automated lead generation systems with proven frameworks and technologies."
  },
  {
    step: "03",
    title: "Launch & Optimize",
    description: "Deploy campaigns, monitor performance, and continuously optimize for better results."
  },
  {
    step: "04",
    title: "Scale & Expand",
    description: "Scale successful campaigns and expand to new channels for maximum lead generation."
  }
]

export default function LeadsPage() {
  const heroImage = "/random/hero-4.jpg"
  const metricsImage = "/random/hero-2.jpg"
  const processImage = "/random/hero-3.jpg"

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt="Lead generation hero background"
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
                  <Rocket className="w-3 h-3 mr-2" />
                  Lead Generation
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
                    Lead
                  </motion.span>
                  <motion.span 
                    className="block text-primary"
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, delay: 1 }}
                  >
                    Generation
                  </motion.span>
                  <motion.span 
                    className="block text-accent"
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, delay: 1.2 }}
                  >
                    Systems
                  </motion.span>
                </h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                  className="max-w-3xl mx-auto space-y-6"
                >
                  <p className="text-2xl font-light text-white/90 leading-relaxed">
                    Transform visitors into qualified leads automatically.
                  </p>
                  <p className="text-xl font-light text-white/80">
                    From analysis to automation – build your <span className="text-accent">lead generation machine</span>.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lead Packages */}
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
                <span className="text-primary">Lead Generation</span> Packages
              </h2>
              <p className="text-lg font-light text-muted-foreground max-w-2xl mx-auto">
                From free analysis to enterprise-level lead generation machines.
              </p>
            </motion.div>

            <div className="space-y-12">
              {leadPackages.map((pkg, index) => {
                const Icon = pkg.icon
                return (
                  <motion.div
                    key={pkg.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="white-tile p-8 lg:p-12"
                  >
                    <div className="grid lg:grid-cols-3 gap-8">
                      {/* Package Info */}
                      <div className="lg:col-span-2">
                        <div className="flex items-start gap-6 mb-8">
                          <div className="w-16 h-16 rounded-full glass-primary border border-primary/20 flex items-center justify-center flex-shrink-0">
                            <Icon className={`w-8 h-8 ${
                              pkg.color === 'primary' ? 'text-primary' :
                              pkg.color === 'accent' ? 'text-accent' :
                              'text-secondary'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-3xl font-light mb-2 text-foreground">{pkg.title}</h3>
                            <p className="text-lg font-light text-muted-foreground mb-4">{pkg.subtitle}</p>
                            <Badge className={`mb-4 font-light text-xs ${
                              pkg.color === 'primary' ? 'bg-primary/10 text-primary border-primary/20' :
                              pkg.color === 'accent' ? 'bg-accent/10 text-accent border-accent/20' :
                              'bg-secondary/10 text-secondary border-secondary/20'
                            } border`}>
                              {pkg.priceRange}
                            </Badge>
                          </div>
                        </div>

                        {/* Target Audience */}
                        <div className="mb-8">
                          <h4 className="text-lg font-light mb-3 text-foreground">Ideal für:</h4>
                          <p className="text-sm font-light text-muted-foreground leading-relaxed bg-muted/20 p-4 rounded-lg">
                            {pkg.targetAudience}
                          </p>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                          <h4 className="text-lg font-light mb-3 text-foreground">Was du bekommst:</h4>
                          <p className="text-sm font-light text-muted-foreground leading-relaxed">
                            {pkg.description}
                          </p>
                        </div>

                        {/* Features & Deliverables */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-lg font-light mb-4 text-foreground">Features:</h4>
                            <ul className="space-y-2">
                              {pkg.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-center gap-3">
                                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                  <span className="text-xs font-light text-muted-foreground">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-lg font-light mb-4 text-foreground">Deliverables:</h4>
                            <ul className="space-y-2">
                              {pkg.deliverables.map((deliverable, deliverableIndex) => (
                                <li key={deliverableIndex} className="flex items-center gap-3">
                                  <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                                  <span className="text-xs font-light text-muted-foreground">{deliverable}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="lg:col-span-1 flex flex-col justify-center">
                        <div className="glass-primary rounded-2xl p-8 text-center">
                          <div className="w-16 h-16 rounded-full glass-accent border border-accent/20 flex items-center justify-center mx-auto mb-6">
                            <Calendar className="w-8 h-8 text-accent" />
                          </div>
                          
                          <h4 className="text-2xl font-light mb-4 text-foreground">
                            {pkg.title === "Lead Check-up" ? "Kostenlose Analyse" : "Beratungsgespräch"}
                          </h4>
                          
                          <p className="text-sm font-light text-muted-foreground mb-8 leading-relaxed">
                            {pkg.title === "Lead Check-up" 
                              ? "Lass uns deine Lead-Generation kostenlos analysieren und Quick Wins identifizieren."
                              : "Lass uns über dein Lead-Generation-Projekt sprechen und die beste Lösung finden."
                            }
                          </p>
                          
                          <Button 
                            size="lg"
                            className="glass-accent border-line-accent bg-accent/10 hover:bg-accent/20 text-accent border px-8 py-4 text-base font-light rounded-full w-full mb-4"
                            asChild
                          >
                            <Link href="/contact">
                              {pkg.title === "Lead Check-up" ? "Kostenlose Analyse" : "Beratung buchen"}
                            </Link>
                          </Button>
                          
                          <p className="text-xs font-light text-muted-foreground">
                            30-minütiges Gespräch • Unverbindlich
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={metricsImage}
            alt="Performance metrics background"
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
                <span className="text-accent">Proven</span> Results
              </h2>
              <p className="text-lg font-light text-muted-foreground max-w-2xl mx-auto">
                Real performance improvements from our lead generation systems.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {leadMetrics.map((metric, index) => {
                const Icon = metric.icon
                return (
                  <motion.div
                    key={metric.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="glass-secondary rounded-2xl p-8 text-center"
                  >
                    <div className="w-16 h-16 rounded-full glass-primary border border-primary/20 flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-accent" />
                    </div>
                    <div className="text-3xl font-light text-accent mb-2">{metric.improvement}</div>
                    <h3 className="text-lg font-light mb-3 text-foreground">{metric.title}</h3>
                    <p className="text-sm font-light text-muted-foreground leading-relaxed">
                      {metric.description}
                    </p>
                  </motion.div>
                )
              })}
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
                A systematic approach to building high-converting lead generation systems.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {leadProcess.map((step, index) => (
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
              Ready to build your <span className="text-accent">lead generation machine</span>?
            </h2>
            <p className="text-lg font-light text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start with a free analysis or jump directly into building your automated lead system.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="glass-accent border-line-accent bg-accent/10 hover:bg-accent/20 text-accent border px-12 py-6 text-lg font-light rounded-full"
                asChild
              >
                <Link href="/contact">Kostenlose Lead-Analyse</Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="glass-secondary border-line-secondary text-secondary hover:bg-secondary/5 px-12 py-6 text-lg font-light rounded-full border"
                asChild
              >
                <Link href="/packages">View All Packages</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}