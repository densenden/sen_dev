import { supabase } from './supabase'
import { client } from './sanity'
import type { Database } from './supabase'
import type { Hero, Philosophy, Bundle, Testimonial } from './sanity'
import {
  heroQuery,
  philosophyQuery,
  bundlesQuery,
  testimonialsQuery
} from './sanity'

// Supabase Types
type Project = Database['public']['Tables']['projects']['Row']
type TestimonialDB = Database['public']['Tables']['testimonials']['Row']

// Supabase Data Fetching
export async function getProjects(): Promise<Project[]> {
  if (!supabase) {
    console.warn('Supabase not configured - using fallback data')
    return []
  }
  
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching projects:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export async function getProject(slug: string): Promise<Project | null> {
  if (!supabase) {
    console.warn('Supabase not configured - using fallback data')
    return null
  }
  
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      console.error('Error fetching project:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

export async function getTestimonialsDB(): Promise<TestimonialDB[]> {
  if (!supabase) {
    console.warn('Supabase not configured - using fallback data')
    return []
  }
  
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching testimonials:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}

// Sanity Data Fetching
export async function getHero(): Promise<Hero | null> {
  try {
    const hero = await client.fetch(heroQuery)
    return hero
  } catch (error) {
    console.error('Error fetching hero:', error)
    return null
  }
}

export async function getPhilosophy(): Promise<Philosophy | null> {
  try {
    const philosophy = await client.fetch(philosophyQuery)
    return philosophy
  } catch (error) {
    console.error('Error fetching philosophy:', error)
    return null
  }
}

export async function getBundles(): Promise<Bundle[]> {
  try {
    const bundles = await client.fetch(bundlesQuery)
    return bundles || []
  } catch (error) {
    console.error('Error fetching bundles:', error)
    return []
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const testimonials = await client.fetch(testimonialsQuery)
    return testimonials || []
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}

// Combined Data Functions
export async function getAllData() {
  const [hero, philosophy, bundles, projects, testimonials] = await Promise.all([
    getHero(),
    getPhilosophy(),
    getBundles(),
    getProjects(),
    getTestimonials()
  ])

  return {
    hero,
    philosophy,
    bundles,
    projects,
    testimonials
  }
}