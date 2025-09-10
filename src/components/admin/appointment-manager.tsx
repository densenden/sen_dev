"use client"

import { useState, useEffect, useCallback } from 'react'
import { Calendar, dateFnsLocalizer, View } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar as CalendarIcon, Clock, Mail, Phone, Building, Edit2, Trash2, Eye, CheckCircle, XCircle } from "lucide-react"
import type { Database } from '@/lib/supabase'
import 'react-big-calendar/lib/css/react-big-calendar.css'

type Appointment = Database['public']['Tables']['appointments']['Row']

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: enUS }),
  getDay,
  locales,
})

interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  resource: Appointment
}

const statusColors = {
  scheduled: 'bg-blue-500',
  completed: 'bg-green-500',
  cancelled: 'bg-red-500'
}

const statusIcons = {
  scheduled: Clock,
  completed: CheckCircle,
  cancelled: XCircle
}

export default function AppointmentManager() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [view, setView] = useState<View>('month')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [editForm, setEditForm] = useState<Partial<Appointment>>({})

  // Fetch appointments on mount
  useEffect(() => {
    fetchAppointments()
  }, [])

  // Convert appointments to calendar events
  useEffect(() => {
    const calendarEvents: CalendarEvent[] = appointments.map(apt => {
      const startDate = new Date(`${apt.appointment_date}T${apt.appointment_time}`)
      const endDate = new Date(startDate.getTime() + 30 * 60000) // 30 minutes default duration
      
      return {
        id: apt.id,
        title: `${apt.name} - ${apt.package_name}`,
        start: startDate,
        end: endDate,
        resource: apt
      }
    })
    
    setEvents(calendarEvents)
  }, [appointments])

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/appointments')
      if (response.ok) {
        const data = await response.json()
        setAppointments(data)
      }
    } catch (error) {
      console.error('Failed to fetch appointments:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateAppointment = async (id: string, updates: Partial<Appointment>) => {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })

      if (response.ok) {
        fetchAppointments()
        setIsEditOpen(false)
        setSelectedAppointment(null)
      }
    } catch (error) {
      console.error('Failed to update appointment:', error)
    }
  }

  const deleteAppointment = async (id: string) => {
    if (!confirm('Are you sure you want to delete this appointment?')) return
    
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchAppointments()
        setIsDetailOpen(false)
        setSelectedAppointment(null)
      }
    } catch (error) {
      console.error('Failed to delete appointment:', error)
    }
  }

  const handleSelectEvent = useCallback((event: CalendarEvent) => {
    setSelectedAppointment(event.resource)
    setIsDetailOpen(true)
  }, [])

  const handleSelectSlot = useCallback(({ start }: { start: Date }) => {
    // Could open a new appointment dialog here
    console.log('Selected slot:', start)
  }, [])

  const openEditDialog = (appointment: Appointment) => {
    setEditForm({
      name: appointment.name,
      email: appointment.email,
      mobile: appointment.mobile,
      company: appointment.company,
      package_name: appointment.package_name,
      message: appointment.message,
      preferred_contact: appointment.preferred_contact,
      appointment_date: appointment.appointment_date,
      appointment_time: appointment.appointment_time,
      status: appointment.status
    })
    setSelectedAppointment(appointment)
    setIsEditOpen(true)
    setIsDetailOpen(false)
  }

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedAppointment) {
      updateAppointment(selectedAppointment.id, editForm)
    }
  }

  const eventStyleGetter = (event: CalendarEvent) => {
    const status = event.resource.status
    const backgroundColor = {
      scheduled: '#3B82F6',
      completed: '#10B981',
      cancelled: '#EF4444'
    }[status] || '#3B82F6'

    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.9,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    }
  }

  const formatDateTime = (date: string, time: string) => {
    return format(new Date(`${date}T${time}`), 'PPpp')
  }

  if (loading) {
    return <div className="text-center py-8">Loading appointments...</div>
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointments.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">
                {appointments.filter(a => a.status === 'scheduled').length}
              </div>
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">
                {appointments.filter(a => a.status === 'completed').length}
              </div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Cancelled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">
                {appointments.filter(a => a.status === 'cancelled').length}
              </div>
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendar View */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Appointment Calendar</CardTitle>
              <CardDescription>Click on appointments to view details</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant={view === 'month' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setView('month')}
              >
                Month
              </Button>
              <Button
                variant={view === 'week' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setView('week')}
              >
                Week
              </Button>
              <Button
                variant={view === 'day' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setView('day')}
              >
                Day
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div style={{ height: 600 }}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '100%' }}
              onSelectEvent={handleSelectEvent}
              onSelectSlot={handleSelectSlot}
              selectable
              view={view}
              onView={setView}
              date={selectedDate}
              onNavigate={setSelectedDate}
              eventPropGetter={eventStyleGetter}
            />
          </div>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>
              {selectedAppointment && formatDateTime(selectedAppointment.appointment_date, selectedAppointment.appointment_time)}
            </DialogDescription>
          </DialogHeader>
          
          {selectedAppointment && (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-4 flex-1">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-muted-foreground">Name</Label>
                      <div className="font-semibold">{selectedAppointment.name}</div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-muted-foreground">Status</Label>
                      <Badge variant="outline" className={`${statusColors[selectedAppointment.status]} text-white border-0`}>
                        {selectedAppointment.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-muted-foreground">Email</Label>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedAppointment.email}</span>
                      </div>
                    </div>
                    
                    {selectedAppointment.mobile && (
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Mobile</Label>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span>{selectedAppointment.mobile}</span>
                        </div>
                      </div>
                    )}
                    
                    {selectedAppointment.company && (
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Company</Label>
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-muted-foreground" />
                          <span>{selectedAppointment.company}</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <Label className="text-muted-foreground">Package</Label>
                      <Badge variant="secondary">{selectedAppointment.package_name}</Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Message</Label>
                    <div className="bg-muted p-4 rounded-lg">
                      {selectedAppointment.message}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => openEditDialog(selectedAppointment)}>
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => deleteAppointment(selectedAppointment.id)}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Appointment</DialogTitle>
            <DialogDescription>Update appointment details</DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={editForm.name || ''}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editForm.email || ''}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-mobile">Mobile</Label>
                <Input
                  id="edit-mobile"
                  value={editForm.mobile || ''}
                  onChange={(e) => setEditForm({ ...editForm, mobile: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-company">Company</Label>
                <Input
                  id="edit-company"
                  value={editForm.company || ''}
                  onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-date">Date</Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={editForm.appointment_date || ''}
                  onChange={(e) => setEditForm({ ...editForm, appointment_date: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-time">Time</Label>
                <Input
                  id="edit-time"
                  type="time"
                  value={editForm.appointment_time || ''}
                  onChange={(e) => setEditForm({ ...editForm, appointment_time: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-package">Package</Label>
                <Input
                  id="edit-package"
                  value={editForm.package_name || ''}
                  onChange={(e) => setEditForm({ ...editForm, package_name: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={editForm.status}
                  onValueChange={(value) => setEditForm({ ...editForm, status: value as Appointment['status'] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-message">Message</Label>
              <Textarea
                id="edit-message"
                value={editForm.message || ''}
                onChange={(e) => setEditForm({ ...editForm, message: e.target.value })}
                rows={4}
                required
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}