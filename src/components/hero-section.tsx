import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Zap, Palette, Settings } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25" />
      
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
            <Zap className="w-4 h-4 mr-2" />
            Vibe Coding™ - Where Emotion Meets Engineering
          </Badge>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Fast-track MVPs with{" "}
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Vibe Coding
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Built by a designer-engineer for rapid startup growth. 
            <strong className="text-slate-900 dark:text-white"> No more WordPress hustle</strong> – 
            just scalable, emotional tech that converts.
          </p>
          
          {/* Value Props */}
          <div className="flex flex-wrap justify-center gap-6 text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-violet-600" />
              <span>Emotional Design</span>
            </div>
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-violet-600" />
              <span>Scalable Tech</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-violet-600" />
              <span>Rapid Growth</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button size="lg" className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              Start Your MVP Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg font-medium rounded-xl border-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300">
              View Our Work
            </Button>
          </div>
          
          {/* Social Proof */}
          <div className="pt-12 text-sm text-slate-500 dark:text-slate-400">
            <p className="mb-4">Trusted by founders from</p>
            <div className="flex flex-wrap justify-center gap-8 opacity-60">
              <span className="font-semibold">Synapsee</span>
              <span className="font-semibold">MemeGen</span>
              <span className="font-semibold">Kria Education</span>
              <span className="font-semibold">Fork Technologies</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}