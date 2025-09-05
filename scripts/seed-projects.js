import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials. Please check your .env.local file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// All projects data
const projects = [
  {
    id: "1",
    title: "Senflix",
    slug: "senflix",
    summary: "Community-driven streaming platform with gamified TV interface",
    description: "A Netflix-inspired streaming platform where communities share recommendations through a gamified interface optimized for tvOS and Apple TV experiences.",
    tech_stack: ["Next.js", "TypeScript", "tvOS", "React Native", "Supabase", "Tailwind CSS"],
    screenshots: ["/projects/senflix.jpg"],
    video_demo: null,
    tags: ["Streaming", "Social", "tvOS", "Web App"],
    client_name: "Entertainment Tech",
    outcome: "Created engaging community-driven content discovery with 21+ user profiles and seamless tvOS integration",
    link_live: "https://flix.sen.studio",
    challenge: "Traditional streaming platforms like Netflix and Prime Video lack meaningful social interaction. Users consume content in isolation, missing the shared experience of discovering and discussing shows with friends and family. The rigid, algorithm-driven recommendation systems don't account for social dynamics or community preferences.",
    solution: "Built Senflix as a community-first streaming platform with a gamified interface optimized for tvOS and Apple TV. The platform features personalized user profiles with unique avatars, social recommendation sharing, and community-driven content discovery. Users can see what friends are watching, share recommendations in real-time, and participate in gamified viewing challenges.",
    results: [
      "21+ customizable user profiles with cosmic-themed avatars like 'Elias Mercury' and 'Jules Noir'",
      "Native tvOS integration providing seamless Apple TV living room experiences",
      "Interactive profile selection interface with hover effects and smooth animations", 
      "Community recommendation system encouraging social content discovery",
      "Gamified viewing experience with social sharing and group challenges",
      "WhatsApp integration for connecting user profiles with phone numbers"
    ]
  },
  {
    id: "2", 
    title: "Synapsee",
    slug: "synapsee",
    summary: "AI-powered relationship insights for couples",
    description: "Privacy-focused AI app that analyzes interaction patterns to provide personalized relationship insights and communication improvements for couples.",
    tech_stack: ["React Native", "Apple Intelligence", "On-Device AI", "Swift", "Core ML", "Privacy APIs"],
    screenshots: ["/projects/synapsee.jpg"],
    video_demo: null,
    tags: ["AI", "Relationships", "Privacy", "Mobile App"],
    client_name: "Relationship Tech",
    outcome: "Launching beta in late 2025 with on-device AI processing that respects user privacy completely",
    link_live: "https://synapsee.sen.studio",
    challenge: "Couples need objective insights into their communication patterns without compromising privacy or sharing intimate data.",
    solution: "Developed on-device AI processing that analyzes interaction metadata locally, providing relationship insights without reading message content.",
    results: [
      "100% privacy-focused with on-device processing",
      "Personalized relationship insights without content access",
      "Integration with Apple Intelligence ecosystem",
      "Beta launch scheduled for late 2025"
    ]
  },
  {
    id: "3",
    title: "Kria Training",
    slug: "kria-training", 
    summary: "Mindful fitness community platform with smart connections",
    description: "Community-driven fitness platform offering diverse training programs from swimming to HIIT, with smart member connections and flexible scheduling.",
    tech_stack: ["Next.js", "Supabase", "Stripe", "Calendar APIs", "Community Features", "React"],
    screenshots: ["/projects/kria.png"],
    video_demo: null,
    tags: ["Fitness", "Community", "Web App", "Wellness"],
    client_name: "Fitness Community",
    outcome: "Built thriving community with 500+ active members, 50+ weekly courses, and 98% satisfaction rate",
    link_live: "https://community.kria-training.de",
    challenge: "Traditional fitness platforms lack community connection and mindful approach to wellness, leading to poor retention.",
    solution: "Created a community-first platform emphasizing mindful training with smart member connections and diverse program offerings.",
    results: [
      "500+ active community members",
      "50+ weekly courses across multiple disciplines",
      "98% user satisfaction rate",
      "Smart member connection system"
    ]
  },
  {
    id: "4",
    title: "Meme Machine",
    slug: "meme-machine",
    summary: "Innovative WhatsApp meme generation chatbot",
    description: "Revolutionary WhatsApp-based AI meme generator that creates instant memes from user text without any app downloads - just send a message.",
    tech_stack: ["WhatsApp Business API", "OpenAI", "Node.js", "AI Image Generation", "Chatbot APIs"],
    screenshots: ["/projects/mememachine.png"],
    video_demo: null,
    tags: ["AI", "Social", "Chatbot", "WhatsApp"],
    client_name: "Social Media Innovation",
    outcome: "Revolutionized meme creation with instant WhatsApp integration, eliminating app barriers completely",
    link_live: "https://meme-machine.app",
    challenge: "Meme creation requires multiple apps and complex workflows, creating friction for viral content sharing.",
    solution: "Built WhatsApp-native AI meme generator that creates instant memes from text messages without any app downloads.",
    results: [
      "Zero-friction meme creation via WhatsApp",
      "AI-powered template and caption matching",
      "Instant sharing capabilities",
      "Eliminated app download barriers"
    ]
  },
  {
    id: "5",
    title: "BeautyMachine",
    slug: "beautymachine",
    summary: "Premium mobile makeup services for executive women",
    description: "High-end mobile makeup service targeting professional women in Frankfurt, offering on-site beauty services with 100% punctuality guarantee starting at €89.",
    tech_stack: ["Next.js", "Supabase", "Stripe", "Booking System", "Tailwind CSS", "Mobile Optimization"],
    screenshots: ["/projects/beautymachine.jpeg"],
    video_demo: null,
    tags: ["Beauty", "Business", "Mobile Service", "Luxury"],
    client_name: "Beauty Industry",
    outcome: "Established premium mobile beauty service serving executive women across Frankfurt's business districts",
    link_live: "https://beautymachine.sen.studio",
    challenge: "Executive women need professional makeup services but lack time to visit salons during busy schedules.",
    solution: "Created premium mobile makeup service delivering high-end beauty services directly to offices, hotels, and homes.",
    results: [
      "100% punctuality guarantee",
      "Premium service starting at €89",
      "Serves Frankfurt's business districts",
      "Tailored for executive women's schedules"
    ]
  },
  {
    id: "6",
    title: "Fork:it",
    slug: "forkit",
    summary: "Digital independence platform for entrepreneurs",
    description: "Platform empowering entrepreneurs to achieve digital independence from large tech platforms through decentralized tools and self-hosted solutions.",
    tech_stack: ["Next.js", "Self-Hosting", "Docker", "Privacy Tools", "Decentralized Tech", "Open Source"],
    screenshots: ["/projects/forkit.jpg"], 
    video_demo: null,
    tags: ["Digital Independence", "Privacy", "Self-Hosting", "Web App"],
    client_name: "Independent Entrepreneurs",
    outcome: "Empowering entrepreneurs with tools for digital sovereignty and platform independence",
    link_live: "https://forkit.sen.studio",
    challenge: "Entrepreneurs are dependent on large tech platforms that can change rules, pricing, or access without warning.",
    solution: "Built comprehensive platform providing tools and guidance for digital independence through self-hosting and decentralized solutions.",
    results: [
      "Complete digital sovereignty toolkit",
      "Self-hosting solution guidance",
      "Platform independence strategies",
      "Open source tool integration"
    ]
  },
  {
    id: "7",
    title: "SenCommerce",
    slug: "sencommerce",
    summary: "E-commerce platform for digital and physical products with focus on art, fashion, and personalized meditations",
    description: "Modern e-commerce solution built on Medusa v2 that seamlessly handles both digital downloads and physical products, with specialized features for creative entrepreneurs selling art, fashion, and wellness content.",
    tech_stack: ["Medusa v2", "Next.js", "React", "Tailwind CSS", "Supabase", "Stripe Checkout", "Printful API"],
    screenshots: ["/projects/sencommerce.jpg"],
    video_demo: null,
    tags: ["E-Commerce", "Marketplace", "Digital Products", "Web App"],
    client_name: "Creative Commerce",
    outcome: "Launched multi-vendor marketplace supporting artists and creators with seamless digital/physical product fulfillment",
    link_live: "https://shop.sen.studio",
    link_github: "https://github.com/densenden/sencommerce-storefront",
    challenge: "Creative entrepreneurs struggle with platforms that either focus solely on digital or physical products, lacking integrated solutions for mixed inventory with personalized experiences.",
    solution: "Developed unified commerce platform on Medusa v2 supporting both digital downloads and print-on-demand products with integrated Printful API for automated fulfillment.",
    results: [
      "Seamless digital and physical product management",
      "Automated print-on-demand fulfillment via Printful",
      "Integrated Stripe Checkout for secure payments",
      "Personalized meditation content delivery system",
      "Support for art prints and fashion items"
    ]
  },
  {
    id: "8",
    title: "SenScript",
    slug: "senscript",
    summary: "Cheatcards that give you answers the moment your teacher asks - visual learning for instant recall",
    description: "Revolutionary cheatcard system that transforms entire subjects into memorable visual cards. Get answers instantly when your teacher asks, ace your exams with photographic recall, and turn complex topics into simple mental snapshots.",
    tech_stack: ["Next.js", "React", "Tailwind CSS", "MDX Content-System", "Supabase"],
    screenshots: ["/projects/senscript.png"],
    video_demo: null,
    tags: ["Education", "Learning", "Knowledge Management", "Web App"],
    client_name: "Education Technology",
    outcome: "Instant answers when your teacher asks - cheatcards that transform complex topics into memorable visual references",
    link_live: "https://getscript.sen.studio",
    link_github: "https://github.com/densenden/sen-script",
    challenge: "Students struggle to recall information in the moment when teachers ask questions or during exams, leading to anxiety and poor performance despite knowing the material.",
    solution: "Created visual cheatcard system that gives you answers in the moment your teacher asks - condensing entire topics into memorable, scannable cards you can mentally recall instantly.",
    results: [
      "Instant recall during classroom questions and exams",
      "Visual cheatcards that stick in memory",
      "MDX-powered content for interactive learning",
      "Mobile-optimized for quick review before class",
      "Categorized by subject for rapid access"
    ]
  },
  {
    id: "9",
    title: "NorthPatrol",
    slug: "northpatrol",
    summary: "Security patrol management app with QR code checkpoints for professional guard services",
    description: "Digital transformation of security patrol operations through QR-based checkpoint system, real-time reporting, and comprehensive audit trails for security companies.",
    tech_stack: ["React", "Supabase", "Clerk", "Resend", "QR Code Generator", "Tailwind CSS"],
    screenshots: ["/projects/nortpatrol.png"],
    video_demo: null,
    tags: ["Security", "Business", "Mobile App", "SaaS"],
    client_name: "Security Services",
    outcome: "Digitized patrol operations for 50+ security guards, reducing reporting time by 75% and improving compliance",
    link_live: "https://northpatrol.sen.studio",
    link_github: "https://github.com/densenden/northpatrol",
    challenge: "Security companies rely on paper-based patrol logs that are inefficient, prone to fraud, and lack real-time visibility into guard activities.",
    solution: "Created QR-based checkpoint system with mobile app for guards to scan locations, log incidents, and provide real-time updates to management dashboard.",
    results: [
      "75% reduction in patrol reporting time",
      "Real-time location verification via QR codes",
      "Comprehensive audit trail for compliance",
      "Instant incident reporting with photos",
      "Management dashboard with live patrol tracking"
    ]
  },
  {
    id: "10",
    title: "SenRecorder",
    slug: "senrecorder",
    summary: "Audio recording platform with emotion tagging for AI training data and voice UX research",
    description: "Specialized audio collection tool that captures voice recordings with emotional context metadata, designed for building emotion-aware AI models and improving voice user experiences.",
    tech_stack: ["React", "Tailwind CSS", "Clerk", "Supabase Buckets", "Resend", "Web Audio API"],
    screenshots: ["/projects/senrecorder.png"],
    video_demo: null,
    tags: ["AI", "Audio", "Research", "Web App"],
    client_name: "Voice AI Research",
    outcome: "Collected 10,000+ emotion-tagged audio samples for training emotion-aware voice AI models",
    link_live: "https://recorder.sen.studio",
    link_github: "https://github.com/densenden/emo-recorder",
    challenge: "AI voice models lack emotional intelligence due to training data that doesn't capture emotional context alongside audio recordings.",
    solution: "Developed web-based recording platform with integrated emotion tagging, allowing users to label recordings with emotional states during capture.",
    results: [
      "10,000+ emotion-tagged audio samples collected",
      "7 emotion categories with confidence scoring",
      "High-quality audio capture via Web Audio API",
      "Automated transcription and metadata extraction",
      "GDPR-compliant data handling and storage"
    ]
  },
  {
    id: "11",
    title: "Paradieshof",
    slug: "paradieshof",
    summary: "Interactive architectural visualization platform for Frankfurt real estate development",
    description: "Immersive digital experience showcasing the Paradieshof development in Frankfurt Alt-Sachsenhausen, featuring interactive floor plans, virtual tours, and neighborhood integration visualizations.",
    tech_stack: ["React", "Node.js", "Supabase", "Clerk", "Tailwind CSS", "Three.js", "Mapbox"],
    screenshots: ["/projects/paradieshof.png"],
    video_demo: "/projects/paradieshof.mp4",
    tags: ["Real Estate", "Architecture", "3D Visualization", "Web App"],
    client_name: "Real Estate Development",
    outcome: "Generated 200+ qualified leads through immersive digital property showcase with 85% engagement rate",
    link_live: "https://paradieshof.sen.studio",
    link_github: "https://github.com/densenden/paradieshof",
    challenge: "Traditional real estate presentations fail to convey the vision and lifestyle of new developments, especially for properties still under construction.",
    solution: "Built interactive platform with 3D visualizations, neighborhood integration maps, and annotation layers that bring architectural plans to life.",
    results: [
      "200+ qualified leads generated",
      "85% user engagement rate",
      "Interactive 3D floor plan navigation",
      "Neighborhood amenity mapping integration",
      "Virtual tour functionality with annotations"
    ]
  }
]

async function seedProjects() {
  console.log('Starting to seed projects...')
  
  for (const project of projects) {
    try {
      // First, check if the project already exists
      const { data: existingProject, error: checkError } = await supabase
        .from('projects')
        .select('id')
        .eq('slug', project.slug)
        .single()

      if (existingProject) {
        console.log(`Project "${project.title}" already exists, updating...`)
        
        // Update existing project
        const { error: updateError } = await supabase
          .from('projects')
          .update({
            title: project.title,
            summary: project.summary,
            description: project.description,
            tech_stack: project.tech_stack,
            screenshots: project.screenshots,
            video_demo: project.video_demo,
            tags: project.tags,
            client_name: project.client_name,
            outcome: project.outcome,
            link_live: project.link_live,
            link_github: project.link_github || null,
            updated_at: new Date().toISOString()
          })
          .eq('slug', project.slug)

        if (updateError) {
          console.error(`Error updating project "${project.title}":`, updateError)
        } else {
          console.log(`✅ Updated project: ${project.title}`)
        }
      } else {
        // Insert new project
        const { error: insertError } = await supabase
          .from('projects')
          .insert({
            title: project.title,
            slug: project.slug,
            summary: project.summary,
            description: project.description,
            tech_stack: project.tech_stack,
            screenshots: project.screenshots,
            video_demo: project.video_demo,
            tags: project.tags,
            client_name: project.client_name,
            outcome: project.outcome,
            link_live: project.link_live,
            link_github: project.link_github || null,
            created_at: project.created_at || new Date().toISOString(),
            updated_at: project.updated_at || new Date().toISOString()
          })

        if (insertError) {
          console.error(`Error inserting project "${project.title}":`, insertError)
        } else {
          console.log(`✅ Inserted new project: ${project.title}`)
        }
      }
    } catch (error) {
      console.error(`Error processing project "${project.title}":`, error)
    }
  }

  console.log('\n🎉 Seeding completed!')
}

// Run the seeding function
seedProjects().catch(console.error)