import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    console.log('Testing database connection...')
    
    // Try to insert a test appointment
    const testAppointment = {
      name: 'Test User',
      email: 'test@example.com',
      mobile: '+49123456789',
      company: 'Test Company',
      package_name: 'Free Consultation',
      message: 'This is a test appointment',
      preferred_contact: 'email',
      appointment_date: '2025-08-07',
      appointment_time: '16:00',
      status: 'scheduled' as const,
      reminder_sent: false
    }

    const { data, error } = await supabase
      .from('appointments')
      .insert(testAppointment)
      .select()
      .single()

    if (error) {
      console.error('Database test failed:', error)
      return NextResponse.json({
        success: false,
        error: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      }, { status: 500 })
    }

    console.log('Database test successful:', data.id)
    
    return NextResponse.json({
      success: true,
      message: 'Database test successful',
      appointmentId: data.id,
      data
    })

  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}