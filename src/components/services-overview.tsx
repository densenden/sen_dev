"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Rocket, 
  Palette, 
  Brain, 
  Database, 
  Zap, 
  Globe,
  Settings,
  Briefcase,
  ArrowRight
} from "lucide-react"

const services = [
  {
    icon: Rocket,
    title: "MVP Development",
    description: "Rapid prototyping that actually converts. No WordPress limitations.",
    features: ["Next.js + React", "AI Integration", "Scalable Architecture"],
    color: "from-blue-600 to-indigo-600",
    popular: true
  },
  {
    icon: Palette,
    title: "Vibe Coding™",
    description: "Where emotional design meets robust engineering.",
    features: ["Emotion-Driven UX", "Technical Excellence", "Brand Consistency"],
    color: "from-violet-600 to-purple-600",
    popular: false
  },
  {
    icon: Brain,
    title: "AI Integration",
    description: "GPT, Vision, Whisper APIs that actually work for your business.",
    features: ["OpenAI Integration", "Custom Models", "Smart Automation"],
    color: "from-emerald-600 to-teal-600",
    popular: false
  },
  {
    icon: Database,
    title: "Backend & Data",
    description: "Bulletproof infrastructure that scales with your growth.",
    features: ["Supabase/PostgreSQL", "REST/GraphQL APIs", "Real-time Updates"],
    color: "from-orange-600 to-red-600",
    popular: false
  },
  {
    icon: Globe,
    title: "Full Infrastructure",
    description: "Domain to deployment - we handle the entire tech stack.",
    features: ["Vercel Deployment", "Custom Domains", "Performance Optimization"],
    color: "from-cyan-600 to-blue-600",
    popular: false
  },
  {
    icon: Briefcase,
    title: "Business Development",
    description: "Investor decks and business strategy that gets funded.",
    features: ["Investor Presentations", "Business Strategy", "Market Analysis"],
    color: "from-pink-600 to-rose-600",
    popular: false
  }
]

export default function ServicesOverview() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4">
            <Settings className="w-4 h-4 mr-2" />
            Core Services
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Everything you need to launch and scale
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Stop juggling multiple agencies. Get everything from one expert who understands both design and engineering.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="relative group hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-slate-800 overflow-hidden">
              {service.popular && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-gradient-to-r from-violet-600 to-purple-600 text-white border-0">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-300">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                      <Zap className="w-4 h-4 text-violet-600 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button variant="ghost" className="w-full group-hover:bg-slate-100 dark:group-hover:bg-slate-700 transition-colors duration-300">
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to ditch the WordPress hustle?</h3>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Let's build something that actually converts. Book a discovery call and see why startups choose sencodev.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-violet-600 hover:bg-slate-50 px-8 py-6 text-lg font-semibold rounded-xl">
            Book Discovery Call
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}