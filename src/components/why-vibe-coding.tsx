"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  CheckCircle, 
  XCircle, 
  Zap, 
  Clock, 
  DollarSign, 
  TrendingUp,
  ArrowRight,
  Sparkles
} from "lucide-react"

const comparisons = [
  {
    feature: "Development Speed",
    traditional: "3-6 months for basic MVP",
    vibeCoding: "4-8 weeks for market-ready product",
    traditionalIcon: XCircle,
    vibeIcon: CheckCircle
  },
  {
    feature: "Design-Dev Sync",
    traditional: "Constant back-and-forth, lost in translation",
    vibeCoding: "Single brain, seamless execution",
    traditionalIcon: XCircle,
    vibeIcon: CheckCircle
  },
  {
    feature: "User Experience",
    traditional: "Functional but forgettable",
    vibeCoding: "Emotionally engaging, memorable",
    traditionalIcon: XCircle,
    vibeIcon: CheckCircle
  },
  {
    feature: "Technical Debt",
    traditional: "WordPress plugins, theme limitations",
    vibeCoding: "Clean, scalable, modern architecture",
    traditionalIcon: XCircle,
    vibeIcon: CheckCircle
  },
  {
    feature: "Cost Structure",
    traditional: "Multiple agencies, coordination overhead",
    vibeCoding: "One expert, transparent pricing",
    traditionalIcon: XCircle,
    vibeIcon: CheckCircle
  }
]

const benefits = [
  {
    icon: Zap,
    title: "Emotion-Driven Engineering",
    description: "Every line of code serves the user's emotional journey, not just functionality.",
    color: "from-violet-600 to-purple-600"
  },
  {
    icon: Clock,
    title: "Designer's Eye, Engineer's Brain",
    description: "No more translation layers. Design decisions happen at the code level.",
    color: "from-blue-600 to-indigo-600"
  },
  {
    icon: TrendingUp,
    title: "Built for Scale",
    description: "Modern architecture that grows with your startup, not against it.",
    color: "from-emerald-600 to-teal-600"
  },
  {
    icon: DollarSign,
    title: "Investor-Ready Presentation",
    description: "Products that demo beautifully and demonstrate technical sophistication.",
    color: "from-orange-600 to-red-600"
  }
]

export default function WhyVibeCoding() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-black text-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 border-violet-400 text-violet-400">
            <Sparkles className="w-4 h-4 mr-2" />
            The Vibe Coding Difference
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Why settle for WordPress when you can have art?
          </h2>
          <p className="text-xl text-slate-300">
            Traditional development treats code like a commodity. Vibe Coding treats it like a craft. 
            Here's what that means for your startup.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center mb-12">Traditional Development vs. Vibe Coding</h3>
          <div className="bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {/* Header */}
              <div className="p-6 bg-slate-700/50 text-center font-semibold">
                Feature
              </div>
              <div className="p-6 bg-red-900/30 text-center font-semibold border-l border-slate-700">
                Traditional Approach
              </div>
              <div className="p-6 bg-violet-900/30 text-center font-semibold border-l border-slate-700">
                Vibe Coding™
              </div>

              {/* Comparison Rows */}
              {comparisons.map((comp, index) => (
                <div key={index} className="contents">
                  <div className="p-6 border-t border-slate-700 font-medium flex items-center">
                    {comp.feature}
                  </div>
                  <div className="p-6 border-t border-l border-slate-700 flex items-center text-slate-300">
                    <comp.traditionalIcon className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
                    {comp.traditional}
                  </div>
                  <div className="p-6 border-t border-l border-slate-700 flex items-center text-slate-300">
                    <comp.vibeIcon className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    {comp.vibeCoding}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700 text-white">
              <CardHeader>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${benefit.color} flex items-center justify-center mb-4`}>
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">
                  {benefit.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-12">
          <h3 className="text-3xl font-bold mb-4">Ready to experience the difference?</h3>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Stop compromising on design or technical quality. Get both, from someone who speaks fluent startup.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-violet-600 hover:bg-slate-50 px-8 py-6 text-lg font-semibold rounded-xl">
              See Our Process
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-xl">
              Book Discovery Call
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}