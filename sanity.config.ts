/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/studio` route
 */

import { defineConfig } from 'next-sanity'

// Go to https://www.sanity.io/manage or run `npx sanity manage` to create a project
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'tfdiq2zl'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    types: [
      {
        name: 'hero',
        title: 'Hero Section',
        type: 'document',
        fields: [
          {
            name: 'title',
            title: 'Main Title',
            type: 'string',
            description: 'Main headline (e.g., "Fast-track")'
          },
          {
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
            description: 'Brand name (e.g., "SenDev™")'
          },
          {
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'Hero description text'
          },
          {
            name: 'philosophical_quote',
            title: 'Philosophical Quote',
            type: 'text',
            description: 'The inspirational quote in the glass box'
          },
          {
            name: 'cta_primary',
            title: 'Primary CTA',
            type: 'string',
            description: 'Primary button text'
          },
          {
            name: 'cta_secondary',
            title: 'Secondary CTA',
            type: 'string',
            description: 'Secondary button text'
          }
        ]
      },
      {
        name: 'philosophy',
        title: 'Philosophy Section',
        type: 'document',
        fields: [
          {
            name: 'title',
            title: 'Section Title',
            type: 'string'
          },
          {
            name: 'subtitle',
            title: 'Section Subtitle',
            type: 'text'
          },
          {
            name: 'principles',
            title: 'Core Principles',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
                  {
                    name: 'title',
                    title: 'Principle Title',
                    type: 'string'
                  },
                  {
                    name: 'description',
                    title: 'Description',
                    type: 'text'
                  },
                  {
                    name: 'quote',
                    title: 'Quote',
                    type: 'text'
                  },
                  {
                    name: 'icon',
                    title: 'Icon Name',
                    type: 'string',
                    description: 'Lucide icon name (e.g., "Eye", "Zap", "Target")'
                  }
                ]
              }
            ]
          },
          {
            name: 'philosophy_cards',
            title: 'Philosophy Cards',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
                  {
                    name: 'title',
                    title: 'Card Title',
                    type: 'string'
                  },
                  {
                    name: 'content',
                    title: 'Card Content',
                    type: 'text'
                  }
                ]
              }
            ]
          },
          {
            name: 'stats',
            title: 'Statistics',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
                  {
                    name: 'value',
                    title: 'Stat Value',
                    type: 'string',
                    description: 'e.g., "-60%", "3-6x", "100%"'
                  },
                  {
                    name: 'label',
                    title: 'Stat Label',
                    type: 'string'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'bundle',
        title: 'Service Bundle',
        type: 'document',
        fields: [
          {
            name: 'name',
            title: 'Bundle Name',
            type: 'string'
          },
          {
            name: 'tagline',
            title: 'Tagline',
            type: 'string'
          },
          {
            name: 'price',
            title: 'Price',
            type: 'string',
            description: 'e.g., "990", "1.990", "Anfrage"'
          },
          {
            name: 'duration',
            title: 'Duration',
            type: 'string',
            description: 'e.g., "1-2 Tage", "1 Woche"'
          },
          {
            name: 'hours',
            title: 'Hours',
            type: 'string',
            description: 'e.g., "8-12 Stunden"'
          },
          {
            name: 'target',
            title: 'Target Audience',
            type: 'string'
          },
          {
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [{ type: 'string' }]
          },
          {
            name: 'result',
            title: 'Expected Result',
            type: 'string'
          },
          {
            name: 'popular',
            title: 'Popular Bundle',
            type: 'boolean',
            description: 'Mark as most popular'
          },
          {
            name: 'icon',
            title: 'Icon Name',
            type: 'string',
            description: 'Lucide icon name'
          },
          {
            name: 'color',
            title: 'Color Gradient',
            type: 'string',
            description: 'Tailwind gradient classes (e.g., "from-slate-600 to-slate-800")'
          },
          {
            name: 'order',
            title: 'Display Order',
            type: 'number'
          }
        ],
        orderings: [
          {
            title: 'Order',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }]
          }
        ]
      },
      {
        name: 'testimonial',
        title: 'Testimonial',
        type: 'document',
        fields: [
          {
            name: 'name',
            title: 'Client Name',
            type: 'string'
          },
          {
            name: 'role',
            title: 'Role/Title',
            type: 'string'
          },
          {
            name: 'company',
            title: 'Company',
            type: 'string'
          },
          {
            name: 'content',
            title: 'Testimonial Content',
            type: 'text'
          },
          {
            name: 'avatar',
            title: 'Avatar Image',
            type: 'image',
            options: {
              hotspot: true
            }
          },
          {
            name: 'rating',
            title: 'Rating',
            type: 'number',
            validation: (Rule: any) => Rule.min(1).max(5)
          }
        ]
      }
    ]
  }
})