"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, Mail, Phone, Building } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

interface ContactFormProps {
  title?: string
  description?: string
  pageContext: string
  packages?: Array<{
    value: string
    label: string
  }>
  industries?: Array<{
    value: string
    label: string
  }>
  onSubmitSuccess?: () => void
  className?: string
}

const defaultPackages = [
  { value: 'consultation', label: 'Free Consultation' },
  { value: 'mvp-sprint', label: 'MVP Sprint – from €2,450' },
  { value: 'corporate-website', label: 'Corporate Website + AI – from €1,625' },
  { value: 'agency-partner', label: 'Agency Partner Retainer – from €875/month' },
  { value: 'custom', label: 'Custom Project' }
]

const defaultIndustries = [
  { value: 'legal', label: 'Law Firms & Legal Services' },
  { value: 'consulting', label: 'Management Consulting' },
  { value: 'tax-advisory', label: 'Tax Advisory & Accounting' },
  { value: 'finance', label: 'Finance & Banking' },
  { value: 'healthcare', label: 'Healthcare & Medical' },
  { value: 'tech', label: 'Technology & SaaS' },
  { value: 'retail', label: 'E-commerce & Retail' },
  { value: 'manufacturing', label: 'Manufacturing & Industrial' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'education', label: 'Education' },
  { value: 'other', label: 'Other' }
]

export default function ContactForm({
  title = "Start Your Project",
  description = "Tell us about your vision and we'll help you make it reality",
  pageContext,
  packages = defaultPackages,
  industries = defaultIndustries,
  onSubmitSuccess,
  className = ""
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    selectedPackage: "",
    budget: "",
    timeline: "",
    message: ""
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Send contact email
      const response = await fetch('/api/send-contact-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          pageContext,
          selectedPackage: formData.selectedPackage || packages.find(p => p.value === 'consultation')?.value
        }),
      })

      if (!response.ok) throw new Error('Failed to send email')
      
      if (onSubmitSuccess) {
        onSubmitSuccess()
      } else {
        // Reset form on success
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          industry: "",
          selectedPackage: "",
          budget: "",
          timeline: "",
          message: ""
        })
        alert('Thank you! We will get back to you within 24 hours.')
      }
    } catch (error) {
      console.error('Error sending contact form:', error)
      alert('There was an error sending your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className={`py-16 sm:py-24 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/20 px-4 py-2 text-sm font-light mb-6">
              <Mail className="w-4 h-4 mr-2" />
              Get In Touch
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-light mb-4 text-gray-900">
              {title}
            </h2>
            <p className="text-lg text-gray-600 font-light">
              {description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-gray-200 shadow-lg">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-light text-gray-900 flex items-center gap-3">
                  <Send className="w-5 h-5 text-orange-500" />
                  Contact Form
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Basic Information */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700">Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="border-gray-300 font-light"
                        placeholder="Your Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="border-gray-300 font-light"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="border-gray-300 font-light"
                        placeholder="+49 123 456 7890"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-sm font-medium text-gray-700">Company</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="border-gray-300 font-light"
                        placeholder="Your Company"
                      />
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="industry" className="text-sm font-medium text-gray-700">Industry</Label>
                      <Select value={formData.industry} onValueChange={(value) => setFormData({...formData, industry: value})}>
                        <SelectTrigger className="border-gray-300">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map((industry) => (
                            <SelectItem key={industry.value} value={industry.value}>
                              {industry.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="selectedPackage" className="text-sm font-medium text-gray-700">Service Interest</Label>
                      <Select value={formData.selectedPackage} onValueChange={(value) => setFormData({...formData, selectedPackage: value})}>
                        <SelectTrigger className="border-gray-300">
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                        <SelectContent>
                          {packages.map((pkg) => (
                            <SelectItem key={pkg.value} value={pkg.value}>
                              {pkg.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="timeline" className="text-sm font-medium text-gray-700">Timeline</Label>
                      <Select value={formData.timeline} onValueChange={(value) => setFormData({...formData, timeline: value})}>
                        <SelectTrigger className="border-gray-300">
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asap">ASAP</SelectItem>
                          <SelectItem value="1-3months">1-3 Months</SelectItem>
                          <SelectItem value="3-6months">3-6 Months</SelectItem>
                          <SelectItem value="6-12months">6-12 Months</SelectItem>
                          <SelectItem value="planning">Just Planning</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget" className="text-sm font-medium text-gray-700">Budget Range</Label>
                      <Select value={formData.budget} onValueChange={(value) => setFormData({...formData, budget: value})}>
                        <SelectTrigger className="border-gray-300">
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="consultation">Free Consultation</SelectItem>
                          <SelectItem value="under-5k">Under €5,000</SelectItem>
                          <SelectItem value="5k-15k">€5,000 - €15,000</SelectItem>
                          <SelectItem value="15k-50k">€15,000 - €50,000</SelectItem>
                          <SelectItem value="50k-plus">€50,000+</SelectItem>
                          <SelectItem value="custom">Custom Budget</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium text-gray-700">Project Description *</Label>
                    <Textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="border-gray-300 font-light resize-none"
                      placeholder="Tell us about your project, goals, and any specific requirements..."
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-light py-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-3" />
                        Send Message
                      </>
                    )}
                  </Button>

                  {/* Footer */}
                  <div className="text-center pt-4">
                    <p className="text-sm text-gray-500">
                      We'll respond within 24 hours • All inquiries are confidential
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}