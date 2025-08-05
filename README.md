# SenDev™ - Where Vision Meets Velocity

<div align="center">
  
  [![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-dev.sen.studio-7C3AED?style=for-the-badge)](https://dev.sen.studio)
  [![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.4.5-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4_alpha-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
  [![Supabase](https://img.shields.io/badge/Supabase-Ready-3FCF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com)
  [![Sanity](https://img.shields.io/badge/Sanity-Configured-F03E2F?style=flat-square&logo=sanity&logoColor=white)](https://sanity.io)
  
  Fast-track MVPs and startup infrastructures with full-stack Vibe Coding, integrated branding, and scalable tech setup – built by a designer-engineer for rapid growth.

</div>

## 🚀 Project Overview

SenDev™ is a premium development service website showcasing:
- Full-stack development services
- Startup MVP development
- Designer-engineer approach
- Rapid deployment methodology

## 🛠 Tech Stack

<table>
<tr>
<td>

**Frontend**
- ![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black?logo=next.js&logoColor=white) App Router
- ![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react&logoColor=black)
- ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
- ![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-FF0080?logo=framer&logoColor=white)

</td>
<td>

**Backend & Infrastructure**
- ![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel&logoColor=white)
- ![Supabase](https://img.shields.io/badge/Supabase-Database-3FCF8E?logo=supabase&logoColor=white)
- ![Sanity](https://img.shields.io/badge/Sanity-CMS-F03E2F?logo=sanity&logoColor=white)
- ![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Components-black)

</td>
</tr>
</table>

## 🎨 Features

### Implemented ✅
- Dynamic hero section with random background images
- Project showcase with 6 case studies
- Service packages and pricing
- Philosophy and approach pages
- Responsive design with glass morphism effects
- Dark/light mode support with theme-aware favicon
- Legal pages (imprint, privacy, terms)
- Custom 404 page
- Project detail pages with case study sections
- Linked project tiles from homepage

### Design System
- **Typography**: Inter font (300, 400 weights)
- **Colors**: Primary, Secondary, Accent color scheme
- **Effects**: Glass morphism, subtle animations
- **Components**: Custom UI components based on shadcn/ui

## 📋 Remaining Tasks

### 1. Contact Form Implementation 📬
- [ ] Create functional contact form component
- [ ] Set up form validation
- [ ] Implement email sending (via Resend/SendGrid)
- [ ] Add form submission to Supabase
- [ ] Create success/error states
- [ ] Add rate limiting

### 2. Database Integration (Supabase) 🗄️
- [ ] Connect Supabase client (credentials needed)
- [ ] Implement projects table schema
- [ ] Create API routes for data fetching
- [ ] Replace static project data with database queries
- [ ] Add project CRUD operations
- [ ] Implement image upload for projects

### 3. Sanity CMS Setup 📝
- [ ] Fix Sanity configuration (project ID validation)
- [ ] Create Sanity schemas for:
  - Hero content
  - Projects
  - Services/Packages
  - Testimonials
  - Philosophy content
- [ ] Connect Sanity client
- [ ] Create Studio interface at /studio
- [ ] Implement content fetching

### 4. Additional Features 🌟
- [ ] Newsletter signup integration
- [ ] Analytics setup (Google Analytics/Plausible)
- [ ] SEO optimization (meta tags, sitemap, robots.txt)
- [ ] Performance optimization
- [ ] Accessibility improvements
- [ ] Multi-language support preparation

### 5. Content & Polish ✨
- [ ] Add real project screenshots
- [ ] Write detailed case studies
- [ ] Create blog/insights section
- [ ] Add team/about content
- [ ] Implement testimonials section

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/densenden/sen_dev.git
cd sen_dev

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔧 Environment Variables

Create a `.env.local` file:

```env
# Supabase (currently commented out)
# NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Sanity (needs valid project ID)
# NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
# NEXT_PUBLIC_SANITY_DATASET=production
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Homepage
│   ├── projects/          # Projects listing and detail pages
│   ├── services/          # Services page
│   ├── packages/          # Pricing packages
│   ├── philosophy/        # Philosophy page
│   ├── about/             # About page
│   ├── contact/           # Contact page (needs form implementation)
│   └── legal/             # Legal pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── hero-elegant.tsx  # Main hero section
│   ├── navigation-clean.tsx # Navigation bar
│   └── ...               # Other components
├── lib/                   # Utility functions
│   ├── supabase.ts       # Supabase client (needs config)
│   ├── sanity.ts         # Sanity client (needs fix)
│   └── utils.ts          # Helper functions
└── hooks/                 # Custom React hooks
```

## 🌐 Deployment

<div align="center">
  
  [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/densenden/sen_dev)
  
</div>

The site is deployed on Vercel. Push to main branch for automatic deployment.

Current deployment: [https://dev.sen.studio](https://dev.sen.studio)

## 📝 Notes

- Using Tailwind CSS v4 (alpha) - some features may change
- Sanity integration temporarily disabled due to project ID validation
- Supabase ready but needs credentials
- All images currently use placeholder data

## 🤝 Contributing

This is a client project. Please coordinate with the project owner before making changes.

## 📄 License

Proprietary - All rights reserved

---

<div align="center">
  
  Built with ❤️ by **SenDev™**
  
  [![Website](https://img.shields.io/badge/Website-dev.sen.studio-7C3AED?style=flat-square)](https://dev.sen.studio)
  [![GitHub](https://img.shields.io/badge/GitHub-densenden-181717?style=flat-square&logo=github)](https://github.com/densenden)
  
</div>