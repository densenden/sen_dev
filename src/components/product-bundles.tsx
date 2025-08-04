"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Zap, 
  Rocket, 
  Crown, 
  Sparkles, 
  Users,
  Clock,
  ArrowRight,
  Check,
  Star
} from "lucide-react"
import { motion } from "framer-motion"

const packages = [
  {
    id: "impulse",
    name: "Impulse Sprint",
    tagline: "Clarity & Vision",
    price: "990",
    duration: "1-2 Tage",
    hours: "8-12 Stunden",
    icon: Zap,
    color: "from-slate-600 to-slate-800",
    target: "Ideen- oder Pivotphase",
    features: [
      "1:1 Sparring Session (2h)",
      "Technische Machbarkeitsanalyse",
      "Tool-Empfehlungen & Techstack",
      "UX-Skizze oder Wireframe Draft",
      "Notion Starter Template (CRM)",
      "Entscheidungsvorlage & Umsetzungsplan"
    ],
    result: "Skizze + Setup-Empfehlung",
    popular: false
  },
  {
    id: "starter",
    name: "Starter Sprint",
    tagline: "Mini-MVP + Identity",
    price: "1.990",
    duration: "1 Woche",
    hours: "25-30 Stunden",
    icon: Rocket,
    color: "from-primary/80 to-primary",
    target: "Frühphase-Startups mit klarer Idee",
    features: [
      "MVP Light: Funktionale Web-App",
      "Custom Branding Light (Logo, UI Kit)",
      "Domain, Mail, Webhosting Setup",
      "Notion Workspace + Wiki-Vorlage",
      "1 Feedback-Schleife inklusive",
      "Pitchbare Demo-Version"
    ],
    result: "MVP-Demo + Setup + Wiki",
    popular: true
  },
  {
    id: "launch",
    name: "Launch Ready",
    tagline: "Investor-Grade MVP",
    price: "5.990",
    duration: "4-5 Wochen",
    hours: "80-100 Stunden",
    icon: Crown,
    color: "from-primary to-purple-600",
    target: "Startups mit Pitch-Ziel",
    features: [
      "Full MVP: Web-App mit 3 Views/Funktionen",
      "CI-Design + Design Tokens + Komponenten",
      "Pitch Deck Vorlage (Keynote/Slides)",
      "Domain, Mail, Workspace Setup",
      "Dokumentation + Mini-Handbuch",
      "2-3 Feedback-Runden inklusive",
      "Optional: Stripe, Video-Guide, CMS"
    ],
    result: "Investorenfähiger MVP + Marke",
    popular: false
  },
  {
    id: "creator",
    name: "Creator+ Build",
    tagline: "Monetization Platform",
    price: "8.900",
    duration: "6-8 Wochen",
    hours: "120-150 Stunden",
    icon: Sparkles,
    color: "from-purple-600 to-pink-600",
    target: "Creator, Coaches, Einzelskalierer",
    features: [
      "Plattformartige MVP-Umsetzung",
      "Native App (optional)",
      "Brand Manual + Präsentationsdesign",
      "SEO-optimierte Startseite + Content",
      "Funnel-Setup + Newsletter-Vorlage",
      "2 Wochen Launch-Support + Bugfixes",
      "Optional: WhatsApp-Bot, KI-Features"
    ],
    result: "Monetarisierbare Plattform",
    popular: false
  },
  {
    id: "cofounder",
    name: "Co-Founder Tech Partner",
    tagline: "Strategic Partnership",
    price: "Anfrage",
    duration: "Fortlaufend",
    hours: "20-30h/Monat",
    icon: Users,
    color: "from-slate-800 to-black",
    target: "Teams mit laufender Produktentwicklung",
    features: [
      "Fortlaufende technische Weiterentwicklung",
      "Pivot-Begleitung & Feature-Ideen",
      "Founder-Sparring (wöchentliche Calls)",
      "Support bei Hiring & Tech-Dokumentation",
      "Roadmap + Priorisierung + QA",
      "Optional: Equity Deal, CTO auf Zeit"
    ],
    result: "Langfristige Tech-Begleitung",
    popular: false
  }
]

export default function ProductBundles() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-20 space-y-6"
        >
          <Badge variant="outline" className="glass px-6 py-3 text-xs uppercase tracking-wider">
            <Star className="w-3 h-3 mr-2" />
            Product Bundles
          </Badge>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black leading-none">
            <span className="text-foreground">Full-Package</span>
            <br />
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Delivery
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From spark to scale. Every package includes everything you need – 
            no hidden costs, no coordination overhead, just pure execution.
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative ${pkg.id === 'launch' ? 'lg:col-span-3 lg:max-w-2xl lg:mx-auto' : ''}`}
            >
              <Card className={`glass relative h-full transition-all duration-500 hover:scale-105 hover:shadow-2xl group ${pkg.popular ? 'ring-2 ring-primary/50' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1 text-xs font-bold">
                      MOST POPULAR
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-6">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${pkg.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <pkg.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <CardTitle className="text-2xl font-black">{pkg.name}</CardTitle>
                  <p className="text-sm text-muted-foreground italic">{pkg.tagline}</p>
                  
                  <div className="pt-4">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-4xl font-black">€{pkg.price}</span>
                      {pkg.price !== "Anfrage" && <span className="text-sm text-muted-foreground">ab</span>}
                    </div>
                    <div className="flex items-center justify-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {pkg.duration}
                      </span>
                      <span>•</span>
                      <span>{pkg.hours}</span>
                    </div>
                  </div>
                  
                  <Badge variant="outline" className="mt-4 text-xs">
                    {pkg.target}
                  </Badge>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="glass rounded-lg p-4 mb-6">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Ergebnis</p>
                    <p className="text-sm font-medium">{pkg.result}</p>
                  </div>
                  
                  <Button 
                    className={`w-full py-6 text-lg font-semibold transition-all duration-300 group ${
                      pkg.popular 
                        ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                        : 'glass border-primary/30 hover:border-primary/60 hover:bg-primary/5'
                    }`}
                  >
                    {pkg.price === "Anfrage" ? "Kontakt aufnehmen" : "Paket wählen"}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center glass rounded-2xl p-12 max-w-4xl mx-auto"
        >
          <h3 className="text-3xl font-black mb-4">
            Not sure which package fits?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Every great product starts with understanding. Let's talk about your vision 
            and find the perfect path forward.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-lg font-semibold rounded-full">
            Book Strategy Call
            <ArrowRight className="ml-3 w-5 h-5" />
          </Button>
        </motion.div>

      </div>
    </section>
  )
}