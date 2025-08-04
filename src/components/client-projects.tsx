"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, ArrowRight, Play } from "lucide-react"

const projects = [
  {
    title: "Senflix",
    subtitle: "Netflix-style streaming platform",
    description: "AI-powered content recommendations with modern React architecture. Scaled to 1000+ active users.",
    outcome: "1000+ Active Users",
    tech: ["React", "Next.js", "Supabase", "OpenAI"],
    category: "Streaming Platform",
    image: "/projects/senflix-hero.jpg",
    color: "from-red-600 to-rose-600"
  },
  {
    title: "Synapsee",
    subtitle: "AI knowledge management",
    description: "Revolutionary platform connecting ideas with AI. 50% productivity improvement for distributed teams.",
    outcome: "50% Productivity Boost",
    tech: ["Vue.js", "Node.js", "PostgreSQL", "GPT-4"],
    category: "AI Platform",
    image: "/projects/synapsee-hero.jpg",
    color: "from-blue-600 to-indigo-600"
  },
  {
    title: "Meme-Machine",
    subtitle: "Viral content generator",
    description: "AI meme generation platform. Achieved viral social media presence with 100K+ generated memes.",
    outcome: "100K+ Memes Generated",
    tech: ["React Native", "FastAPI", "TensorFlow"],
    category: "Social Platform",
    image: "/projects/meme-machine-hero.jpg",
    color: "from-purple-600 to-pink-600"
  },
  {
    title: "Kria Training",
    subtitle: "Professional development platform",
    description: "Interactive learning with 95% completion rates. Certified 500+ professionals across industries.",
    outcome: "500+ Certified Professionals",
    tech: ["Angular", "NestJS", "MongoDB", "Stripe"],
    category: "EdTech",
    image: "/projects/kria-training-hero.jpg",
    color: "from-emerald-600 to-teal-600"
  },
  {
    title: "Fork:it",
    subtitle: "Creative collaboration platform",
    description: "GitHub for creatives with version control. Acquired by major tech company after 18 months.",
    outcome: "Successful Acquisition",
    tech: ["Svelte", "Go", "PostgreSQL", "AWS"],
    category: "Developer Tools",
    image: "/projects/fork-it-hero.jpg",
    color: "from-orange-600 to-yellow-600"
  }
]

export default function ClientProjects() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4">
            <Play className="w-4 h-4 mr-2" />
            Client Showcase
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Real projects. Real results.
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            From streaming platforms to AI tools - see how Vibe Coding transforms startup ideas into market winners.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {projects.map((project, index) => (
            <Card key={index} className="group overflow-hidden border-0 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 hover:shadow-2xl transition-all duration-500">
              <CardContent className="p-0">
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-90`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-3xl font-bold mb-2">{project.title}</h3>
                      <p className="text-lg opacity-90">{project.subtitle}</p>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      {project.category}
                    </Badge>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Outcome */}
                  <div className="mb-4">
                    <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50 dark:text-green-400 dark:border-green-800 dark:bg-green-950">
                      ✓ {project.outcome}
                    </Badge>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Tech Stack:</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <Button variant="ghost" className="w-full group-hover:bg-slate-100 dark:group-hover:bg-slate-700 transition-colors duration-300">
                    View Case Study
                    <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
            Want to see your startup featured here?
          </p>
          <Button size="lg" className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold rounded-xl">
            Let's Build Something Amazing
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}