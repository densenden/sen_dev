"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Mail, Phone, Building, MessageSquare, Eye, Edit2, Archive, Filter } from "lucide-react"
import type { Database } from '@/lib/supabase'

type ContactSubmission = Database['public']['Tables']['contact_submissions']['Row']

const statusColors = {
  new: 'bg-blue-500',
  contacted: 'bg-yellow-500', 
  qualified: 'bg-orange-500',
  converted: 'bg-green-500',
  archived: 'bg-gray-500'
}

const sourceIcons = {
  contact: Mail,
  kmu: Building,
  design: Eye
}

export default function UserManager() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [filteredSubmissions, setFilteredSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [sourceFilter, setSourceFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Load submissions on mount
  useEffect(() => {
    fetchSubmissions()
  }, [])

  // Apply filters when they change
  useEffect(() => {
    let filtered = submissions

    if (statusFilter !== 'all') {
      filtered = filtered.filter(sub => sub.status === statusFilter)
    }

    if (sourceFilter !== 'all') {
      filtered = filtered.filter(sub => sub.source_page === sourceFilter)
    }

    if (searchQuery) {
      filtered = filtered.filter(sub => 
        sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (sub.company && sub.company.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    setFilteredSubmissions(filtered)
  }, [submissions, statusFilter, sourceFilter, searchQuery])

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/contact-submissions')
      if (response.ok) {
        const data = await response.json()
        setSubmissions(data)
        setFilteredSubmissions(data)
      }
    } catch (error) {
      console.error('Failed to fetch submissions:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateSubmissionStatus = async (id: string, status: string, notes?: string) => {
    try {
      const response = await fetch(`/api/contact-submissions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, ...(notes && { notes }) })
      })

      if (response.ok) {
        fetchSubmissions() // Refresh list
        if (selectedSubmission?.id === id) {
          setSelectedSubmission({ ...selectedSubmission, status: status as any, notes })
        }
      }
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  const openDetail = (submission: ContactSubmission) => {
    setSelectedSubmission(submission)
    setIsDetailOpen(true)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return <div className="text-center py-8">Loading contact submissions...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-muted-foreground">Manage contact submissions and leads</p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <Input
            placeholder="Search by name, email, or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64"
          />
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
              <SelectItem value="converted">Converted</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sourceFilter} onValueChange={setSourceFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sources</SelectItem>
              <SelectItem value="contact">Contact</SelectItem>
              <SelectItem value="kmu">KMU</SelectItem>
              <SelectItem value="design">Design</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{submissions.length}</div>
          </CardContent>
        </Card>
        
        {Object.keys(statusColors).map((status) => (
          <Card key={status}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm capitalize">{status}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold">
                  {submissions.filter(s => s.status === status).length}
                </div>
                <div className={`w-3 h-3 rounded-full ${statusColors[status as keyof typeof statusColors]}`}></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Submissions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Submissions</CardTitle>
          <CardDescription>Recent inquiries and leads</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Package</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubmissions.map((submission) => {
                const SourceIcon = sourceIcons[submission.source_page as keyof typeof sourceIcons] || Mail
                
                return (
                  <TableRow key={submission.id}>
                    <TableCell>
                      <div>
                        <div className="font-semibold">{submission.name}</div>
                        <div className="text-sm text-muted-foreground">{submission.email}</div>
                        {submission.mobile && (
                          <div className="text-sm text-muted-foreground">{submission.mobile}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {submission.company || '-'}
                    </TableCell>
                    <TableCell>
                      {submission.package_name ? (
                        <Badge variant="outline">{submission.package_name}</Badge>
                      ) : '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <SourceIcon className="w-4 h-4" />
                        <span className="capitalize">{submission.source_page}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${statusColors[submission.status as keyof typeof statusColors]}`}></div>
                        <span className="capitalize">{submission.status}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {formatDate(submission.created_at)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => openDetail(submission)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Mail className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          
          {filteredSubmissions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No submissions found matching your filters.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Contact Details</DialogTitle>
            <DialogDescription>
              Submission from {selectedSubmission?.source_page} page
            </DialogDescription>
          </DialogHeader>
          
          {selectedSubmission && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <div className="font-semibold">{selectedSubmission.name}</div>
                </div>
                
                <div className="space-y-2">
                  <Label>Email</Label>
                  <div className="font-semibold">{selectedSubmission.email}</div>
                </div>
                
                {selectedSubmission.mobile && (
                  <div className="space-y-2">
                    <Label>Mobile</Label>
                    <div className="font-semibold">{selectedSubmission.mobile}</div>
                  </div>
                )}
                
                {selectedSubmission.company && (
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <div className="font-semibold">{selectedSubmission.company}</div>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label>Message</Label>
                <div className="bg-muted p-4 rounded-lg">
                  {selectedSubmission.message}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select 
                    value={selectedSubmission.status} 
                    onValueChange={(value) => updateSubmissionStatus(selectedSubmission.id, value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="qualified">Qualified</SelectItem>
                      <SelectItem value="converted">Converted</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Preferred Contact</Label>
                  <div className="font-semibold capitalize">{selectedSubmission.preferred_contact}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea 
                  placeholder="Add internal notes..."
                  defaultValue={selectedSubmission.notes || ''}
                  rows={3}
                />
              </div>
              
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Created: {formatDate(selectedSubmission.created_at)}</span>
                <span>Updated: {formatDate(selectedSubmission.updated_at)}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}