export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "sencodev",
    "description": "Fast-track MVPs and startup infrastructures with full-stack Vibe Coding, integrated branding, and scalable tech setup – built by a designer-engineer for rapid growth.",
    "url": "https://sencodev.com",
    "logo": "https://sencodev.com/logo.png",
    "foundingDate": "2024",
    "founders": [{
      "@type": "Person",
      "name": "Senior Developer & Designer"
    }],
    "areaServed": "Worldwide",
    "serviceType": [
      "MVP Development",
      "Web Development",
      "Mobile App Development", 
      "AI Integration",
      "Branding & Design",
      "Technical Infrastructure",
      "Business Development"
    ],
    "knowsAbout": [
      "React",
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "OpenAI",
      "Tailwind CSS",
      "Node.js",
      "Startup Development",
      "MVP Strategy",
      "User Experience Design"
    ]
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Vibe Coding - MVP Development Service",
    "description": "Unique methodology combining emotional design with robust technical implementation for rapid startup growth",
    "provider": {
      "@type": "Organization",
      "name": "sencodev"
    },
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "sencodev Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "MVP Development",
            "description": "Rapid prototyping and full-stack development using modern technologies"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "AI Integration",
            "description": "GPT, Vision, Whisper API implementations for business applications"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Branding & Design",
            "description": "Complete visual identity systems and design tokens"
          }
        }
      ]
    }
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Vibe Coding?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Vibe Coding is a unique methodology that combines emotional design with robust technical implementation. It treats code as craft, ensuring every line serves the user's emotional journey while maintaining technical excellence."
        }
      },
      {
        "@type": "Question", 
        "name": "How fast can you build an MVP?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Using Vibe Coding methodology, we can deliver a market-ready MVP in 4-8 weeks, compared to 3-6 months with traditional development approaches."
        }
      },
      {
        "@type": "Question",
        "name": "Why choose sencodev over WordPress or traditional agencies?", 
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "sencodev offers single-brain execution without translation layers between design and development. You get modern, scalable architecture instead of WordPress limitations, with transparent pricing from one expert who understands both design and engineering."
        }
      },
      {
        "@type": "Question",
        "name": "What technologies do you use?",
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": "We use modern tech stack including React, Next.js, TypeScript, Supabase, PostgreSQL, OpenAI APIs, Tailwind CSS, and deploy on Vercel. All chosen for scalability and performance."
        }
      },
      {
        "@type": "Question",
        "name": "Do you work with early-stage startups?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we specialize in early-stage startups and understand the unique needs of founders seeking rapid growth, investor readiness, and market validation."
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}