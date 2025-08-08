# Appointment System Documentation

## Overview
Complete appointment system with email notifications, database storage, and reminder functionality.

## Features ✅
- **Email Notifications**: Sends to both user and dev@sen.studio
- **Calendar Attachments**: ICS files attached to all appointment emails
- **Database Storage**: Appointments saved to Supabase database
- **Reschedule/Cancel**: One-click buttons in emails
- **Reminder System**: 2-hour advance email reminders
- **Status Tracking**: Scheduled, completed, cancelled status

## Database Setup

### 1. Run Migration
Execute the SQL file to create the appointments table:
```sql
-- File: supabase/migrations/create_appointments_table.sql
-- Run this in your Supabase SQL editor
```

### 2. Configure Environment
Add your Supabase credentials to `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## API Endpoints

### Appointment Management
- `POST /api/send-appointment-email` - Books appointment + sends emails
- `GET /api/appointment/reschedule?id=xxx` - Reschedule page
- `GET /api/appointment/cancel?id=xxx` - Cancel appointment
- `POST /api/send-appointment-reminders` - Send 2h reminders

### Contact Management  
- `POST /api/send-contact-email` - Sends inquiry emails to both parties

## Email Templates
- `contact-confirmation-user.tsx` - User inquiry confirmation
- `contact-notification-master.tsx` - Notification to dev@sen.studio
- `appointment-confirmation-user.tsx` - User appointment confirmation + buttons
- `appointment-notification-master.tsx` - Notification to dev@sen.studio
- `appointment-reminder.tsx` - 2-hour advance reminder

## Automation Setup

### Cron Job for Reminders
Set up a cron job to check for appointments needing reminders every hour:

```bash
# Add to your server's crontab or use Vercel Cron Jobs
0 * * * * curl -X POST https://your-domain.com/api/send-appointment-reminders
```

### Vercel Cron Jobs (Recommended)
Create `vercel.json`:
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

## Database Schema

```sql
appointments (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile TEXT,
  company TEXT,
  package_name TEXT NOT NULL,
  message TEXT NOT NULL,
  preferred_contact TEXT DEFAULT 'email',
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status TEXT DEFAULT 'scheduled', -- scheduled, completed, cancelled
  reminder_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
)
```

## Usage

### User Flow
1. User books appointment on `/contact` page
2. User receives confirmation email with calendar file + action buttons
3. You receive notification email with client details + calendar file
4. 2 hours before appointment, user gets reminder email
5. User can reschedule or cancel via email buttons

### Admin Flow
- All notifications go to `dev@sen.studio`
- Calendar files auto-imported to your calendar app
- Database tracks all appointment changes
- Cancellations trigger immediate notifications

## Testing

### Test Reminder System
```bash
curl -X POST https://your-domain.com/api/send-appointment-reminders
```

### Test Appointment Booking
Use the contact form and select "Free Consultation" to trigger the appointment flow.

## Next Steps
1. Configure Supabase credentials
2. Run database migration  
3. Set up cron job for reminders
4. Test the complete flow
5. Deploy to production

## Email Branding
All emails use "SenDev ™" branding with:
- Logo constrained to 25px height
- Professional signature component
- Consistent styling across all templates