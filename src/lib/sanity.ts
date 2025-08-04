import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'tfdiq2zl',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

export interface SanityImage {
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  _type: 'image'
}

export interface Hero {
  _id: string
  title: string
  subtitle: string
  description: string
  philosophical_quote: string
  cta_primary: string
  cta_secondary: string
}

export interface Philosophy {
  _id: string
  title: string
  subtitle: string
  principles: Principle[]
  philosophy_cards: PhilosophyCard[]
  stats: Stat[]
}

export interface Principle {
  _key: string
  title: string
  description: string
  quote: string
  icon: string
}

export interface PhilosophyCard {
  _key: string
  title: string
  content: string
}

export interface Stat {
  _key: string
  value: string
  label: string
}

export interface Bundle {
  _id: string
  name: string
  tagline: string
  price: string
  duration: string
  hours: string
  target: string
  features: string[]
  result: string
  popular: boolean
  icon: string
  color: string
}

export interface Testimonial {
  _id: string
  name: string
  role: string
  company: string
  content: string
  avatar: SanityImage
  rating: number
}

// GROQ Queries
export const heroQuery = `*[_type == "hero"][0]`
export const philosophyQuery = `*[_type == "philosophy"][0]`
export const bundlesQuery = `*[_type == "bundle"] | order(price asc)`
export const testimonialsQuery = `*[_type == "testimonial"] | order(_createdAt desc)`