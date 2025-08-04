"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Lightbulb, Target, Zap, ArrowRight, Quote } from "lucide-react"
import { motion } from "framer-motion"

const principles = [
  {
    icon: Eye,
    title: "The Designer's Eye",
    description: "Every pixel carries intention. Every interaction tells a story. The designer's eye sees beyond functionality to the emotional core of user experience.",
    quote: "What others call 'nice to have', we call 'essential'."
  },
  {
    icon: Zap,
    title: "Velocity Over Perfection",
    description: "Speed wins markets. Perfect code launched tomorrow beats flawless code launched never. We optimize for time-to-impact, not time-to-perfect.",
    quote: "Done is better than perfect. But done right is better than done fast."
  },
  {
    icon: Target,
    title: "Proactive Execution",
    description: "We don't wait for specifications. We anticipate needs, solve problems before they arise, and deliver solutions you didn't know you needed.",
    quote: "The best solutions solve problems the client hasn't thought of yet."
  },
  {
    icon: Lightbulb,
    title: "Full-Package Thinking",
    description: "Design without development is decoration. Development without design is engineering. Together, they become transformation.",
    quote: "One brain, one vision, zero translation layers."
  }
]

const philosophyCards = [
  {
    title: "Speed is Strategy",
    content: "In startup life, six months feels like six years. Every day spent coordinating between agencies is a day your competitor gets ahead. SenDev™ eliminates the coordination tax.",
    accent: "from-primary/20 to-purple-600/20"
  },
  {
    title: "Quality at Velocity",
    content: "Fast doesn't mean sloppy. It means focused. When design and development happen in the same brain, there's no quality lost in translation.",
    accent: "from-purple-600/20 to-pink-600/20"
  },
  {
    title: "The Full Stack Advantage",
    content: "From user research to deployment scripts, from brand identity to database optimization – complete ownership means complete accountability.",
    accent: "from-pink-600/20 to-primary/20"
  }
]

export default function PhilosophySection() {
  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-b from-background to-secondary/10">
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
            <Quote className="w-3 h-3 mr-2" />
            Philosophy
          </Badge>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black leading-none">
            <span className="text-foreground">Where Vision</span>
            <br />
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Meets Velocity
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every entrepreneur knows the feeling: brilliant idea, limited time, 
            endless coordination overhead. We believe there's a better way.
          </p>
        </motion.div>

        {/* Core Principles */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {principles.map((principle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass h-full transition-all duration-500 hover:scale-105 group">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="bg-gradient-to-br from-primary to-purple-600 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <principle.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black mb-2">{principle.title}</h3>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {principle.description}
                  </p>
                  
                  <blockquote className="glass rounded-lg p-4 italic text-sm border-l-4 border-primary">
                    "{principle.quote}"
                  </blockquote>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Philosophy Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {philosophyCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className={`glass rounded-2xl p-8 h-full relative overflow-hidden transition-all duration-500 hover:scale-105`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-4">{card.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {card.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* The Why Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-12 text-center max-w-5xl mx-auto"
        >
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-4xl font-black">Why This Matters</h3>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Every day you spend managing vendors is a day your competitor spends building. 
                Every meeting about aligning design and development is a meeting not spent with customers.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-black text-primary">-60%</div>
                <p className="text-sm text-muted-foreground">Coordination Overhead</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-black text-primary">3-6x</div>
                <p className="text-sm text-muted-foreground">Faster Iterations</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-black text-primary">100%</div>
                <p className="text-sm text-muted-foreground">Design-Dev Alignment</p>
              </div>
            </div>
            
            <div className="pt-8">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-lg font-semibold rounded-full group">
                Experience the Difference
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}