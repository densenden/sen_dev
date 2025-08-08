# Supabase Database Setup Instructions

## ✅ Environment Configuration Complete
Your `.env.local` has been updated with Supabase credentials:
- Project URL: `https://qrnzasjjubparpljaibc.supabase.co`
- Anon Key: Configured ✅
- Service Role Key: Configured ✅
- Password: `NwO_2025`

## 🚀 Step-by-Step Setup

### 1. Run Database Migration
Go to your Supabase Dashboard → SQL Editor and run the complete setup script:

**📁 File:** `supabase_setup.sql`

This will create:
- ✅ `appointments` table with all fields and indexes
- ✅ `projects` table with sample data
- ✅ `testimonials` table linked to projects  
- ✅ `project-images` storage bucket
- ✅ Row Level Security policies
- ✅ Sample project data (Senflix, Synapsee, Meme Machine, Fork:it, Kria Training)

### 2. Populate Projects Database
Run the Node.js script to insert projects with real image paths:

```bash
node scripts/setup-projects-with-images.js
```

This will:
- ✅ Insert 5 sample projects with real screenshots
- ✅ Link testimonials to projects
- ✅ Use existing `/random/hero-*.jpg` images
- ✅ Set up proper live URLs

### 3. Verify Setup
Check your Supabase dashboard:

**Tables:**
- `appointments` (0 records initially)
- `projects` (5 records)
- `testimonials` (5 records)

**Storage:**
- `project-images` bucket (public access enabled)

### 4. Test the Integration

**Test Appointment System:**
```bash
curl -X POST http://localhost:3002/api/send-appointment-email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test appointment",
    "appointment": {
      "date": "2025-08-06",
      "time": "14:00"
    }
  }'
```

**Test Projects Display:**
Visit `http://localhost:3002/projects` to see the populated projects.

## 📋 Database Schema Overview

### Projects Table
```sql
- id (UUID, Primary Key)
- title (Text)
- slug (Text, Unique)
- summary (Text)
- description (Text)
- tech_stack (Text Array)
- screenshots (Text Array) -- Uses /random/hero-*.jpg paths
- video_demo (Text, Optional)
- tags (Text Array)
- client_name (Text)
- outcome (Text)
- link_live (Text, Optional)
- created_at (Timestamp)
- updated_at (Timestamp)
```

### Appointments Table
```sql
- id (UUID, Primary Key)
- name, email, mobile, company (Text)
- package_name, message (Text)
- preferred_contact (Text)
- appointment_date (Date)
- appointment_time (Time)
- status (scheduled/completed/cancelled)
- reminder_sent (Boolean)
- created_at, updated_at (Timestamps)
```

### Testimonials Table
```sql
- id (UUID, Primary Key)
- name, role, company (Text)
- content (Text)
- avatar_url (Text, Optional)
- project_id (UUID, Foreign Key)
- created_at (Timestamp)
```

## 🖼️ Image Management

**Current Setup:**
- Projects use existing `/random/hero-*.jpg` images
- Storage bucket `project-images` ready for future uploads
- Public access configured for easy image serving

**Future Image Uploads:**
```bash
# Upload new project images
node scripts/upload-project-images.js
```

## 🔄 Cron Job for Reminders

Set up a cron job to send appointment reminders:

**Vercel Cron (Recommended):**
```json
{
  "crons": [
    {
      "path": "/api/send-appointment-reminders",
      "schedule": "0 * * * *"
    }
  ]
}
```

**Server Cron:**
```bash
# Every hour
0 * * * * curl -X POST https://dev.sen.studio/api/send-appointment-reminders
```

## ⚡ Quick Commands

```bash
# Test database connection
node -e "console.log('DB URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)"

# Check projects
curl "https://qrnzasjjubparpljaibc.supabase.co/rest/v1/projects?select=title,slug" \
  -H "apikey: YOUR_ANON_KEY"

# Test appointment booking
curl -X POST http://localhost:3002/api/send-appointment-email \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Test","appointment":{"date":"2025-08-06","time":"14:00"}}'
```

## 🎯 Next Steps

1. ✅ Run the SQL migration in Supabase Dashboard
2. ✅ Execute `node scripts/setup-projects-with-images.js`
3. ✅ Test the appointment system
4. ✅ Verify projects page displays correctly
5. ✅ Set up reminder cron job
6. 🚀 Deploy to production!

## 🔧 Troubleshooting

**Connection Issues:**
- Verify environment variables are loaded
- Check Supabase project status
- Confirm RLS policies are active

**Permission Errors:**
- Ensure service role key is used for admin operations
- Check RLS policies in Supabase dashboard
- Verify storage bucket permissions

**Missing Data:**
- Re-run the setup scripts
- Check Supabase logs for errors
- Verify table schemas match expectations