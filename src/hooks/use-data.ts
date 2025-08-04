"use client"

import { useState, useEffect } from 'react'
import {
  getHero,
  getPhilosophy,
  getBundles,
  getProjects,
  getTestimonials,
  getAllData
} from '@/lib/data'
import type { Hero, Philosophy, Bundle, Testimonial } from '@/lib/sanity'
import type { Database } from '@/lib/supabase'

type Project = Database['public']['Tables']['projects']['Row']

export function useHero() {
  const [hero, setHero] = useState<Hero | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchHero() {
      try {
        setLoading(true)
        const data = await getHero()
        setHero(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch hero')
      } finally {
        setLoading(false)
      }
    }

    fetchHero()
  }, [])

  return { hero, loading, error }
}

export function usePhilosophy() {
  const [philosophy, setPhilosophy] = useState<Philosophy | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPhilosophy() {
      try {
        setLoading(true)
        const data = await getPhilosophy()
        setPhilosophy(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch philosophy')
      } finally {
        setLoading(false)
      }
    }

    fetchPhilosophy()
  }, [])

  return { philosophy, loading, error }
}

export function useBundles() {
  const [bundles, setBundles] = useState<Bundle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBundles() {
      try {
        setLoading(true)
        const data = await getBundles()
        setBundles(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch bundles')
      } finally {
        setLoading(false)
      }
    }

    fetchBundles()
  }, [])

  return { bundles, loading, error }
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true)
        const data = await getProjects()
        setProjects(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return { projects, loading, error }
}

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        setLoading(true)
        const data = await getTestimonials()
        setTestimonials(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch testimonials')
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  return { testimonials, loading, error }
}

export function useAllData() {
  const [data, setData] = useState<{
    hero: Hero | null
    philosophy: Philosophy | null
    bundles: Bundle[]
    projects: Project[]
    testimonials: Testimonial[]
  }>({
    hero: null,
    philosophy: null,
    bundles: [],
    projects: [],
    testimonials: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAllData() {
      try {
        setLoading(true)
        const allData = await getAllData()
        setData(allData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }

    fetchAllData()
  }, [])

  return { data, loading, error }
}