**GitHub Project Description (One-liner):**

> Fast-track MVPs and startup infrastructures with full-stack Vibe Coding, integrated branding, and scalable tech setup – built by a designer-engineer for rapid growth.

---

# sencodev – Product Requirements Document (Claude.md)

**Project:** sencodev  
**Plan:** Growth Trial  
**Status:** Active  
**Language:** English-first, ready for localization via [generaltranslation](https://github.com/generaltranslation)  
**Sanity Project ID:** `tfdiq2zl`  
**Organization ID:** `ofRppgGrA`  
**Design:** [sen-shop-mvp storefront UI](https://github.com/densenden/sen-shop-mvp/tree/storefront-ui-design/sen-commerce-storefront)  
**Typography:** Inter Font (variable)  
**Component Library:** [shadcn/ui](https://ui.shadcn.com/docs)  

---

## 🧱 Pages & Content Structure

### 1. Homepage
**Purpose:** Introduce sencodev, clarify benefits for startups, highlight vibe coding USP
**Sections:**
- Hero (bold value prop + CTA)
- Core Services overview (MVP, Branding, Setup)
- Client Projects (carousel: Senflix, Synapsee, Meme-Machine, etc.)
- Package teaser with pricing link
- Why Vibe Coding (comparison table)
- Logos of featured platforms
- Contact teaser

### 2. About & Philosophy
**Purpose:** Founder story, vibe coding method, credibility
**Sections:**
- Serial entrepreneur bio
- The Vibe Coding method (emotion x tech)
- What we do/don't do
- Typical startup phases & where we support
- Optional: Timeline or visual process

### 3. Services Overview
**Purpose:** Detail the modular offerings
**Subpages or Accordion Sections:**
- MVP Development
- Web/Mobile Applications
- AI-Integration (GPT, Vision, Whisper)
- Backend & Databases (REST, GraphQL, Supabase, Prisma, PostgreSQL, SQLite)
- Branding & Design Tokens
- Manuals, Decks & Templates
- Notion Workspace Setup
- Domain + Hosting (Vercel, Google Workspace, Railway, Firebase)
- Automation + SaaS Stack setup (Zapier, Stripe, Twilio)
- Teammail & CRM setup
- Business Plan / Investor Deck development
- Rapid Pivot Kits (UX+Story iterations)

### 4. Packages & Pricing
**Purpose:** Transparent service levels
**Packages:**
- Impulse Sprint
- Starter Sprint
- Launch Ready
- Creator+ Build
- Co-Founder Tech Partner (retainer)
Each includes estimated hours, deliverables, ideal audience, price ranges.

### 5. Use Cases
**Purpose:** SEO + proof of capability
**Each with:**
- Intro
- Tech stack used
- Screenshots (carousel from DB)
- Business outcome
- Learnings
Examples:
- Senflix
- Synapsee
- Meme-Machine
- Kria Training
- Fork:it

### 6. Tech Stack Library
**Purpose:** Show wide tech range and competence
**Categories:**
- Frontend: React, Next.js, Expo, Flutter, Swift, Tailwind CSS, Framer Motion, GSAP
- Backend: Node.js, Flask, FastAPI, Supabase, Prisma, PostgreSQL, SQLite
- APIs: OpenAI, Twilio, Stripe, Plaid, Notion, Meta Graph API, WhatsApp Business API
- Infra: Vercel, Railway, Firebase, Docker, GitHub Actions, Netlify
- CMS: Supabase (custom CMS), optionally Sanity for sen_dev sync
- Automation: Zapier, n8n, Make
- Auth: Supabase Auth, Clerk.dev, JWT
- Localization: generaltranslation

### 7. Blog / Insights
**Purpose:** SEO and founder thought leadership
**Topics:**
- Why a good MVP must *look* good
- How Vibe Coding saves months
- What investors look for in prototypes
- Our MVP setup checklist
- Tool deep dives

### 8. Contact / Discovery Call
**Purpose:** Funnel users into intake
**Sections:**
- Smart form with conditional logic (use case, budget, timeline)
- Live Calendly embed
- Email fallback
- FAQ

---

## 🖼️ MidJourney Illustration Concept
**Style prompt basis (use per section):**
> UI mockup of futuristic workspace, dual screens with code and Figma, soft depth lighting, ambient tones, minimalist tech aesthetic, startup energy, monochrome + violet tints, Inter font styled UI, web components in motion blur, surreal tech-art branding, vibe-coded light rays  

**Image placements:**
- Homepage Hero: Vibe coding in action (human + code + UI harmony)
- Services Page: Modular tech blocks floating
- Use Case Page: Abstract interpretation of past client projects
- Blog: Isometric neural web with icons and signal flow

---

## 📦 Supabase Database: Project Portfolio Schema
**Table:** `projects`
- `id`: uuid
- `title`: text
- `slug`: text
- `summary`: text
- `description`: richtext (markdown/HTML)
- `tech_stack`: array (text[])
- `screenshots`: array (image URLs)
- `video_demo`: optional text (YouTube/Vimeo link)
- `tags`: text[]
- `client_name`: text
- `outcome`: text
- `link_live`: text
- `created_at`, `updated_at`

**Relations:**
- Categories (e.g. MVP, AI, Commerce)
- Testimonials (text, name, role, avatar)

---

## 🌍 Localization Setup
**Default language:** English  
**Translation enabled:** Yes (via generaltranslation)  
**UI Copy stored in:** JSON / Supabase table `translations`  
**Supported languages:** English, German (initial), scalable via i18n

---

> Next steps:
> - Build dynamic frontend in Next.js (App Router) with Tailwind + shadcn
> - Integrate Supabase DB
> - Configure Sanity for marketing page content sync with `sen_dev`
> - Prepare illustration prompts in MidJourney v6
> - Set up Stripe & Calendly integrations

