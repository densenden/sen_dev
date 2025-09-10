"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Palette, 
  Clock,
  CheckCircle,
  ArrowDown,
  Send,
  Phone,
  Mail,
  Target,
  Sparkles,
  Eye,
  Zap,
  Users,
  Building2,
  Brain,
  TrendingUp,
  MessageCircle,
  Calendar,
  Tag,
  ChevronDown,
  ChevronUp,
  Star,
  Shield,
  Trophy,
  Rocket
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { getShuffledCampaignImages } from "@/lib/campaign-images"
import { useProjects } from "@/hooks/use-data"

// Design-fokussierte Pakete basierend auf KMU PRD
const packages = [
  { 
    value: "design-review", 
    title: "Design-Review",
    price: "KOSTENLOS (statt < 490 €)", 
    duration: "48 Stunden",
    image: "/campaign/review.jpg",
    description: "Audit mit Quick Wins",
    tagline: "\"Endlich verstehe ich, warum meine Seite nicht konvertiert!\"",
    features: [
      "Audit mit Quick Wins", 
      "Farb- & Typo-Analyse", 
      "Feedback zur UX",
      "Optional kleines CSS-Touch-Up",
      "Klarer Aktionsplan",
      "Unverbindlich & kostenlos"
    ],
    examples: [
      "🔍 Landing Page Analyse: Warum bounced 70% der Besucher?",
      "📊 E-Commerce Review: Warum brechen Kunden den Kauf ab?",  
      "🎯 SaaS Dashboard: Wo verlieren wir User im Onboarding?",
      "💡 Corporate Website: Wie wirken wir professioneller?"
    ]
  },
  { 
    value: "designsystem-presentation", 
    title: "Designsystem & Präsentation",
    price: "ab 890 €", 
    duration: "1–2 Tage",
    image: "/campaign/design-prozess.jpg",
    description: "Erstellung von Styleguide, Farbwelt, Typografie, Komponenten",
    tagline: "\"Wow, endlich ein einheitliches Design!\"",
    features: [
      "Erstellung von Styleguide", 
      "Farbwelt & Typografie", 
      "Komponenten-Bibliothek",
      "Präsentation inkl. Empfehlungen",
      "1–2 Tage Bearbeitungszeit",
      "Implementierung auf Branch: ab 1 Woche, Zusatzkosten je nach Umfang"
    ],
    examples: [
      "🎨 Startup Rebranding: Von DIY zu professionell in 5 Tagen",
      "🛍️ E-Commerce Redesign: +287% Conversion durch neues Design",
      "📱 App Design System: Konsistente UX über alle Screens",
      "🏢 Corporate Identity: Modernes Design das Vertrauen schafft"
    ]
  },
  { 
    value: "touchup-fullservice", 
    title: "Touch-Up / Full Service Frontend",
    price: "ab 2.100 €", 
    duration: "1-2 Wochen",
    image: "/campaign/designsystem.jpg",
    description: "Neues UI-Konzept, Umsetzung mit bestehender Logik",
    tagline: "\"Du machst, dass es läuft → Wir machen, dass es wirkt!\"",
    features: [
      "Neues UI-Konzept", 
      "Umsetzung mit bestehender Logik", 
      "Komplettes Frontend-Refactoring",
      "Fertige Übergabe inkl. Dokumentation",
      "Integration mit bestehenden Systemen"
    ],
    examples: [
      "🚀 SaaS Platform: Design + React Frontend komplett",
      "🏪 Online Shop: Custom E-Commerce Lösung",
      "📊 Dashboard: Design zu funktionierender Web-App",
      "🎯 Corporate Website: High-Converting Business Site"
    ]
  }
]

// Projects will be loaded from database

// FAQ für Design-Services - Erweitert und aufklappbar
const designFAQs = [
  { 
    q: "Warum ist gutes Design so wichtig?", 
    a: "Design ist der erste Eindruck. Studien zeigen: Nutzer entscheiden in 0.05 Sekunden, ob sie einer Website vertrauen. Schlechtes Design kostet Sie täglich Kunden und verschwendet Marketing-Budget. Gutes Design zahlt sich durch höhere Conversions, längere Verweildauer und bessere User Experience direkt aus." 
  },
  { 
    q: "Was ist der Unterschied zwischen UI und UX?", 
    a: "UI (User Interface) ist das visuelle Design - Farben, Schriften, Buttons, Layout. UX (User Experience) ist die Nutzerführung - wie intuitiv, schnell und angenehm die Bedienung ist. Beide müssen perfekt zusammenarbeiten. Wir optimieren sowohl das Aussehen als auch die Benutzerfreundlichkeit für maximale Conversion." 
  },
  { 
    q: "Arbeiten Sie mit bestehenden Designs?", 
    a: "Ja! Wir können Ihr bestehendes Design analysieren und optimieren (Design Touch-up) oder komplett neu gestalten. Das kostenlose Design Review zeigt Ihnen genau, welche Probleme Ihr aktuelles Design hat und welcher Weg für Sie optimal und kosteneffizient ist." 
  },
  { 
    q: "Wie messen Sie Design-Erfolg?", 
    a: "Durch klare, messbare KPIs: Conversion Rate, Verweildauer, Bounce Rate, User Engagement, Click-Through-Rate. Wir setzen vor dem Redesign Tracking auf und messen den Erfolg nach Go-Live. Unsere Designs steigern diese Metriken durchschnittlich um 287%. Design ist messbar erfolgreich oder es ist schlecht." 
  },
  { 
    q: "Wie lange dauert ein Design-Projekt?", 
    a: "Das hängt vom Umfang ab: Design Review (15 Min), Design System Sprint (5-7 Tage), Design + Development Full (2-3 Wochen). Wir arbeiten agil mit täglichen Updates und kurzen Feedback-Zyklen. Kein monatelanges Warten - Sie sehen täglich Fortschritte." 
  },
  { 
    q: "Was kostet professionelles Design?", 
    a: "Unsere Pakete starten ab 890 € für Designsysteme. Das Design Review ist aktuell kostenlos (normal < 490 €). Die Investition amortisiert sich schnell: Bei +287% höherer Conversion zahlt sich gutes Design meist schon im ersten Monat aus." 
  },
  { 
    q: "Bekommen wir die Design-Dateien?", 
    a: "Selbstverständlich! Sie erhalten alle Design-Dateien, Design-Guidelines, Assets, Fonts und bei Development-Projekten den kompletten Source Code. Alles gehört Ihnen - ohne Vendor-Lock-in oder versteckte Abhängigkeiten." 
  },
  { 
    q: "Arbeiten Sie auch international?", 
    a: "Ja! Wir arbeiten remote mit Kunden in ganz Europa und haben bereits Projekte in US, UK, Schweiz und Niederlande umgesetzt. Alle Kommunikation auf Deutsch oder Englisch, je nach Präferenz. Timezone sind kein Problem." 
  }
]

export default function DesignLandingPage() {
  const { projects, loading: projectsLoading } = useProjects()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    message: "",
    package: "",
    company: ""
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [heroImage, setHeroImage] = useState<string>("")
  const [ctaImage, setCtaImage] = useState<string>("")
  const [expandedExamples, setExpandedExamples] = useState<{[key: string]: boolean}>({})
  const [expandedFAQ, setExpandedFAQ] = useState<{[key: number]: boolean}>({0: true}) // Erste FAQ standardmäßig offen

  // Get showcase projects from database (first 3 with images)
  const showcaseProjects = projects
    .filter(project => project.screenshots && project.screenshots.length > 0)
    .slice(0, 3)
    .map(project => ({
      title: project.title,
      description: project.summary,
      image: project.screenshots[0],
      tech: project.tech_stack.slice(0, 3),
      result: project.outcome
    }))

  useEffect(() => {
    const images = getShuffledCampaignImages()
    setHeroImage("/campaign/design-hero.jpg")
    setCtaImage("/campaign/touchup.jpg")
  }, [])

  const toggleExamples = (packageValue: string) => {
    setExpandedExamples(prev => ({
      ...prev,
      [packageValue]: !prev[packageValue]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Store in database first
      const dbResponse = await fetch('/api/contact-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source_page: 'design'
        }),
      })

      if (!dbResponse.ok) {
        console.error('Failed to store in database')
      }

      // Use design-specific email endpoint
      const emailResponse = await fetch('/api/send-design-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          package: packages.find(p => p.value === formData.package)?.title || "Design Anfrage"
        }),
      })

      if (!emailResponse.ok) {
        throw new Error('Failed to send email')
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error('Error processing submission:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt="Success background"
            fill
            className="object-cover opacity-80 saturate-75"
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 glass-primary rounded-3xl p-16 max-w-2xl mx-8 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-10 h-10 text-accent" />
          </div>
          <h1 className="text-4xl font-light mb-6 text-white">
            Design-Review angefordert!
          </h1>
          <p className="text-lg font-light text-white/80 mb-8">
            Wir analysieren Ihr Design und melden uns innerhalb von 48 Stunden mit Ihrem kostenlosen Review.
          </p>
          <Button 
            className="glass-accent border-line-accent bg-accent/20 text-accent hover:bg-accent/30 font-light rounded-full px-8 border"
            asChild
          >
            <Link href="/">Zur Startseite</Link>
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section wie KMU */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {heroImage && (
            <Image
              src={heroImage}
              alt="Design Landing hero"
              fill
              className="object-cover opacity-40 blur-sm scale-110"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 mix-blend-overlay" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 relative z-10">
          <div className="max-w-6xl mx-auto">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="glass-primary rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-16 text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                className="mb-8 sm:mb-12"
              >
                <Badge className="glass-accent border-line-accent bg-accent/20 text-accent px-6 py-3 text-xs tracking-wider font-light border mb-8">
                  <Palette className="w-3 h-3 mr-2" />
                  Premium Design Services
                </Badge>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight tracking-wide mb-6 sm:mb-8 text-white">
                  <motion.span 
                    className="block"
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, delay: 0.6 }}
                  >
                    Design, das
                  </motion.span>
                  <motion.span 
                    className="block text-primary"
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                  >
                    konvertiert
                  </motion.span>
                </h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="text-lg sm:text-xl lg:text-2xl font-light text-white/90 leading-relaxed max-w-4xl mx-auto mb-8 sm:mb-12"
                >
                  Verwandeln Sie Besucher in Kunden. Mit strategischem Design, 
                  das nicht nur gut aussieht, sondern messbar mehr Umsatz bringt.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Button 
                    size="lg"
                    className="glass-accent border-line-accent bg-accent/10 hover:bg-accent/20 text-accent border px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-lg font-light rounded-full"
                    onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                    Kostenloses Design-Review
                    <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 animate-bounce" />
                  </Button>
                  <div className="flex items-center justify-center gap-2 text-sm text-white/70">
                    <Clock className="w-4 h-4" />
                    <span>Normalpreis: 490 € • Jetzt kostenlos</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Building / Problem Section */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 sm:mb-16 lg:mb-20"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-6">
                95% aller Websites <span className="text-primary">verschwenden Potenzial</span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl font-light text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                Schlechtes Design kostet Sie täglich Kunden. Wir verwandeln Ihre Website 
                in eine Conversion-Maschine – mit Design, das auf Psychologie und Daten basiert.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                { icon: Eye, title: "Erster Eindruck", desc: "0.05 Sekunden entscheiden über Vertrauen" },
                { icon: Brain, title: "Psychologie", desc: "Farben & Formen die unterbewusst wirken" },
                { icon: Zap, title: "Performance", desc: "Schnelle Ladezeiten = höhere Conversions" },
                { icon: TrendingUp, title: "ROI-Fokus", desc: "Durchschnittlich +287% mehr Conversions" }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="white-tile p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full glass-primary bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-light mb-3 sm:mb-4 text-foreground">{item.title}</h3>
                  <p className="text-sm sm:text-base font-light text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Design Packages Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 sm:mb-16 lg:mb-20"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-4 sm:mb-6">
                Unsere <span className="text-primary">Design-Pakete</span>
              </h2>
              <p className="text-base sm:text-lg font-light text-muted-foreground max-w-3xl mx-auto">
                Von kostenlosem Review bis zur kompletten Marken-Transformation. 
                Wählen Sie das Paket, das zu Ihren Zielen passt.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
              {packages.map((pkg, index) => (
                <motion.div
                  key={pkg.value}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`white-tile rounded-2xl sm:rounded-3xl relative overflow-hidden ${
                    pkg.value === 'design-review' ? 'ring-2 ring-accent' : ''
                  }`}
                >
                  {/* Package Image Header */}
                  <div className="aspect-video relative overflow-hidden">
                    {/* Special Badge for Free Review - bottom overlay */}
                    {pkg.value === 'design-review' && (
                      <div className="absolute bottom-2 left-2 right-2 bg-gradient-to-r from-green-500 to-accent text-white text-center py-2 px-3 text-xs font-medium rounded-xl shadow-lg z-10">
                        LAUNCH SPECIAL - KOSTENLOS
                      </div>
                    )}
                    <Image
                      src={pkg.image}
                      alt={`${pkg.title} visualization`}
                      fill
                      className="object-cover"
                    />
                    {/* Price Tag Overlay */}
                    <div className="absolute top-4 right-4">
                      <div className={`${
                        pkg.value === 'design-review' 
                          ? 'bg-green-500/90 animate-pulse' 
                          : 'glass-accent bg-accent/90'
                      } text-white px-3 py-2 rounded-full flex items-center gap-2 shadow-lg`}>
                        <Tag className="w-4 h-4" />
                        <span className="text-sm font-medium">{pkg.price}</span>
                      </div>
                    </div>
                    {/* Duration Badge */}
                    <div className="absolute bottom-4 left-4">
                      <Badge className="glass-secondary bg-black/80 text-white px-3 py-1 text-xs">
                        {pkg.duration}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-6 sm:p-8">
                    {/* Header */}
                    <div className="text-center mb-6">
                      <h3 className="text-xl sm:text-2xl font-light mb-2 text-foreground">{pkg.title}</h3>
                      <p className="text-base sm:text-lg font-light text-foreground mb-2">{pkg.description}</p>
                      <p className="text-sm text-accent italic">{pkg.tagline}</p>
                    </div>
                    
                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">Enthalten:</h4>
                      <ul className="space-y-2">
                        {pkg.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start text-sm font-light text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-accent mt-0.5 mr-3 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Collapsible Examples */}
                    <div className="glass-secondary rounded-2xl p-4 sm:p-6 mb-6">
                      <button
                        onClick={() => toggleExamples(pkg.value)}
                        className="w-full flex items-center justify-between text-left hover:opacity-80 transition-opacity"
                      >
                        <h4 className="text-sm font-medium text-foreground">Beispiel-Projekte:</h4>
                        {expandedExamples[pkg.value] ? (
                          <ChevronUp className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        )}
                      </button>
                      
                      {expandedExamples[pkg.value] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-3 space-y-2"
                        >
                          {pkg.examples.map((example, exampleIndex) => (
                            <p key={exampleIndex} className="text-xs sm:text-sm font-light text-muted-foreground leading-relaxed">
                              {example}
                            </p>
                          ))}
                        </motion.div>
                      )}
                      
                      {!expandedExamples[pkg.value] && (
                        <p className="text-xs text-muted-foreground/60 mt-2">
                          Klicken für {pkg.examples.length} Beispiele
                        </p>
                      )}
                    </div>

                    {/* CTA Button */}
                    <Button
                      className={`w-full ${
                        pkg.value === 'design-review'
                          ? 'bg-gradient-to-r from-green-500 to-accent hover:from-green-600 hover:to-accent/90 text-white'
                          : 'glass-primary border-line hover:bg-primary/20 text-primary'
                      } font-light rounded-full`}
                      onClick={() => {
                        setFormData({...formData, package: pkg.value})
                        document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
                      }}
                    >
                      {pkg.value === 'design-review' ? 'Jetzt kostenlos sichern' : 'Paket anfragen'}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Projects */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 sm:mb-16 lg:mb-20"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-4 sm:mb-6">
                Design <span className="text-primary">Erfolgsgeschichten</span>
              </h2>
              <p className="text-base sm:text-lg font-light text-muted-foreground max-w-3xl mx-auto">
                Echte Projekte, messbare Ergebnisse. So haben unsere Designs Unternehmen transformiert.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
              {projectsLoading ? (
                // Loading skeleton
                [...Array(3)].map((_, index) => (
                  <div key={index} className="white-tile rounded-2xl sm:rounded-3xl overflow-hidden animate-pulse">
                    <div className="aspect-video bg-muted"></div>
                    <div className="p-6 sm:p-8 space-y-4">
                      <div className="h-6 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="flex gap-2">
                        <div className="h-6 bg-muted rounded w-16"></div>
                        <div className="h-6 bg-muted rounded w-16"></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                showcaseProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="white-tile rounded-2xl sm:rounded-3xl overflow-hidden"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={project.image}
                      alt={`${project.title} Design`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full glass-primary bg-accent/10 border border-accent/20 flex items-center justify-center">
                        <Palette className="w-5 h-5 text-accent" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-light text-foreground">{project.title}</h3>
                    </div>
                    
                    <p className="text-sm sm:text-base font-light text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                      {project.tech.map((tech, techIndex) => (
                        <Badge 
                          key={techIndex}
                          variant="outline" 
                          className="bg-secondary/5 text-secondary border-secondary/20 font-light text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="glass-secondary rounded-2xl p-4">
                      <p className="text-xs sm:text-sm font-light text-muted-foreground">
                        <TrendingUp className="w-4 h-4 inline mr-2 text-accent" />
                        <strong className="text-accent">Ergebnis:</strong> {project.result}
                      </p>
                    </div>
                  </div>
                </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Design Process Section - wie Why SenDev */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/campaign/design-prozess.jpg"
            alt="Design Process Background"
            fill
            className="object-cover opacity-10 blur-sm"
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
                Unser <span className="text-primary">Design-Prozess</span>
              </h2>
              <p className="text-lg font-light text-muted-foreground max-w-2xl mx-auto">
                Vier Schritte, die jedes Design-Projekt zum Erfolg führen. Strukturiert, transparent, messbar erfolgreich.
              </p>
            </motion.div>

            <div className="space-y-8">
              {[
                { 
                  step: "1", 
                  title: "Analyse & Verstehen", 
                  desc: "Wir analysieren Ihre Zielgruppe, Konkurrenz und aktuellen Probleme. Jedes Detail zählt für das perfekte Design.", 
                  benefit: "Solide Basis für strategisches Design",
                  icon: Eye 
                },
                { 
                  step: "2", 
                  title: "Strategie & Konzept", 
                  desc: "Entwicklung eines datenbasierten Design-Konzepts mit klaren Zielen und messbaren KPIs für maximale Wirkung.", 
                  benefit: "Design mit klarem ROI und Purpose",
                  icon: Target 
                },
                { 
                  step: "3", 
                  title: "Design & Prototyping", 
                  desc: "Design-Umsetzung mit iterativem Feedback. Vom Wireframe bis zum finalen Design - alles transparent und kollaborativ.", 
                  benefit: "Pixel-perfect Designs die begeistern",
                  icon: Palette 
                },
                { 
                  step: "4", 
                  title: "Testing & Optimierung", 
                  desc: "A/B-Tests, User-Feedback und kontinuierliche Optimierung für maximale Performance und Conversion-Rate.", 
                  benefit: "Messbar bessere Conversion-Raten",
                  icon: Rocket 
                }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`flex items-center gap-12 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
                >
                  <div className="flex-1">
                    <div className="glass-primary rounded-3xl p-8">
                      <h3 className="text-2xl font-light mb-4 text-foreground">{item.title}</h3>
                      <p className="text-sm font-light text-muted-foreground mb-6 leading-relaxed">
                        {item.desc}
                      </p>
                      <div className="glass-accent rounded-2xl p-4">
                        <p className="text-xs font-light text-accent-foreground/90">
                          <Target className="w-3 h-3 inline mr-2" />
                          {item.benefit}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-20 h-20 rounded-full glass-secondary flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-light text-primary-readable">{item.step}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/campaign/touchup.jpg"
            alt="Contact form background"
            fill
            className="object-cover opacity-40 blur-sm scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 mix-blend-overlay" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 sm:mb-16"
            >
              <Badge className="glass-accent border-line-accent bg-accent/20 text-accent px-6 py-3 text-xs tracking-wider font-light border mb-8">
                <MessageCircle className="w-3 h-3 mr-2" />
                Design-Analyse anfordern
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-4 sm:mb-6 text-white">
                Ihr <span className="text-primary">kostenloses</span> Design-Review
              </h2>
              <p className="text-base sm:text-lg font-light text-white/80 max-w-2xl mx-auto">
                Was Sie erwarten können: Professionelle Design-Analyse Ihrer aktuellen Lösung mit konkreten Verbesserungsvorschlägen und Optimierungspotenzial. 
                Echter Mehrwert im Wert von 490 € – komplett kostenlos. Bearbeitung erfolgt unter Vorbehalt verfügbarer Kapazitäten.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="glass-primary border-0 rounded-2xl sm:rounded-3xl">
                <CardHeader className="pb-6 sm:pb-8">
                  <CardTitle className="text-xl sm:text-2xl font-light text-white flex items-center gap-3 justify-center">
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    Design-Review Anfrage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                    
                    {/* Basic Information */}
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-light text-white/70">
                          Name *
                        </Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="glass-secondary border-line-secondary bg-secondary/10 font-light text-white placeholder:text-white/50"
                          placeholder="Ihr Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-light text-white/70">
                          E-Mail-Adresse *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="glass-secondary border-line-secondary bg-secondary/10 font-light text-white placeholder:text-white/50"
                          placeholder="ihre@email.de"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-light text-white/70">
                          Telefonnummer *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="glass-secondary border-line-secondary bg-secondary/10 font-light text-white placeholder:text-white/50"
                          placeholder="+49 123 456 7890"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website" className="text-sm font-light text-white/70">
                          Website/App/GitHub URL *
                        </Label>
                        <Input
                          id="website"
                          required
                          value={formData.website}
                          onChange={(e) => setFormData({...formData, website: e.target.value})}
                          className="glass-secondary border-line-secondary bg-secondary/10 font-light text-white placeholder:text-white/50"
                          placeholder="www.ihre-website.de, github.com/user/repo oder App Store Link"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-sm font-light text-white/70">
                        Unternehmen
                      </Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="glass-secondary border-line-secondary bg-secondary/10 font-light text-white placeholder:text-white/50"
                        placeholder="Ihr Unternehmen (optional)"
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-light text-white/70">
                        Was ist Ihre größte Design-Herausforderung?
                      </Label>
                      <Textarea
                        id="message"
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="glass-secondary border-line-secondary bg-secondary/10 font-light resize-none text-white placeholder:text-white/50"
                        placeholder="Beschreiben Sie Ihre aktuellen Design-Probleme und Ziele..."
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full glass-accent border-line-accent bg-accent/20 hover:bg-accent/30 text-accent border font-light rounded-full py-4 sm:py-6"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-accent/30 border-t-accent rounded-full animate-spin mr-3" />
                          Wird gesendet...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-3" />
                          Kostenloses Design-Review anfordern
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-center text-white/60">
                      Normalpreis: 490 € • Launch-Special: Kostenlos
                    </p>
                  </form>
                </CardContent>
              </Card>
              
              {/* Disclaimer */}
              <div className="text-center mt-6">
                <p className="text-xs text-white/50 max-w-md mx-auto leading-relaxed">
                  * Buchung verpflichtet nicht zur Bearbeitung. Review erfolgt unter Vorbehalt verfügbarer Kapazitäten. 
                  Unverbindlich und kostenlos.
                </p>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mt-8 sm:mt-12 space-y-4"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <Link href="mailto:dev@sen.studio" className="text-sm font-light text-white/80 hover:text-primary transition-colors">
                    dev@sen.studio
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <Link href="tel:+4915566179807" className="text-sm font-light text-white/80 hover:text-primary transition-colors">
                    +49 15566179807
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm font-light text-white/80">48h Antwortzeit</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Aufklappbar, ohne Hintergrundbild */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-4 sm:mb-6">
                Häufige <span className="text-primary">Design-Fragen</span>
              </h2>
              <p className="text-lg font-light text-muted-foreground">
                Alles was Sie über unsere Design-Services wissen müssen
              </p>
            </motion.div>

            <div className="space-y-4">
              {designFAQs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="white-tile rounded-2xl sm:rounded-3xl border border-border/50 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFAQ(prev => ({...prev, [index]: !prev[index]}))}
                    className="w-full flex items-center justify-between p-6 sm:p-8 text-left hover:bg-secondary/5 transition-colors"
                  >
                    <h3 className="text-lg sm:text-xl font-light text-foreground pr-4">
                      {faq.q}
                    </h3>
                    <div className="flex-shrink-0">
                      {expandedFAQ[index] ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </button>
                  
                  {expandedFAQ[index] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 sm:px-8 pb-6 sm:pb-8"
                    >
                      <div className="pt-4 border-t border-border/20">
                        <p className="text-sm sm:text-base font-light text-muted-foreground leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {ctaImage && (
            <Image
              src={ctaImage}
              alt="CTA background"
              fill
              className="object-cover opacity-40 blur-sm scale-110"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 mix-blend-overlay" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-primary rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 max-w-4xl mx-auto text-center"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full glass-primary bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-6 sm:mb-8">
              <Palette className="w-8 h-8 sm:w-10 sm:h-10 text-accent" />
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-4 sm:mb-6 text-white">
              Bereit für Design, das <span className="text-primary">konvertiert</span>?
            </h2>
            <p className="text-base sm:text-lg font-light text-white/80 mb-8 sm:mb-12 max-w-2xl mx-auto">
              Sichern Sie sich jetzt Ihr kostenloses Design-Review und erfahren Sie, 
              wie viel Potenzial in Ihrer Website steckt.
            </p>
            
            <div className="flex flex-col items-center gap-4">
              <Button 
                size="lg" 
                className="glass-accent border-line-accent bg-accent/20 hover:bg-accent/30 text-accent border px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-lg font-light rounded-full"
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                Kostenloses Review sichern
              </Button>
              
              <div className="flex items-center gap-6 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  100% kostenlos
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Unverbindlich
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  490 € Wert
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}