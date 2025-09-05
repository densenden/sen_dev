"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Zap, 
  Clock,
  CheckCircle,
  ArrowDown,
  Send,
  Phone,
  Mail,
  Target,
  Rocket,
  Sparkles,
  Code,
  Palette,
  Bot,
  Users,
  Building2,
  Globe,
  Smartphone,
  Brain,
  TrendingUp,
  Eye,
  Play,
  MessageCircle,
  Calendar,
  Tag,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { getRandomCampaignImage, getShuffledCampaignImages } from "@/lib/campaign-images"

const packages = [
  { 
    value: "mvp-sprint", 
    title: "MVP Sprint",
    price: "ab 2.450 €", 
    duration: "10 Tage",
    image: "/campaign/mvp.jpg",
    description: "Ihre eigene App in 10 Tagen – mit allem was dazu gehört",
    tagline: "\"Wow, so günstig für meine eigene App!\"",
    features: [
      "Vollständige App mit Login & Dashboard", 
      "KI-Integration für smarte Funktionen", 
      "Nutzerverwaltung & Berechtigungen",
      "Datensammlung & Analytics",
      "Business Logic nach Ihren Regeln",
      "Mobile-optimiert für alle Geräte"
    ],
    examples: [
      "🏢 Mitarbeiter-App: Login, Schulungen buchen, Fortschritte tracken",
      "🛒 Kunden-Portal: Bestellungen verwalten, Support-Chat mit KI",  
      "📊 Datensammler: Umfragen, Feedback, automatische Auswertung",
      "🤖 KI-Assistent: Ihr persönlicher Chatbot für Kunden"
    ]
  },
  { 
    value: "corporate-website", 
    title: "Corporate Website + AI",
    price: "ab 1.625 €", 
    duration: "2-4 Wochen",
    image: "/campaign/corporate_website.jpg",
    description: "Professionelle Website, die für Sie arbeitet",
    tagline: "\"Endlich eine Website mit KI-Power!\"",
    features: [
      "KI-gestützter Content & Blog-Generator", 
      "Automatische Übersetzungen", 
      "Lead-Generierung mit smarten Formularen",
      "SEO-Optimierung durch KI",
      "Chat-Bot für Kundenservice",
      "Analytics & Conversion-Tracking"
    ],
    examples: [
      "🏭 Produktions-Firma: Automatischer Blog über Branchennews",
      "⚖️ Anwaltskanzlei: KI-Chat für erste Rechtsberatung",
      "🏥 Arztpraxis: Terminbuchung & Symptom-Checker",
      "🏪 Einzelhandel: Produktberatung durch KI-Assistent"
    ]
  },
  { 
    value: "agentur-partner", 
    title: "Agentur-Partner Retainer",
    price: "ab 875 €/Monat", 
    duration: "Fortlaufend",
    image: "/campaign/retainer.jpg",
    description: "Ihr technischer Partner für Kundenprojects",
    tagline: "\"Endlich ein Entwickler, der versteht!\"",
    features: [
      "White-Label Development", 
      "Kreativkonzepte in Code umsetzen", 
      "API-Integrationen & Datenanbindung",
      "KI-Features für Wow-Effekte",
      "Kampagnen-Websites mit Tracking",
      "24h Support für Ihre Kunden"
    ],
    examples: [
      "🎨 Kreativ-Agentur: Interaktive Kampagnen-Websites",
      "📢 Marketing-Agentur: Landing Pages mit KI-Personalisierung", 
      "💼 Beratung: Kundenportale mit Datenauswertung",
      "🎯 Performance-Marketing: A/B-Tests mit KI-Optimierung"
    ]
  },
  { 
    value: "beratung", 
    label: "Kostenlose Beratung", 
    duration: "30 Min Gespräch",
    description: "Unverbindliches Erstgespräch",
    features: ["Projekt-Analyse", "Lösungsansätze", "Kosteneinschätzung", "Roadmap"],
    example: "Persönliche Beratung für Ihr Digitalprojekt"
  },
  { 
    value: "individuell", 
    label: "Individuelles Projekt", 
    duration: "Nach Absprache",
    description: "Maßgeschneiderte Lösung",
    features: ["Vollständige Analyse", "Custom Development", "Persönliche Betreuung", "Langzeit-Support"],
    example: "Ihre spezifischen Anforderungen im Fokus"
  }
]

// Project showcase data - random 3 projects from existing
const showcaseProjects = [
  {
    title: "SenCommerce",
    description: "E-Commerce-Plattform für kreative Unternehmer - von digitalen Downloads bis Print-on-Demand",
    image: "/projects/sencommerce.jpg",
    tech: ["Medusa v2", "Next.js", "Stripe", "Printful API"],
    result: "Nahtlose Verwaltung digitaler & physischer Produkte"
  },
  {
    title: "NorthPatrol", 
    description: "Digitalisierung der Sicherheitsrundgänge - QR-Code-System reduziert Berichtszeit um 75%",
    image: "/projects/nortpatrol.png",
    tech: ["React", "Supabase", "QR-Codes", "Real-time Tracking"],
    result: "50+ Sicherheitskräfte, 75% weniger Berichtszeit"
  },
  {
    title: "Paradieshof",
    description: "Interaktive Immobilienpräsentation mit 3D-Visualisierungen für Frankfurt-Projekt",
    image: "/projects/paradieshof.png", 
    tech: ["React", "Three.js", "Mapbox", "3D-Visualisierung"],
    result: "200+ qualifizierte Leads, 85% Engagement-Rate"
  }
]

const projectIcons = {
  "E-Commerce": Building2,
  "Security": Eye,
  "Real Estate": Building2,
  "AI": Brain,
  "Web App": Globe,
  "Mobile App": Smartphone
}

export default function KMULandingPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    package: "",
    company: ""
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [heroImage, setHeroImage] = useState<string>("")
  const [ctaImage, setCtaImage] = useState<string>("")
  const [expandedExamples, setExpandedExamples] = useState<{[key: string]: boolean}>({})

  // Set images on component mount
  useEffect(() => {
    const images = getShuffledCampaignImages()
    setHeroImage(images[0])
    setCtaImage(images[1])
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
      const response = await fetch('/api/send-kmu-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to send email')
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error('Error sending email:', error)
      // You might want to show an error message to the user here
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
            Nachricht gesendet!
          </h1>
          <p className="text-lg font-light text-white/80 mb-8">
            Vielen Dank für Ihre Anfrage. Wir melden uns innerhalb von 24 Stunden bei Ihnen zurück.
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
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {heroImage && (
            <Image
              src={heroImage}
              alt="KMU Landing hero background"
              fill
              className="object-cover opacity-40 blur-sm scale-110"
              priority
            />
          )}
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
              className="glass-primary rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-16 text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                className="mb-8 sm:mb-12"
              >
                <Badge className="glass-accent border-line-accent bg-accent/20 text-accent px-6 py-3 text-xs tracking-wider font-light border mb-8">
                  <Zap className="w-3 h-3 mr-2" />
                  Design + Code + AI
                </Badge>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight tracking-wide mb-6 sm:mb-8 text-white">
                  <motion.span 
                    className="block"
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, delay: 0.6 }}
                  >
                    Ihr Projekt in
                  </motion.span>
                  <motion.span 
                    className="block text-primary"
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                  >
                    10 Tagen live
                  </motion.span>
                </h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="text-lg sm:text-xl lg:text-2xl font-light text-white/90 leading-relaxed max-w-4xl mx-auto mb-8 sm:mb-12"
                >
                  Wir bringen Ihre Idee in Rekordzeit von der Skizze zum digitalen Produkt. 
                  Für Mittelstand, Startups und Agenturen.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <Button 
                    size="lg"
                    className="glass-accent border-line-accent bg-accent/10 hover:bg-accent/20 text-accent border px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-lg font-light rounded-full"
                    onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                    Kostenlosen Termin buchen
                    <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 animate-bounce" />
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Building Section */}
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
              <p className="text-base sm:text-lg lg:text-xl font-light text-muted-foreground leading-relaxed max-w-4xl mx-auto mb-12 sm:mb-16">
                Mit sen.dev verbinden wir kreative Konzeptentwicklung mit moderner Software-Entwicklung. 
                Wir arbeiten mit React, Next.js, Tailwind, Node.js, Supabase, OpenAI-APIs und entwickeln 
                digitale Produkte, die funktionieren – schnell, elegant und skalierbar.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                { icon: Target, title: "Klarer Fahrplan", desc: "Fixe Paketpreise & transparente Kommunikation" },
                { icon: Palette, title: "Design trifft Code", desc: "Ästhetik und saubere Programmierung vereint" },
                { icon: Bot, title: "KI-Integration", desc: "Workflow-Automatisierung mit modernen AI-APIs" },
                { icon: Users, title: "Agile Methoden", desc: "Transparente Zusammenarbeit & schnelle Iterationen" }
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
                  <div className="flex justify-center mt-4">
                    <CheckCircle className="w-5 h-5 text-accent" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
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
                Unsere <span className="text-primary">Pakete</span>
              </h2>
              <p className="text-base sm:text-lg font-light text-muted-foreground max-w-3xl mx-auto">
                Transparente Preise, klare Leistungen. Wählen Sie das Paket, das zu Ihrem Projekt passt.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
              {packages.slice(0, 3).map((pkg, index) => (
                <motion.div
                  key={pkg.value}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="white-tile rounded-2xl sm:rounded-3xl relative overflow-hidden"
                >
                  {/* Package Image Header */}
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={pkg.image}
                      alt={`${pkg.title} visualization`}
                      fill
                      className="object-cover"
                    />
                    {/* Price Tag Overlay */}
                    <div className="absolute top-4 right-4">
                      <div className="glass-accent bg-accent/90 text-white px-3 py-2 rounded-full flex items-center gap-2 shadow-lg">
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
                    <div className="glass-secondary rounded-2xl p-4 sm:p-6">
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
                          Klicken Sie hier, um {pkg.examples.length} Beispiele zu sehen
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Examples */}
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
                Erfolgs<span className="text-primary">geschichten</span>
              </h2>
              <p className="text-base sm:text-lg font-light text-muted-foreground max-w-3xl mx-auto">
                Echte Projekte, echte Ergebnisse. So haben wir anderen Unternehmen geholfen.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
              {showcaseProjects.map((project, index) => {
                const primaryTag = project.tech[0]
                const IconComponent = projectIcons[primaryTag as keyof typeof projectIcons] || Globe
                
                return (
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
                        alt={`${project.title} Projekt`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="p-6 sm:p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full glass-primary bg-accent/10 border border-accent/20 flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-accent" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-light text-foreground">{project.title}</h3>
                      </div>
                      
                      <p className="text-sm sm:text-base font-light text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                        {project.tech.slice(0, 3).map((tech, techIndex) => (
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
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/campaign/campaign3.jpg"
            alt="Contact form background"
            fill
            className="object-cover opacity-40 blur-sm scale-110"
          />
          {/* Enhanced gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          {/* Color overlay */}
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
                Kontakt aufnehmen
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-4 sm:mb-6 text-white">
                <span className="text-primary">Kostenlosen</span> Termin buchen
              </h2>
              <p className="text-base sm:text-lg font-light text-white/80 max-w-2xl mx-auto">
                Lassen Sie uns über Ihr Projekt sprechen. Unverbindlich und kostenlos.
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
                    <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    Projektanfrage
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
                        <Label htmlFor="company" className="text-sm font-light text-white/70">
                          Unternehmen
                        </Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                          className="glass-secondary border-line-secondary bg-secondary/10 font-light text-white placeholder:text-white/50"
                          placeholder="Ihr Unternehmen"
                        />
                      </div>
                    </div>


                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-light text-white/70">
                        Projektbeschreibung *
                      </Label>
                      <Textarea
                        id="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="glass-secondary border-line-secondary bg-secondary/10 font-light resize-none text-white placeholder:text-white/50"
                        placeholder="Erzählen Sie uns von Ihrem Projekt, Ihren Zielen und spezifischen Anforderungen..."
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
                          Kostenlosen Termin buchen
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
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
                  <span className="text-sm font-light text-white/80">24h Antwortzeit</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
                Häufige <span className="text-primary">Fragen</span>
              </h2>
            </motion.div>

            <div className="space-y-6 sm:space-y-8">
              {[
                { 
                  q: "Wie schnell sind Sie?", 
                  a: "MVP innerhalb von 10 Tagen, Corporate Websites meist in 2–4 Wochen. Dank unserer agilen Arbeitsweise und klaren Prozesse können wir auch bei komplexen Projekten schnelle Ergebnisse liefern." 
                },
                { 
                  q: "Arbeiten Sie auch mit bestehenden Agenturen?", 
                  a: "Ja, wir sind Ihr White-Label-Partner für sauberes Development. Viele Agenturen nutzen unsere technische Expertise, um Kreativkonzepte und Pitch-Ideen professionell umzusetzen." 
                },
                { 
                  q: "Welche Technologien nutzen Sie?", 
                  a: "Wir setzen auf bewährte, moderne Technologien: React, Next.js, Tailwind CSS, Node.js, Supabase, Prisma, OpenAI-APIs und viele weitere. Unsere Tech-Stack-Entscheidungen treffen wir projektspezifisch für maximale Performance und Zukunftssicherheit." 
                },
                { 
                  q: "Wie läuft die Zusammenarbeit ab?", 
                  a: "Erstgespräch → Detailliertes Angebot → Agiler Sprint → Livegang. Wir arbeiten transparent mit regelmäßigen Updates, nutzen moderne Kollaborations-Tools und halten Sie stets über den Projektfortschritt informiert." 
                }
              ].map((faq, index) => (
                <motion.div
                  key={faq.q}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="white-tile rounded-2xl sm:rounded-3xl p-6 sm:p-8"
                >
                  <h3 className="text-lg sm:text-xl font-light text-foreground mb-3 sm:mb-4">{faq.q}</h3>
                  <p className="text-sm sm:text-base font-light text-muted-foreground leading-relaxed">{faq.a}</p>
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
          {/* Enhanced gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          {/* Color overlay */}
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
              <Rocket className="w-8 h-8 sm:w-10 sm:h-10 text-accent" />
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-4 sm:mb-6 text-white">
              Bereit, Ihr Projekt zu starten?
            </h2>
            <p className="text-base sm:text-lg font-light text-white/80 mb-8 sm:mb-12 max-w-2xl mx-auto">
              Buchen Sie jetzt ein unverbindliches Erstgespräch – wir bringen Ihr Projekt auf die Straße.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Button 
                size="lg" 
                className="glass-accent border-line-accent bg-accent/20 hover:bg-accent/30 text-accent border px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-lg font-light rounded-full"
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                Termin buchen
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="glass-secondary border-line-secondary text-white hover:bg-white/10 border px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-lg font-light rounded-full"
                asChild
              >
                <Link href="/projects">
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                  Projekte ansehen
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}