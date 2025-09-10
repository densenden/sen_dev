const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function checkProjects() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching projects:', error)
      return
    }

    console.log(`Found ${data?.length || 0} projects in database:`)
    data?.forEach((project, index) => {
      console.log(`\n${index + 1}. ${project.title} (${project.slug})`)
      console.log(`   Summary: ${project.summary}`)
      console.log(`   Tech Stack: ${project.tech_stack?.join(', ') || 'None'}`)
      console.log(`   Screenshots: ${project.screenshots?.length || 0} images`)
      console.log(`   Live URL: ${project.link_live || 'None'}`)
    })
  } catch (error) {
    console.error('Failed to check projects:', error)
  }
}

checkProjects()