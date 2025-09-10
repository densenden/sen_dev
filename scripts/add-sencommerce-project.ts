import { createClient } from '@supabase/supabase-js'
import type { Database } from '../src/lib/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function addSencommerceProject() {
  try {
    const sencommerceProject: Database['public']['Tables']['projects']['Insert'] = {
      title: 'Sencommerce',
      slug: 'sencommerce',
      summary: 'E-commerce platform with modern design and seamless user experience',
      description: `# Sencommerce - Modern E-commerce Platform

A comprehensive e-commerce solution built with modern web technologies, featuring a clean interface, seamless checkout process, and robust product management system.

## Key Features
- Modern, responsive design
- Product catalog with search and filtering
- Secure payment processing
- User account management
- Order tracking and history
- Admin dashboard for inventory management

## Technical Implementation
Built with Next.js for optimal performance and SEO, integrated with Stripe for payments, and Supabase for backend services.`,
      tech_stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Stripe', 'Vercel'],
      screenshots: [
        'https://via.placeholder.com/800x600/6366f1/white?text=Sencommerce+Homepage',
        'https://via.placeholder.com/800x600/8b5cf6/white?text=Product+Catalog',
        'https://via.placeholder.com/800x600/06b6d4/white?text=Checkout+Flow'
      ],
      tags: ['e-commerce', 'mvp', 'web-app', 'payments'],
      client_name: 'Internal Project',
      outcome: 'Successfully launched e-commerce platform with integrated payment processing',
      link_live: 'https://sencommerce.vercel.app',
      github_url: 'https://github.com/densenden/sencommerce',
      category: 'E-commerce',
      development_time_weeks: 6,
      is_featured: true
    }

    const { data, error } = await supabase
      .from('projects')
      .insert([sencommerceProject])
      .select()
      .single()

    if (error) {
      console.error('Error inserting Sencommerce project:', error)
      process.exit(1)
    }

    console.log('✅ Successfully added Sencommerce project:', data)
  } catch (error) {
    console.error('❌ Failed to add Sencommerce project:', error)
    process.exit(1)
  }
}

addSencommerceProject()