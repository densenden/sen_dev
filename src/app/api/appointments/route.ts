import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  // Use service role client to ensure we can read all appointments
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

  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')

  try {
    let query = supabase
      .from('appointments')
      .select('*')
      .order('appointment_date', { ascending: true })
      .order('appointment_time', { ascending: true })

    if (status) {
      query = query.eq('status', status)
    }

    if (startDate) {
      query = query.gte('appointment_date', startDate)
    }

    if (endDate) {
      query = query.lte('appointment_date', endDate)
    }

    const { data: appointments, error } = await query

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: 500 })
    }

    return NextResponse.json(appointments || [])
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
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

  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.email || !body.appointment_date || !body.appointment_time) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('appointments')
      .insert([{
        name: body.name,
        email: body.email,
        mobile: body.mobile,
        company: body.company,
        package_name: body.package_name,
        message: body.message,
        preferred_contact: body.preferred_contact || 'email',
        appointment_date: body.appointment_date,
        appointment_time: body.appointment_time,
        status: body.status || 'scheduled',
        reminder_sent: false
      }])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 })
  }
}