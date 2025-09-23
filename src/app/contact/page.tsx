"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  MessageCircle, 
  Calendar,
  Clock,
  Mail,
  Phone,
  Send,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  User,
  Package
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { T } from "gt-next"

const packages = [
  { value: "impulse", label: "Impulse Sprint (€1,500 - €3,000)", duration: "2-3 days" },
  { value: "starter", label: "Starter Sprint (€4,000 - €8,000)", duration: "5-7 days" },
  { value: "launch", label: "Launch Ready (€12,000 - €20,000)", duration: "1-2 weeks" },
  { value: "creator", label: "Creator+ Build (€15,000 - €20,000)", duration: "2-3 weeks" },
  { value: "cofounder", label: "Co-Founder Tech Partner (€3,000+ /month)", duration: "Ongoing" },
  { value: "consultation", label: "Free Consultation", duration: "30 min call" },
  { value: "custom", label: "Custom Project", duration: "TBD" }
]

// Generate time slots for the next 14 days with business hours
const generateTimeSlots = async () => {
  const slots = []
  const now = new Date()
  const slotDuration = 30 // 30 minutes
  
  // Business hours: 10-12 and 14-17 weekdays, 14-17 Saturday
  const businessHours = {
    weekday: [
      { start: 10, end: 12 },
      { start: 14, end: 17 }
    ],
    saturday: [
      { start: 14, end: 17 }
    ]
  }
  
  // Get existing appointments to block slots
  let bookedSlots = []
  try {
    const response = await fetch('/api/appointments')
    if (response.ok) {
      const data = await response.json()
      bookedSlots = data.appointments.map(apt => ({
        date: apt.appointment_date,
        time: apt.appointment_time.substring(0, 5) // HH:MM format
      }))
    }
  } catch (error) {
    console.error('Failed to fetch booked appointments:', error)
  }
  
  for (let day = 1; day <= 14; day++) {
    const date = new Date(now)
    date.setDate(now.getDate() + day)
    
    let hours = []
    
    // Skip Sunday (0)
    if (date.getDay() === 0) continue
    
    // Saturday (6) - afternoon only
    if (date.getDay() === 6) {
      hours = businessHours.saturday
    } else {
      // Weekdays (1-5)
      hours = businessHours.weekday
    }
    
    // Generate slots for each business hour period
    for (const period of hours) {
      for (let hour = period.start; hour < period.end; hour++) {
        for (let minute = 0; minute < 60; minute += slotDuration) {
          const slotTime = new Date(date)
          slotTime.setHours(hour, minute, 0, 0)
          
          // Skip past slots
          if (slotTime <= now) continue
          
          const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
          const dateString = date.toISOString().split('T')[0]
          
          // Check if slot is already booked
          const isBooked = bookedSlots.some(slot => 
            slot.date === dateString && slot.time === timeString
          )
          
          if (!isBooked) {
            slots.push({
              id: `${dateString}-${hour}-${minute}`,
              date: dateString,
              time: timeString,
              datetime: slotTime,
              available: true
            })
          }
        }
      }
    }
  }
  return slots
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    company: "",
    package: "",
    message: "",
    preferredContact: "email",
    consultationMethod: "zoom" // zoom, teams, phone
  })
  
  const [currentStep, setCurrentStep] = useState<'contact' | 'schedule'>('contact')
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [timeSlots, setTimeSlots] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoadingSlots, setIsLoadingSlots] = useState(false)

  // Load time slots when consultation is selected
  useEffect(() => {
    if (formData.package === 'consultation' && currentStep === 'schedule') {
      setIsLoadingSlots(true)
      generateTimeSlots().then(slots => {
        setTimeSlots(slots)
        setIsLoadingSlots(false)
      })
    }
  }, [formData.package, currentStep])
  
  // Use contact.jpg for the hero backdrop
  const heroImage = "/contact.jpg"

  // Group slots by date
  const slotsByDate = timeSlots.reduce((acc, slot) => {
    if (!acc[slot.date]) acc[slot.date] = []
    acc[slot.date].push(slot)
    return acc
  }, {} as Record<string, typeof timeSlots>)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    }).format(date)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.package === 'consultation') {
      setCurrentStep('schedule')
    } else {
      handleFinalSubmit()
    }
  }

  const handleFinalSubmit = async () => {
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
          source_page: 'contact'
        }),
      })

      if (!dbResponse.ok) {
        console.error('Failed to store in database')
      }

      // Send email
      const emailResponse = await fetch('/api/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!emailResponse.ok) {
        throw new Error('Failed to send email')
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error('Error processing submission:', error)
      // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleScheduleSubmit = async () => {
    if (!selectedSlot) return
    
    const slot = timeSlots.find(s => s.id === selectedSlot)
    if (!slot) return
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/send-appointment-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          appointment: {
            date: slot.date,
            time: slot.time,
            datetime: slot.datetime
          }
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send appointment email')
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error('Error sending appointment email:', error)
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
            {selectedSlot ? <T id="contact-success-appointment">Appointment Scheduled!</T> : <T id="contact-success-message">Message Sent!</T>}
          </h1>
          <p className="text-lg font-light text-white/80 mb-8">
            {selectedSlot 
              ? <T id="contact-success-appointment-desc" variables={{date: formatDate(timeSlots.find(s => s.id === selectedSlot)?.date || ''), time: timeSlots.find(s => s.id === selectedSlot)?.time || ''}}>Your consultation is scheduled for {{date}} at {{time}}. We will send you a calendar invite shortly.</T>
              : <T id="contact-success-message-desc">Thank you for reaching out. We will review your project details and get back to you within 24 hours.</T>
            }
          </p>
          <Button 
            className="glass-accent border-line-accent bg-accent/20 text-accent hover:bg-accent/30 font-light rounded-full px-8 border"
            asChild
          >
            <Link href="/"><T id="contact-return-home">Return Home</T></Link>
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
          <Image
            src={heroImage}
            alt="Contact hero background"
            fill
            className="object-cover opacity-80 saturate-75"
            priority
          />
        </div>

        <div className="container mx-auto px-8 py-32 relative z-10">
          <div className="max-w-6xl mx-auto">
            
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="glass-primary rounded-3xl p-12 text-center mb-12"
            >
              <Badge className="glass-accent border-line-accent bg-accent/20 text-accent px-6 py-3 text-xs tracking-wider font-light mb-8 border">
                <MessageCircle className="w-3 h-3 mr-2" />
                {currentStep === 'contact' ? <T id="contact-badge-touch">Get In Touch</T> : <T id="contact-badge-schedule">Schedule Your Call</T>}
              </Badge>
              
              <h1 className="text-6xl md:text-7xl font-light leading-none tracking-wide mb-8 text-white">
                <T id="contact-title"><span className="text-white">Let's Build </span><span className="text-primary">Together</span></T>
              </h1>

              <p className="text-xl font-light text-white/80 leading-relaxed max-w-3xl mx-auto">
                {currentStep === 'contact' 
                  ? <T id="contact-desc-form">Ready to transform your vision into reality? Tell us about your project and we will find the perfect approach.</T>
                  : <T id="contact-desc-schedule">Choose your preferred time for a 30-minute discovery call. We will discuss your project and explore how we can help.</T>
                }
              </p>
            </motion.div>

            {currentStep === 'contact' ? (
              /* Contact Form */
              <div className="grid lg:grid-cols-3 gap-12">
                
                {/* Main Form */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="lg:col-span-2"
                >
                  <Card className="glass-primary border-0 rounded-3xl">
                    <CardHeader className="pb-8">
                      <CardTitle className="text-2xl font-light text-white flex items-center gap-3">
                        <User className="w-6 h-6 text-primary" />
                        <T id="contact-form-title">Project Details</T>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleFormSubmit} className="space-y-8">
                        
                        {/* Basic Information */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-light text-white/70">
                              <T id="contact-label-name">Full Name *</T>
                            </Label>
                            <Input
                              id="name"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                              className="glass-secondary border-line-secondary bg-secondary/10 font-light text-white placeholder:text-white/50"
                              placeholder="Your name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-light text-white/70">
                              Email Address *
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              className="glass-secondary border-line-secondary bg-secondary/10 font-light text-white placeholder:text-white/50"
                              placeholder="your@email.com"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="mobile" className="text-sm font-light text-white/70">
                              Mobile Number {formData.package === 'consultation' && formData.consultationMethod === 'phone' && '*'}
                            </Label>
                            <Input
                              id="mobile"
                              type="tel"
                              value={formData.mobile}
                              onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                              className="glass-secondary border-line-secondary bg-secondary/10 font-light text-white placeholder:text-white/50"
                              placeholder="+49 123 456 7890"
                              required={formData.package === 'consultation' && formData.consultationMethod === 'phone'}
                            />
                            {formData.package === 'consultation' && formData.consultationMethod === 'phone' && (
                              <p className="text-xs text-white/60">
                                Mobile number is required for phone consultations
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="company" className="text-sm font-light text-white/70">
                              Company / Project
                            </Label>
                            <Input
                              id="company"
                              value={formData.company}
                              onChange={(e) => setFormData({...formData, company: e.target.value})}
                              className="glass-secondary border-line-secondary bg-secondary/10 font-light text-white placeholder:text-white/50"
                              placeholder="Your company or project name"
                            />
                          </div>
                        </div>

                        {/* Package Selection */}
                        <div className="space-y-2">
                          <Label className="text-sm font-light text-white/70 flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            Interested Package *
                          </Label>
                          <Select value={formData.package} onValueChange={(value) => setFormData({...formData, package: value})} required>
                            <SelectTrigger className="glass-secondary border-line-secondary bg-secondary/10 font-light text-white">
                              <SelectValue placeholder="Choose a package that fits your needs" />
                            </SelectTrigger>
                            <SelectContent className="bg-background/95 backdrop-blur-md">
                              {packages.map((pkg) => (
                                <SelectItem key={pkg.value} value={pkg.value} className="font-light">
                                  <div className="flex flex-col">
                                    <span>{pkg.label}</span>
                                    <span className="text-xs text-muted-foreground">{pkg.duration}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Consultation Method - Only show for consultation package */}
                        {formData.package === 'consultation' && (
                          <div className="space-y-2">
                            <Label className="text-sm font-light text-white/70">
                              Preferred Consultation Method *
                            </Label>
                            <Select value={formData.consultationMethod} onValueChange={(value) => setFormData({...formData, consultationMethod: value})} required>
                              <SelectTrigger className="glass-secondary border-line-secondary bg-secondary/10 font-light text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-background/95 backdrop-blur-md">
                                <SelectItem value="zoom" className="font-light">
                                  🎥 Zoom Meeting (Video Call)
                                </SelectItem>
                                <SelectItem value="teams" className="font-light">
                                  💼 Microsoft Teams (Video Call)
                                </SelectItem>
                                <SelectItem value="phone" className="font-light">
                                  📞 Phone Call (Voice Only)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        {/* Message */}
                        <div className="space-y-2">
                          <Label htmlFor="message" className="text-sm font-light text-white/70">
                            Project Description *
                          </Label>
                          <Textarea
                            id="message"
                            required
                            rows={6}
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                            className="glass-secondary border-line-secondary bg-secondary/10 font-light resize-none text-white placeholder:text-white/50"
                            placeholder="Tell us about your project, goals, and any specific requirements..."
                          />
                        </div>

                        {/* Preferred Contact Method */}
                        <div className="space-y-2">
                          <Label className="text-sm font-light text-white/70">
                            Preferred Contact Method
                          </Label>
                          <Select value={formData.preferredContact} onValueChange={(value) => setFormData({...formData, preferredContact: value})}>
                            <SelectTrigger className="glass-secondary border-line-secondary bg-secondary/10 font-light text-white">
                              <SelectValue/>
                            </SelectTrigger>
                            <SelectContent className="bg-background/95 backdrop-blur-md">
                              <SelectItem value="email" className="font-light">Email</SelectItem>
                              <SelectItem value="phone" className="font-light">Phone Call</SelectItem>
                              <SelectItem value="whatsapp" className="font-light">WhatsApp</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Submit Button */}
                        <Button
                          type="submit"
                          size="lg"
                          disabled={isSubmitting}
                          className="w-full glass-accent border-line-accent bg-accent/20 hover:bg-accent/30 text-accent border font-light rounded-full py-6"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-accent/30 border-t-accent rounded-full animate-spin mr-3" />
                              Processing...
                            </>
                          ) : formData.package === 'consultation' ? (
                            <>
                              <Calendar className="w-4 h-4 mr-3" />
                              Schedule Free Consultation
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-3" />
                              Send Project Details
                            </>
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Contact Information */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="space-y-8"
                >
                  {/* Direct Contact */}
                  <Card className="glass-secondary border-0 rounded-3xl">
                    <CardHeader>
                      <CardTitle className="text-lg font-light text-white">Direct Contact</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-primary" />
                        <Link href="mailto:dev@sen.studio" className="text-sm font-light text-white/80 hover:text-primary transition-colors">
                          dev@sen.studio
                        </Link>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-primary" />
                        <Link href="tel:+4915566179807" className="text-sm font-light text-white/80 hover:text-primary transition-colors">
                          +49 15566179807
                        </Link>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-sm font-light text-white/80">24h response time</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Response Timeline */}
                  <Card className="glass-primary border-0 rounded-3xl">
                    <CardHeader>
                      <CardTitle className="text-lg font-light text-white">What Happens Next?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {[
                        { step: "01", title: "Instant Confirmation", desc: "You will receive an email confirmation within minutes" },
                        { step: "02", title: "Project Review", desc: "We will review your requirements and prepare questions" },
                        { step: "03", title: "Discovery Call", desc: "30-minute call to discuss your vision in detail" },
                        { step: "04", title: "Custom Proposal", desc: "Detailed proposal with timeline and investment" }
                      ].map((item) => (
                        <div key={item.step} className="flex gap-4">
                          <div className="w-8 h-8 rounded-full glass-accent border border-accent/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-light text-accent">{item.step}</span>
                          </div>
                          <div>
                            <h4 className="text-sm font-light text-white mb-1">{item.title}</h4>
                            <p className="text-xs font-light text-white/60 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            ) : (
              /* Schedule Appointment */
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto"
              >
                <Card className="glass-primary border-0 rounded-3xl">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-2xl font-light text-white flex items-center gap-3">
                      <Calendar className="w-6 h-6 text-primary" />
                      Choose Your Time Slot
                    </CardTitle>
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentStep('contact')}
                      className="text-white/60 hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    
                    {/* Calendar */}
                    <div className="space-y-6">
                      {isLoadingSlots ? (
                        <div className="text-center py-8">
                          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
                          <p className="text-white/70">Loading available time slots...</p>
                        </div>
                      ) : Object.entries(slotsByDate).slice(0, 7).map(([date, slots]) => (
                        <div key={date} className="space-y-4">
                          <h3 className="text-lg font-light text-white border-b border-white/10 pb-2">
                            {formatDate(date)}
                          </h3>
                          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                            {slots.filter(slot => slot.available).map((slot) => (
                              <Button
                                key={slot.id}
                                variant={selectedSlot === slot.id ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedSlot(slot.id)}
                                className={`font-light text-xs ${
                                  selectedSlot === slot.id 
                                    ? 'glass-accent border-accent bg-accent/20 text-accent' 
                                    : 'glass-secondary border-white/20 text-white/80 hover:bg-white/10'
                                }`}
                              >
                                {slot.time}
                              </Button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Selected slot info */}
                    {selectedSlot && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-secondary rounded-2xl p-6"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-light text-white">Selected Appointment</h4>
                            <p className="text-sm text-white/60">
                              {(() => {
                                const slot = timeSlots.find(s => s.id === selectedSlot)
                                return slot ? `${formatDate(slot.date)} at ${slot.time}` : ''
                              })()}
                            </p>
                          </div>
                          <Clock className="w-6 h-6 text-accent" />
                        </div>
                        <p className="text-xs text-white/50 mb-6">
                          This is a 30-minute discovery call where we will discuss your project requirements, timeline, and how we can help bring your vision to life.
                        </p>
                        <Button
                          onClick={handleScheduleSubmit}
                          disabled={isSubmitting}
                          className="w-full glass-accent border-line-accent bg-accent/20 hover:bg-accent/30 text-accent border font-light rounded-full py-4"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-accent/30 border-t-accent rounded-full animate-spin mr-3" />
                              Scheduling...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4 mr-3" />
                              Confirm Appointment
                            </>
                          )}
                        </Button>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}