"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  X,
  CheckCircle,
  ArrowLeft,
  AlertTriangle
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"

export default function CancelAppointmentPage() {
  const params = useParams()
  const appointmentId = params.id as string
  
  const [appointment, setAppointment] = useState(null)
  const [reason, setReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
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
  
  const heroImage = "/contact.jpg"

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    }).format(date)
  }

  const handleCancel = async () => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch(`/api/appointment/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appointmentId,
          reason
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to cancel appointment')
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error('Error cancelling appointment:', error)
      setError("Failed to cancel appointment. Please try again.")
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
            Appointment Cancelled
          </h1>
          <p className="text-lg font-light text-white/80 mb-8">
            Your consultation has been successfully cancelled. We understand that plans change and hope to help you in the future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="glass-accent border-line-accent bg-accent/20 text-accent hover:bg-accent/30 font-light rounded-full px-8 border"
              asChild
            >
              <Link href="/">Return Home</Link>
            </Button>
            <Button 
              className="glass-secondary border-white/20 text-white hover:bg-white/10 font-light rounded-full px-8 border"
              asChild
            >
              <Link href="/contact">Schedule New</Link>
            </Button>
          </div>
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
            alt="Cancel appointment background"
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
              <Badge className="glass-accent border-line-accent bg-red-500/20 text-red-400 px-6 py-3 text-xs tracking-wider font-light mb-8 border border-red-500/30">
                <X className="w-3 h-3 mr-2" />
                Cancel Appointment
              </Badge>
              
              <h1 className="text-6xl md:text-7xl font-light leading-none tracking-wide mb-8 text-white">
                <span className="text-white">Cancel </span>
                <span className="text-red-400">Appointment</span>
              </h1>

              <p className="text-xl font-light text-white/80 leading-relaxed max-w-3xl mx-auto">
                We're sorry to see you go. If you need to cancel your appointment, please confirm below.
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
                <h3 className="text-lg font-light text-white mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  Appointment to Cancel
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm bg-red-500/10 rounded-2xl p-6 border border-red-500/20">
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
                    <span className="text-white/60">Client:</span>
                    <span className="text-white ml-2">{appointment.name}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Cancellation Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="glass-primary border-0 rounded-3xl">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-2xl font-light text-white flex items-center gap-3">
                    <X className="w-6 h-6 text-red-400" />
                    Confirm Cancellation
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
                  
                  {/* Reason for cancellation */}
                  <div className="space-y-2">
                    <Label htmlFor="reason" className="text-sm font-light text-white/70">
                      Reason for Cancellation (Optional)
                    </Label>
                    <Textarea
                      id="reason"
                      rows={4}
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="glass-secondary border-line-secondary bg-secondary/10 font-light resize-none text-white placeholder:text-white/50"
                      placeholder="Help us improve by letting us know why you're cancelling..."
                    />
                    <p className="text-xs text-white/50">
                      Your feedback helps us serve you better in the future.
                    </p>
                  </div>

                  {/* Warning message */}
                  <div className="bg-yellow-500/10 rounded-2xl p-6 border border-yellow-500/20">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-yellow-400 mb-2">
                          Please Note
                        </h4>
                        <p className="text-xs text-white/70 leading-relaxed">
                          This action cannot be undone. If you cancel this appointment, you will need to schedule a new one through our contact form. We recommend rescheduling instead if you need to change the time.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={handleCancel}
                      disabled={isSubmitting}
                      className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 font-light rounded-full py-4"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin mr-3" />
                          Cancelling...
                        </>
                      ) : (
                        <>
                          <X className="w-4 h-4 mr-3" />
                          Confirm Cancellation
                        </>
                      )}
                    </Button>

                    <Button
                      className="flex-1 glass-accent border-line-accent bg-accent/20 hover:bg-accent/30 text-accent border font-light rounded-full py-4"
                      asChild
                    >
                      <Link href={`/appointment/reschedule/${appointmentId}`}>
                        Reschedule Instead
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}