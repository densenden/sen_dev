"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Calendar,
  Clock,
  CheckCircle,
  ArrowLeft,
  User,
  RefreshCw
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"

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

export default function RescheduleAppointmentPage() {
  const params = useParams()
  const appointmentId = params.id as string
  
  const [appointment, setAppointment] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    company: "",
    message: "",
    consultationMethod: "zoom"
  })
  
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [timeSlots, setTimeSlots] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoadingSlots, setIsLoadingSlots] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  // Load appointment details
  useEffect(() => {
    const loadAppointment = async () => {
      try {
        const response = await fetch(`/api/appointment/${appointmentId}`)
        if (response.ok) {
          const data = await response.json()
          setAppointment(data.appointment)
          setFormData({
            name: data.appointment.name,
            email: data.appointment.email,
            mobile: data.appointment.mobile || "",
            company: data.appointment.company || "",
            message: data.appointment.message || "",
            consultationMethod: data.appointment.preferred_contact || "zoom"
          })
        } else {
          setError("Appointment not found")
        }
      } catch (error) {
        console.error('Failed to load appointment:', error)
        setError("Failed to load appointment details")
      } finally {
        setIsLoading(false)
      }
    }

    if (appointmentId) {
      loadAppointment()
    }
  }, [appointmentId])

  // Load time slots
  useEffect(() => {
    setIsLoadingSlots(true)
    generateTimeSlots().then(slots => {
      setTimeSlots(slots)
      setIsLoadingSlots(false)
    })
  }, [])
  
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

  const handleReschedule = async () => {
    if (!selectedSlot) return
    
    const slot = timeSlots.find(s => s.id === selectedSlot)
    if (!slot) return
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch(`/api/appointment/reschedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appointmentId,
          ...formData,
          appointment: {
            date: slot.date,
            time: slot.time,
            datetime: slot.datetime
          }
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to reschedule appointment')
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error('Error rescheduling appointment:', error)
      setError("Failed to reschedule appointment. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt="Loading background"
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
          <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg font-light text-white/80">Loading appointment details...</p>
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt="Error background"
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
          <h1 className="text-4xl font-light mb-6 text-white">Error</h1>
          <p className="text-lg font-light text-white/80 mb-8">{error}</p>
          <Button 
            className="glass-accent border-line-accent bg-accent/20 text-accent hover:bg-accent/30 font-light rounded-full px-8 border"
            asChild
          >
            <Link href="/contact">Back to Contact</Link>
          </Button>
        </motion.div>
      </div>
    )
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
            Appointment Rescheduled!
          </h1>
          <p className="text-lg font-light text-white/80 mb-8">
            Your consultation has been rescheduled to {formatDate(timeSlots.find(s => s.id === selectedSlot)?.date || '')} at {timeSlots.find(s => s.id === selectedSlot)?.time}. You will receive a new calendar invite shortly.
          </p>
          <Button 
            className="glass-accent border-line-accent bg-accent/20 text-accent hover:bg-accent/30 font-light rounded-full px-8 border"
            asChild
          >
            <Link href="/">Return Home</Link>
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
            alt="Reschedule appointment background"
            fill
            className="object-cover opacity-80 saturate-75"
            priority
          />
        </div>

        <div className="container mx-auto px-8 py-32 relative z-10">
          <div className="max-w-4xl mx-auto">
            
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="glass-primary rounded-3xl p-12 text-center mb-12"
            >
              <Badge className="glass-accent border-line-accent bg-accent/20 text-accent px-6 py-3 text-xs tracking-wider font-light mb-8 border">
                <RefreshCw className="w-3 h-3 mr-2" />
                Reschedule Appointment
              </Badge>
              
              <h1 className="text-6xl md:text-7xl font-light leading-none tracking-wide mb-8 text-white">
                <span className="text-white">Choose New </span>
                <span className="text-primary">Time</span>
              </h1>

              <p className="text-xl font-light text-white/80 leading-relaxed max-w-3xl mx-auto">
                Select a new time slot for your consultation. Your original appointment details will be preserved.
              </p>
            </motion.div>

            {/* Current Appointment Info */}
            {appointment && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="glass-secondary rounded-3xl p-8 mb-8"
              >
                <h3 className="text-lg font-light text-white mb-4">Current Appointment</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-white/60">Date:</span>
                    <span className="text-white ml-2">{formatDate(appointment.appointment_date)}</span>
                  </div>
                  <div>
                    <span className="text-white/60">Time:</span>
                    <span className="text-white ml-2">{appointment.appointment_time}</span>
                  </div>
                  <div>
                    <span className="text-white/60">Method:</span>
                    <span className="text-white ml-2 capitalize">{appointment.preferred_contact}</span>
                  </div>
                  <div>
                    <span className="text-white/60">Status:</span>
                    <span className="text-white ml-2 capitalize">{appointment.status}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Schedule New Time */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="glass-primary border-0 rounded-3xl">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-2xl font-light text-white flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-primary" />
                    Choose New Time Slot
                  </CardTitle>
                  <Button
                    variant="ghost"
                    className="text-white/60 hover:text-white"
                    asChild
                  >
                    <Link href="/contact">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Contact
                    </Link>
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
                          <h4 className="text-lg font-light text-white">New Appointment Time</h4>
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
                        This will replace your current appointment. You will receive updated calendar invitations.
                      </p>
                      <Button
                        onClick={handleReschedule}
                        disabled={isSubmitting}
                        className="w-full glass-accent border-line-accent bg-accent/20 hover:bg-accent/30 text-accent border font-light rounded-full py-4"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-accent/30 border-t-accent rounded-full animate-spin mr-3" />
                            Rescheduling...
                          </>
                        ) : (
                          <>
                            <RefreshCw className="w-4 h-4 mr-3" />
                            Confirm Reschedule
                          </>
                        )}
                      </Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}