import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Only create client if we have real credentials
export const supabase = supabaseUrl.includes('placeholder') ? null : createClient(supabaseUrl, supabaseAnonKey)

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          mobile: string | null
          company: string | null
          package_name: string | null
          message: string
          preferred_contact: string
          source_page: string
          status: 'new' | 'contacted' | 'qualified' | 'converted' | 'archived'
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          mobile?: string | null
          company?: string | null
          package_name?: string | null
          message: string
          preferred_contact?: string
          source_page: string
          status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'archived'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          mobile?: string | null
          company?: string | null
          package_name?: string | null
          message?: string
          preferred_contact?: string
          source_page?: string
          status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'archived'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          name: string
          email: string
          mobile: string | null
          company: string | null
          package_name: string
          message: string
          preferred_contact: string
          appointment_date: string
          appointment_time: string
          status: 'scheduled' | 'completed' | 'cancelled'
          reminder_sent: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          mobile?: string | null
          company?: string | null
          package_name: string
          message: string
          preferred_contact: string
          appointment_date: string
          appointment_time: string
          status?: 'scheduled' | 'completed' | 'cancelled'
          reminder_sent?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          mobile?: string | null
          company?: string | null
          package_name?: string
          message?: string
          preferred_contact?: string
          appointment_date?: string
          appointment_time?: string
          status?: 'scheduled' | 'completed' | 'cancelled'
          reminder_sent?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          slug: string
          summary: string
          description: string
          tech_stack: string[]
          screenshots: string[]
          video_demo: string | null
          tags: string[]
          client_name: string
          outcome: string
          link_live: string | null
          github_url: string | null
          github_readme: string | null
          development_time_weeks: number | null
          is_featured: boolean
          category: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          summary: string
          description: string
          tech_stack: string[]
          screenshots: string[]
          video_demo?: string | null
          tags: string[]
          client_name: string
          outcome: string
          link_live?: string | null
          github_url?: string | null
          github_readme?: string | null
          development_time_weeks?: number | null
          is_featured?: boolean
          category?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          summary?: string
          description?: string
          tech_stack?: string[]
          screenshots?: string[]
          video_demo?: string | null
          tags?: string[]
          client_name?: string
          outcome?: string
          link_live?: string | null
          github_url?: string | null
          github_readme?: string | null
          development_time_weeks?: number | null
          is_featured?: boolean
          category?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          name: string
          role: string
          company: string
          content: string
          avatar_url: string | null
          project_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          role: string
          company: string
          content: string
          avatar_url?: string | null
          project_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string
          company?: string
          content?: string
          avatar_url?: string | null
          project_id?: string | null
          created_at?: string
        }
      }
      translations: {
        Row: {
          id: string
          key: string
          language: string
          value: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          language: string
          value: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          language?: string
          value?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}