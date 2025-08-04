import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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